module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', 'jsx', '*.vue'],
      parserOptions: {
        project: 'tsconfig.json'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'standard-with-typescript'
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/prefer-nullish-coalescing': 0,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/key-spacing': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/ban-ts-comment': 0

  }
}
