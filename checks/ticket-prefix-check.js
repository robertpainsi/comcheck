/**
 * ticket-prefix-check.js
 */
var utils = require('../utils');

var check = (config) => {
    var pattern = (config.ticket && config.ticket.pattern) ? config.ticket.pattern : null;
    return {
        visitHeader: (reporter, header) => {
            if (!pattern) return;
            var text = header.text;
            var firstWord = utils.getFirstWord(text);
            if (!utils.isWord(firstWord) && !text.match(config.ticket.pattern)) {
                var prefix = text.split(/\s+/)[0];
                reporter.report(`Wrong ticket prefix`, {
                    text: prefix,
                    row: 1,
                    column: 1
                });
            }
        }
    };
};
check.id = 'core/ticket-prefix-check';
module.exports = check;
