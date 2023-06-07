import { shellExec, readFile } from '@yaoxfly/node-utils'
import { existsSync, writeFile, readFileSync, writeFileSync } from 'fs'
import { resolve, packageManager } from './utils.js'
import inquirer from 'inquirer'
export const downLoad = async (option): Promise<void> => {
  const param = [
    {
      type: 'checkbox',
      message: 'Please select below the language you wish to the config with',
      name: 'select',
      default: ['husky', 'lintStaged', 'commitlint', 'commitizen'],
      choices: [
        { name:' husky', value:'husky' },
        { name:' lint-staged', value:'lintStaged' },
        { name:' @commitlint/cli @commitlint/config-conventional ', value:'commitlint' },
        { name:' commitizen cz-customizable commitlint-config-cz ', value:'commitizen' }
      ]
    }
  ]
  const answers = await inquirer.prompt(param)
  const { select } = answers || {}
  const keyMap = {
    husky,
    lintStaged,
    commitlint,
    commitizen
  }

  const language = await getLanguage(option)
  for (const element of select) {
    await keyMap[element](language)
  }
}

const getLanguage = async (option): Promise<string> => {
  const { lang } = option || {}
  if (lang) {
    return lang
  }
  const param = [
    {
      type: 'list',
      message: 'Please select below the language you wish to the config with',
      name: 'language',
      default: 'English',
      choices: [{ name:'English', value:'English' }, { name:'中文(简体)', value:'zh-hans' }]
    }
  ]
  const answers = await inquirer.prompt(param)
  const { language } = answers || {}
  return language
}

/** @description  Git hooks
 * @author yx
 */
const husky = async (): Promise<void> => {
  await shellExec({
    directive: 'npx husky-init',
    cwd: '',
    loading: 'Downloading husky ...',
    log: '',
    succeed: 'Downloading husky successful'
  })

  const common = readFileSync(resolve('../../husky/common.sh'))
  const preCommit = readFileSync(resolve('../../husky/pre-commit'))
  if (existsSync('.husky')) {
    writeFile('./.husky/common.sh', common, 'utf8', (err) => {
      if (err) {
        console.log(err)
      }
    })
    writeFile('./.husky/pre-commit', preCommit, 'utf8', (err) => {
      if (err) {
        console.log(err)
      }
    })
  } else {
    console.log('.husky not Exist！')
  }
}

/** @description  Perform code quality verification on the code in the temporary storage area
 * @author yx
 */
const lintStaged = async (): Promise<void> => {
  const { get, directive, hasWorkspace } = packageManager()
  await shellExec({
    directive:directive('lint-staged', '-D'),
    cwd: '',
    loading: 'Downloading lint-staged ...',
    log: '',
    succeed: 'Downloading lint-staged successful'
  }).then(() => {
    const packageJsonData = readFile('package.json')
    Object.assign(packageJsonData, {
      'lint-staged': {
        '*.{js,ts,jsx,tsx,vue}': [
          hasWorkspace().value ? 'pnpm --parallel lint' : `${get()} run lint`
        ]
      },
      husky: {
        hooks: {
          'pre-commit': 'lint-staged'
        }
      }
    })
    writeFileSync('package.json', JSON.stringify(packageJsonData, null, 2))
  })
}

/** @description  commit content verification
 * @author yx
 */
const commitlint = async (): Promise<void> => {
  const { directive } = packageManager()
  await shellExec({
    directive:directive('@commitlint/cli @commitlint/config-conventional', '-D'),
    cwd: '',
    loading: 'Downloading commitlint ...',
    log: '',
    succeed: 'Downloading commitlint successful'
  })

  const file = '.commitlintrc.json'
  const content = readFileSync(resolve('../../commitlint/.commitlintrc.json'))
  writeFile(file, content, 'utf8', (err) => {
    if (err) {
      console.log(err)
    }
  })

  const commitMsg = readFileSync(resolve('../../husky/commit-msg'))
  if (existsSync('.husky')) {
    writeFile('./.husky/commit-msg', commitMsg, 'utf8', (err) => {
      if (err) {
        console.log(err)
      }
    })
  } else {
    console.log('.husky not Exist！')
  }
}

/** @description  commit content verification
 * @author yx
 */
const commitizen = async (language): Promise<void> => {
  const { directive } = packageManager()
  // @commitlint/cz-commitlint
  await shellExec({
    directive:directive('commitizen cz-customizable commitlint-config-cz', '-D'),
    cwd: '',
    loading: 'Downloading commitizen ...',
    log: '',
    succeed: 'Downloading commitizen successful'
  }).then(() => {
    const packageJsonData = readFile('package.json')
    Object.assign(packageJsonData.scripts, {
      commit: 'git-cz'
    })
    const file = '.cz.config.json'
    Object.assign(packageJsonData, {
      config: {
        commitizen: {
          path: 'node_modules/cz-customizable'
        },
        'cz-customizable': {
          config: file
        }
      }
    })
    writeFileSync('package.json', JSON.stringify(packageJsonData, null, 2))
    const content = readFileSync(resolve(`../../commitlint/${language === 'zh-hans' ? '.cz.config-zh-hans.json' : file}`))
    writeFile(file, content, 'utf8', (err) => {
      if (err) {
        console.log(err)
      }
    })
  })
}
