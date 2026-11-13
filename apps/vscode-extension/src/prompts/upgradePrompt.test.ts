import { describe, expect, it, vi } from 'vitest';
import {
  findOutdatedIntlayerProjects,
  getUpgradePromptMessage,
  isIntlayerVersionOutdated,
} from './upgradePrompt';

const installedVersions: Record<string, string | undefined> = {
  '/workspace/outdated': '9.7.2',
  '/workspace/current': '9.8.0',
  '/workspace/uninstalled': undefined,
};

vi.mock('vscode', () => ({ window: {} }));
vi.mock('../utils/findProjectRoot', () => ({ findAllProjectRoots: vi.fn() }));
vi.mock('../utils/runIntlayerCli', () => ({
  runIntlayerCliInTerminal: vi.fn(),
}));
vi.mock('../utils/getInstalledIntlayerVersion', () => ({
  getInstalledIntlayerVersion: (projectDir: string) =>
    installedVersions[projectDir],
}));

describe('isIntlayerVersionOutdated', () => {
  it('flags an installed version lower than the extension', () => {
    expect(isIntlayerVersionOutdated('9.7.9', '9.8.0')).toBe(true);
    expect(isIntlayerVersionOutdated('8.12.0', '9.0.0')).toBe(true);
  });

  it('accepts an equal or higher installed version', () => {
    expect(isIntlayerVersionOutdated('9.8.0', '9.8.0')).toBe(false);
    expect(isIntlayerVersionOutdated('9.10.0', '9.8.0')).toBe(false);
  });

  it('compares pre-release versions by their core', () => {
    expect(isIntlayerVersionOutdated('9.7.0-canary.3', '9.8.0')).toBe(true);
    expect(isIntlayerVersionOutdated('9.8.0-canary.3', '9.8.0')).toBe(false);
  });
});

describe('findOutdatedIntlayerProjects', () => {
  it('keeps only projects with an older installed intlayer', () => {
    expect(
      findOutdatedIntlayerProjects(Object.keys(installedVersions), '9.8.0')
    ).toEqual([
      { projectDir: '/workspace/outdated', installedVersion: '9.7.2' },
    ]);
  });
});

describe('getUpgradePromptMessage', () => {
  it('names the project when only one is outdated', () => {
    expect(
      getUpgradePromptMessage(
        [{ projectDir: '/workspace/app', installedVersion: '9.7.2' }],
        '9.8.0'
      )
    ).toContain('"app" uses Intlayer 9.7.2');
  });

  it('counts the projects when several are outdated', () => {
    expect(
      getUpgradePromptMessage(
        [
          { projectDir: '/workspace/app', installedVersion: '9.7.2' },
          { projectDir: '/workspace/website', installedVersion: '9.6.0' },
        ],
        '9.8.0'
      )
    ).toContain('2 projects use an Intlayer version');
  });
});
