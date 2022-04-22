import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {Model} from 'mongoose';
import { CAT_SCHEMA_NAME, CatDTO } from "./cat.schema";

@Injectable()
export class CatService {

    constructor(
        @InjectModel(CAT_SCHEMA_NAME) private readonly catModel: Model<CatDTO>
    ){};

    public async get(): Promise<CatDTO[]> {
        return this.catModel.find();
    };

    public async getById(id: string): Promise<CatDTO> {
        return this.catModel.findById(id);
    };

    public async create(cat: CatDTO) {
        const newCat = new this.catModel({
            name: cat.name
        });
        await newCat.save();
        return newCat;
    };

    public async update(id: string, cat: CatDTO): Promise<CatDTO> {
        return this.catModel.findByIdAndUpdate(id, cat);
    };

    public async delete(id: string) {
        await this.catModel.findByIdAndRemove(id);
    }
}