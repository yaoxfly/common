module.exports = {
  extends: ['@yaoxfly/eslint-config'],
  ignorePatterns: ['lib'],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        tsconfigRootDir: __dirname, // 当前目录下的.tsconfig.json,非根目录
        project: 'tsconfig.json'
      }
    }
  ]
}
