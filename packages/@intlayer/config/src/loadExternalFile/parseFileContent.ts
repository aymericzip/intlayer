import { type Context, runInNewContext } from 'node:vm';
import * as esbuild from 'esbuild';
import { type LoadEnvFileOptions, loadEnvFile } from '../loadEnvFile';
import { ESMxCJSRequire } from '../utils/ESMxCJSHelpers';

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

export const getSandBoxContext = (options?: SandBoxContextOptions): Context => {
  const { envVarOptions, projectRequire, additionalEnvVars, mocks, aliases } =
    options ?? {};

  let additionalGlobalVar = {};

  const baseRequire: NodeJS.Require =
    typeof projectRequire === 'function' ? projectRequire : ESMxCJSRequire;

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

  try {
    // Dynamically try to require React if it's installed in the project
    additionalGlobalVar = {
      React: baseRequire('react'),
    };
  } catch (_err) {
    // React is not installed, so we don't inject it
  }

  const sandboxContext: Context = {
    exports: {
      default: {},
    },
    module: {
      exports: {},
    },
    process: {
      ...process,
      env: {
        ...process.env,
        ...loadEnvFile(envVarOptions),
        ...additionalEnvVars,
      },
    },
    console,
    require: mockedRequire,
    ...additionalGlobalVar,
  };

  // Dynamically inject all global variables
  Object.getOwnPropertyNames(globalThis).forEach((key) => {
    if (!(key in sandboxContext)) {
      sandboxContext[key] = globalThis[key as keyof typeof globalThis];
    }
  });

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

  for (const candidate of candidates) {
    if (
      candidate &&
      typeof candidate === 'object' &&
      Object.keys(candidate as object).length > 0
    ) {
      return candidate as T;
    }
  }
};
