#!/usr/bin/env node

import { randomUUID } from 'node:crypto';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import dotenv from 'dotenv';
import Fastify from 'fastify';
import {
  CLIENT_ID_HEADER,
  CLIENT_SECRET_HEADER,
  getRequestContextFromHeaders,
} from './requestContext';
import { loadServer, type McpServer } from './server';

/** Idle MCP sessions are dropped after this delay. */
const SESSION_IDLE_TIMEOUT_MS = 60 * 60 * 1000;
/** Upper bound on concurrent sessions (oldest evicted first). */
const MAX_SESSIONS = 5000;

type StoredSession = { server: McpServer; lastUsedAt: number };

const startServer = async () => {
  const app = Fastify();

  const env = process.env.NODE_ENV || 'development';

  dotenv.config({
    path: [`.env.${env}.local`, `.env.${env}`, '.env.local', '.env'],
    quiet: true,
  });

  await app.register(fastifyHelmet, {
    contentSecurityPolicy: false,
    global: true,
  });

  await app.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'mcp-session-id',
      'Authorization',
      CLIENT_ID_HEADER,
      CLIENT_SECRET_HEADER,
    ],
  });

  // Sessions only hold the tool registry; credentials are read from every
  // request, never stored on the session.
  const sessions = new Map<string, StoredSession>();

  const sweepIdleSessions = () => {
    const idleBefore = Date.now() - SESSION_IDLE_TIMEOUT_MS;
    for (const [sessionId, session] of sessions) {
      if (session.lastUsedAt < idleBefore) sessions.delete(sessionId);
    }
  };

  setInterval(sweepIdleSessions, 5 * 60 * 1000).unref();

  app.post('/', async (request, reply) => {
    const sessionId = request.headers['mcp-session-id'] as string | undefined;

    let server: McpServer;
    let currentSessionId: string;

    const existingSession = sessionId ? sessions.get(sessionId) : undefined;

    if (sessionId && existingSession) {
      existingSession.lastUsedAt = Date.now();
      server = existingSession.server;
      currentSessionId = sessionId;
    } else if (!sessionId) {
      if (sessions.size >= MAX_SESSIONS) {
        const oldestSessionId = sessions.keys().next().value;
        if (oldestSessionId) sessions.delete(oldestSessionId);
      }
      currentSessionId = randomUUID();
      server = loadServer({ isLocal: false });
      sessions.set(currentSessionId, { server, lastUsedAt: Date.now() });
      reply.header('mcp-session-id', currentSessionId);
    } else {
      return reply.status(400).send({ messages: 'Bad session id.' });
    }

    try {
      const response = await server.handleMessage(
        request.body,
        getRequestContextFromHeaders(request.headers)
      );
      if (response !== null && response !== undefined) {
        return reply.send(response);
      }
      return reply.status(202).send();
    } catch (error) {
      return reply.status(500).send({
        jsonrpc: '2.0',
        id: (request.body as any)?.id ?? null,
        error: { code: -32000, message: ['Internal server error', error] },
      });
    }
  });

  app.get('/', async (_request, reply) => {
    return reply.status(200).send('OK');
  });

  app.delete('/', async (request, reply) => {
    const sessionId = request.headers['mcp-session-id'] as string | undefined;
    if (!sessionId || !sessions.has(sessionId)) {
      return reply.status(400).send({ messages: 'Bad session id.' });
    }
    sessions.delete(sessionId);
    return reply.status(200).send();
  });

  app.get('/health', async (_request, reply) => {
    return reply.send('OK');
  });

  const PORT = Number(process.env.PORT) || 3000;
  await app.listen({ port: PORT, host: '0.0.0.0' });
  console.info(`MCP Streamable HTTP Server listening on port ${PORT}`);
};

startServer();
