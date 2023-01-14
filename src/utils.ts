import { IncomingMessage } from 'node:http';

export const getReqData = (req: IncomingMessage) => {
  return new Promise((resolve, reject) => {
    try {
      // req.setEncoding('utf-8');
      let data = '';
      req.on('data', (chunk) => {
        data += chunk;
      });
      req.on('end', () => {
        data = JSON.parse(data);
        resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
};
