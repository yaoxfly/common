import { fileURLToPath } from 'url'
import path from 'path'
import { existsSync } from 'fs'
const filename = fileURLToPath(import.meta.url)
export const dirname = path.dirname(filename)
export const resolve = (...file): string => path.resolve(dirname, ...file)

interface PackageManager {
  get: () => string
  directive: (plugins: string, position: string) => string
  hasWorkspace: () => { value: boolean, type: string }
}

/** @description According to the package manager, get the command to download the package
   * @author yx
   * @example
   *  const { directive } =packageManager()
   *  directive('lint-staged', '-D'),
 */

export const packageManager = (): PackageManager => {
  const get = (): string => {
    let packageManager = 'npm'
    if (existsSync('yarn.lock')) {
      packageManager = 'yarn'
    }
    if (existsSync('pnpm-lock.yaml')) {
      packageManager = 'pnpm'
    }
    return packageManager
  }

  const hasWorkspace = (): { value: boolean, type: string } => {
    let hasWorkspace = { value:false, type:'' }
    if (existsSync('pnpm-workspace.yaml')) {
      hasWorkspace = { value:true, type:'pnpm' }
    }
    return hasWorkspace
  }

  const directive = (plugins: string, position: string): string => {
    let directive = `npm i ${plugins} ${position}`
    const packageManager = get()
    if (packageManager !== 'npm') {
      directive = `${packageManager} add ${plugins} ${position}`
    }
    if (existsSync('pnpm-workspace.yaml')) {
      directive = `pnpm add ${plugins} ${position}w`
    }
    return directive
  }
  return { get, directive, hasWorkspace }
}
