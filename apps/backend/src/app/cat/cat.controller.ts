import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CatDTO } from "./cat.schema";
import { CatService } from "./cat.service";

@Controller('cats')
export class CatController {
    constructor(
        private readonly service: CatService
    ){};

    @Get()
    async getUsers() {
        return this.service.get();
    };

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return this.service.getById(id);
    };

    @Post()
    async createUser(@Body() cat: CatDTO) {
        return this.service.create(cat);
    };

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() cat: CatDTO) {
        return this.service.update(id, cat);
    };

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return this.service.delete(id);
    }
}