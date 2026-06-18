import { writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { readAsset } from 'utils:asset';
import { colorizePath, logger, v } from '@intlayer/config/logger';
import {
  type configurationFilesCandidates,
  searchConfigurationFile,
} from '@intlayer/config/node';

/**
 * UTILITIES
 */
const rootDir = process.cwd();

// Helper to write a file
const writeFileToRoot = async (filePath: string, content: string) =>
  await writeFile(join(rootDir, filePath), content, 'utf8');

type ConfigFormat = 'ts' | 'cjs' | 'mjs' | 'js' | 'json';

const getTemplatePath = (format: ConfigFormat) => {
  switch (format) {
    case 'ts':
      return './templates/ts.txt';
    case 'cjs':
      return './templates/cjs.txt';
    case 'mjs':
      return './templates/mjs.txt';
    case 'js':
      return './templates/mjs.txt';
    case 'json':
      return './templates/json.txt';
    default:
      return './templates/ts.txt';
  }
};

/**
 * Initialize the Intlayer configuration file
 */
export const initConfig = async (
  format: (typeof configurationFilesCandidates)[number],
  baseDir: string,
  locales?: string[]
) => {
  //   Search for configuration file
  const { configurationFilePath } = searchConfigurationFile(baseDir);

  //   return if the configuration file is found
  if (configurationFilePath) {
    const relativePath = relative(baseDir, configurationFilePath);
    logger(`${v} ${colorizePath(relativePath)} already exists`);
    return;
  }

  // Extract the format from the filename (e.g. 'intlayer.config.ts' -> 'ts')
  const extension = format.split('.').pop() as ConfigFormat;

  const templatePath = getTemplatePath(extension);
  let configContent = readAsset(templatePath);

  if (locales && locales.length > 0) {
    if (extension === 'json') {
      const localesString = JSON.stringify(locales);
      configContent = configContent.replace('["en"]', localesString);
    } else {
      const localesString = `[${locales.map((locale) => `'${locale}'`).join(', ')}]`;
      configContent = configContent.replace('[Locales.ENGLISH]', localesString);
    }
  }

  await writeFileToRoot(format, configContent);
  logger(`${v} Created ${colorizePath(format)}`);
};
