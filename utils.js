/**
 * utils.js
 */
var BREAK = Symbol('break');

var utils = {
    isEmpty: (text) => text.trim().length === 0,
    isFunction: (o) => typeof o === 'function',
    isRegExp: (o) => o instanceof RegExp,
    isString: (o) => typeof o === 'string' || o instanceof String,
    isWord: (word) => word.match(/^[A-Za-z][a-z]*$/),
    pushAll: (a1, a2) =>  a1.push.apply(a1, a2),
    toArray: (o) => {
        if (o === undefined) {
            return [];
        } else if (Symbol.iterator in o) {
            return Array.from(o);
        } else {
            return [o];
        }
    },
    startsWithLowerCase: (word) => word.match(/^[a-z]/),
    getFirstWord: (line) => line.trim().split(/\s+/)[0],
    getFlags: (regex) => (regex.ignoreCase ? 'i' : '') + (regex.multiline ? 'm' : '') + (regex.global ? 'g' : ''),
    forEachMatch: (against, text, callback) => {
        if (!against || !text || !callback) return;
        against = utils.toArray(against);

        var match;
        for (var a of against) {
            var source;
            var flags = 'g';
            if (utils.isString(a)) {
                source = a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            } else if (utils.isRegExp(a)) {
                source = a.source;
                flags += utils.getFlags(a);
            } else {
                throw new Error('Cannot create a RegExp from a non-string or non-regexp');
            }
            var regexp = new RegExp(source, flags);
            while ((match = regexp.exec(text)) !== null) {
                if (callback) {
                    if (callback(match) === BREAK) {
                        return;
                    }
                }
            }
        }
    },
    someStartsWith: (against, text, callback) => {
        var startsWith = false;
        utils.forEachStartsWith(against, text, function() {
            if (callback) {
                callback.apply(callback, arguments);
            }
            startsWith = true;
            return BREAK;
        });
        return startsWith;
    },
    forEachStartsWith: (against, text, callback) => {
        if (!against || !text || !callback) return;
        against = utils.toArray(against).map((a) => {
            var source;
            var flags = '';
            if (utils.isString(a)) {
                source = a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            } else if (utils.isRegExp(a)) {
                source = a.source;
                flags = utils.getFlags(a);
            } else {
                throw new Error('Cannot create a RegExp from a non-string or non-regexp');
            }
            return new RegExp('^' + source, flags);
        });
        utils.forEachMatch(against, text, callback);
    },
    isGeneratedMessage: (commitMessage) => {
        return commitMessage.match(/^Merge pull request #[0-9]+/) || commitMessage.match(/^Revert /)
    }
};
module.exports = utils;
