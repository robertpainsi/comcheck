/**
 * single-space-separator-check.js
 */
var utils = require('../utils');

var check = (config) => {
    return {
        visitLine: (reporter, line) => {
            var text = line.text;
            if (!utils.isEmpty(text)) {
                utils.forEachMatch(/[^\s](\s+)[^\s]/, text, function(match) {
                    var whitespaces = match[1];
                    if (whitespaces !== ' ') {
                        reporter.report(`Only use a single space character`, {
                            text: whitespaces,
                            row: line.row,
                            column: match.index + 2
                        });
                    }
                })
            }
        }
    };
};
check.id = 'core/single-space-separator-check';
module.exports = check;
