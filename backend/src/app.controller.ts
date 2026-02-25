import { AppService } from './app.service';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';

@Controller("upload")
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {

    if (!file) {
      return { error: "Nenhum arquivo enviado" };
    }

    const result = await this.appService.sendImageToOCR(file);

    return result;
  }
}