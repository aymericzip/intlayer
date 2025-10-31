#!/usr/bin/env node

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { loadServer } from './server';

const server = loadServer({ isLocal: true });

const main = async () => {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('Intlayer MCP Server running on stdio');
};

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
