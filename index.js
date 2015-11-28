/**
 * index.js
 */
require('./polyfill');
var utils = require('./utils');
var forwardReporter = require('./forward-reporter');
var coreChecks = require('./core-checks');

module.exports = (config) => {
    config = require('./config').create(config);
    var checks = new Set();
    var formatter = require('./formatter')(config);
    var parser = require('./parser')(config);
    return {
        register: function(check) {
            // TODO: Handle iterables
            if (utils.isString(check)) {
                if (check === coreChecks.ALL) {
                    coreChecks.getAll().forEach((check) => checks.add(check(config)));
                } else {
                    checks.add((coreChecks.get(check))(config));
                }
            } else if (utils.isFunction(check)) {
                checks.add(check(config));
            } else {
                checks.add(check);
            }
        },
        check: function(commitMessage, reporter) {
            if (!reporter) throw new Error('Undefined reporter');
            reporter = forwardReporter(reporter);
            if (Array.isArray(commitMessage)) commitMessage = commitMessage.join('\n');
            if (!commitMessage || utils.isGeneratedMessage(commitMessage)) return;
            if (!checks.size) this.register(coreChecks.ALL);

            var parsed = parser.parse(commitMessage);
            var message = parsed.message;
            var lines = parsed.lines;
            checks.forEach((check) => {
                try {
                    if (check.visitMessage) check.visitMessage(reporter, message);
                    if (check.visitHeader) check.visitHeader(reporter, message.header);
                    if (check.visitBody) check.visitBody(reporter, message.body);
                    lines.forEach((line, index) => {
                        if (check.visitLine) check.visitLine(reporter, line);
                        if (index > 1) {
                            if (check.visitBodyLine) check.visitBodyLine(reporter, line);
                        }
                    });
                } catch (e) {
                    reporter.exception(e);
                }
            });
        },
        format: function(commitMessage, ignore) {
            return formatter.format(commitMessage, ignore, config);
        }
    };
};
