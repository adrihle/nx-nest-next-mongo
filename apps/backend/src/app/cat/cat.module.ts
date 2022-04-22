
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatController } from './cat.controller';
import { CatSchema, CAT_SCHEMA_NAME } from './cat.schema';
import { CatService } from './cat.service';

@Module({
    imports: [MongooseModule.forFeature([{name: CAT_SCHEMA_NAME, schema: CatSchema}])],
    controllers: [CatController],
    providers: [CatService],
    exports: [CatService]
})
export class CatModule { }