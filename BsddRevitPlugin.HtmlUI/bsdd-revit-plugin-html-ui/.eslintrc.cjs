module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'simple-import-sort', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  'no-param-reassign': ['error', { props: false }],
};
