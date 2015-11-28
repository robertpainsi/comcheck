/**
 * upper-case-at-beginning-check.js
 */
var utils = require('../utils');

var check = (config) => {
    return {
        visitHeader: (reporter, header) => {
            var title = header.title;
            if (utils.startsWithLowerCase(title) && utils.isWord(utils.getFirstWord(title))) {
                reporter.report(`Start header title with upper case`, {
                    text: title[0],
                    row: header.row,
                    column: header.text.indexOf(title) + 1
                });
            }
        },
        visitBodyLine: (reporter, line) => {
            var trimmedText = line.trimmedText;
            if (trimmedText
                && (line.row === 2 || !line.previousLine.trimmedText)
                && utils.startsWithLowerCase(trimmedText)
                && utils.isWord(utils.getFirstWord(trimmedText))) {
                reporter.report(`Start paragraph with upper case`, {
                    text: trimmedText[0],
                    row: line.row,
                    column: line.text.indexOf(trimmedText) + 1
                });
            }
        }
    };
};
check.id = 'core/upper-case-at-beginning-check';
module.exports = check;
