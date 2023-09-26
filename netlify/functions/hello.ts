// YOUR_BASE_DIRECTORY/netlify/functions/api.ts

import express, { Router } from 'express';
import serverless from 'serverless-http';

const api = express();

const router = Router();
router.get('./', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
  });

api.use('/hello/', router);

export const handler = serverless(api);
