import {
  installMCP,
  MCP_TRANSPORTS,
  type MCPTransport,
  type Platform,
} from '@intlayer/engine/cli';
import { resolveProjectRoot } from './init';
import { promptPlatform, resolvePlatformWithoutPrompt } from './initSkills';
import { loadPrompts } from './loadPrompts';
import { isInteractiveTerminal } from './utils/isInteractiveTerminal';
import { parseChoice } from './utils/parseChoice';

/** Options of {@link initMCP}; anything omitted is prompted for. */
export type InitMCPOptions = {
  /** AI platform to configure the MCP server for. */
  platform?: Platform;
  /** MCP transport. Defaults to `stdio` without a terminal. */
  transport?: MCPTransport;
};

/** Validates a `--transport` value, ignoring case. */
export const parseMCPTransport = (value: string): MCPTransport =>
  parseChoice(value, MCP_TRANSPORTS, '--transport');

/**
 * Configures the Intlayer MCP server for an AI platform. Without a terminal
 * (AI agents, CI), nothing is prompted: the platform defaults to the detected
 * one and the transport to `stdio`.
 */
export const initMCP = async (
  projectRoot?: string,
  options: InitMCPOptions = {}
) => {
  const p = await loadPrompts();

  const root = resolveProjectRoot(projectRoot);
  const isInteractive = isInteractiveTerminal();

  p.intro('Initializing Intlayer MCP Server');

  const platform = isInteractive
    ? (options.platform ?? (await promptPlatform(root)))
    : await resolvePlatformWithoutPrompt(
        root,
        options.platform,
        'intlayer init mcp'
      );

  if (!platform) {
    p.cancel('Operation cancelled. No platform selected.');
    return;
  }

  const transport =
    options.transport ??
    (isInteractive
      ? await p.select<MCPTransport>({
          message: 'Which transport method do you want to use?',
          options: [
            {
              value: 'stdio',
              label: 'Local server (stdio)',
              hint: 'Recommended. Integrates all features including CLI tools.',
            },
            {
              value: 'sse',
              label: 'Remote server (SSE)',
              hint: 'Hosted by Intlayer. Documentation only.',
            },
          ],
        })
      : 'stdio');

  if (p.isCancel(transport)) {
    p.cancel('Operation cancelled.');
    return;
  }

  const s = p.spinner();
  s.start('Configuring MCP Server...');

  try {
    const result = await installMCP(root, platform, transport);

    s.stop('MCP Server configured successfully');

    p.note(result, 'Success');
  } catch (error) {
    s.stop('Failed to configure MCP Server');
    p.log.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }

  p.outro('Intlayer MCP Server initialization complete');
};
