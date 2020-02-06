module.exports = {
    "env": {
      "browser": true,
      "es6": true,
      "jest": true,
      "node": true
    },
    "extends": [
      "react-app",
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:prettier/recommended"
    ],
    "plugins": [
      "import"
    ],
    "rules": {
      "import/newline-after-import": 2,
      "import/no-duplicates": 2,
      "prettier/prettier": ["error", { "singleQuote": false }]
    }
  }
