import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PartsModule } from './schemas/parts/parts.module';
import { PartsService } from './schemas/parts/parts.service';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    AuthModule, 
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    PartsModule,
    MongooseModule.forRoot('mongodb://localhost/part')
  ],
})
export class AppModule {}
