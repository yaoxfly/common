import { shellExec } from '@yaoxfly/node-utils'
import { existsSync, writeFile, readFileSync } from 'fs'
import { resolve } from './utils.js'
export const downLoad = async (): Promise<void> => {
  await shellExec({
    directive: 'npx husky-init',
    cwd: '',
    loading: 'Downloading Husky ...',
    log: '',
    succeed: 'successful'
  })

  // const content = `command_exists () {
  //   command -v "$1" >/dev/null 2>&1
  // }

  // # Workaround for Windows 10, Git Bash and Yarn
  // if command_exists winpty && test -t 1; then
  //   exec < /dev/tty
  // fi`
  const content = readFileSync(resolve('../../sh/common.sh'))
  if (existsSync('.husky')) {
    writeFile('./.husky/common.sh', content, 'utf8', (err) => {
      if (err) {
        console.log(err)
      }
    })
  } else {
    console.log('.husky not Exist！')
  }
}
