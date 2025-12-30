import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  colorizePath,
  type configurationFilesCandidates,
  logger,
  searchConfigurationFile,
  v,
} from '@intlayer/config';

/**
 * UTILITIES
 */
const rootDir = process.cwd();
export const isESModule = typeof import.meta.url === 'string';

const currentFileDir = isESModule
  ? dirname(fileURLToPath(import.meta.url))
  : __dirname;

// Helper to write a file
const writeFileToRoot = async (filePath: string, content: string) =>
  await writeFile(join(rootDir, filePath), content, 'utf8');

// Helper to read a template file
const readTemplate = async (templatePath: string) =>
  await readFile(join(currentFileDir, 'templates', templatePath), 'utf8');

type ConfigFormat = 'ts' | 'cjs' | 'mjs' | 'js' | 'json';

const getTemplatePath = (format: ConfigFormat) => {
  switch (format) {
    case 'ts':
      return 'ts.txt';
    case 'cjs':
      return 'cjs.txt';
    case 'mjs':
      return 'mjs.txt';
    case 'js':
      return 'js.txt';
    case 'json':
      return 'json.txt';
    default:
      return 'ts.txt';
  }
};

/**
 * Initialize the Intlayer configuration file
 */
export const initConfig = async (
  format: (typeof configurationFilesCandidates)[number],
  baseDir: string
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
  const configContent = await readTemplate(templatePath);

  await writeFileToRoot(format, configContent);
  logger(`Created ${format}`);
};
