import http from 'http';
import dotenv from 'dotenv';

import Controller from './controller';
import { getReqData } from './utils';
import {
  EMPTY_URL_ERROR,
  NO_ENDPOINT_ERROR,
  SUCCESSFUL_DELETION_MESSAGE
} from './constants';
import { MyError } from './models';

dotenv.config();
const PORT = Number(process.env.PORT) || 4000;

const controller = new Controller();

export const startServer = () => {
  return http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const url = req.url;

    try {
      if (!url || url === '/') {
        throw new MyError(404, EMPTY_URL_ERROR);
      } else if (
        (url === '/api/users' || url === '/api/users/') &&
        req.method === 'GET'
      ) {
        const users = await controller.getUsers();

        res.writeHead(200);
        res.end(JSON.stringify(users));
      } else if (
        (url === '/api/users' || url === '/api/users/') &&
        req.method === 'POST'
      ) {
        const userData = await getReqData(req);
        const newUser = await controller.createUser(userData);

        res.writeHead(201);
        res.end(JSON.stringify(newUser));
      } else if (url.match(/\/api\/users\/*/) && req.method === 'GET') {
        const id = url.split('/')[3];
        const user = await controller.getUser(id);

        res.writeHead(200);
        res.end(JSON.stringify(user));
      } else if (url.match(/\/api\/users\/*/) && req.method === 'PUT') {
        const id = url.split('/')[3];
        const userData = await getReqData(req);

        const updatedUser = await controller.updateUser(id, userData);

        res.writeHead(200);
        res.end(JSON.stringify(updatedUser));
      } else if (url.match(/\/api\/users\/*/) && req.method === 'DELETE') {
        const id = url.split('/')[3];

        await controller.deleteUser(id);

        res.writeHead(204);
        // If the status code is 204, the message is not sent.
        res.end(JSON.stringify({ message: SUCCESSFUL_DELETION_MESSAGE }));
      } else {
        throw new MyError(404, NO_ENDPOINT_ERROR);
      }
    } catch (error) {
      res.writeHead((error as MyError).status);
      res.end(JSON.stringify(error));
    }
  });
};

const server = startServer();
server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
