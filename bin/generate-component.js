import { run } from "plop";
import path from 'path'

const url = new URL(import.meta.url)
const basePath = path.resolve(path.dirname(url.pathname), '..');

run({
  configPath: path.resolve(basePath, 'plopfile.mjs'),
})
