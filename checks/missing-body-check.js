/**
 * missing-body-check.js
 */
var utils = require('../utils');

var indicatorTester = require('../indicator-tester')([
    'fix', 'improve', 'refactor', 'problem',
    {include: 'feature', exclude: /enable|disable/i}
]);

var check = (config) => {
    return {
        visitHeader: (reporter, header) => {
            if (!header.message.body.length && indicatorTester.test(header.title)) {
                reporter.report(`Missing body`, {row: Number.POSITIVE_INFINITY});
            }
        }
    };
};
check.id = 'core/missing-body-check';
module.exports = check;
