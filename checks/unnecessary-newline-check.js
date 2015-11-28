/**
 * unnecessary-newline-check.js
 */
var utils = require('../utils');

var check = (config) => {
    return {
        visitLine: (reporter, line) => {
            if (!line.previousLine) return;

            if (utils.isEmpty(line.text) && utils.isEmpty(line.previousLine.text)) {
                reporter.report(`Remove unnecessary newline`, {row: line.row});
            }
        }
    };
};
check.id = 'core/unnecessary-newline-check';
module.exports = check;
