import { promises as fs } from 'node:fs';
import path from 'node:path';
import { PLATFORMS_METADATA, type Platform } from '../installSkills';

export type MCPTransport = 'stdio' | 'sse';

/** Transports accepted by `intlayer init mcp --transport`. */
export const MCP_TRANSPORTS: MCPTransport[] = ['stdio', 'sse'];

const MCP_CONFIG_FILENAME = 'mcp.json';

/** Package run by the stdio MCP server entry. */
const MCP_PACKAGE_NAME = '@intlayer/mcp';

/**
 * `npx` spec of the MCP server. The dist-tag makes `npx` resolve the published
 * version on start, where a bare name keeps serving its cached copy.
 */
const getMCPPackageSpecifier = (distTag: string = 'latest'): string =>
  `${MCP_PACKAGE_NAME}@${distTag}`;

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
      args: ['-y', getMCPPackageSpecifier()],
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

/** Matches `@intlayer/mcp`, optionally followed by a version or dist-tag. */
const MCP_PACKAGE_ARGUMENT_PATTERN = /^@intlayer\/mcp(@.+)?$/;

/**
 * Points the stdio Intlayer MCP entries of every platform config of the
 * project at the given dist-tag (`npx -y @intlayer/mcp@latest`), so agents
 * start the upgraded server. Returns the config files that were rewritten.
 */
export const upgradeMCPConfigs = async (
  projectRoot: string,
  distTag: string = 'latest'
): Promise<string[]> => {
  const packageSpecifier = getMCPPackageSpecifier(distTag);
  const configPaths = [
    ...new Set(
      (Object.keys(PLATFORMS_METADATA) as Platform[]).map((platform) =>
        getMCPConfigPath(projectRoot, platform)
      )
    ),
  ];
  const updatedConfigPaths: string[] = [];

  for (const configPath of configPaths) {
    let config: MCPConfigFile;

    try {
      config = JSON.parse(await fs.readFile(configPath, 'utf-8'));
    } catch {
      continue;
    }

    let isUpdated = false;

    for (const serversKey of ['servers', 'mcpServers']) {
      const servers = config[serversKey] as
        | Record<string, MCPServerConfig>
        | undefined;

      for (const server of Object.values(servers ?? {})) {
        server.args = server.args?.map((argument) => {
          if (
            !MCP_PACKAGE_ARGUMENT_PATTERN.test(argument) ||
            argument === packageSpecifier
          ) {
            return argument;
          }

          isUpdated = true;
          return packageSpecifier;
        });
      }
    }

    if (isUpdated) {
      await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8');
      updatedConfigPaths.push(configPath);
    }
  }

  return updatedConfigPaths;
};
