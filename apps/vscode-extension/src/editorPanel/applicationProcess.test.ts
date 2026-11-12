import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { startApplication } from './applicationProcess';

const { createTerminal, sendText } = vi.hoisted(() => {
  const sendText = vi.fn();

  return {
    sendText,
    createTerminal: vi.fn(() => ({
      sendText,
      show: vi.fn(),
      exitStatus: undefined,
    })),
  };
});

vi.mock('vscode', () => ({ window: { createTerminal } }));
vi.mock('@intlayer/engine/cli', () => ({
  detectPackageManager: () => 'npm',
  findLockFileDir: () => undefined,
}));

describe('startApplication', () => {
  let projectDir: string;

  const writeScripts = (scripts: Record<string, string>) =>
    writeFile(join(projectDir, 'package.json'), JSON.stringify({ scripts }));

  beforeEach(async () => {
    projectDir = await mkdtemp(join(tmpdir(), 'intlayer-application-'));
    sendText.mockClear();
  });

  afterEach(() => rm(projectDir, { recursive: true, force: true }));

  it('runs the dev script when declared', async () => {
    await writeScripts({ dev: 'vite', start: 'vite preview' });

    expect(await startApplication(projectDir)).toBe(true);
    expect(sendText).toHaveBeenCalledWith('npm run dev');
  });

  it('falls back to the start script (e.g. Angular, React Native)', async () => {
    await writeScripts({ start: 'ng serve' });

    expect(await startApplication(projectDir)).toBe(true);
    expect(sendText).toHaveBeenCalledWith('npm run start');
  });

  it('starts nothing without a dev or start script', async () => {
    await writeScripts({ build: 'ng build' });

    expect(await startApplication(projectDir)).toBe(false);
    expect(sendText).not.toHaveBeenCalled();
  });
});
