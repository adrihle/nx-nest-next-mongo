import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CatModule } from './cat/cat.module';

const DB_CHAIN = 'mongodb+srv://devapi:ctBTn8SStd1aWG2p@develop.xhstm.mongodb.net/ufounders?retryWrites=true&w=majority';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(DB_CHAIN),
    UsersModule,
    CatModule
  ],
})
export class AppModule {}
