/**
 * enumeration-indentation-check.js
 */
var assert = require('assert');
var TestReporter = require('./../test-reporter');

var comcheck;
var reporter;

describe('enumeration-indentation-check', () => {
    beforeEach(() => {
        reporter = new TestReporter();
        comcheck = require('../../index')();
        comcheck.register(require('../../checks/enumeration-indentation-check').id);
    });

    it('should handle a well formatted sample message', () => {
        comcheck.check([
            'Capitalized, short (50 chars or less) summary',
            '',
            'More detailed explanatory text, if necessary.  Wrap it to about 72',
            'characters or so.  In some contexts, the first line is treated as the',
            'subject of an email and the rest of the text as the body.  The blank',
            'line separating the summary from the body is critical (unless you omit',
            'the body entirely); tools like rebase can get confused if you run the',
            'two together.',
            '',
            'Write your commit message in the imperative: "Fix bug" and not "Fixed',
            'bug" or "Fixes bug."  This convention matches up with commit messages',
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

    it('should work when there is no new-line between enumerations', () => {
        comcheck.check([
            'Header',
            '',
            '- Hello',
            '  World',
            '- More',
            '  World'], reporter);
        reporter.check();
    });

    it('should work with dash and asterisk', () => {
        comcheck.check([
            'Header',
            '',
            '* Hello',
            '  World',
            '- More',
            '  World'], reporter);
        reporter.check();
    });

    it('should report wrong enumeration indentation', () => {
        comcheck.check([
            'Header',
            '',
            '* Hello',
            'World',
            '',
            '- More',
            '   World'], reporter);
        reporter.check([
            {text: '', row: 4, column: 0},
            {text: '   ', row: 7, column: 1}
        ]);
    });
});
