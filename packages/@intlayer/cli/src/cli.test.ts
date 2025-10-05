import { TextDecoder, TextEncoder } from 'node:util';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Polyfill TextEncoder/TextDecoder for Node versions < 19
if (!(globalThis as any).TextEncoder) {
  (globalThis as any).TextEncoder = TextEncoder;
}
if (!(globalThis as any).TextDecoder) {
  (globalThis as any).TextDecoder = TextDecoder;
}

// Keep references to the original argv so we can restore it after each test
const ORIGINAL_ARGV = [...process.argv];

// Helper to reset process.argv for each test
const setProcessArgv = (args: string[]) => {
  process.argv = ['node', 'intlayer', ...args];
};

// Dynamic mock placeholders
let buildMock: ReturnType<typeof vi.fn>;
let pushMock: ReturnType<typeof vi.fn>;
let pullMock: ReturnType<typeof vi.fn>;
let fillMock: ReturnType<typeof vi.fn>;
let getConfigMock: ReturnType<typeof vi.fn>;
let pushConfigMock: ReturnType<typeof vi.fn>;
let listContentDeclarationMock: ReturnType<typeof vi.fn>;
let translateDocMock: ReturnType<typeof vi.fn>;
let reviewDocMock: ReturnType<typeof vi.fn>;
let liveSyncMock: ReturnType<typeof vi.fn>;

// Hoisted mocks – evaluated before the tested module is imported
vi.mock('./build', () => ({
  build: (...args: any[]) => buildMock(...args),
}));

vi.mock('./push', () => ({
  push: (...args: any[]) => pushMock(...args),
}));

vi.mock('./pull', () => ({
  pull: (...args: any[]) => pullMock(...args),
}));

vi.mock('./fill', () => ({
  fill: (...args: any[]) => fillMock(...args),
}));

vi.mock('./config', () => ({
  getConfig: (...args: any[]) => getConfigMock(...args),
}));

vi.mock('./pushConfig', () => ({
  pushConfig: (...args: any[]) => pushConfigMock(...args),
}));

vi.mock('./listContentDeclaration', () => ({
  listContentDeclaration: (...args: any[]) =>
    listContentDeclarationMock(...args),
}));

vi.mock('./translateDoc', () => ({
  translateDoc: (...args: any[]) => translateDocMock(...args),
}));

vi.mock('./reviewDoc', () => ({
  reviewDoc: (...args: any[]) => reviewDocMock(...args),
}));

vi.mock('./liveSync', () => ({
  liveSync: (...args: any[]) => liveSyncMock(...args),
}));

// Mock getParentPackageJSON utility
vi.mock('./utils/getParentPackageJSON', () => ({
  getParentPackageJSON: vi.fn(() => ({
    name: '@intlayer/cli',
    version: '1.0.0',
    description: 'Intlayer CLI',
  })),
}));

// Mock configuration import that the CLI relies on for defaults
vi.mock('@intlayer/config/built', () => ({
  __esModule: true,
  default: {},
}));

vi.mock('@intlayer/config', () => ({
  __esModule: true,
  isESModule: false,
  // Minimal constants used by downstream packages
  spinnerFrames: ['-', '\\', '|', '/'],
  ANSIColors: {
    RESET: '',
    GREY: '',
    GREY_DARK: '',
    BLUE: '',
    RED: '',
    GREEN: '',
    YELLOW: '',
    MAGENTA: '',
    BEIGE: '',
    CYAN: '',
    WHITE: '',
  },
  v: '✓',
  x: '✗',
  colorize: (s: string) => String(s),
  getExtension: vi.fn(() => 'cjs'),
  // Minimal configuration getter
  getConfiguration: vi.fn(() => ({
    content: {
      mainDir: process.cwd(),
      resultDir: '.intlayer',
    },
    ai: {},
    log: { mode: 'disabled', prefix: '' },
  })),
}));

