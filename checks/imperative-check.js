/**
 * imperative-check.js
 */
var utils = require('../utils');

var IGNORE_WORDS = [];
var WORD_ENDINGS = ['s', 'ed'];
var NON_IMPERATIVE_WORDS = [];

var check = (config) => {
    return {
        visitHeader: (reporter, header) => {
            var firstWord = utils.getFirstWord(header.title);
            var lowerCaseFirstWord = firstWord.toLowerCase();
            if (utils.isWord(firstWord) && !IGNORE_WORDS.includes(lowerCaseFirstWord)) {
                if (NON_IMPERATIVE_WORDS.includes(lowerCaseFirstWord)) {
                    reporter.report(`Use imperative form`, {
                        text: firstWord,
                        row: header.row,
                        column: header.text.indexOf(header.title)
                    });
                } else {
                    WORD_ENDINGS.some((ending) => {
                        if (firstWord.toLowerCase().endsWith(ending)) {
                            reporter.report(`Use imperative form`, {
                                text: ending,
                                row: header.row,
                                column: header.text.indexOf(header.title) + firstWord.length - ending.length + 1
                            });
                            return true;
                        }
                    });
                }
            }
        }
    };
};
check.id = 'core/imperative-check';
module.exports = check;
