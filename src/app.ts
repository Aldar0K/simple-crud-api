import http from 'node:http';

import Controller from './controller';
import { getReqData } from './utils';
import { EMPTY_URL_ERROR } from './constants';
import { MyError, IError } from './models';

const PORT = process.env.PORT || 4000;
const controller = new Controller();

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const url = req.url;

  if (!url || url === '/') {
    res.writeHead(404);
    res.end(
      JSON.stringify({
        error: EMPTY_URL_ERROR
      })
    );
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
    try {
      const userData = await getReqData(req);
      const newUser = await controller.createUser(userData);

      res.writeHead(200);
      res.end(JSON.stringify(newUser));
    } catch (error) {
      console.log(error);
    }
  } else if (url.match(/\/api\/users\/*/) && req.method === 'GET') {
    try {
      const id = url.split('/')[3];
      const user = await controller.getUser(id);

      res.writeHead(200);
      res.end(JSON.stringify(user));
    } catch (error) {
      res.writeHead((error as MyError).status);
      res.end(JSON.stringify({ message: (error as MyError).message }));
    }
  } else if (url.match(/\/api\/users\/*/) && req.method === 'PUT') {
    try {
      const id = url.split('/')[3];
      const userData = await getReqData(req);

      const updatedUser = await controller.updateUser(id, userData);
    } catch (error) {
      console.log(error);
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
