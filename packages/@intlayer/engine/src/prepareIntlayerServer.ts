import { getAppLogger } from '@intlayer/config/logger';
import type { IntlayerConfig } from '@intlayer/types/config';
import { prepareIntlayer } from './prepareIntlayer';
import { getProcessChainCommands } from './utils/getProcessChainCommands';
import { startContentWatcher } from './utils/startContentWatcher';

/**
 * Explicit override, for any setup the detection below does not recognise:
 * `INTLAYER_WATCH=true` forces the content watcher on, `INTLAYER_WATCH=false`
 * forces it off.
 */
export const INTLAYER_WATCH_ENV_VAR = 'INTLAYER_WATCH';

/** Runtime flags that restart or reload the process on file changes. */
const WATCH_MODE_EXEC_ARGUMENTS = ['--watch', '--watch-path', '--hot'];

/**
 * Environment variables set on the child process by a restarting watcher:
 * `node --watch` and `ts-node-dev`.
 */
const WATCH_MODE_ENV_VARS = ['WATCH_REPORT_DEPENDENCIES', 'TS_NODE_DEV'];

/**
 * Package script names that start a dev server (`dev`, `start:dev`,
 * `dev:api`, `watch`…), matched on the `npm_lifecycle_event` that npm, pnpm,
 * yarn and bun set for `<pm> run <script>`.
 */
const DEV_SCRIPT_NAME_PATTERN = /\b(dev|develop|development|watch)\b/;

/**
 * Command lines of the tools that restart a server on file changes, matched on
 * this process and the ones above it. Needed because most of them leave no
 * trace in the child itself.
 *
 * - Dedicated restarters, matched on their executable name (`nodemon`,
 *   `watchexec`, `entr`…).
 * - `tsx watch`, whose watch mode is a subcommand.
 * - Any runtime or CLI given `--watch` / `--hot`: `deno run --watch` (which
 *   restarts in-process), `nest start --watch`, `tsup --watch --onSuccess`…
 * - The `-w` shorthand of build tools that run the server on each rebuild
 *   (`tsdown -w --on-success "node dist/index.mjs"`).
 */
const DEV_WATCHER_COMMAND_PATTERNS = [
  /(^|[\s/])(nodemon|ts-node-dev|tsnd|node-dev|tsc-watch|supervisor|watchexec|entr|chokidar|onchange)(\.c?m?js)?(\s|$)/,
  /(^|[\s/])tsx(\/dist\/cli\.m?js)?\s+watch(\s|$)/,
  /\s--(watch|watch-path|hot)(=|\s|$)/,
  // `-w` alone is too common a flag (`grep -w`), so it only counts after a
  // build tool whose `-w` means watch (`tsdown -w --on-success …`, `tsup -w`).
  /(^|[\s/])(tsdown|tsup|tsc|rollup|rolldown)(\/\S*)?(\s+\S+)*\s+-w(\s|$)/,
];

/**
 * Whether a command line is a watcher that restarts its child on changes.
 *
 * @example
 * ```ts
 * getIsDevWatcherCommand('node /app/node_modules/.bin/nodemon src/index.ts'); // → true
 * getIsDevWatcherCommand('node dist/index.js'); // → false
 * ```
 */
export const getIsDevWatcherCommand = (command: string): boolean =>
  DEV_WATCHER_COMMAND_PATTERNS.some((pattern) => pattern.test(command));

/**
 * Whether this process runs under a watcher that restarts or reloads it
 * (`bun --watch`/`--hot`, `node --watch`, `ts-node-dev`).
 */
const getIsWatchModeProcess = (): boolean =>
  process.execArgv.some((argument) =>
    WATCH_MODE_EXEC_ARGUMENTS.some(
      (flag) => argument === flag || argument.startsWith(`${flag}=`)
    )
  ) || WATCH_MODE_ENV_VARS.some((envVar) => Boolean(process.env[envVar]));

/**
 * Whether a server process runs in development, and so should watch the
 * content declarations.
 *
 * `INTLAYER_WATCH=true|false` decides first, then `NODE_ENV` when set. An unset
 * `NODE_ENV` is not a sign of development (`bun dist/index.mjs` rarely sets
 * it), so the process must then show a positive signal, cheapest first:
 * 1. a runtime watch flag or marker (`bun --watch`/`--hot`, `node --watch`,
 *    `ts-node-dev`);
 * 2. a `dev`-like package script;
 * 3. a restarting watcher in its own command line or its ancestors'
 *    (`deno run --watch`, `nodemon`, `tsx watch`…), for those started
 *    directly rather than through a script.
 */
export const getIsServerDevelopment = async (): Promise<boolean> => {
  const watchOverride = process.env[INTLAYER_WATCH_ENV_VAR]?.toLowerCase();

  if (watchOverride === 'true' || watchOverride === '1') return true;
  if (watchOverride === 'false' || watchOverride === '0') return false;

  const nodeEnv = process.env['NODE_ENV'];

  if (nodeEnv) return nodeEnv === 'development';

  if (getIsWatchModeProcess()) return true;

  if (DEV_SCRIPT_NAME_PATTERN.test(process.env['npm_lifecycle_event'] ?? '')) {
    return true;
  }

  const processChainCommands = await getProcessChainCommands();

  return processChainCommands.some(getIsDevWatcherCommand);
};

/**
 * The dev check of this process, computed once: its answer cannot change for
 * the life of the process, and Fastify, Elysia or Remix may register the
 * integration more than once.
 */
let serverDevelopmentPromise: Promise<boolean> | undefined;

const getIsServerDevelopmentOnce = (): Promise<boolean> => {
  serverDevelopmentPromise ??= getIsServerDevelopment();

  return serverDevelopmentPromise;
};

export type PrepareIntlayerServerOptions = {
  /**
   * How the integration names itself in the watcher lock and in messages, e.g.
   * `express-intlayer`.
   */
  label: string;
  /**
   * Whether to watch the content declarations after preparing them.
   * Defaults to {@link getIsServerDevelopment}.
   */
  watch?: boolean;
};

/**
 * Prepares the dictionaries for a server integration (Express, Fastify, Hono…)
 * and, in development, keeps them in sync with the content declarations.
 *
 * Replaces wrapping the dev server in `intlayer watch --with`: the watcher runs
 * inside the server, deduplicated through the project's watcher lock, so a
 * server restarted by `tsx watch` / `node --watch` hands it over to its
 * successor, and a remaining `intlayer watch` makes it stand down.
 *
 * Fire-and-forget: the server must not wait on the build to start listening.
 *
 * @param configuration - The resolved Intlayer configuration.
 * @param options - How the integration identifies itself, and whether to watch.
 *
 * @example
 * ```ts
 * prepareIntlayerServer(getConfiguration(), { label: 'express-intlayer' });
 * ```
 */
export const prepareIntlayerServer = (
  configuration: IntlayerConfig,
  { label, watch }: PrepareIntlayerServerOptions
): void => {
  prepareIntlayer(configuration)
    .then(async () => {
      if (!configuration.content.watch) return;

      const shouldWatch = watch ?? (await getIsServerDevelopmentOnce());

      if (shouldWatch) startContentWatcher(configuration, { label });
    })
    .catch((error: unknown) => {
      getAppLogger(configuration)(
        ['Failed to prepare Intlayer dictionaries:', error],
        { level: 'error' }
      );
    });
};
