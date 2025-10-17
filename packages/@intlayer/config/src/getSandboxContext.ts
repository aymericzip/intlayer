import type { Context } from 'node:vm';
import * as intlayerTypes from '@intlayer/types';
import { type LoadEnvFileOptions, loadEnvFile } from './loadEnvFile';
import { ESMxCJSRequire } from './utils/ESMxCJSHelpers';

export const getSandBoxContext = (
  envVarOptions?: LoadEnvFileOptions,
  projectRequire?: NodeJS.Require,
  additionalEnvVars?: Record<string, string>
): Context => {
  let additionalGlobalVar = {};

  const safeRequire =
    typeof projectRequire === 'function' ? projectRequire : ESMxCJSRequire;

  // Wrap require to intercept @intlayer/types
  const wrappedRequire = ((moduleName: string) => {
    switch (moduleName) {
      case '@intlayer/types':
        return intlayerTypes;

      default:
        return safeRequire(moduleName);
    }
  }) as NodeJS.Require;

  // Copy require properties
  wrappedRequire.resolve = safeRequire.resolve;
  wrappedRequire.cache = safeRequire.cache;
  wrappedRequire.extensions = safeRequire.extensions;
  wrappedRequire.main = safeRequire.main;

  try {
    // Dynamically try to require React if it's installed in the project
    additionalGlobalVar = {
      React: safeRequire('react'),
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
    require: ESMxCJSRequire,
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
