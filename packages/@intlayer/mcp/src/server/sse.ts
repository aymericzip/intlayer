#!/usr/bin/env node

import { randomUUID } from 'node:crypto';
import dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';
import { loadServer, type McpServer } from './server';

const app = express();
const env = app.get('env');

dotenv.config({
  path: [`.env.${env}.local`, `.env.${env}`, '.env.local', '.env'],
  quiet: true,
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, mcp-session-id');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  next();
});

app.use(express.json());
const router = express.Router();

const sessions = new Map<string, McpServer>();

router.post('/', async (req: Request, res: Response) => {
  const sessionId = req.headers['mcp-session-id'] as string | undefined;

  let server: McpServer;
  let currentSessionId: string;

  if (sessionId && sessions.has(sessionId)) {
    server = sessions.get(sessionId)!;
    currentSessionId = sessionId;
  } else if (!sessionId) {
    currentSessionId = randomUUID();
    server = loadServer({ isLocal: false });
    sessions.set(currentSessionId, server);
    res.setHeader('mcp-session-id', currentSessionId);
  } else {
    res.status(400).send({ messages: 'Bad session id.' });
    return;
  }

  try {
    const response = await server.handleMessage(req.body);
    if (response !== null && response !== undefined) {
      res.json(response);
    } else {
      res.status(202).end();
    }
  } catch (error) {
    res.status(500).json({
      jsonrpc: '2.0',
      id: req.body?.id ?? null,
      error: { code: -32000, message: 'Internal server error' },
    });
  }
});

router.get('/', (req: Request, res: Response) => {
  const sessionId = req.headers['mcp-session-id'] as string | undefined;
  if (!sessionId || !sessions.has(sessionId)) {
    res.status(400).send({ messages: 'Bad session id.' });
    return;
  }
  res.status(200).end();
});

router.delete('/', (req: Request, res: Response) => {
  const sessionId = req.headers['mcp-session-id'] as string | undefined;
  if (!sessionId || !sessions.has(sessionId)) {
    res.status(400).send({ messages: 'Bad session id.' });
    return;
  }
  sessions.delete(sessionId);
  res.status(200).end();
});

app.use('/', router);
app.use('/health', (_req: Request, res: Response) => {
  res.send('OK');
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.info(`MCP Streamable HTTP Server listening on port ${PORT}`);
});
