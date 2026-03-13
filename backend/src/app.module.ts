import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [HttpModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}