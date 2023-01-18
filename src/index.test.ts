import supertest from 'supertest';
import { v4 as uuidv4, validate } from 'uuid';
import { startServer } from '.';
import { DEFAULT_PORT, BASE_URL } from './constants';

const server = startServer();

describe('Scenario 1 - Get all records with a GET api/users', () => {
  // const response = supertest(server);

  it('should return an empty array', async () => {
    const response = await supertest(server).get(BASE_URL);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});
