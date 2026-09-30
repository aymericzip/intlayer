import { promises as fs } from 'node:fs';
import path from 'node:path';
import { PLATFORMS_METADATA, type Platform } from '../installSkills';

export type MCPTransport = 'stdio' | 'sse';

/** Transports accepted by `intlayer init mcp --transport`. */
export const MCP_TRANSPORTS: MCPTransport[] = ['stdio', 'sse'];

const MCP_CONFIG_FILENAME = 'mcp.json';

/** Project-scoped MCP configuration file read by Claude Code. */
const CLAUDE_CODE_MCP_CONFIG_FILENAME = '.mcp.json';

/** One MCP server entry, as written under the platform's servers key. */
type MCPServerConfig = {
  command?: string;
  args?: string[];
  url?: string;
  type?: MCPTransport;
  transport?: MCPTransport;
};

/** Parsed MCP configuration file, keeping any unrelated keys untouched. */
type MCPConfigFile = Record<string, unknown>;

/** Platforms whose MCP entries declare their transport as `type`. */
const TYPED_TRANSPORT_PLATFORMS: Platform[] = ['VSCode', 'Claude'];

/** Resolves the MCP configuration file written for a platform. */
const getMCPConfigPath = (projectRoot: string, platform: Platform): string => {
  if (platform === 'Claude') {
    return path.join(projectRoot, CLAUDE_CODE_MCP_CONFIG_FILENAME);
  }

  // e.g. `.cursor/skills` → `.cursor/mcp.json`
  const relativeDir = path.dirname(PLATFORMS_METADATA[platform]?.dir ?? '.');

  return path.join(projectRoot, relativeDir, MCP_CONFIG_FILENAME);
};

/** Builds the Intlayer MCP server entry for a platform and transport. */
const getMCPServerConfig = (
  platform: Platform,
  transport: MCPTransport
): MCPServerConfig => {
  const isTypedTransport = TYPED_TRANSPORT_PLATFORMS.includes(platform);

  if (transport === 'stdio') {
    return {
      command: 'npx',
      args: ['-y', '@intlayer/mcp'],
      ...(isTypedTransport ? { type: 'stdio' } : {}),
    };
  }

  return {
    url: 'https://mcp.intlayer.org',
    ...(isTypedTransport ? { type: 'sse' } : { transport: 'sse' }),
  };
};

/**
 * Installs the Intlayer MCP server configuration for a specific platform.
 * Every platform is configured at the project level (Claude Code included,
 * through `.mcp.json`), so nothing outside the project is modified.
 */
export const installMCP = async (
  projectRoot: string,
  platform: Platform,
  transport: MCPTransport
): Promise<string> => {
  const configPath = getMCPConfigPath(projectRoot, platform);
  const serversKey = platform === 'VSCode' ? 'servers' : 'mcpServers';

  // Ensure the configuration directory exists
  await fs.mkdir(path.dirname(configPath), { recursive: true });

  let config: MCPConfigFile = {};
  try {
    const content = await fs.readFile(configPath, 'utf-8');
    config = JSON.parse(content) as MCPConfigFile;
  } catch {
    // File doesn't exist or is invalid JSON, start fresh
  }

  const servers = (config[serversKey] ?? {}) as Record<string, MCPServerConfig>;

  config[serversKey] = {
    ...servers,
    intlayer: getMCPServerConfig(platform, transport),
  };

  await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8');

  return `MCP server configuration updated in ${configPath}`;
};
