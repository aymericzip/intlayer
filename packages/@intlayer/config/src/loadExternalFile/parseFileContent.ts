import { type Context, runInNewContext } from 'node:vm';
import * as esbuild from 'esbuild';
import { type LoadEnvFileOptions, loadEnvFile } from '../loadEnvFile';
import { getProjectRequire } from '../utils/ESMxCJSHelpers';

export type SandBoxContextOptions = {
  envVarOptions?: LoadEnvFileOptions;
  projectRequire?: NodeJS.Require;
  additionalEnvVars?: Record<string, string>;
  /**
   * Map of specifier -> mocked export to be returned when code in the VM calls require(specifier).
   * Example:
   *   mocks: {
   *     '@intlayer/config/built': { getConfig: () => ({}), Locales: {} }
   *   }
   */
  mocks?: Record<string, any>;
  /**
   * Optional alias map if you want to redirect specifiers.
   * Useful when user code imports a subpath you want to collapse.
   * Example:
   *   aliases: { '@intlayer/config/built': '@intlayer/config' }
   */
  aliases?: Record<string, string>;
};

// Inject only Node.js-specific globals that are absent from a plain V8 context.
// JS built-ins (Object, Array, Promise, Math, Date, JSON, Symbol, etc.) are
// provided automatically by runInNewContext — no need to copy them.
// Copying all of globalThis would retain hundreds of references (including the
// full module cache via `global`) inside every sandbox, causing a memory leak.
const NODE_GLOBALS = [
  'Buffer',
  'setTimeout',
  'clearTimeout',
  'setInterval',
  'clearInterval',
  'setImmediate',
  'clearImmediate',
  'queueMicrotask',
  'URL',
  'URLSearchParams',
  'TextEncoder',
  'TextDecoder',
  'AbortController',
  'AbortSignal',
  'performance',
  'fetch',
  'crypto',
  'structuredClone',
] as const;

/**
 * Cache of the project's React module (or the JSX-capturing fallback) keyed by
 * the require's resolution paths. Node does not cache *failed* resolutions, so
 * without this every sandbox creation in a non-React project (Vue, Svelte,
 * Angular…) pays a full node_modules walk that ends in a throw.
 */
const reactModuleCache = new Map<string, { React: unknown }>();

/**
 * Fallback React implementation used when React is not installed in the
 * project. It captures JSX elements as plain objects so JSX can be used in
 * content declarations (esbuild's tsx loader defaults to React.createElement).
 */
const createFallbackReact = () => ({
  createElement: (type: any, props: any, ...children: any[]) => ({
    type,
    props: {
      ...props,
      children: children.length <= 1 ? children[0] : children,
    },
  }),
  Fragment: Symbol.for('react.fragment'),
});

const getReactGlobal = (baseRequire: NodeJS.Require): { React: unknown } => {
  // resolve.paths() is computed in-memory (no fs access) and identifies the
  // node_modules chain this require instance resolves against.
  const resolutionKey =
    baseRequire.resolve.paths?.('react')?.join('|') ?? '<default>';

  const cachedReactModule = reactModuleCache.get(resolutionKey);
  if (cachedReactModule) return cachedReactModule;

  let reactGlobal: { React: unknown };
  try {
    // Dynamically try to require React if it's installed in the project
    reactGlobal = { React: baseRequire('react') };
  } catch (_err) {
    reactGlobal = { React: createFallbackReact() };
  }

  reactModuleCache.set(resolutionKey, reactGlobal);

  return reactGlobal;
};

/**
 * Snapshot of the non-env `process` properties, taken once at module load.
 * Spreading `process` enumerates ~100 properties (some behind getters); doing
 * it per sandbox is wasteful since everything except `env` is static.
 */
const processSnapshot = { ...process };

/**
 * Builds the global context handed to `runInNewContext`.
 *
 * SECURITY NOTE: this sandbox exists for global-scope hygiene (fresh
 * module/exports, controlled env), NOT for containment. It exposes the real
 * project `require`, a copy of `process`, and `fetch` — code executed here has
 * full host privileges. Only ever run trusted, build-time project files
 * (same trust model as `vite.config.ts`).
 */
export const getSandBoxContext = (options?: SandBoxContextOptions): Context => {
  const { envVarOptions, projectRequire, additionalEnvVars, mocks, aliases } =
    options ?? {};

  const baseRequire: NodeJS.Require =
    typeof projectRequire === 'function' ? projectRequire : getProjectRequire();

  // Wrap require to honor mocks and aliases inside the VM
  const mockedRequire: NodeJS.Require = (() => {
    const mockTable = Object.assign(
      {
        esbuild,
      },
      mocks
    );
    const aliasTable = Object.assign({}, aliases);

    const wrappedRequire = function mockableRequire(id: string) {
      const target = aliasTable?.[id] ? aliasTable[id] : id;

      if (mockTable && Object.hasOwn(mockTable, target)) {
        return mockTable[target];
      }

      // If the original id was aliased, allow mocks to be defined on either key.
      if (target !== id && mockTable && Object.hasOwn(mockTable, id)) {
        return mockTable[id];
      }

      return baseRequire(target);
    } as NodeJS.Require;

    // Mirror NodeJS.Require properties
    wrappedRequire.resolve = baseRequire.resolve.bind(baseRequire);
    wrappedRequire.main = baseRequire.main;
    wrappedRequire.extensions = baseRequire.extensions;
    wrappedRequire.cache = baseRequire.cache;

    return wrappedRequire;
  })();

  const sandboxContext: Context = {
    exports: {
      default: {},
    },
    module: {
      exports: {},
    },
    process: {
      ...processSnapshot,
      env: {
        ...process.env,
        ...loadEnvFile(envVarOptions),
        ...additionalEnvVars,
      },
    },
    console,
    require: mockedRequire,
    ...getReactGlobal(baseRequire),
  };

  for (const key of NODE_GLOBALS) {
    if (!(key in sandboxContext) && key in globalThis) {
      (sandboxContext as Record<string, unknown>)[key] =
        globalThis[key as keyof typeof globalThis];
    }
  }

  return sandboxContext;
};

export const parseFileContent = <T>(
  fileContentString: string,
  options?: SandBoxContextOptions
): T | undefined => {
  const sandboxContext = getSandBoxContext(options);

  // Force strict mode so illegal writes throw instead of silently failing.
  runInNewContext(`"use strict";\n${fileContentString}`, sandboxContext);

  const candidates: unknown[] = [
    sandboxContext.exports?.default,
    sandboxContext.module?.exports?.defaults,
    sandboxContext.module?.exports?.default,
    sandboxContext.module?.exports,
  ];

  let result: T | undefined;
  for (const candidate of candidates) {
    if (
      candidate &&
      typeof candidate === 'object' &&
      Object.keys(candidate as object).length > 0
    ) {
      result = candidate as T;
      break;
    }
  }

  // Drop heavy references so the V8 context created by runInNewContext can be
  // garbage-collected promptly. The extracted `result` is a plain data object
  // and does not retain the sandbox.
  (sandboxContext as Record<string, unknown>).require = undefined;
  (sandboxContext as Record<string, unknown>).process = undefined;
  (sandboxContext as Record<string, unknown>).React = undefined;
  (sandboxContext as Record<string, unknown>).module = undefined;
  (sandboxContext as Record<string, unknown>).exports = undefined;

  return result;
};