describe('Intlayer CLI', () => {
  beforeEach(() => {
    // Reset module cache to load a fresh CLI instance for each test
    vi.resetModules();

    // Re-initialise mocks for each test run
    buildMock = vi.fn();
    pushMock = vi.fn();
    pullMock = vi.fn();
    fillMock = vi.fn();
    getConfigMock = vi.fn();
    pushConfigMock = vi.fn();
    listContentDeclarationMock = vi.fn();
    translateDocMock = vi.fn();
    reviewDocMock = vi.fn();
    liveSyncMock = vi.fn();
  });

  afterEach(() => {
    // Restore the original process arguments after each test
    process.argv = [...ORIGINAL_ARGV];
    vi.clearAllMocks();
  });

  describe('build command', () => {
    it('triggers build with the --watch flag', async () => {
      setProcessArgv(['build', '--watch']);

      const { setAPI } = await import('./cli');
      setAPI();

      expect(buildMock).toHaveBeenCalledTimes(1);
      expect(buildMock).toHaveBeenCalledWith(
        expect.objectContaining({ watch: true })
      );
    });

    it('triggers build with verbose and custom prefix', async () => {
      setProcessArgv(['build', '--verbose', '--prefix', 'TEST']);

      const { setAPI } = await import('./cli');
      setAPI();

      expect(buildMock).toHaveBeenCalledTimes(1);
      expect(buildMock).toHaveBeenCalledWith(
        expect.objectContaining({
          verbose: true,
          prefix: 'TEST',
          configOptions: expect.objectContaining({
            override: expect.objectContaining({
              log: expect.objectContaining({
                verbose: true,
                prefix: 'TEST',
              }),
            }),
          }),
        })
      );
    });

    it('triggers build with environment and base directory options', async () => {
      setProcessArgv([
        'build',
        '--env',
        'production',
        '--base-dir',
        '/custom/path',
      ]);

      const { setAPI } = await import('./cli');
      setAPI();

      expect(buildMock).toHaveBeenCalledTimes(1);
      expect(buildMock).toHaveBeenCalledWith(
        expect.objectContaining({
          env: 'production',
          baseDir: '/custom/path',
          configOptions: expect.objectContaining({
            env: 'production',
            baseDir: '/custom/path',
          }),
        })
      );
    });
  });

  describe('push command', () => {
    it('triggers push with dictionaries and delete flag', async () => {
      setProcessArgv([
        'push',
        '--dictionaries',
        'id1',
        'id2',
        '--deleteLocaleDictionary',
      ]);

      const { setAPI } = await import('./cli');
      setAPI();

      expect(pushMock).toHaveBeenCalledTimes(1);

      const pushOptions = pushMock.mock.calls[0][0] as Record<string, unknown>;
      expect(pushOptions.dictionaries).toEqual(['id1', 'id2']);
      expect(pushOptions.deleteLocaleDictionary).toBe(true);
    });

    it('triggers push with keep flag and git options', async () => {
      setProcessArgv([
        'push',
        '--keepLocaleDictionary',
        '--uncommitted',
        '--git-diff-base',
        'main',
      ]);

      const { setAPI } = await import('./cli');
      setAPI();

      expect(pushMock).toHaveBeenCalledTimes(1);

      const pushOptions = pushMock.mock.calls[0][0] as Record<string, unknown>;
      expect(pushOptions.keepLocaleDictionary).toBe(true);
      expect(pushOptions.gitOptions).toEqual(
        expect.objectContaining({
          mode: ['uncommitted'],
          baseRef: 'main',
          absolute: true,
        })
      );
    });
  });

  describe('pull command', () => {
    it('triggers pull with specific dictionaries', async () => {
      setProcessArgv(['pull', '--dictionaries', 'dict1', 'dict2']);

      const { setAPI } = await import('./cli');
      setAPI();

      expect(pullMock).toHaveBeenCalledTimes(1);
      expect(pullMock).toHaveBeenCalledWith(
        expect.objectContaining({
          dictionaries: ['dict1', 'dict2'],
        })
      );
    });

    it('triggers pull with custom path for new dictionaries', async () => {
      setProcessArgv(['pull', '--newDictionariesPath', '/custom/dict/path']);

      const { setAPI } = await import('./cli');
      setAPI();

      expect(pullMock).toHaveBeenCalledTimes(1);
      expect(pullMock).toHaveBeenCalledWith(
        expect.objectContaining({
          newDictionariesPath: '/custom/dict/path',
        })
      );
    });
  });

  describe('config commands', () => {
    it('triggers config get with environment options', async () => {
      setProcessArgv(['config', 'get', '--env-file', '.env.local']);

      const { setAPI } = await import('./cli');
      setAPI();

      expect(getConfigMock).toHaveBeenCalledTimes(1);
      expect(getConfigMock).toHaveBeenCalledWith(
        expect.objectContaining({
          envFile: '.env.local',
          configOptions: expect.objectContaining({
            envFile: '.env.local',
          }),
        })
      );
    });

    it('triggers config push', async () => {
      setProcessArgv(['config', 'push']);

      const { setAPI } = await import('./cli');
      setAPI();

      expect(pushConfigMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('fill command', () => {
    it('triggers fill with complete mode and AI options', async () => {
      setProcessArgv([
        'fill',
        '--mode',
        'complete',
        '--provider',
        'openai',
        '--model',
        'gpt-4',
        '--temperature',
        '0.7',
      ]);

      const { setAPI } = await import('./cli');
      setAPI();

      expect(fillMock).toHaveBeenCalledTimes(1);
      expect(fillMock).toHaveBeenCalledWith(
        expect.objectContaining({
          mode: 'complete',
          provider: 'openai',
          model: 'gpt-4',
          temperature: '0.7',
          aiOptions: expect.objectContaining({
            provider: 'openai',
            model: 'gpt-4',
            temperature: '0.7',
          }),
        })
      );
    });

    it('triggers fill with file filters and locale options', async () => {
      setProcessArgv([
        'fill',
        '--file',
        'dict1.ts',
        'dict2.ts',
        '--source-locale',
        'en',
        '--output-locales',
        'fr',
        'es',
        '--keys',
        'button',
        'title',
      ]);

      const { setAPI } = await import('./cli');
      setAPI();

      expect(fillMock).toHaveBeenCalledTimes(1);
      expect(fillMock).toHaveBeenCalledWith(
        expect.objectContaining({
          file: ['dict1.ts', 'dict2.ts'],
          sourceLocale: 'en',
          outputLocales: ['fr', 'es'],
          keys: ['button', 'title'],
        })
      );
    });

    it('triggers fill with path filters and excluded keys', async () => {
      setProcessArgv([
        'fill',
        '--path-filter',
        'src/**/*.ts',
        '--excluded-keys',
        'debug',
        'test',
      ]);

      const { setAPI } = await import('./cli');
      setAPI();

      expect(fillMock).toHaveBeenCalledTimes(1);
      expect(fillMock).toHaveBeenCalledWith(
        expect.objectContaining({
          pathFilter: ['src/**/*.ts'],
          excludedKeys: ['debug', 'test'],
        })
      );
    });
  });

  describe('doc commands', () => {
    it('triggers doc translate with AI and locale options', async () => {
      setProcessArgv([
        'doc',
        'translate',
        '--doc-pattern',
        'docs/**/*.md',
        '--locales',
        'fr',
        'es',
        '--base-locale',
        'en',
        '--api-key',
        'test-key',
      ]);

      const { setAPI } = await import('./cli');
      setAPI();

      expect(translateDocMock).toHaveBeenCalledTimes(1);
      expect(translateDocMock).toHaveBeenCalledWith(
        expect.objectContaining({
          docPattern: ['docs/**/*.md'],
          locales: ['fr', 'es'],
          baseLocale: 'en',
          aiOptions: expect.objectContaining({
            apiKey: 'test-key',
          }),
        })
      );
    });

    it('triggers doc review with excluded patterns and processing options', async () => {
      setProcessArgv([
        'doc',
        'review',
        '--excluded-glob-pattern',
        'node_modules/**',
        '--nb-simultaneous-file-processed',
        '5',
        '--custom-prompt',
        'Review for clarity',
      ]);

      const { setAPI } = await import('./cli');
      setAPI();

      expect(reviewDocMock).toHaveBeenCalledTimes(1);
      expect(reviewDocMock).toHaveBeenCalledWith(
        expect.objectContaining({
          excludedGlobPattern: ['node_modules/**'],
          nbSimultaneousFileProcessed: '5',
          aiOptions: expect.objectContaining({
            customPrompt: 'Review for clarity',
          }),
        })
      );
    });
  });

  describe('content list command', () => {
    it('triggers content list', async () => {
      setProcessArgv(['content', 'list']);

      const { setAPI } = await import('./cli');
      setAPI();

      expect(listContentDeclarationMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('git options integration', () => {
    it('correctly parses git diff options', async () => {
      setProcessArgv([
        'fill',
        '--git-diff',
        '--git-diff-base',
        'origin/main',
        '--git-diff-current',
        'HEAD',
        '--untracked',
      ]);

      const { setAPI } = await import('./cli');
      setAPI();

      expect(fillMock).toHaveBeenCalledTimes(1);
      expect(fillMock).toHaveBeenCalledWith(
        expect.objectContaining({
          gitOptions: expect.objectContaining({
            mode: ['gitDiff', 'untracked'],
            baseRef: 'origin/main',
            currentRef: 'HEAD',
            absolute: true,
          }),
        })
      );
    });
  });

  describe('alias commands', () => {
    it('supports dictionary alias for build', async () => {
      setProcessArgv(['dictionary', 'build', '--watch']);

      const { setAPI } = await import('./cli');
      setAPI();

      expect(buildMock).toHaveBeenCalledTimes(1);
      expect(buildMock).toHaveBeenCalledWith(
        expect.objectContaining({ watch: true })
      );
    });

    it('supports dic alias for push', async () => {
      setProcessArgv(['dic', 'push', '--dictionaries', 'test']);

      const { setAPI } = await import('./cli');
      setAPI();

      expect(pushMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith(
        expect.objectContaining({
          dictionaries: ['test'],
        })
      );
    });

    it('supports conf alias for config get', async () => {
      setProcessArgv(['conf', 'get']);

      const { setAPI } = await import('./cli');
      setAPI();

      expect(getConfigMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('live command', () => {
    it('triggers live sync without process option', async () => {
      setProcessArgv(['live']);

      const { setAPI } = await import('./cli');
      setAPI();

      expect(liveSyncMock).toHaveBeenCalledTimes(1);
      expect(liveSyncMock).toHaveBeenCalledWith(expect.objectContaining({}));
    });

    it('triggers live sync with process option for vite preview', async () => {
      setProcessArgv(['live', '--process', 'vite preview']);

      const { setAPI } = await import('./cli');
      setAPI();

      expect(liveSyncMock).toHaveBeenCalledTimes(1);
      expect(liveSyncMock).toHaveBeenCalledWith(
        expect.objectContaining({
          process: 'vite preview',
        })
      );
    });

    it('triggers live sync with process option for next start', async () => {
      setProcessArgv(['live', '--process', 'next start']);

      const { setAPI } = await import('./cli');
      setAPI();

      expect(liveSyncMock).toHaveBeenCalledTimes(1);
      expect(liveSyncMock).toHaveBeenCalledWith(
        expect.objectContaining({
          process: 'next start',
        })
      );
    });

    it('triggers live sync with process option for npm run dev', async () => {
      setProcessArgv(['live', '--process', 'npm run dev']);

      const { setAPI } = await import('./cli');
      setAPI();

      expect(liveSyncMock).toHaveBeenCalledTimes(1);
      expect(liveSyncMock).toHaveBeenCalledWith(
        expect.objectContaining({
          process: 'npm run dev',
        })
      );
    });
  });
});
