/**
 * ticket-prefix-check.js
 */
var assert = require('assert');
var TestReporter = require('./../test-reporter');

var comcheck;
var reporter;

describe('ticket-prefix-check', () => {
    beforeEach(() => {
        reporter = new TestReporter();
        comcheck = require('../../index')({
            ticket: {
                pattern: /^[A-Z]+-[1-9][0-9]* /,
                threshold: [
                    /^[A-Za-z]+-[0-9]+\s+/
                ]
            }
        });
        comcheck.register(require('../../checks/ticket-prefix-check').id);
    });

    it('should handle a well formatted sample message', () => {
        comcheck.check([
            'Capitalize short (50 chars or less) summary',
            '',
            'More detailed explanatory text, if necessary. Wrap it to about 72',
            'characters or so. In some contexts, the first line is treated as the',
            'subject of an email and the rest of the text as the body. The blank',
            'line separating the summary from the body is critical (unless you omit',
            'the body entirely); tools like rebase can get confused if you run the',
            'two together.',
            '',
            'Write your commit message in the imperative: "Fix bug" and not "Fixed',
            'bug" or "Fixes bug." This convention matches up with commit messages',
            'generated by commands like git merge and git revert.',
            '',
            'Further paragraphs come after blank lines.',
            '',
            '- Bullet points are okay, too',
            '',
            '- Typically a hyphen or asterisk is used for the bullet, followed by a',
            '  single space, with blank lines in between, but conventions vary here',
            '',
            '- Use a hanging indent'], reporter);
        reporter.check();
    });

    it('should report if project is not all uppercase', () => {
        comcheck.check('Web-1234 Fix something', reporter);
        comcheck.check('cat-1234 Fix something', reporter);
        reporter.check([
            {text: 'Web-1234', row: 1, column: 1},
            {text: 'cat-1234', row: 1, column: 1}
        ]);
    });

    it('should report if project id starts with 0', () => {
        comcheck.check('CAT-0123 Fix something', reporter);
        reporter.check({text: 'CAT-0123', row: 1, column: 1});
    });

    it('should report if project is not separated by a space', () => {
        comcheck.check('CAT-1234Fix something', reporter);
        reporter.check({text: 'CAT-1234Fix', row: 1, column: 1});
    });

    it('should ignore normal words', () => {
        comcheck.check('Merge Pull Request', reporter);
        reporter.check();
    });
});
