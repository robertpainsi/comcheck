/**
 * parser.js
 */
var utils = require('./utils');

module.exports = (config) => {
    var getLines = (commitMessage, message) => {
        var isEnumeration = false;
        var enumeration = '';
        var previousLine = undefined;
        return commitMessage.split('\n').map((line, index, lines) => {
                if (isEnumeration && utils.isEmpty(line)) {
                    isEnumeration = false;
                    enumeration = '';
                } else {
                    utils.someStartsWith(config.enumeration, line, (match) => {
                        isEnumeration = true;
                        enumeration = match[0];
                    });
                }

                var result = {
                    lineIndex: index,
                    lineNumber: index + 1,
                    row: index + 1,
                    isFirstLine: index === 0,
                    isHeader: index === 0,
                    isLastLine: index === lines.length - 1,
                    text: line,
                    trimmedText: line.trim(),
                    message,
                    commitMessage,
                    isEnumeration,
                    enumeration,
                    previousLine
                };

                if (index === 0) {
                    var title = result.trimmedText;
                    if (config.ticket && title.search(config.ticket.pattern) === 0) {
                        title = title.replace(config.ticket.pattern, '');
                    } else if (config.threshold) {
                        config.threshold.some((pattern) => {
                            if (title.match(pattern)) {
                                title.replace(pattern, '');
                                return true;
                            }
                        })
                    }
                    result.title = title.trim();
                }

                if (previousLine) {
                    previousLine.nextLine = result;
                }
                previousLine = result;
                return result;
            }
        );
    };

    var getBody = (lines) => {
        var firstBodyLine = lines.findIndex((line, index) => index > 0 && !utils.isEmpty(line.text));
        return (firstBodyLine === -1) ? [] : lines.slice(firstBodyLine);
    };
    return {
        parse: function(commitMessage) {
            var message = {};
            var lines = getLines(commitMessage, message);

            message.text = commitMessage;
            message.header = lines[0];
            message.body = getBody(lines);
            message.lines = lines;

            message.lines.forEach((line) => {
                if (!line.isEnumeration) return;
            });

            return {message, lines};
        }
    }
};
