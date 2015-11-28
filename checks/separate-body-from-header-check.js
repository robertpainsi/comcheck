/**
 * separate-body-from-header-check.js
 */
var utils = require('../utils');

var check = (config) => {
    return {
        visitMessage: (reporter, message) => {
            if (message.lines.length > 1 && !utils.isEmpty(message.lines[1].trimmedText)) {
                reporter.report(`Separate body from header by an empty newline`, {row: 2});
            }
        }
    };
};
check.id = 'core/separate-body-from-header-check';
module.exports = check;
