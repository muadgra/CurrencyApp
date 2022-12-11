import { CacheModule, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PartsModule } from './schemas/parts/parts.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    AuthModule, 
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    PartsModule,
    MongooseModule.forRoot('mongodb://localhost/part'),
    CacheModule.register({ isGlobal: true })
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ]
})
export class AppModule {}
