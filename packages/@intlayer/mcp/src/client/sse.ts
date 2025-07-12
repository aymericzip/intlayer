import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';
import { Transport } from '@modelcontextprotocol/sdk/shared/transport.js';
import { URL } from 'url';
import { loadClient } from './client';

class SSEClient {
  private client: Client;
  private transport: Transport | null = null;
  private isCompleted = false;

  constructor() {
    this.client = loadClient();
  }

  async connectToServer() {
    const mcpServerURL = process.env.MCP_SERVER_URL ?? 'http://localhost:3000';

    const url = new URL(mcpServerURL);
    try {
      this.transport = new SSEClientTransport(url);
      await this.client.connect(this.transport);
      console.info('Connected to server');

      this.setUpTransport();
    } catch (e) {
      console.info('Failed to connect to MCP server: ', e);
      throw e;
    }
  }

  private setUpTransport() {
    if (this.transport === null) {
      return;
    }
    this.transport.onclose = () => {
      console.info('SSE transport closed.');
      this.isCompleted = true;
    };

    this.transport.onerror = async (error) => {
      console.info('SSE transport error: ', error);
      await this.cleanup();
    };

    this.transport.onmessage = (message) => {
      console.info('message received: ', message);
    };
  }

  async waitForCompletion() {
    while (!this.isCompleted) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  async cleanup() {
    await this.client.close();
  }
}

const main = async () => {
  const client = new SSEClient();

  try {
    await client.connectToServer();
    await client.waitForCompletion();
  } finally {
    await client.cleanup();
  }
};

main();
