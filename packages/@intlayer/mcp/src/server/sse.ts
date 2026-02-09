#!/usr/bin/env node

import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';
import { loadServer } from './server';

const server = loadServer({ isLocal: false });
const app = express();
const env = app.get('env');

dotenv.config({
  path: [`.env.${env}.local`, `.env.${env}`, '.env.local', '.env'],
  quiet: true,
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  next();
});

app.use(express.json());
const router = express.Router();

const sessionIdGenerator = () => Math.random().toString(36).slice(2);
const transports: { [sessionId: string]: StreamableHTTPServerTransport } = {};

router.all('/', async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    const sessionId = sessionIdGenerator();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => sessionId,
    });
    transports[sessionId] = transport;
    res.on('close', () => {
      delete transports[sessionId];
    });
    await server.connect(transport);
    await transport.handleRequest(req, res);
  } else if (req.method === 'POST') {
    const sessionId = req.query.sessionId;
    if (typeof sessionId !== 'string') {
      res.status(400).send({ messages: 'Bad session id.' });
      return;
    }
    const transport = transports[sessionId];
    if (!transport) {
      res.status(400).send({ messages: 'No transport found for sessionId.' });
      return;
    }
    await transport.handleRequest(req, res, req.body);
  }
});

app.use('/', router);
app.use('/health', (_req: Request, res: Response) => {
  res.send('OK');
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.info(`MCP Streamable HTTP Server listening on port ${PORT}`);
});
