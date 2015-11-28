/**
 * checks.js
 */
var checks = new Map();
// TODO: Require all checks in checks folder automatically. How to work with browserify?
var tempChecks = [
    require('./checks/enumeration-indentation-check'),
    require('./checks/header-delimiter-check'),
    require('./checks/imperative-check'),
    require('./checks/line-length-check'),
    require('./checks/missing-body-check'),
    require('./checks/separate-body-from-header-check'),
    require('./checks/single-space-separator-check'),
    require('./checks/ticket-prefix-check'),
    require('./checks/unnecessary-newline-check'),
    require('./checks/unnecessary-whitespace-check'),
    require('./checks/upper-case-at-beginning-check'),
    require('./checks/improve-message-check')
];

tempChecks.forEach((check) => {
    checks.set(check.id, check);
});

module.exports = {
    ALL: 'core/*',
    get: (check) => checks.get(check),
    getAll: () => Array.from(checks.values())
};
