import { join, relative } from 'node:path';
import * as ANSIColors from '@intlayer/config/colors';
import { getEnvFilePath } from '@intlayer/config/env';
import {
  colorize,
  colorizePath,
  getAppLogger,
  x,
} from '@intlayer/config/logger';
import {
  type GetConfigurationOptions,
  getConfigurationAndFilePath,
  validateConfiguration,
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
        void validateConfiguration(customConfiguration).then((issues) => {
          if (issues.length === 0) return;

          const errorMessages = issues
            .map(({ path, message }) => {
              const colorizedPath = colorizePath(` - ${path}:`);
              const colorizedMessage = colorize(message, ANSIColors.GREY_DARK);
              return `${colorizedPath} ${colorizedMessage}`;
            })
            .join('\n');

          appLogger(`${x} Invalid configuration:\n${errorMessages}`);
        });

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
