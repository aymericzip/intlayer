#!/usr/bin/env node

import { randomUUID } from 'node:crypto';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import dotenv from 'dotenv';
import Fastify from 'fastify';
import { loadServer, type McpServer } from './server';

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
    allowedHeaders: ['Content-Type', 'mcp-session-id'],
  });

  const sessions = new Map<string, McpServer>();

  app.post('/', async (request, reply) => {
    const sessionId = request.headers['mcp-session-id'] as string | undefined;

    let server: McpServer;
    let currentSessionId: string;

    if (sessionId && sessions.has(sessionId)) {
      server = sessions.get(sessionId)!;
      currentSessionId = sessionId;
    } else if (!sessionId) {
      currentSessionId = randomUUID();
      server = loadServer({ isLocal: false });
      sessions.set(currentSessionId, server);
      reply.header('mcp-session-id', currentSessionId);
    } else {
      return reply.status(400).send({ messages: 'Bad session id.' });
    }

    try {
      const response = await server.handleMessage(request.body);
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
    reply.header('Allow', 'POST, DELETE');
    return reply.status(405).send();
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
