import { runInNewContext } from 'vm';
import { transformFileSync } from '@swc/core';
import { searchConfigurationFile } from './searchConfigurationFile';
import type { CustomIntlayerConfig } from './types';

export const loadConfigurationFile = (
  baseDirPath: string
): CustomIntlayerConfig | undefined => {
  let customConfiguration: CustomIntlayerConfig | undefined = undefined;

  const configFilePath = searchConfigurationFile(baseDirPath);

  if (!configFilePath) {
    return;
  }

  const configFileExtension = configFilePath.split('.').pop() ?? '';

  try {
    if (['ts', 'js', 'mjs'].includes(configFileExtension)) {
      // Transpile the code
      const moduleResult = transformFileSync(configFilePath, {
        jsc: {
          target: 'es5',
        },
        module: {
          type: 'commonjs',
        },
      }).code;

      // Run the transpiled code and get the result
      const sandbox = {
        exports: {
          default: {},
        },
        module: {
          exports: {},
        },
        console: console,
        require: require,
      };

      runInNewContext(moduleResult, sandbox);

      if (Object.keys(sandbox.exports.default).length > 0) {
        // ES Module
        customConfiguration = sandbox.exports.default;
      } else if (Object.keys(sandbox.module.exports).length > 0) {
        // CommonJS
        customConfiguration = sandbox.module.exports;
      }
    } else if (configFileExtension === 'cjs') {
      // CommonJS
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const configurationFileContent = require(configFilePath);

      customConfiguration = configurationFileContent.default;
    } else {
      // JSON
      customConfiguration = require(configFilePath);
    }

    return customConfiguration;
  } catch (error) {
    console.error('Error:', error);
  }
};
