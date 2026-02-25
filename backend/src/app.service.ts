import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import FormData from 'form-data';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async sendImageToOCR(file: Express.Multer.File) {
    const base64Image = file.buffer.toString('base64');

    /*
     const response = await firstValueFrom(
      this.httpService.post(
        'http://localhost:5000/ocr',
        {
          image: base64Image,
          filename: file.originalname,
          mimetype: file.mimetype,
          size: file.size
        }
      )
    );
    */
    return {
      image: base64Image,
    };
  }
}
