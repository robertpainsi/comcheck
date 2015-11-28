/**
 * unnecessary-whitespace-check.js
 */
var utils = require('../utils');

var check = (config) => {
    return {
        visitLine: function(reporter, line) {
            if (!line.text) return;

            var text = line.text;
            if (!line.trimmedText) {
                reporter.report(`Empty line contains whitespaces`, {
                    text,
                    row: line.row,
                    column: 1
                });
            } else {
                if (!line.isEnumeration) {
                    utils.forEachMatch(/^\s+/, text, (match) => {
                        reporter.report(`Line starts with whitespaces`, {
                            text: match[0],
                            row: line.row,
                            column: match.index + 1
                        });
                    });
                }
                utils.forEachMatch(/\s+$/, text, (match) => {
                    reporter.report(`Line ends with whitespaces`, {
                        text: match[0],
                        row: line.row,
                        column: match.index + 1
                    });
                });
            }
        }
    };
};
check.id = 'core/unnecessary-whitespace-check';
module.exports = check;
