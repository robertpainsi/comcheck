/**
 * line-length-check.js
 */
var utils = require('../utils');

var isSourceEnumeration = (text) => text.match(/^\[[0-9]+\]\s[^\s]+$/);

var check = (config) => {
    return {
        visitHeader: (reporter, header) => {
            var text = header.text;
            var exceedingText = text.substring(config.headerLength);
            if (exceedingText) {
                reporter.report(`Header exceeds ${config.headerLength} characters`, {
                    text: exceedingText,
                    row: header.row,
                    column: config.headerLength + 1
                });
            }
        },
        visitLine: (reporter, line) => {
            if (line.isHeader) return;

            var text = line.text;
            var exceedingText = text.substring(config.lineLength);
            if (exceedingText && !isSourceEnumeration(text) && text.match(/[^\s]\s+[^\s]/)) {
                reporter.report(`Line exceeds ${config.lineLength} characters`, {
                    text: exceedingText,
                    row: line.row,
                    column: config.lineLength + 1
                });
            }
        }
    };
};
check.id = 'core/line-length-check';
module.exports = check;
