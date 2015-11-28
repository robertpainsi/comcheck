/**
 * indicator-tester.js
 */
var utils = require('./utils');
var toRegex = (o) => (o instanceof RegExp) ? o : new RegExp(o.toString(), 'i');
var toIndicator = (o) => {
    if (utils.isString(o)) {
        o = {include: o};
    }
    if (utils.isString(o.include)) {
        o.include = toRegex(o.include, 'i');
    }
    if (utils.isString(o.exclude)) {
        o.exclude = toRegex(o.exclude, 'i');
    }
    return o;
};

module.exports = (indicators) => {
    var mappedIndicators = indicators.map(toIndicator);
    return {
        test: (text) => {
            var result = false;
            mappedIndicators.some((indicator) => {
                var include = indicator.include;
                var exclude = indicator.exclude;
                if (include && include.test(text) && (!exclude || !exclude.test(text))) {
                    result = true;
                    return true;
                }
            });
            return result;
        }
    }
};
