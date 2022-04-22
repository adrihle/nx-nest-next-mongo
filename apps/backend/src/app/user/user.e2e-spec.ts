import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { UserDTO } from './user.dto';
import { UsersModule } from './user.module';

const BASE_URL = '/users'

describe('User controller e2e', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const fixture: TestingModule = await Test.createTestingModule({
            imports: [UsersModule, AppModule],
        }).compile();

        app = fixture.createNestApplication();

        return app.init();
    });

    it('User CRUD Flow', async () => {
        const server = request(app.getHttpServer());
        const { body: fetchedUserList } = await server.get(BASE_URL).expect(200);

        const newUser: UserDTO = {
            name: 'Julia',
        };

        const { body: createUserResponse } = await server.post(BASE_URL).type('form').send(newUser).expect(201);

        const { name: createdUserName, id: createdUserId }: UserDTO = createUserResponse;

        expect(createdUserName).toBe(newUser.name);

        const { body: getUsersResponse } = await server.get(BASE_URL).expect(200);

        const fetchedUserListAfterPost: UserDTO[] = getUsersResponse;

        expect(fetchedUserListAfterPost.length).toBe(fetchedUserList.length + 1);

        const URL_QUERY = `${BASE_URL}/${createdUserId}`;

        const { body: { name: getUserByIdResponseName } } = await server.get(URL_QUERY).expect(200);

        expect(getUserByIdResponseName).toBe(createdUserName);

        const updateUser: UserDTO = {
            id: createdUserId,
            name: 'Amaya'
        }

        const { body: { id: updatedUserIdResponse } } = await server.put(URL_QUERY).type('form').send(updateUser).expect(200);

        expect(updatedUserIdResponse).toBe(updateUser.id);

        await server.delete(URL_QUERY).expect(200);

    });
});