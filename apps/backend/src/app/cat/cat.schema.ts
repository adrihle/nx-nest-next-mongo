import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from "@nestjs/swagger";
import { Document } from 'mongoose';

export const CAT_SCHEMA_NAME = 'Cat';

export type ICatDocument = CatDTO & Document;

@Schema()
export class CatDTO {
    @ApiProperty()
    _id?: string;

    @ApiProperty()
    @Prop()
    name: string;
};

export const CatSchema = SchemaFactory.createForClass(CatDTO);