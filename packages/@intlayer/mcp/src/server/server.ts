import { readFileSync } from 'node:fs';
import { dirname as pathDirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isESModule } from '@intlayer/config';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { loadCLITools } from '../tools/cli';
import { loadDocsTools } from '../tools/docs';

export const dirname: string = isESModule
  ? pathDirname(fileURLToPath(import.meta.url))
  : __dirname;

const packageJson: Record<string, any> = JSON.parse(
  readFileSync(resolve(dirname, '../../../package.json'), 'utf8')
);

type LoadServer = (isLocal: boolean) => McpServer;

export const loadServer: LoadServer = (isLocal) => {
  const server = new McpServer({
    name: 'intlayer',
    version: packageJson.version,
    capabilities: {
      resources: {},
    },
  });

  if (!isLocal) {
    loadCLITools(server);
  }

  loadDocsTools(server);

  return server;
};
