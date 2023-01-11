import http from 'node:http';
import Controller from './controller';
import { getReqData } from './utils';

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
  if (req.url === '/api/users' && req.method === 'GET') {
    // TODO move controller initialization outside server.
    const users = await new Controller().getUsers();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
