import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  DEFAULT_INIT_STEPS,
  getContentInitOptions,
  getInitialInitSteps,
  getInitOptionsForSteps,
  getRoutingInitOptions,
  INIT_STEP_COMMANDS,
  INIT_STEP_GROUPS,
  init,
  isEslintInstalled,
  LOCALE_ROUTING_CHOICES,
  OPT_IN_INIT_STEPS,
  parseLocaleRoutingChoice,
} from './init';

const initIntlayerMock = vi.hoisted(() =>
  vi.fn(async () => ({ guideUrl: '' }))
);
const logErrorMock = vi.hoisted(() => vi.fn());
const isInteractiveTerminalMock = vi.hoisted(() => vi.fn(() => false));

vi.mock('@intlayer/engine/cli', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@intlayer/engine/cli')>()),
  initIntlayer: initIntlayerMock,
}));

vi.mock('./loadPrompts', () => ({
  loadPrompts: async () => ({ log: { error: logErrorMock } }),
}));

vi.mock('./utils/isInteractiveTerminal', () => ({
  isInteractiveTerminal: isInteractiveTerminalMock,
}));

describe('getRoutingInitOptions', () => {
  it('routes through the proxy for a routing mode', () => {
    expect(getRoutingInitOptions('prefix-all')).toEqual({
      routingMode: 'prefix-all',
      enableProxy: true,
    });
  });

  it('disables the proxy when no locale routing is wanted', () => {
    expect(getRoutingInitOptions('none')).toEqual({
      routingMode: 'no-prefix',
      enableProxy: false,
    });
  });
});

describe('getContentInitOptions', () => {
  it('returns no option without --content', () => {
    expect(getContentInitOptions()).toEqual({});
  });

  it('maps a layout and a format it accepts', () => {
    expect(getContentInitOptions('Namespaces', 'po')).toEqual({
      contentLayout: 'namespaces',
      contentFormat: 'po',
    });
  });

  it('rejects a format the layout does not accept', () => {
    expect(() => getContentInitOptions('multilingual', 'po')).toThrow(
      '--content-format'
    );
  });

  it('maps a message format for json catalogs', () => {
    expect(getContentInitOptions('centralized', undefined, 'Vue-i18n')).toEqual(
      {
        contentLayout: 'centralized',
        contentFormat: undefined,
        contentMessageFormat: 'vue-i18n',
      }
    );
  });

  it('rejects a message format outside json catalogs', () => {
    expect(() => getContentInitOptions('namespaces', 'po', 'icu')).toThrow(
      '--message-format'
    );
    expect(() => getContentInitOptions('multilingual', 'json', 'icu')).toThrow(
      '--message-format'
    );
  });

  it('rejects --content-format without --content', () => {
    expect(() => getContentInitOptions(undefined, 'json')).toThrow('--content');
  });
});

describe('parseLocaleRoutingChoice', () => {
  it('accepts every offered choice', () => {
    for (const choice of LOCALE_ROUTING_CHOICES) {
      expect(parseLocaleRoutingChoice(choice)).toBe(choice);
    }
  });

  it('rejects an unknown choice', () => {
    expect(() => parseLocaleRoutingChoice('prefix')).toThrow(
      'Invalid --routing value'
    );
  });
});

describe('chromeExtension in init flow', () => {
  it('includes chromeExtension in DevTools step group', () => {
    const devTools = INIT_STEP_GROUPS.DevTools;
    const chromeExtensionOption = devTools.find(
      (opt) => opt.value === 'chromeExtension'
    );

    expect(chromeExtensionOption).toEqual({
      value: 'chromeExtension',
      label: 'Chrome extension',
      hint: 'for audit, debug and analysis purpose',
    });
  });

  it('is not selected by default (included in OPT_IN_INIT_STEPS)', () => {
    expect(OPT_IN_INIT_STEPS).toContain('chromeExtension');
  });
});

