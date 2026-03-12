import { URL } from 'node:url';
import type { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import type { Transport } from '@modelcontextprotocol/sdk/shared/transport.js';
import { loadClient } from './client';

class SSEClient {
  private client: Client;
  private transport: Transport | null = null;
  private isCompleted = false;

  constructor() {
    this.client = loadClient();
  }

  async connectToServer() {
    const mcpServerURL = process.env.MCP_SERVER_URL ?? 'http://localhost:3000/';

    const url = new URL(mcpServerURL);
    try {
      console.info(`Connecting to server - ${mcpServerURL}`);
      this.transport = new StreamableHTTPClientTransport(url);
      await this.client.connect(this.transport);
      console.info('Connected to MCP server');

      this.setUpTransport();
    } catch (e) {
      console.error('Failed to connect to MCP server: ', e);
      throw e;
    }
  }

  private setUpTransport() {
    if (this.transport === null) return;

    this.transport.onclose = () => {
      console.info('Transport closed.');
      this.isCompleted = true;
    };

    this.transport.onerror = async (error) => {
      console.error('Transport error: ', error);
      await this.cleanup();
    };

    this.transport.onmessage = (message) => {
      console.info('Message received: ', message);
    };
  }

  async waitForCompletion() {
    while (!this.isCompleted) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  async cleanup() {
    if (this.transport) {
      await this.client.close();
    }
  }
}

const main = async () => {
  const client = new SSEClient();
  try {
    await client.connectToServer();
    await client.waitForCompletion();
  } catch (error) {
    console.error(error);
  } finally {
    await client.cleanup();
  }
};

main();
