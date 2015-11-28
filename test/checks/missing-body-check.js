/**
 * missing-body-check.js
 */
var assert = require('assert');
var TestReporter = require('./../test-reporter');

var comcheck;
var reporter;

describe('missing-body-check', () => {
    beforeEach(() => {
        reporter = new TestReporter();
        comcheck = require('../../index')();
        comcheck.register(require('../../checks/missing-body-check').id);
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

    it('should report string indicators', () => {
        comcheck.check('Fix me', reporter);
        reporter.check({row: Number.POSITIVE_INFINITY, column: 0});
    });

    it('should report regex indicators', () => {
        comcheck.check('CAT-123 Make feature', reporter);
        reporter.check({row: Number.POSITIVE_INFINITY, column: 0});
    });

    it('should not report regex indicators which matches exclude', () => {
        comcheck.check('CAT-123 Enable physics feature', reporter);
        reporter.check();
    });

    it('should not report if the body is present', () => {
        comcheck.check([
            'CAT-1651 Fixed en_US locale gradle build issue',
            '',
            'Fixes an issue that prevents gradle.build form running on en_US locale'
        ], reporter);
        reporter.check();
    });
});
