module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "browser": true
    },
    "extends": [
        "standard"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "$": true
    },
    "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module"
    },
    "rules": {
        "no-tabs": ["error", { allowIndentationTabs: true }],
        "indent": ["error", "tab"]
    }
};
