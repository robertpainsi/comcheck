/**
 * improve-message-check.js
 */
var utils = require('../utils');
var indicatorTester = require('../indicator-tester');

var rebaseTester = indicatorTester(['rebase']);
var improvementTester = indicatorTester(['thing']);

var check = (config) => {
    return {
        visitHeader: (reporter, header) => {
            var title = header.title;
            if (rebaseTester.test(title)) {
                reporter.report(`Remove rebasing commit`, {row: 1});
            }
            if (title.split(/\s+/).length < 2 || improvementTester.test(title)) {
                reporter.report(`Improve commit message header`, {row: 1});
            }
        }
    };
};
check.id = 'core/improve-message-check';
module.exports = check;
