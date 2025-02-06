import { Context } from 'vm';
import { loadEnvFile, LoadEnvFileOptions } from './envVariables/loadEnvFile';
import { ESMxCJSRequire } from './utils/ESMxCJSRequire';
import React from 'react';

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
