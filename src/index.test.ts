import supertest from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { startServer } from '.';
import { BASE_URL } from './constants';
import { CreateUserData, UpdateUserData, User } from './models';

const mockUser: User = {
  id: uuidv4(),
  username: 'test name',
  age: 42,
  hobbies: ['hobby1', 'hobby2']
};

const mockCreateUserData: CreateUserData = {
  username: 'test name',
  age: 42,
  hobbies: ['hobby1', 'hobby2']
};

const mockUpdateUserData: UpdateUserData = {
  username: 'new test name',
  age: 24,
  hobbies: ['hobby1', 'hobby2', 'hobby3', 'hobby4']
};

const server = startServer();

afterEach((done) => {
  server.close();
  done();
});

describe('Scenario 1 - Get all records with a GET api/users', () => {
  it('response should contain a body with an empty array', async () => {
    const response = await supertest(server).get(BASE_URL);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});

describe('Scenario 2 - A new object is created by a POST api/users request', () => {
  it('response should contain newly created record', async () => {
    const response = await supertest(server)
      .post(BASE_URL)
      .send(mockCreateUserData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      ...mockUser,
      id: expect.any(String)
    });
  });
});

describe('Scenario 3 - With a GET api/user/{userId} request, we try to get the created record by its id', () => {
  it('response should contain the created record', async () => {
    const createUserResponse = await supertest(server)
      .post(BASE_URL)
      .send(mockCreateUserData);

    const createdUserId = createUserResponse.body.id;

    const getUserResponse = await supertest(server).get(
      `${BASE_URL}/${createdUserId}`
    );

    expect(getUserResponse.statusCode).toBe(200);
    expect(getUserResponse.body).toStrictEqual({
      ...mockUser,
      id: createdUserId
    });
  });
});

describe('Scenario 4 - We try to update the created record with a PUT api/users/{userId} `request', () => {
  it('response should contain an updated object with the same id', async () => {
    const createUserResponse = await supertest(server)
      .post(BASE_URL)
      .send(mockCreateUserData);

    const createdUserId = createUserResponse.body.id;

    const updateUserResponse = await supertest(server)
      .put(`${BASE_URL}/${createdUserId}`)
      .send(mockUpdateUserData);

    expect(updateUserResponse.statusCode).toBe(200);
    expect(updateUserResponse.body).toEqual({
      ...mockUpdateUserData,
      id: createdUserId
    });
  });
});

describe('Scenario 5 - With a GET api/users/{userId} request, we are trying to get a deleted object by id', () => {
  it('response should contain a message saying that there is not such user in database', async () => {
    const createUserResponse = await supertest(server)
      .post(BASE_URL)
      .send(mockCreateUserData);

    const createdUserId = createUserResponse.body.id;

    await supertest(server).delete(`${BASE_URL}/${createdUserId}`);

    const deletedUserResponse = await supertest(server).get(
      `${BASE_URL}/${createdUserId}`
    );

    expect(deletedUserResponse.statusCode).toBe(404);
    expect(deletedUserResponse.body).toEqual({
      message: `User with id ${createdUserId} not found`,
      status: 404
    });
  });
});
