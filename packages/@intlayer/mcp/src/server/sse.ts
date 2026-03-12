#!/usr/bin/env node

import { randomUUID } from 'node:crypto';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';
import { loadServer } from './server';

const app = express();
const env = app.get('env');

dotenv.config({
  path: [`.env.${env}.local`, `.env.${env}`, '.env.local', '.env'],
  quiet: true,
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, mcp-session-id');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  next();
});

app.use(express.json());
const router = express.Router();

const transports: { [sessionId: string]: StreamableHTTPServerTransport } = {};

router.post('/', async (req: Request, res: Response) => {
  const sessionId = req.headers['mcp-session-id'] as string | undefined;

  let transport: StreamableHTTPServerTransport;

  if (sessionId && transports[sessionId]) {
    transport = transports[sessionId];
  } else if (!sessionId) {
    transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
    });
    transport.onclose = () => {
      if (transport.sessionId) {
        delete transports[transport.sessionId];
      }
    };
    const server = loadServer({ isLocal: false });
    await server.connect(transport);
  } else {
    res.status(400).send({ messages: 'Bad session id.' });
    return;
  }

  await transport.handleRequest(req, res, req.body);

  const newSessionId = transport.sessionId;
  if (newSessionId && !transports[newSessionId]) {
    transports[newSessionId] = transport;
  }
});

router.get('/', async (req: Request, res: Response) => {
  const sessionId = req.headers['mcp-session-id'] as string | undefined;

  if (!sessionId || !transports[sessionId]) {
    res.status(400).send({ messages: 'Bad session id.' });
    return;
  }

  await transports[sessionId].handleRequest(req, res);
});

router.delete('/', async (req: Request, res: Response) => {
  const sessionId = req.headers['mcp-session-id'] as string | undefined;

  if (!sessionId || !transports[sessionId]) {
    res.status(400).send({ messages: 'Bad session id.' });
    return;
  }

  await transports[sessionId].handleRequest(req, res);
});

app.use('/', router);
app.use('/health', (_req: Request, res: Response) => {
  res.send('OK');
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.info(`MCP Streamable HTTP Server listening on port ${PORT}`);
});
