#!/usr/bin/env node

import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import dotenv from 'dotenv';
import express from 'express';
import { loadServer } from './server';

/*******************************/
/******* Server Set Up *******/
/*******************************/

const server = loadServer();

/*******************************/
/******* Express App Set Up *******/
/*******************************/

const app = express();

// Environment variables
const env = app.get('env');

dotenv.config({
  path: [`.env.${env}.local`, `.env.${env}`, '.env.local', '.env'],
});

// Enable CORS for development
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

/*******************************/
/******* SSE Transport Set Up *******/
/*******************************/

let transport: SSEServerTransport | null = null;

// SSE endpoint for establishing connection
app.get('/sse', (req, res) => {
  transport = new SSEServerTransport('/messages', res);
  server.connect(transport);
});

// Messages endpoint for client-to-server communication
app.post('/messages', (req, res) => {
  if (transport) {
    transport.handlePostMessage(req, res);
  } else {
    res.status(400).json({ error: 'No SSE connection established' });
  }
});

/*******************************/
/******* Health Check Endpoint *******/
/*******************************/

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    server: 'intlayer-mcp-sse',
    timestamp: new Date().toISOString(),
    endpoints: {
      sse: '/sse',
      messages: '/messages',
    },
  });
});

/*******************************/
/******* Server Start *******/
/*******************************/

const PORT = process.env.PORT ?? 3000;
const HOST = process.env.HOST ?? 'localhost';

const main = async () => {
  app.listen(PORT, () => {
    console.error(`Intlayer MCP SSE Server running on port ${PORT}`);
    console.error(`SSE endpoint: http://${HOST}:${PORT}/sse`);
    console.error(`Messages endpoint: http://${HOST}:${PORT}/messages`);
    console.error(`Health check: http://${HOST}:${PORT}/health`);
  });
};

main().catch((error) => {
  console.error('Fatal error starting SSE server:', error);
  process.exit(1);
});
