import { readFileSync } from 'node:fs';
import { dirname as pathDirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isESModule } from '@intlayer/config';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';

export const dirname: string = isESModule
  ? pathDirname(fileURLToPath(import.meta.url))
  : __dirname;

const packageJson: Record<string, any> = JSON.parse(
  readFileSync(resolve(dirname, '../../../package.json'), 'utf8')
);

type LoadClient = () => Client;

export const loadClient: LoadClient = () =>
  new Client({
    name: `mcp-client-for-intlayer-mcp-server`,
    version: packageJson.version,
  });
