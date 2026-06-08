#!/usr/bin/env node

import * as readline from 'node:readline';
import { loadServer, type McpServer, type McpTransport } from './server';

class StdioTransport implements McpTransport {
  async start(server: McpServer): Promise<void> {
    const rl = readline.createInterface({
      input: process.stdin,
      terminal: false,
    });

    const send = (message: any) => {
      process.stdout.write(`${JSON.stringify(message)}\n`);
    };

    rl.on('line', async (line) => {
      const trimmed = line.trim();
      if (!trimmed) return;
      try {
        const message = JSON.parse(trimmed);
        const response = await server.handleMessage(message);
        if (response !== null && response !== undefined) {
          send(response);
        }
      } catch {
        send({
          jsonrpc: '2.0',
          id: null,
          error: { code: -32700, message: 'Parse error' },
        });
      }
    });

    console.error('Intlayer MCP Server running on stdio');

    await new Promise<void>((resolve) => {
      rl.on('close', resolve);
    });
  }
}

const server = loadServer({ isLocal: true });

const main = async () => {
  const transport = new StdioTransport();
  await server.connect(transport);
};

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
