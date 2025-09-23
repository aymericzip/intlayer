import type { Context } from 'vm';
import { type LoadEnvFileOptions, loadEnvFile } from './loadEnvFile';
import { ESMxCJSRequire } from './utils/ESMxCJSHelpers';

export const getSandBoxContext = (
  envVarOptions?: LoadEnvFileOptions,
  projectRequire = ESMxCJSRequire
): Context => {
  let additionalGlobalVar = {};

  try {
    // Dynamically try to require React if it's installed in the project
    additionalGlobalVar = {
      React: projectRequire('react'),
    };
  } catch (err) {
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
      },
    },
    console,
    require: projectRequire,
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
