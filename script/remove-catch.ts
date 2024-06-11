import path from 'node:path'
import { consola } from 'consola'
import fs from 'fs-extra'

export async function isExists(path: string) {
  return await fs.pathExists(path)
}

export async function remove(filePath: string) {
  const files = fs.readdirSync(filePath)
  for (let i = 0; i < files.length; i++) {
    const newPath = path.join(filePath, files[i])
    const stat = fs.statSync(newPath)
    if (stat.isDirectory())
      remove(newPath)
    else
      fs.unlinkSync(newPath)
  }
  fs.rmdirSync(filePath)
}

const currentPath = path.resolve(process.cwd(), './.parcel-cache')

isExists(currentPath).then((exists: boolean) => {
  if (exists) {
    consola.info('start remove...')
    consola.info('删除上次缓存', currentPath)

    remove(currentPath).then(() => {
      consola.success('success!')
    })
  }
  else {
    consola.info('无缓存文件.')
  }
})
