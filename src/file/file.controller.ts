import {
  Controller,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileService } from './file.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('Files')
@ApiBearerAuth('JWT-auth')
@Controller('files')
export class FileController {
  constructor(private readonly FileService: FileService) {}
  @Post()
  @Auth('user')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder?: string
  ) {
    return await this.FileService.saveFiles([file], folder)
  }
}
