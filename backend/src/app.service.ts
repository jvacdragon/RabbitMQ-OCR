import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import sendToQeue from './Helper/sender.js'
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

    try{

      const data = {
        imagem: base64Image,
        status: 'PENDING'
      }

      const dataCreated = await this.prisma.imagemProcessada.create({
        data: data,
      });

      sendToQeue(dataCreated)
      console.log("imagem enviada")
      
    }catch(e){
      console.log("Erro ao salvar dado: ", e.message)
    }

    /*
    const response = await firstValueFrom(
      this.httpService.post('http://localhost:5000/ocr', {
        file: base64Image,
      }),
    );
    */

    return;
  }
}