describe('isEslintInstalled', () => {
  it('detects eslint in dependencies', () => {
    expect(isEslintInstalled({ eslint: '^9.0.0' })).toBe(true);
  });

  it('detects oxlint in dependencies', () => {
    expect(isEslintInstalled({ oxlint: '^0.15.0' })).toBe(true);
  });

  it('returns false when no linting dependencies are present', () => {
    expect(isEslintInstalled({ react: '^19.0.0' })).toBe(false);
  });

  it('detects eslint config files on disk when root is provided', () => {
    const tmpDir = mkdtempSync(join(tmpdir(), 'eslint-test-'));
    try {
      expect(isEslintInstalled({}, tmpDir)).toBe(false);
      writeFileSync(join(tmpDir, 'eslint.config.mjs'), 'export default [];');
      expect(isEslintInstalled({}, tmpDir)).toBe(true);
    } finally {
      rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});

describe('getInitialInitSteps', () => {
  it('preselects eslint when eslint is installed', () => {
    const steps = getInitialInitSteps({ eslint: '^9.0.0' });

    expect(steps).toContain('eslint');
    expect(steps).not.toContain('infra');
    expect(steps).not.toContain('chromeExtension');
  });

  it('does not preselect eslint when not installed', () => {
    const steps = getInitialInitSteps({ react: '^19.0.0' });

    expect(steps).not.toContain('eslint');
    expect(steps).not.toContain('infra');
    expect(steps).not.toContain('chromeExtension');
  });
});

describe('getInitOptionsForSteps', () => {
  it('only installs the packages and sets up the framework by default', () => {
    expect(getInitOptionsForSteps(DEFAULT_INIT_STEPS)).toEqual({
      noInstallPackages: false,
      noGitignore: false,
      noGithubActions: true,
      noFrameworkSetup: false,
      noVscodeExtension: true,
      noLsp: true,
      noEslint: true,
      skipFinalMessage: false,
    });
  });

  it('runs a single step on its own', () => {
    expect(getInitOptionsForSteps(['lsp'])).toMatchObject({
      noInstallPackages: true,
      noFrameworkSetup: true,
      noGithubActions: true,
      noLsp: false,
      skipFinalMessage: true,
    });
  });

  it('keeps explicit --no-* flags over a selected step', () => {
    expect(
      getInitOptionsForSteps(['projectSetup', 'githubActions'], {
        noGitignore: true,
        noGithubActions: true,
        routingMode: 'prefix-all',
      })
    ).toMatchObject({
      noGitignore: true,
      noGithubActions: true,
      noFrameworkSetup: false,
      routingMode: 'prefix-all',
    });
  });
});

describe('INIT_STEP_COMMANDS', () => {
  it('gives every interactive step a dedicated init subcommand', () => {
    for (const { value } of Object.values(INIT_STEP_GROUPS).flat()) {
      expect(INIT_STEP_COMMANDS[value]).toMatch(/^intlayer init [a-z-]+/);
    }
  });
});

describe('init', () => {
  afterEach(() => {
    process.exitCode = undefined;
    vi.clearAllMocks();
  });

  it('runs only the default steps without --interactive', async () => {
    const projectRoot = mkdtempSync(join(tmpdir(), 'intlayer-init-'));

    try {
      writeFileSync(join(projectRoot, 'package.json'), '{}');

      await init(projectRoot);

      expect(initIntlayerMock).toHaveBeenCalledExactlyOnceWith(
        projectRoot,
        getInitOptionsForSteps(DEFAULT_INIT_STEPS)
      );
    } finally {
      rmSync(projectRoot, { recursive: true, force: true });
    }
  });

  it('fails and lists the step commands when --interactive has no terminal', async () => {
    await init(undefined, undefined, true);

    expect(initIntlayerMock).not.toHaveBeenCalled();
    expect(process.exitCode).toBe(1);
    expect(logErrorMock).toHaveBeenCalledWith(
      expect.stringContaining(INIT_STEP_COMMANDS.skills)
    );
  });
});
