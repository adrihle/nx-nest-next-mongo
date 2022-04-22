import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { CatDTO } from './cat.schema';
import { CatModule } from './cat.module';

const BASE_URL = '/cats'

describe('Cat controller e2e', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const fixture: TestingModule = await Test.createTestingModule({
            imports: [
                CatModule, 
                AppModule
            ],
        }).compile();

        app = fixture.createNestApplication();

        return app.init();
    });

    it('Cat CRUD Flow', async () => {
        const server = request(app.getHttpServer());
        const { body: fetchedCatList } = await server.get(BASE_URL).expect(200);

        const newCat: CatDTO = {
            name: 'Michi',
        };

        const { body: createCatResponse } = await server.post(BASE_URL).type('form').send(newCat).expect(201);

        const { name: createdCatName, _id: createdCatId }: CatDTO = createCatResponse;

        expect(createdCatName).toBe(newCat.name);

        const { body: getCatsResponse } = await server.get(BASE_URL).expect(200);

        const fetchedCatListAfterPost: CatDTO[] = getCatsResponse;

        expect(fetchedCatListAfterPost.length).toBe(fetchedCatList.length + 1);

        const URL_QUERY = `${BASE_URL}/${createdCatId}`;

        const { body: { name: getCatByIdResponseName } } = await server.get(URL_QUERY).expect(200);

        expect(getCatByIdResponseName).toBe(createdCatName);

        const updateCat: CatDTO = {
            _id: createdCatId,
            name: 'Mini'
        }

        const { body: { _id: updatedCatIdResponse } } = await server.put(URL_QUERY).type('form').send(updateCat).expect(200);

        expect(updatedCatIdResponse).toBe(updateCat._id);

        await server.delete(URL_QUERY).expect(200);

    });
});