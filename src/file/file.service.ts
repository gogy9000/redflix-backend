import { Injectable } from '@nestjs/common'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import { IFileResponse } from './IFileResponse'

@Injectable()
export class FileService {
  async saveFiles(
    files: Express.Multer.File[],
    folder: string = 'default'
  ): Promise<IFileResponse[]> {
    const uploadsFolder = `${path}/uploads/${folder}`
    await ensureDir(uploadsFolder)
    return await Promise.all(
      files.map(async (file) => {
        await writeFile(`${uploadsFolder}/${file.originalname}`, file.buffer)
        return {
          url: `/uploads/${uploadsFolder}/${file.originalname}`,
          name: file.originalname,
        }
      })
    )
  }
}
