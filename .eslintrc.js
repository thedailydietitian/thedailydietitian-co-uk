module.exports = {
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:cypress/recommended',
  ],
  env: {
    browser: true,
    node: true,
    // "Enable all ECMAScript 6 features except for modules (this
    // automatically sets the ecmaVersion parser option to 6)."
    es6: true,
    jest: true,
  },
};
