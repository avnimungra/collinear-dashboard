import fs from "fs"
import { Readable } from "stream"

const STORE_PATH = process.env.STORE_PATH || "./tmp/uploads"

export const storeFile = async (name: string, filePath: string) => {
  console.log("storing file:", filePath, "with name:", name)
  const fileStream = fs.createReadStream(filePath)
  const savePath = `${STORE_PATH}/${name}`
  const pipe = fileStream.pipe(fs.createWriteStream(savePath))
  return new Promise((resolve, reject) => {
    pipe.on("error", () => {
      reject()
    })
    pipe.on("close", () => {
      resolve()
    })
  })
}

export const getRandomFile = async (): Promise<Readable> => {
  console.log("getting random file")
  const files = await fs.promises.readdir(STORE_PATH)
  if (files.length === 0) {
    throw new Error("No files have been uploaded yet.")
  }
  const randomFileIndex = Date.now() % files.length
  const filePath = `${STORE_PATH}/${files[randomFileIndex]}`
  return fs.createReadStream(filePath)
}

export const init = async () => {
  console.log("initializing")
  try {
    const stats = await fs.promises.stat(STORE_PATH)
    if (stats.isDirectory()) {
      console.log("Storage directory is already created:", STORE_PATH)
      return
    }
    console.log('You have really big problems');
  } catch (error) {
    console.log("Storage directory created:", STORE_PATH)
    await fs.promises.mkdir(STORE_PATH)
    return
  }
}
init()
