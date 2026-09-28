import type { IntlayerConfig } from '@intlayer/types/config';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getIsDevWatcherCommand,
  getIsServerDevelopment,
  prepareIntlayerServer,
} from './prepareIntlayerServer';

const { getProcessChainCommandsMock, startContentWatcherMock } = vi.hoisted(
  () => ({
    getProcessChainCommandsMock: vi.fn(async (): Promise<string[]> => []),
    startContentWatcherMock: vi.fn(),
  })
);

vi.mock('./utils/getProcessChainCommands', () => ({
  getProcessChainCommands: getProcessChainCommandsMock,
}));

vi.mock('./prepareIntlayer', () => ({
  prepareIntlayer: vi.fn(async () => {}),
}));

vi.mock('./utils/startContentWatcher', () => ({
  startContentWatcher: startContentWatcherMock,
}));

describe('getIsDevWatcherCommand', () => {
  it.each([
    'node /app/node_modules/.bin/nodemon src/index.ts',
    'node /app/node_modules/nodemon/bin/nodemon.js --exec ts-node src/index.ts',
    'nodemon',
    'node /app/node_modules/.bin/tsx watch src/index.ts',
    'node /app/node_modules/tsx/dist/cli.mjs watch src/index.ts',
    'node /app/node_modules/.bin/ts-node-dev --respawn src/index.ts',
    'node /app/node_modules/.bin/tsnd src/index.ts',
    'node /app/node_modules/.bin/node-dev src/index.js',
    'node /app/node_modules/.bin/tsc-watch --onSuccess "node dist/index.js"',
    'node --watch src/index.js',
    'node --watch-path=./src src/index.js',
    'bun --hot src/index.ts',
    'node /app/node_modules/.bin/nest start --watch',
    'deno run -A --watch src/index.ts',
    'deno serve --watch src/main.ts',
    'watchexec -r -e ts -- node dist/index.js',
    'entr -r node dist/index.js',
    'node /app/node_modules/.bin/chokidar src -c "node dist/index.js"',
    'node /app/node_modules/.bin/tsup src/index.ts --watch --onSuccess "node dist"',
    'node /app/node_modules/tsup/dist/cli-default.js -w --onSuccess "node dist"',
    'node /app/node_modules/tsdown/dist/run.mjs --watch --on-success "node dist/index.mjs"',
    'node /app/node_modules/.bin/tsdown -w --on-success "node dist/index.mjs"',
    'tsdown src/index.ts -w',
    'node /app/node_modules/.bin/supervisor dist/index.js',
  ])('detects `%s`', (command) => {
    expect(getIsDevWatcherCommand(command)).toBe(true);
  });

  it.each([
    'node dist/index.js',
    'bun dist/index.mjs',
    'node /app/node_modules/.bin/tsx src/index.ts',
    'node /app/node_modules/.bin/tsx src/watch.ts',
    'node /app/node_modules/.bin/pm2 start dist/index.js',
    '/bin/zsh -l',
    'node src/nodemon-config.js',
    'deno run -A src/index.ts',
    '/usr/bin/python3 /usr/bin/supervisord -n',
    'node /app/node_modules/.bin/tsdown',
    'node /app/node_modules/.bin/tsdown -W',
    'node /app/node_modules/.bin/tsup src/index.ts',
    'grep -w watch file.txt',
  ])('ignores `%s`', (command) => {
    expect(getIsDevWatcherCommand(command)).toBe(false);
  });
});

