import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { initMCP } from './initMCP';
import { initSkills, parsePlatform, parseSkills } from './initSkills';

const installSkillsMock = vi.hoisted(() => vi.fn(async () => 'installed'));
const installMCPMock = vi.hoisted(() => vi.fn(async () => 'configured'));
const multiselectMock = vi.hoisted(() => vi.fn());
const selectMock = vi.hoisted(() => vi.fn());
const logErrorMock = vi.hoisted(() => vi.fn());

vi.mock('@intlayer/engine/cli', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@intlayer/engine/cli')>()),
  installSkills: installSkillsMock,
  installMCP: installMCPMock,
}));

vi.mock('./loadPrompts', () => ({
  loadPrompts: async () => ({
    intro: vi.fn(),
    outro: vi.fn(),
    note: vi.fn(),
    cancel: vi.fn(),
    multiselect: multiselectMock,
    select: selectMock,
    isCancel: (value: unknown) => typeof value === 'symbol',
    spinner: () => ({ start: vi.fn(), stop: vi.fn() }),
    log: { error: logErrorMock },
  }),
}));

vi.mock('./utils/isInteractiveTerminal', () => ({
  isInteractiveTerminal: () => false,
}));

/** Environment variables the platform detection reads. */
const PLATFORM_ENV_VARIABLES = [
  'CURSOR',
  'TERM_PROGRAM',
  'WINDSURF',
  'TRAE',
  'TRAE_CN',
  'VSCODE',
  'OPENCODE',
  'CLAUDE',
  'CLAUDECODE',
  'GITHUB_ACTIONS',
  'GITHUB_WORKSPACE',
];

describe('init skills and MCP without a terminal', () => {
  let projectRoot: string;

  beforeEach(() => {
    projectRoot = mkdtempSync(join(tmpdir(), 'intlayer-init-skills-'));
    writeFileSync(
      join(projectRoot, 'package.json'),
      JSON.stringify({ dependencies: { react: '^19.0.0' } })
    );
    for (const variable of PLATFORM_ENV_VARIABLES) {
      vi.stubEnv(variable, '');
    }
  });

  afterEach(() => {
    rmSync(projectRoot, { recursive: true, force: true });
    vi.unstubAllEnvs();
    vi.clearAllMocks();
    process.exitCode = undefined;
  });

  it('installs the stack skills for the given platform without prompting', async () => {
    const platform = await initSkills(projectRoot, { platform: 'Cursor' });

    expect(platform).toBe('Cursor');
    expect(multiselectMock).not.toHaveBeenCalled();
    expect(installSkillsMock).toHaveBeenCalledWith(
      projectRoot,
      'Cursor',
      expect.arrayContaining(['Usage', 'React'])
    );
  });

  it('uses the detected platform (Claude Code)', async () => {
    vi.stubEnv('CLAUDECODE', '1');

    await initSkills(projectRoot, { skills: ['Usage'] });

    expect(installSkillsMock).toHaveBeenCalledWith(projectRoot, 'Claude', [
      'Usage',
    ]);
  });

  it('fails with the platform list when none is given or detected', async () => {
    await initSkills(projectRoot);

    expect(installSkillsMock).not.toHaveBeenCalled();
    expect(process.exitCode).toBe(1);
    expect(logErrorMock).toHaveBeenCalledWith(
      expect.stringContaining('--platform <platform>')
    );
  });

  it('configures the MCP server over stdio without prompting', async () => {
    await initMCP(projectRoot, { platform: 'Claude' });

    expect(selectMock).not.toHaveBeenCalled();
    expect(installMCPMock).toHaveBeenCalledWith(projectRoot, 'Claude', 'stdio');
  });

  it('keeps the given MCP transport', async () => {
    await initMCP(projectRoot, { platform: 'Cursor', transport: 'sse' });

    expect(installMCPMock).toHaveBeenCalledWith(projectRoot, 'Cursor', 'sse');
  });
});

describe('parsePlatform', () => {
  it('accepts a platform in any case', () => {
    expect(parsePlatform('claude')).toBe('Claude');
  });

  it('rejects an unknown platform', () => {
    expect(() => parsePlatform('notepad')).toThrow('Invalid --platform value');
  });
});

describe('parseSkills', () => {
  it('accepts space- and comma-separated skills in any case', () => {
    expect(parseSkills(['usage,react', 'CLI'])).toEqual([
      'Usage',
      'React',
      'CLI',
    ]);
  });

  it('rejects an unknown skill', () => {
    expect(() => parseSkills(['Cooking'])).toThrow('Invalid --skills value');
  });
});
