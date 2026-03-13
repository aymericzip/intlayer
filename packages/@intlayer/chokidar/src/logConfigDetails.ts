import { join, relative } from 'node:path';
import { getEnvFilePath } from '@intlayer/config/env';
import {
  ANSIColors,
  colorize,
  colorizePath,
  getAppLogger,
  x,
} from '@intlayer/config/logger';
import {
  type GetConfigurationOptions,
  getConfigurationAndFilePath,
  intlayerConfigSchema,
} from '@intlayer/config/node';
import { formatPath, runOnce } from './utils';

export const logConfigDetails = (options?: GetConfigurationOptions) => {
  const {
    configuration,
    customConfiguration,
    numCustomConfiguration,
    configurationFilePath,
  } = getConfigurationAndFilePath(options);
  const appLogger = getAppLogger(configuration);

  runOnce(
    join(
      configuration.system.baseDir,
      '.intlayer',
      'cache',
      'intlayer-config-locaded.lock'
    ),
    () => {
      if (numCustomConfiguration === 0) {
        appLogger(
          'Configuration file not found, using default configuration.',
          {
            isVerbose: true,
          }
        );
      } else {
        const baseDir = configuration.system.baseDir;
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

      if (customConfiguration) {
        const validation = intlayerConfigSchema.safeParse(customConfiguration);

        if (!validation.success) {
          const errorMessages = validation.error.issues
            .map((error) => {
              const path = colorizePath(` - ${error.path.join('.')}:`);
              const message = colorize(error.message, ANSIColors.GREY_DARK);
              return `${path} ${message}`;
            })
            .join('\n');
          const errorMessage = `${x} Invalid configuration:\n${errorMessages}`;

          appLogger(errorMessage);
        }

        if (customConfiguration.build?.importMode) {
          appLogger(
            `${colorize('build.importMode', ANSIColors.BLUE)} is deprecated, use ${colorize('dictionary.importMode', ANSIColors.BLUE)} instead`
          );
        }
        if (customConfiguration.compiler?.transformPattern) {
          appLogger(
            `${colorize('compiler.transformPattern', ANSIColors.BLUE)} is deprecated, use ${colorize('build.traversePattern', ANSIColors.BLUE)} instead`
          );
        }
        if (customConfiguration.compiler?.excludePattern) {
          appLogger(
            `${colorize('compiler.excludePattern', ANSIColors.BLUE)} is deprecated, use ${colorize('build.traversePattern', ANSIColors.BLUE)} instead`
          );
        }
      }
    },
    {
      cacheTimeoutMs: 1000 * 60, // 1 minute
    }
  );
};
