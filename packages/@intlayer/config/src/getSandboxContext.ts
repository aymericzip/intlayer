import type { Context } from 'vm';
import React from 'react';
import {
  type LoadEnvFileOptions,
  loadEnvFile,
} from './envVariables/loadEnvFile';
import { ESMxCJSRequire } from './utils/ESMxCJSRequire';

export const getSandBoxContext = (
  envVarOptions?: LoadEnvFileOptions
): Context => {
  const sandboxContext: Context = {
    exports: {
      default: {},
    },
    module: {
      exports: {},
    },
    React,
    process: { ...process, env: loadEnvFile(envVarOptions) },
    console,
    require: ESMxCJSRequire,
  };

  return sandboxContext;
};
