/**
 * default-config.js
 */

// TODO:
// All checks: Ignore/Adjust functionality
// Line length check: Hard coded resource enumeration

var createDefaultConfig = () => {
    return {
        headerLength: 50,
        lineLength: 72,
        commentChar: '#',
        enumeration: ['* ', '- ', /[0-9]+\. /, /\[[0-9]+\] /]
    };
};

module.exports = {
    create: (config) => {
        return Object.assign(createDefaultConfig(), config);
    }
};
