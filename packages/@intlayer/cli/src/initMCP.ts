import { resolve } from 'node:path';
import * as p from '@clack/prompts';
import {
  installMCP,
  type MCPTransport,
  PLATFORMS,
} from '@intlayer/chokidar/cli';
import enquirer from 'enquirer';
import { findProjectRoot } from './init';
import { getDetectedPlatform, PLATFORM_OPTIONS } from './initSkills';

export const initMCP = async (projectRoot?: string) => {
  const root = findProjectRoot(
    projectRoot ? resolve(projectRoot) : process.cwd()
  );

  p.intro('Initializing Intlayer MCP Server');

  const detectedPlatform = getDetectedPlatform();

  let platform: any;
  try {
    const response = await enquirer.prompt<{ platforms: any }>({
      type: 'autocomplete',
      name: 'platforms',
      message: 'Which platform are you using? (Type to search)',
      multiple: false,
      initial: detectedPlatform
        ? PLATFORMS.indexOf(detectedPlatform)
        : undefined,
      choices: PLATFORM_OPTIONS.map((opt) => ({
        name: opt.value,
        message: opt.label,
        hint: opt.hint,
      })),
    });
    platform = response.platforms;
  } catch {
    p.cancel('Operation cancelled.');
    return;
  }

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
