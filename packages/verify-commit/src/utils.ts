import { fileURLToPath } from 'url'
import path from 'path'
const filename = fileURLToPath(import.meta.url)
export const dirname = path.dirname(filename)
export const resolve = (...file): string => path.resolve(dirname, ...file)
