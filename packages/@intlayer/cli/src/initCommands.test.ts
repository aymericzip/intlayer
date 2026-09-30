import type { Command } from 'commander';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { INIT_STEP_COMMANDS, type InitStep } from './init';

const initStepsMock = vi.hoisted(() => vi.fn());
const initMock = vi.hoisted(() => vi.fn());
const initCmsMock = vi.hoisted(() => vi.fn());
const initSkillsMock = vi.hoisted(() => vi.fn());
const initMCPMock = vi.hoisted(() => vi.fn());
const initInfraMock = vi.hoisted(() => vi.fn());
const initChromeExtensionMock = vi.hoisted(() => vi.fn());

vi.mock('./init', async (importOriginal) => ({
  ...(await importOriginal<typeof import('./init')>()),
  init: initMock,
  initSteps: initStepsMock,
  initCms: initCmsMock,
}));

vi.mock('./initSkills', async (importOriginal) => ({
  ...(await importOriginal<typeof import('./initSkills')>()),
  initSkills: initSkillsMock,
}));

vi.mock('./initMCP', async (importOriginal) => ({
  ...(await importOriginal<typeof import('./initMCP')>()),
  initMCP: initMCPMock,
}));

vi.mock('./initInfra', async (importOriginal) => ({
  ...(await importOriginal<typeof import('./initInfra')>()),
  initInfra: initInfraMock,
}));

vi.mock('./initChromeExtension', async (importOriginal) => ({
  ...(await importOriginal<typeof import('./initChromeExtension')>()),
  initChromeExtension: initChromeExtensionMock,
}));

const ORIGINAL_ARGV = [...process.argv];

/** Runs the CLI with the given arguments and waits for the async action. */
const runCli = async (args: string[]): Promise<Command> => {
  process.argv = ['node', 'intlayer', ...args];
  const { setAPI } = await import('./cli');
  const program = setAPI();
  await vi.waitFor(() => {
    const calls = [
      initStepsMock,
      initMock,
      initCmsMock,
      initSkillsMock,
      initMCPMock,
      initInfraMock,
      initChromeExtensionMock,
    ].flatMap((mock) => mock.mock.calls);
    expect(calls.length).toBeGreaterThan(0);
  });

  return program;
};

describe('intlayer init subcommands', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    process.argv = [...ORIGINAL_ARGV];
    vi.clearAllMocks();
  });

  it('registers the dedicated command of every setup step', async () => {
    const program = await runCli(['init', 'lsp']);
    const initCommand = program.commands.find(
      (command) => command.name() === 'init'
    );
    const subcommandNames = (initCommand?.commands ?? []).flatMap((command) => [
      command.name(),
      ...command.aliases(),
    ]);

    for (const stepCommand of Object.values(INIT_STEP_COMMANDS)) {
      // `intlayer init <subcommand> [flags]`
      const [, , subcommand] = stepCommand.split(' ');

      expect(subcommandNames).toContain(subcommand);
    }
  });

  it('runs the default steps for a bare `intlayer init`', async () => {
    await runCli(['init']);

    expect(initMock).toHaveBeenCalledWith(
      undefined,
      expect.objectContaining({ noGithubActions: false }),
      false
    );
  });

  const singleStepCommands: Array<[string, InitStep]> = [
    ['packages', 'packages'],
    ['project', 'projectSetup'],
    ['github-actions', 'githubActions'],
    ['vscode-extension', 'vscodeExtension'],
    ['lsp', 'lsp'],
    ['eslint', 'eslint'],
  ];

  it.each(singleStepCommands)(
    '`intlayer init %s` runs only its step',
    async (command, step) => {
      await runCli(['init', command, '--project-root', 'app']);

      expect(initStepsMock).toHaveBeenCalledOnce();
      expect(initStepsMock.mock.calls[0]?.slice(0, 2)).toEqual(['app', [step]]);
    }
  );

  it('passes the routing to `intlayer init project`', async () => {
    await runCli(['init', 'project', '--routing', 'none']);

    expect(initStepsMock).toHaveBeenCalledWith(
      undefined,
      ['projectSetup'],
      expect.objectContaining({ routingMode: 'no-prefix', enableProxy: false })
    );
  });

  it('passes the skills flags without prompting', async () => {
    await runCli([
      'init',
      'skills',
      '--platform',
      'claude',
      '--skills',
      'usage',
      'React',
    ]);

    expect(initSkillsMock).toHaveBeenCalledWith(undefined, {
      platform: 'Claude',
      skills: ['Usage', 'React'],
    });
  });

  it('passes the MCP flags without prompting', async () => {
    await runCli(['init', 'mcp', '-p', 'Cursor', '-t', 'SSE']);

    expect(initMCPMock).toHaveBeenCalledWith(undefined, {
      platform: 'Cursor',
      transport: 'sse',
    });
  });

  it('runs the CMS login', async () => {
    await runCli(['init', 'cms']);

    expect(initCmsMock).toHaveBeenCalledOnce();
  });

  it('passes the browsers to `intlayer init extension`', async () => {
    await runCli(['init', 'extension', '--browser', 'chrome']);

    expect(initChromeExtensionMock).toHaveBeenCalledWith({
      browsers: ['chrome'],
    });
  });

  it('passes the mode to `intlayer init infra`', async () => {
    await runCli(['init', 'infra', '--mode', 'docker']);

    expect(initInfraMock).toHaveBeenCalledWith({ mode: 'docker' });
  });
});
