import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { PLATFORMS_METADATA, type Platform } from '../installSkills';

export type MCPTransport = 'stdio' | 'sse';

const MCP_CONFIG_FILENAME = 'mcp.json';

const CLAUDE_DESKTOP_CONFIG_PATH =
  process.platform === 'win32'
    ? path.join(
        process.env.APPDATA || '',
        'Claude',
        'claude_desktop_config.json'
      )
    : path.join(
        os.homedir(),
        'Library',
        'Application Support',
        'Claude',
        'claude_desktop_config.json'
      );

/**
 * Installs the Intlayer MCP server configuration for a specific platform.
 */
export const installMCP = async (
  projectRoot: string,
  platform: Platform,
  transport: MCPTransport
): Promise<string> => {
  let configPath: string;
  let configKey = 'mcpServers';

  if (platform === 'Claude') {
    configPath = CLAUDE_DESKTOP_CONFIG_PATH;
  } else {
    const relativeDir = path.dirname(PLATFORMS_METADATA[platform].dir); // e.g. .cursor or .vscode
    configPath = path.join(projectRoot, relativeDir, MCP_CONFIG_FILENAME);

    if (platform === 'VSCode') {
      configKey = 'servers';
    }
  }

  // Ensure the configuration directory exists
  await fs.mkdir(path.dirname(configPath), { recursive: true });

  let config: any = {};
  try {
    const content = await fs.readFile(configPath, 'utf-8');
    config = JSON.parse(content);
  } catch {
    // File doesn't exist or is invalid JSON, start fresh
  }

  if (!config[configKey]) {
    config[configKey] = {};
  }

  if (transport === 'stdio') {
    const mcpConfig: any = {
      command: 'npx',
      args: ['-y', '@intlayer/mcp'],
    };

    if (platform === 'VSCode') {
      mcpConfig.type = 'stdio';
    }

    config[configKey].intlayer = mcpConfig;
  } else {
    const mcpConfig: any = {
      url: 'https://mcp.intlayer.org',
    };

    if (platform === 'VSCode') {
      mcpConfig.type = 'sse';
    } else {
      mcpConfig.transport = 'sse';
    }

    config[configKey].intlayer = mcpConfig;
  }

  await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8');

  return `MCP server configuration updated in ${configPath}`;
};
