module.exports = {
  root: true,
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended',
    'plugin:cypress/recommended'
  ],
  plugins: ['react', 'cypress'],
  parserOptions: {
    project: './tsconfig-eslint.json'
  },
  env: {
    'cypress/globals': true
  },
  rules: {
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'import/export': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error'
  }
}
