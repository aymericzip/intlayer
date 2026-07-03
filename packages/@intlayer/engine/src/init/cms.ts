import * as ANSIColors from '@intlayer/config/colors';
import { colorize, colorizePath, logger, v, x } from '@intlayer/config/logger';
import fg from 'fast-glob';
import {
  enableIntlayerEditorConfig,
  type RoutingMode,
  setIntlayerConfigRoutingMode,
} from './utils/configManipulation';
import { exists, readFileFromRoot, writeFileToRoot } from './utils/fileSystem';

/**
 * Intlayer configuration file candidates, ordered by the precedence used when
 * resolving which file to mutate.
 */
export const INTLAYER_CONFIG_FILE_CANDIDATES = [
  'intlayer.config.ts',
  'intlayer.config.mjs',
  'intlayer.config.js',
  'intlayer.config.cjs',
  'intlayer.config.json',
] as const;

/**
 * Environment files searched (most-preferred first) when persisting the CMS
 * credentials. The first existing match is reused; otherwise a `.env` file is
 * created at the project root.
 */
const ENV_FILE_CANDIDATES = ['.env', '.env.local', '.env.development'] as const;

/** Credentials returned by the CMS login flow (access key pair). */
export type CmsCredentials = {
  clientId: string;
  clientSecret: string;
};

/**
 * Resolves the first existing Intlayer configuration file at the project root,
 * or `undefined` when none is present.
 */
const findIntlayerConfigFile = async (
  rootDir: string
): Promise<(typeof INTLAYER_CONFIG_FILE_CANDIDATES)[number] | undefined> => {
  for (const candidate of INTLAYER_CONFIG_FILE_CANDIDATES) {
    if (await exists(rootDir, candidate)) {
      return candidate;
    }
  }

  return undefined;
};

/**
 * Locates the environment file the CMS credentials should be written to. Uses
 * `fast-glob` to detect an existing dotenv file at the project root, preferring
 * a plain `.env`; falls back to `.env` (to be created) when none exist.
 */
export const findEnvFile = async (rootDir: string): Promise<string> => {
  const matches = await fg([...ENV_FILE_CANDIDATES], {
    cwd: rootDir,
    dot: true,
    deep: 1,
    onlyFiles: true,
  });

  return (
    ENV_FILE_CANDIDATES.find((candidate) => matches.includes(candidate)) ??
    '.env'
  );
};

/**
 * Inserts or updates a `KEY=value` line in dotenv file content. An existing
 * assignment of the same key is replaced in place; otherwise the line is
 * appended with a trailing newline.
 */
const upsertEnvVariable = (
  content: string,
  key: string,
  value: string
): string => {
  const line = `${key}=${value}`;
  const keyMatcher = new RegExp(`^${key}=.*$`, 'm');

  if (keyMatcher.test(content)) {
    return content.replace(keyMatcher, line);
  }

  const needsLeadingNewline = content.length > 0 && !content.endsWith('\n');

  return `${content}${needsLeadingNewline ? '\n' : ''}${line}\n`;
};

/**
 * Persists the CMS access-key credentials to the project's environment file as
 * `INTLAYER_CLIENT_ID` / `INTLAYER_CLIENT_SECRET`. The target file is detected
 * with {@link findEnvFile} and created when missing. Returns the relative path
 * of the file that was written.
 */
export const writeCmsCredentialsToEnv = async (
  rootDir: string,
  { clientId, clientSecret }: CmsCredentials
): Promise<string> => {
  const envFile = await findEnvFile(rootDir);

  let content = '';
  if (await exists(rootDir, envFile)) {
    content = await readFileFromRoot(rootDir, envFile);
  }

  let updatedContent = content;
  updatedContent = upsertEnvVariable(
    updatedContent,
    'INTLAYER_CLIENT_ID',
    clientId
  );
  updatedContent = upsertEnvVariable(
    updatedContent,
    'INTLAYER_CLIENT_SECRET',
    clientSecret
  );

  await writeFileToRoot(rootDir, envFile, updatedContent);
  logger(
    `${v} Saved Intlayer CMS credentials to ${colorizePath(envFile)} (${colorize('INTLAYER_CLIENT_ID', ANSIColors.GREY_LIGHT)}, ${colorize('INTLAYER_CLIENT_SECRET', ANSIColors.GREY_LIGHT)})`
  );

  return envFile;
};

/**
 * Enables the Intlayer visual editor in the project's configuration file:
 * flips `editor.enabled` to `true` and wires `clientId` / `clientSecret` to the
 * matching environment variables. JSON configs cannot reference `process.env`,
 * so they are skipped with a warning. Returns the config file that was updated,
 * or `undefined` when no editable config was found.
 */
export const enableEditorInConfig = async (
  rootDir: string
): Promise<string | undefined> => {
  const configFile = await findIntlayerConfigFile(rootDir);

  if (!configFile) {
    logger(
      `${x} Could not find an Intlayer configuration file to enable the editor.`,
      { level: 'warn' }
    );
    return undefined;
  }

  const extension = configFile.split('.').pop()!;

  if (extension === 'json') {
    logger(
      `${x} ${colorizePath(configFile)} is a JSON config and cannot reference environment variables. Enable the editor and set clientId/clientSecret manually.`,
      { level: 'warn' }
    );
    return undefined;
  }

  const content = await readFileFromRoot(rootDir, configFile);
  const updatedContent = enableIntlayerEditorConfig(content);

  if (updatedContent !== content) {
    await writeFileToRoot(rootDir, configFile, updatedContent);
    logger(`${v} Enabled the Intlayer editor in ${colorizePath(configFile)}`);
  } else {
    logger(
      `${v} ${colorizePath(configFile)} already has the Intlayer editor enabled`
    );
  }

  return configFile;
};

/**
 * Sets `routing.mode` in the project's Intlayer configuration file. Returns the
 * config file that was updated, or `undefined` when none was found.
 */
export const setRoutingModeInConfig = async (
  rootDir: string,
  mode: RoutingMode
): Promise<string | undefined> => {
  const configFile = await findIntlayerConfigFile(rootDir);

  if (!configFile) return undefined;

  const extension = configFile.split('.').pop()!;
  const content = await readFileFromRoot(rootDir, configFile);
  const updatedContent = setIntlayerConfigRoutingMode(content, extension, mode);

  if (updatedContent !== content) {
    await writeFileToRoot(rootDir, configFile, updatedContent);
    logger(
      `${v} Set ${colorize(`routing.mode = '${mode}'`, ANSIColors.GREY_LIGHT)} in ${colorizePath(configFile)}`
    );
  }

  return configFile;
};

/**
 * Completes the CMS setup once credentials are received from the login flow:
 * writes them to the environment file and enables the editor in the Intlayer
 * configuration file.
 */
export const setupCmsCredentials = async (
  rootDir: string,
  credentials: CmsCredentials
): Promise<void> => {
  await writeCmsCredentialsToEnv(rootDir, credentials);
  await enableEditorInConfig(rootDir);
};
