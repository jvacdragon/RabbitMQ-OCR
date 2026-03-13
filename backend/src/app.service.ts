import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import FormData from 'form-data';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private prisma: PrismaService,
  ) {}

  async sendImageToOCR(file: Express.Multer.File) {
    const base64Image = file.buffer.toString('base64');

    await this.prisma.imagemProcessada.create({
      data: {
        imagem: base64Image,
        status: 'PENDING',
      },
    });

    const response = await firstValueFrom(
      this.httpService.post('http://localhost:5000/ocr', {
        file: base64Image,
      }),
    );

    return response.data;
  }
}
