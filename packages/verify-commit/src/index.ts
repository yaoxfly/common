#!/usr/bin/env node
import { Command } from 'commander'
import { createRequire } from 'module'
import { downLoad } from './download.js' // 在ESM模块导入中，不能再忽略文件扩展名。对于typescript文件，扩展名应始终为.js/.jsx
const require = createRequire(import.meta.url)
const pkg = require('../package.json')
const program = new Command()
program
  .version(pkg.version)
  .name('yx-verify-commit')

program
  .command('download').alias('d')
  .option('-l --lang <language-name>', 'Please enter an language')
  .description('download verify commit')
  .action((option) => {
    void downLoad(option)
  })

program.parse(process.argv)
