/**
 * unnecessary-whitespace-check.js
 */
var assert = require('assert');
var TestReporter = require('./../test-reporter');

var comcheck;
var reporter;

describe('unnecessary-whitespace-check', () => {
    beforeEach(() => {
        reporter = new TestReporter();
        comcheck = require('../../index')();
        comcheck.register(require('../../checks/unnecessary-whitespace-check').id);
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

    it('should find leading whitespaces', () => {
        comcheck.check([
            '  Leading whitespaces',
            '',
            'More leading',
            '   whitespaces',
            ' here.'], reporter);
        reporter.check([
            {text: '  ', row: 1, column: 1},
            {text: '   ', row: 4, column: 1},
            {text: ' ', row: 5, column: 1}
        ]);
    });

    it('should find trailing whitespaces', () => {
        comcheck.check([
            'Leading whitespaces  ',
            '',
            'More leading',
            'whitespaces   ',
            'here. '
        ], reporter);
        reporter.check([
            {text: '  ', row: 1, column: 20},
            {text: '   ', row: 4, column: 12},
            {text: ' ', row: 5, column: 6}
        ]);
    });

    it('should find leading and trailing whitespaces on the same line', () => {
        comcheck.check([
            ' Leading and trailing whitespaces  '
        ], reporter);
        reporter.check([
            {text: ' ', row: 1, column: 1},
            {text: '  ', row: 1, column: 34}
        ]);
    });

    it('should find empty lines containing whitespaces', () => {
        comcheck.check([
            'Empty lines containing whitespaces',
            ' ',
            'More',
            '   ',
            'whitespaces'], reporter);
        reporter.check([
            {text: ' ', row: 2, column: 1},
            {text: '   ', row: 4, column: 1}
        ]);
    });

    it('should ignore leading whitespaces in enumeration', () => {
        comcheck.check([
            'Empty lines containing whitespaces',
            '',
            '- Normal',
            '  enumeration' +
            '- Should' +
            '  work'], reporter);
        reporter.check();
    });

    it('should find trailing whitespaces in enumeration', () => {
        comcheck.check([
            'Trailing whitespaces in enumartion',
            '',
            '- Trailing ',
            '  whitespaces  '], reporter);
        reporter.check([
            {text: ' ', row: 3, column: 11},
            {text: '  ', row: 4, column: 14}
        ]);
    });
});
