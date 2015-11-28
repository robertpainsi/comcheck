/**
 * test-reporter.js
 */
var assert = require('assert');
var forwardReporter = require('../forward-reporter');

function TestReporter() {
    var reports = [];
    var reporter = forwardReporter({
        report: (message, info) => {
            reports.push(info);
        }
    });
    this.report = reporter.report;

    var isEqualReport = (actual, expected) => {
        for (var property in actual) {
            if (!actual.hasOwnProperty(property)) continue;
            if (property === 'message') continue;

            if (actual[property] !== expected[property]) {
                return false;
            }
        }
        return true;
    };

    this.check = (expecteds) => {
        if (!expecteds) {
            expecteds = [];
        } else if (!Array.isArray(expecteds)) {
            expecteds = [expecteds];
        }
        assert.equal(reports.length, expecteds.length, `Reports count differs`);

        for (var index = 0; index < reports.length; index++) {
            var actual = reports[index];
            var expected = null;
            forwardReporter({
                report: (message, info) => {
                    expected = info;
                }
            }).report(null, expecteds[index]);
            assert.ok(isEqualReport(actual, expected), `Actual(${JSON.stringify(actual)}), Expected(${JSON.stringify(expected)})`);
        }
    }
}

module.exports = TestReporter;
