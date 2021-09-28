module.exports = {
  extends: [
    'airbnb',
  ],
  parser: 'babel-eslint',
  rules: {
    'max-len': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'react/jsx-boolean-value': 0,
    'react/jsx-tag-spacing': 0,
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0,
    'react/no-array-index-key': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: [
          '.js',
          '.jsx',
        ],
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/anchor-has-content': 0,
    'no-param-reassign': 'off',
    'jsx-a11y/label-has-for': [
      2,
      {
        components: [
          'Label',
        ],
        required: {
          every: [
            'nesting',
            'id',
          ],
        },
        allowChildren: true,
      },
    ],
  },
  globals: {
    window: true,
    document: true,
    navigator: true,
    Stats: true,
  },
  env: {
    es6: true,
    node: true,
  },
};