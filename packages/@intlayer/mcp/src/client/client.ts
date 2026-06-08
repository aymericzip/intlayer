import { dirname as pathDirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createMCPClient, type MCPClient } from '@ai-sdk/mcp';
import { isESModule } from '@intlayer/config/utils';

export type { MCPClient };

export const dirname: string = isESModule
  ? pathDirname(fileURLToPath(import.meta.url))
  : __dirname;

export const loadMCPTools = async (
  serverURL: string
): Promise<{ client: MCPClient; tools: Record<string, any> }> => {
  const client = await createMCPClient({
    transport: { type: 'http', url: serverURL },
  });
  const tools = await client.tools();
  return { client, tools };
};
