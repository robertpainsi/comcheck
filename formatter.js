/**
 * formatter.js
 */
var utils = require('./utils');

module.exports = (config) => {
    var isComment = (line) => line.startsWith(config.commentChar);
    var isEnumeration = (line) =>  getEnumerationIndentation(line) !== '';
    var getEnumerationIndentation = (line) => {
        var enumerationIndentation = '';
        utils.someStartsWith(config.enumeration, line, (match) => {
            enumerationIndentation = ' '.repeat(match[0].length);
        });
        return enumerationIndentation;
    };

    var splitLine = (line) => {
        var prefix = '';
        var maxLineLength = config.lineLength;
        var indentation = getEnumerationIndentation(line);
        var split = [];

        while (line.length > maxLineLength) {
            var lastSpaceIndex = line.substr(0, maxLineLength + 1).lastIndexOf(' ');
            var firstSpaceIndex = line.indexOf(' ');

            if (lastSpaceIndex === -1) {
                if (firstSpaceIndex === -1) {
                    break;
                }
                lastSpaceIndex = firstSpaceIndex;
            }
            split.push(prefix + line.substring(0, lastSpaceIndex));
            line = line.substring(lastSpaceIndex + 1);

            if (indentation) {
                maxLineLength -= indentation.length;
                prefix = indentation;
                indentation = '';
            }
        }
        split.push(prefix + line);
        return split;
    };
    return {
        format: (commitMessage, ignore) => {
            if (!commitMessage || (utils.isString(commitMessage) && utils.isGeneratedMessage(commitMessage))) return commitMessage;
            if (!Array.isArray(commitMessage)) commitMessage = commitMessage.split('\n');
            if (!ignore) ignore = [];

            var previousLine = '';
            var preparedLines = [];
            var preparedIgnore = [];
            commitMessage.forEach((line, index) => {
                var row = index + 1;
                if (ignore.includes(row)) {
                    preparedLines.push(line);
                    preparedIgnore.push(row);
                    return;
                }

                var trimmed = line.trim();
                if (!trimmed || !previousLine || row === 2 || isComment(trimmed) || isEnumeration(trimmed) || ignore.includes(row - 1)) {
                    preparedLines.push(trimmed);
                } else {
                    preparedLines[preparedLines.length - 1] += ' ' + trimmed;
                }
                previousLine = trimmed;
            });

            var formattedLines = [];
            var formattedIgnores = [];
            preparedLines.forEach((line, index) => {
                var row = index + 1;
                if (preparedIgnore.includes(row)) {
                    formattedLines.push(line);
                    formattedIgnores.push(formattedLines.length);
                } else if (!line || isComment(line) || row === 1) {
                    formattedLines.push(line);
                } else {
                    if (row === 2 && line) {
                        formattedLines.push('');
                    }
                    splitLine(line).forEach((splitLine) => {
                        formattedLines.push(splitLine);
                    });
                }
            });

            ignore.splice(0, ignore.length);
            utils.pushAll(ignore, formattedIgnores);
            return formattedLines.join('\n');
        }
    }
};
