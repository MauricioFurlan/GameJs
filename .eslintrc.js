module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "jasmine": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {

        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
          "jsx": true
        }
        },
        "rules": {
          "semi": "error"
        }
};
