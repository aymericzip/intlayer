import { readFileSync } from 'node:fs';
import { dirname as pathDirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isESModule } from '@intlayer/config/utils';
import z from 'zod';
import { loadAPITools } from '../tools/api';
import { loadCLITools } from '../tools/cli';
import { loadDocsTools } from '../tools/docs';
import { loadInstallSkillsTool } from '../tools/installSkills';

export const dirname: string = isESModule
  ? pathDirname(fileURLToPath(import.meta.url))
  : __dirname;

const packageJson: Record<string, any> = JSON.parse(
  readFileSync(resolve(dirname, '../../../package.json'), 'utf8')
);

type ToolResult = {
  content: { type: string; text: string }[];
  isError?: boolean;
};

type StoredTool = {
  name: string;
  description?: string;
  annotations?: Record<string, any>;
  inputSchema: Record<string, any>;
  handler: (params: any) => Promise<ToolResult>;
};

export interface McpTransport {
  start(server: McpServer): Promise<void>;
}

export class McpServer {
  private readonly _tools = new Map<string, StoredTool>();
  private readonly _info: { name: string; version: string };

  constructor(info: { name: string; version: string }) {
    this._info = info;
  }

  registerTool(
    name: string,
    config: {
      title?: string;
      description?: string;
      inputSchema?: Record<string, any>;
      annotations?: Record<string, any>;
    },
    handler: (params: any) => Promise<ToolResult>
  ): void {
    const shape = config.inputSchema ?? {};
    let inputSchema: Record<string, any>;
    try {
      inputSchema = z.toJSONSchema(z.object(shape)) as Record<string, any>;
    } catch {
      inputSchema = { type: 'object', properties: {} };
    }
    this._tools.set(name, {
      name,
      description: config.description,
      annotations: config.annotations,
      inputSchema,
      handler,
    });
  }

  async handleMessage(message: any): Promise<any> {
    const { id, method, params } = message;
    const isNotification = id === undefined;

    switch (method) {
      case 'initialize':
        return {
          jsonrpc: '2.0',
          id,
          result: {
            protocolVersion: '2024-11-05',
            capabilities: { tools: {} },
            serverInfo: this._info,
          },
        };

      case 'tools/list':
        return {
          jsonrpc: '2.0',
          id,
          result: {
            tools: Array.from(this._tools.values()).map((t) => ({
              name: t.name,
              description: t.description,
              inputSchema: t.inputSchema,
              ...(t.annotations && { annotations: t.annotations }),
            })),
          },
        };

      case 'tools/call': {
        const { name, arguments: args } = params ?? {};
        const tool = this._tools.get(name);
        if (!tool) {
          if (isNotification) return null;
          return {
            jsonrpc: '2.0',
            id,
            error: { code: -32601, message: `Tool not found: ${name}` },
          };
        }
        try {
          const result = await tool.handler(args ?? {});
          if (isNotification) return null;
          return { jsonrpc: '2.0', id, result };
        } catch (error) {
          if (isNotification) return null;
          return {
            jsonrpc: '2.0',
            id,
            error: {
              code: -32000,
              message: error instanceof Error ? error.message : String(error),
            },
          };
        }
      }

      case 'ping':
        if (isNotification) return null;
        return { jsonrpc: '2.0', id, result: {} };

      default:
        if (isNotification) return null;
        return {
          jsonrpc: '2.0',
          id,
          error: { code: -32601, message: `Method not found: ${method}` },
        };
    }
  }

  async connect(transport: McpTransport): Promise<void> {
    await transport.start(this);
  }
}

type LoadServer = (options: { isLocal: boolean }) => McpServer;

export const loadServer: LoadServer = ({ isLocal }) => {
  const server = new McpServer({
    name: 'intlayer',
    version: packageJson.version,
  });

  if (isLocal) {
    try {
      loadCLITools(server);
      loadInstallSkillsTool(server);
    } catch (error) {
      console.error('Error loading CLI tools:', error);
    }
  }

  try {
    loadDocsTools(server);
  } catch (error) {
    console.error('Error loading docs tools:', error);
  }

  try {
    loadAPITools(server);
  } catch (error) {
    console.error('Error loading API tools:', error);
  }

  return server;
};
