/**
 * forward-reporter.js
 */

module.exports = (reporters) => {
    var listeners = [];
    var forwarder = {
        report: function(message, info) {
            if (!info.length) {
                info.length = (info.text) ? info.text.length : 0;
            }
            if (!info.column) {
                info.column = 0;
            }

            listeners.forEach((listener) => {
                if (listener.report) {
                    listener.report(message, info);
                }
            });
        },
        exception: function(e) {
            listeners.forEach((listener) => {
                if (listener.exception) {
                    listener.exception(e);
                }
            });
        },
        register: function(reporters) {
            if (!Array.isArray(reporters)) reporters = [reporters];
            reporters.forEach((reporter) => {
                listeners.push(reporter);
            })
        }
    };

    forwarder.register(reporters);
    return forwarder;
};
