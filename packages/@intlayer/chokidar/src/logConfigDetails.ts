import { relative } from 'node:path';
import { getEnvFilePath } from '@intlayer/config/env';
import { getAppLogger } from '@intlayer/config/logger';
import {
  type GetConfigurationOptions,
  getConfigurationAndFilePath,
} from '@intlayer/config/node';
import { formatPath } from './utils';

export const logConfigDetails = (options?: GetConfigurationOptions) => {
  const { configuration, numCustomConfiguration, configurationFilePath } =
    getConfigurationAndFilePath(options);
  const appLogger = getAppLogger(configuration);

  if (numCustomConfiguration === 0) {
    appLogger('Configuration file not found, using default configuration.', {
      isVerbose: true,
    });
  } else {
    const baseDir = configuration.content.baseDir;
    const relativeOutputPath = relative(baseDir, configurationFilePath!);

    if (numCustomConfiguration === 1) {
      const dotEnvFilePath = getEnvFilePath(options?.env, options?.envFile);

      appLogger(
        `Configuration loaded ${formatPath(relativeOutputPath)}${dotEnvFilePath ? ` - Env: ${formatPath(dotEnvFilePath)}` : ''}`,
        {
          isVerbose: true,
        }
      );
    } else {
      appLogger(
        `Multiple configuration files found, using ${formatPath(relativeOutputPath)}.`,
        {
          isVerbose: true,
        }
      );
    }
  }
};
