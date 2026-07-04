import { writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { readAsset } from 'utils:asset';
import { colorizePath, logger, v } from '@intlayer/config/logger';
import {
  type configurationFilesCandidates,
  searchConfigurationFile,
} from '@intlayer/config/node';

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

/** Values injected into the configuration file template. */
export type InitConfigOptions = {
  /** Locales detected in the project, inserted into `internationalization.locales`. */
  locales?: string[];
  /**
   * Dev-server URL of the detected framework, inserted as
   * `editor.applicationURL` (the template defaults to `http://localhost:3000`).
   */
  applicationURL?: string;
};

/**
 * Initialize the Intlayer configuration file. No-ops when a configuration file
 * already exists at `baseDir`.
 */
export const initConfig = async (
  format: (typeof configurationFilesCandidates)[number],
  baseDir: string,
  options?: InitConfigOptions
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

  const { locales, applicationURL } = options ?? {};

  if (locales && locales.length > 0) {
    if (extension === 'json') {
      const localesString = JSON.stringify(locales);
      configContent = configContent.replace('["en"]', localesString);
    } else {
      const localesString = `[${locales.map((locale) => `'${locale}'`).join(', ')}]`;
      configContent = configContent.replace('[Locales.ENGLISH]', localesString);
    }
  }

  if (applicationURL) {
    configContent = configContent.replace(
      'http://localhost:3000',
      applicationURL
    );
  }

  await writeFile(join(baseDir, format), configContent, 'utf8');
  logger(`${v} Created ${colorizePath(format)}`);
};
