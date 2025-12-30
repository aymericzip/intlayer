import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { logger } from '../logger';
import { getPackageJsonPath } from '../utils/getPackageJsonPath';

export const configurationFilesCandidates = [
  'intlayer.config.ts',
  'intlayer.config.js',
  'intlayer.config.json',
  'intlayer.config.cjs',
  'intlayer.config.mjs',
  '.intlayerrc',
] as const;

type SearchConfigurationFileResult = {
  configurationFilePath?: string;
  numCustomConfiguration: number;
};

/**
 * Search for the configuration file in the given path
 *
 * List of detected configuration files:
 * - intlayer.config.ts
 * - intlayer.config.js
 * - intlayer.config.json
 * - intlayer.config.cjs
 * - intlayer.config.mjs
 * - .intlayerrc
 */
export const searchConfigurationFile = (
  startDir: string
): SearchConfigurationFileResult => {
  let configurationFilePath: string | undefined;
  let numCustomConfiguration = 0;

  const { baseDir } = getPackageJsonPath(startDir);

  for (const fileName of configurationFilesCandidates) {
    try {
      const filePath = resolve(baseDir, fileName);

      // Check if the file exists
      if (!existsSync(filePath)) {
      } else {
        numCustomConfiguration += 1;

        if (!configurationFilePath) {
          configurationFilePath = filePath;
        }
      }
    } catch (error) {
      // Return "Cannot use import statement outside a module"
      logger(`${fileName}: ${error as string}`, { level: 'error' });
    }
  }

  return { configurationFilePath, numCustomConfiguration };
};
