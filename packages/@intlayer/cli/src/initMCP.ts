import { resolve } from 'node:path';
import {
  installMCP,
  type MCPTransport,
  type Platform,
} from '@intlayer/engine/cli';
import { findProjectRoot } from './init';
import { promptPlatform } from './initSkills';
import { loadPrompts } from './loadPrompts';

export const initMCP = async (
  projectRoot?: string,
  preselectedPlatform?: Platform
) => {
  const p = await loadPrompts();

  const root = findProjectRoot(
    projectRoot ? resolve(projectRoot) : process.cwd()
  );

  p.intro('Initializing Intlayer MCP Server');

  const platform = preselectedPlatform ?? (await promptPlatform());

  if (!platform) {
    p.cancel('Operation cancelled. No platform selected.');
    return;
  }

  const transport = (await p.select({
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
  })) as MCPTransport;

  if (p.isCancel(transport) || !transport) {
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
  }

  p.outro('Intlayer MCP Server initialization complete');
};
