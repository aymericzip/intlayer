import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { installMCP } from './installMCP';

// Build-time virtual module pulled in through the platform metadata.
vi.mock('utils:asset', () => ({ readAsset: () => '' }));

describe('installMCP', () => {
  let projectRoot: string;

  const readJson = (relativePath: string): Record<string, unknown> =>
    JSON.parse(readFileSync(join(projectRoot, relativePath), 'utf-8'));

  beforeEach(() => {
    projectRoot = mkdtempSync(join(tmpdir(), 'intlayer-install-mcp-'));
  });

  afterEach(() => {
    rmSync(projectRoot, { recursive: true, force: true });
  });

  it('writes the project .mcp.json for Claude Code', async () => {
    const result = await installMCP(projectRoot, 'Claude', 'stdio');

    expect(result).toContain(join(projectRoot, '.mcp.json'));
    expect(readJson('.mcp.json')).toEqual({
      mcpServers: {
        intlayer: {
          command: 'npx',
          args: ['-y', '@intlayer/mcp'],
          type: 'stdio',
        },
      },
    });
  });

  it('keeps the other configured servers', async () => {
    writeFileSync(
      join(projectRoot, '.mcp.json'),
      JSON.stringify({ mcpServers: { other: { command: 'other' } } })
    );

    await installMCP(projectRoot, 'Claude', 'sse');

    expect(readJson('.mcp.json')).toEqual({
      mcpServers: {
        other: { command: 'other' },
        intlayer: { url: 'https://mcp.intlayer.org', type: 'sse' },
      },
    });
  });

  it('writes next to the platform skills directory', async () => {
    await installMCP(projectRoot, 'Cursor', 'sse');

    expect(readJson('.cursor/mcp.json')).toEqual({
      mcpServers: {
        intlayer: { url: 'https://mcp.intlayer.org', transport: 'sse' },
      },
    });
  });

  it('uses the `servers` key for VS Code', async () => {
    await installMCP(projectRoot, 'VSCode', 'stdio');

    expect(readJson('.vscode/mcp.json')).toEqual({
      servers: {
        intlayer: {
          command: 'npx',
          args: ['-y', '@intlayer/mcp'],
          type: 'stdio',
        },
      },
    });
  });
});
