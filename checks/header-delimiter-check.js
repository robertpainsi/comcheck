/**
 * header-delimiter-check.js
 */
var utils = require('../utils');

var check = (config) => {
    return {
        visitHeader: (reporter, header) => {
            ['.', ',', ':', '!', '?'].some((delimiter) => {
                if (header.trimmedText.endsWith(delimiter)) {
                    reporter.report(`Remove delimiter at the end of the header`, {
                        text: delimiter,
                        row: header.row,
                        column: header.text.lastIndexOf(delimiter) + 1
                    });
                    return true;
                }
            })
        }
    };
};
check.id = 'core/header-delimiter-check';
module.exports = check;