describe('getIsServerDevelopment', () => {
  const originalExecArgv = process.execArgv;

  beforeEach(() => {
    // Neutralise the signals of the runner itself (`bun run test`, …).
    vi.stubEnv('NODE_ENV', undefined);
    vi.stubEnv('npm_lifecycle_event', undefined);
    vi.stubEnv('WATCH_REPORT_DEPENDENCIES', undefined);
    vi.stubEnv('TS_NODE_DEV', undefined);
    vi.stubEnv('INTLAYER_WATCH', undefined);
    process.execArgv = [];
    getProcessChainCommandsMock.mockReset();
    getProcessChainCommandsMock.mockResolvedValue([]);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    process.execArgv = originalExecArgv;
  });

  it.each([
    ['development', true],
    ['production', false],
    ['test', false],
    ['staging', false],
  ])('follows NODE_ENV=%s → %s', async (nodeEnv, expected) => {
    vi.stubEnv('NODE_ENV', nodeEnv);
    // A set NODE_ENV wins over any other signal.
    process.execArgv = ['--watch'];
    getProcessChainCommandsMock.mockResolvedValue(['nodemon']);

    expect(await getIsServerDevelopment()).toBe(expected);
  });

  it('does not watch a plain `bun dist/index.mjs` without NODE_ENV', async () => {
    getProcessChainCommandsMock.mockResolvedValue(['-zsh']);

    expect(await getIsServerDevelopment()).toBe(false);
  });

  it('does not watch a `start` script without NODE_ENV', async () => {
    vi.stubEnv('npm_lifecycle_event', 'start');
    getProcessChainCommandsMock.mockResolvedValue([
      'sh -c bun dist/index.mjs',
      'bun run start',
    ]);

    expect(await getIsServerDevelopment()).toBe(false);
  });

  it.each([['--watch'], ['--hot'], ['--watch-path=./src']])(
    'watches under the `%s` runtime flag',
    async (flag) => {
      process.execArgv = [flag];

      expect(await getIsServerDevelopment()).toBe(true);
      // The cheap signal answers without listing processes.
      expect(getProcessChainCommandsMock).not.toHaveBeenCalled();
    }
  );

  it.each([['WATCH_REPORT_DEPENDENCIES'], ['TS_NODE_DEV']])(
    'watches when a restarting watcher sets %s',
    async (envVar) => {
      vi.stubEnv(envVar, '1');

      expect(await getIsServerDevelopment()).toBe(true);
    }
  );

  it.each([['dev'], ['start:dev'], ['dev:api'], ['watch']])(
    'watches under the `%s` package script',
    async (scriptName) => {
      vi.stubEnv('npm_lifecycle_event', scriptName);

      expect(await getIsServerDevelopment()).toBe(true);
    }
  );

  it('watches under nodemon started directly, through a shell', async () => {
    getProcessChainCommandsMock.mockResolvedValue([
      'sh -c ts-node src/index.ts',
      'node /app/node_modules/.bin/nodemon --exec ts-node src/index.ts',
      '-zsh',
    ]);

    expect(await getIsServerDevelopment()).toBe(true);
  });

  it.each([
    ['true', 'production', true],
    ['1', 'production', true],
    ['false', 'development', false],
    ['0', 'development', false],
  ])(
    'lets INTLAYER_WATCH=%s override NODE_ENV=%s → %s',
    async (override, nodeEnv, expected) => {
      vi.stubEnv('INTLAYER_WATCH', override);
      vi.stubEnv('NODE_ENV', nodeEnv);

      expect(await getIsServerDevelopment()).toBe(expected);
    }
  );

  it('watches under `deno run --watch`, which restarts in-process', async () => {
    getProcessChainCommandsMock.mockResolvedValue([
      'deno run -A --watch src/index.ts',
      '-zsh',
    ]);

    expect(await getIsServerDevelopment()).toBe(true);
  });
});

describe('prepareIntlayerServer', () => {
  it('reads the process list once per process, however often it registers', async () => {
    vi.stubEnv('NODE_ENV', undefined);
    vi.stubEnv('npm_lifecycle_event', undefined);
    vi.stubEnv('INTLAYER_WATCH', undefined);
    getProcessChainCommandsMock.mockReset();
    getProcessChainCommandsMock.mockResolvedValue(['nodemon dist/index.js']);

    const configuration = {
      content: { watch: true },
    } as unknown as IntlayerConfig;

    prepareIntlayerServer(configuration, { label: 'fastify-intlayer' });
    prepareIntlayerServer(configuration, { label: 'fastify-intlayer' });
    prepareIntlayerServer(configuration, { label: 'fastify-intlayer' });

    await vi.waitFor(() =>
      expect(startContentWatcherMock).toHaveBeenCalledTimes(3)
    );
    expect(getProcessChainCommandsMock).toHaveBeenCalledTimes(1);

    vi.unstubAllEnvs();
  });
});
