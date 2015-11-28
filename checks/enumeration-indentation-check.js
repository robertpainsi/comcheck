/**
 * enumeration-indentation-check.js
 */
var utils = require('../utils');

var check = (config) => {
    return {
        visitBodyLine: (reporter, line) => {
            if (!line.isEnumeration || line.text.startsWith(line.enumeration)) return;

            var text = line.text;
            if (!text.match(new RegExp(`^\\s{${line.enumeration.length}}[^ \\s]`))) {
                var prefix = text.substr(0, text.search(/[^\s]/));
                reporter.report(`Line isn't indented correctly`, {
                    text: prefix,
                    row: line.row,
                    column: (prefix) ? 1 : 0
                });
            }
        }
    }
};

check.id = 'core/enumeration-indentation-check';
module.exports = check;
