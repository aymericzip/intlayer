import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getIntlayerCliCommand } from './runIntlayerCli';

const { detectPackageManager, getSelectedEnvironment } = vi.hoisted(() => ({
  detectPackageManager: vi.fn(),
  getSelectedEnvironment: vi.fn(),
}));

vi.mock('vscode', () => ({ window: {} }));
vi.mock('@intlayer/engine/cli', () => ({
  detectPackageManager,
  findLockFileDir: () => undefined,
}));
vi.mock('./envStore', () => ({ getSelectedEnvironment }));

describe('getIntlayerCliCommand', () => {
  beforeEach(() => {
    detectPackageManager.mockReturnValue('npm');
    getSelectedEnvironment.mockReturnValue(undefined);
  });

  it('runs the installed binary with the package manager runner', () => {
    detectPackageManager.mockReturnValue('pnpm');

    expect(getIntlayerCliCommand('/project', { args: ['login'] })).toBe(
      'pnpm exec intlayer login'
    );
  });

  it('runs a remote binary without installing it', () => {
    detectPackageManager.mockReturnValue('yarn');

    expect(
      getIntlayerCliCommand('/project', {
        args: ['init', '--interactive'],
        remote: true,
      })
    ).toBe('yarn dlx intlayer init --interactive');
  });

  it('pins the version of a remote binary', () => {
    getSelectedEnvironment.mockReturnValue('production');

    expect(
      getIntlayerCliCommand('/project', {
        args: ['editor', 'start'],
        remote: true,
        version: '9.6.0',
        forwardEnvironment: true,
      })
    ).toBe('npx intlayer@9.6.0 editor start --env production');
    expect(
      getIntlayerCliCommand('/project', { args: ['login'], version: '9.6.0' })
    ).toBe('npx intlayer login --env production');
  });

  it('forwards the selected environment', () => {
    getSelectedEnvironment.mockReturnValue('production');

    expect(
      getIntlayerCliCommand('/project', { args: ['editor', 'start'] })
    ).toBe('npx intlayer editor start --env production');
  });

  it('skips the environment for remote runs and when disabled', () => {
    getSelectedEnvironment.mockReturnValue('production');

    expect(
      getIntlayerCliCommand('/project', { args: ['init'], remote: true })
    ).toBe('npx intlayer init');
    expect(
      getIntlayerCliCommand('/project', {
        args: ['upgrade'],
        forwardEnvironment: false,
      })
    ).toBe('npx intlayer upgrade');
  });

  it('quotes arguments the shell would split', () => {
    getSelectedEnvironment.mockReturnValue("my env's");

    expect(getIntlayerCliCommand('/project', { args: ['login'] })).toBe(
      `npx intlayer login --env 'my env'\\''s'`
    );
  });
});
