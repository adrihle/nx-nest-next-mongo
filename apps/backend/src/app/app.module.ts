import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CatModule } from './cat/cat.module';

const DB_CHAIN = '';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(DB_CHAIN),
    UsersModule,
    CatModule
  ],
})
export class AppModule {}
