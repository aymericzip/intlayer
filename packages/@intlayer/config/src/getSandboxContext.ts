import type { Context } from 'vm';
import {
  type LoadEnvFileOptions,
  loadEnvFile,
} from './envVariables/loadEnvFile';
import { ESMxCJSRequire } from './utils/ESMxCJSRequire';

export const getSandBoxContext = (
  envVarOptions?: LoadEnvFileOptions
): Context => {
  let ReactModule;

  try {
    // Dynamically try to require React if it's installed in the project
    ReactModule = ESMxCJSRequire('react');
  } catch (err) {
    // React is not installed, so we don't inject it
    ReactModule = undefined;
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
    require: ESMxCJSRequire,
    ...(ReactModule ? { React: ReactModule } : {}), // Only inject React if found
  };

  // Dynamically inject all global variables
  Object.getOwnPropertyNames(globalThis).forEach((key) => {
    if (!(key in sandboxContext)) {
      sandboxContext[key] = globalThis[key as keyof typeof globalThis];
    }
  });

  return sandboxContext;
};
