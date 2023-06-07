import { type PathOrFileDescriptor, readFileSync } from 'fs'
import ora from 'ora'
import { exec, execSync } from 'child_process'
import path from 'path'
import chalk from 'chalk'
import symbols from 'log-symbols'
import { fileURLToPath } from 'url'
/** @description 读取文件,并解析JSON。
 * @author yx
 * @param  {String}  filePath 文件路径
 */

interface ReadFile {
  scripts: string
}

export const readFile = (filePath: PathOrFileDescriptor): JSON & ReadFile => {
  const file = readFileSync(filePath)
  return JSON.parse(file.toString())
}

interface Config {
  directive?: string
  cwd?: string
  loading?: string
  log?: string
  succeed?: string
}

/** @description 执行shell指令，添加了提示，并返回promise。
 * @author yx
 * @param  {Object}  config 配置
 * @example
 * shellExec({
          directive: 'npm i',
          cwd: 'test',
          loading: 'loading...',
          log: `npm i`
          succeed:'succeed'
   })
 */
export const shellExec = async (config: Config): Promise<void> => {
  const { directive, cwd, loading, log, succeed } = config || {}
  await new Promise((resolve, reject) => {
    log && console.log(`\n ${log}`)
    const spinner = ora(loading)
    loading && spinner.start()
    // 标准输出或标准错误允许的最大数据量（单位字节）。 超出则子进程将终止并截断任何输出。
    exec(directive, { cwd, maxBuffer: 999999999 }, (error, stdout) => {
      if (error) {
        loading && spinner.fail()
        reject(error)
        return
      }
      resolve(stdout)
      loading && spinner.stop()
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      succeed && console.log(`\n ${symbols.success} ${chalk.green(succeed)}`)
    })
  })
}

/** @description 将路径或路径片段的序列解析为绝对路径(esm)
 * @author yx
 * @param  {string}  file 可多个路径
 */
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
export const resolve = (...file): string => path.resolve(dirname, ...file)

/** @description 是否有安装某个工具
 * @author yx
 * @example
 * cosnt has =hasPackage()
 * has('git')
   })
 */

export const hasPackage = (): (tool: string) => boolean => {
  const fn = (tool: string): boolean => {
    try {
      execSync(`${tool} --version`, { stdio: 'ignore' })
      return true
    } catch (e) {
      return false
    }
  }
  return fn
}

/** @description 提示
 * @author yx
 * @example
 * const successLog=log()
   const errorLog=log('error')
   successLog('******* SUCCESS!! *******')
   errorLog('******* error!! *******')
 */
interface Log {
  icon?: boolean
}
export const log = (type = 'success'): (text?: string, config?: Log) => void => {
  const fn = (text = '', config: Log = {}): void => {
    const { icon = true } = config || {}
    const keyMap = {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands, @typescript-eslint/restrict-template-expressions
      success: `${icon ? symbols.success + ' ' : ''}${chalk.green(text)}`,
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands, @typescript-eslint/restrict-template-expressions
      error:   `${icon ? symbols.error + ' ' : ''}${chalk.red(text)}`
    }
    console.log('\n', keyMap[type])
  }
  return fn
}

export const successLog = log()
export const errorLog = log('error')
