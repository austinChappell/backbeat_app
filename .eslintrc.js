module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    'react/jsx-filename-extension': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/label-has-for': 0,
    'react/forbid-prop-types': 0,
    'no-param-reassign': 0,
    'no-restricted-globals': 0,
    'react/no-array-index-key': 0,
    'react/sort-comp': 0,
    'no-unneeded-ternary': 0,
    eqeqeq: 0,
  },
  globals: {
    document: true,
    fetch: true,
    window: true,
  },
};
