import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { getConfiguration } from '@intlayer/config/node';
import { getAlias } from '@intlayer/config/utils';
import { window } from 'vscode';
import { findProjectRoot } from './utils/findProjectRoot';
import { getConfigurationOptionsSync } from './utils/getConfiguration';
import { prefix } from './utils/logFunctions';

// Cache the result globally
let cachedConfig: any = null;
let lastProjectDir: string | null = null;

// Fallback used when no project config can be resolved (no active editor,
// no built config yet, ...). Computed lazily and holds Intlayer defaults.
let defaultConfig: any = null;
const getDefaultConfig = () => {
  if (!defaultConfig) {
    try {
      defaultConfig = JSON.parse(JSON.stringify(getConfiguration()));
    } catch (error) {
      console.error(`${prefix} Error loading default configuration:`, error);

      defaultConfig = {};
    }
  }
  return defaultConfig;
};

const loadConfig = () => {
  const editor = window.activeTextEditor;
  if (!editor) {
    return cachedConfig ?? getDefaultConfig();
  }

  const filePath = editor.document.uri.fsPath;

  // Optimization: Do not look for project root if we are in the same workspace folder as last time
  // (You might want to refine this based on workspace.workspaceFolders)

  const projectDir = findProjectRoot(filePath);

  if (!projectDir) {
    return cachedConfig ?? getDefaultConfig();
  }

  // 2. Return cached config if project hasn't changed
  // (Optional: add a Time-To-Live check here if config changes often, e.g., 5 seconds)
  if (cachedConfig && lastProjectDir === projectDir) {
    return cachedConfig;
  }

  try {
    const configOptions = getConfigurationOptionsSync(projectDir);
    const configuration = getConfiguration(configOptions);

    const configDirPath = getAlias({
      configuration,
      format: 'cjs',
      formatter: (path) => join(projectDir, path),
    });

    const configFilePath = configDirPath['@intlayer/config/built'];

    // Before the first build, the built config does not exist yet:
    // use the configuration computed from the project config file.
    const result = existsSync(configFilePath)
      ? createRequire(join(projectDir, 'package.json'))(configFilePath)
      : JSON.parse(JSON.stringify(configuration));

    cachedConfig = result;
    lastProjectDir = projectDir;

    return result;
  } catch (error) {
    console.error(`${prefix} Error loading configuration:`, error);
    return cachedConfig ?? getDefaultConfig();
  }
};

/**
 * Resolves a config section at access time (not at module load time), falling
 * back to Intlayer defaults for missing sections or fields.
 *
 * Named exports are evaluated once when the extension activates — usually
 * before any editor is open — so they must stay lazy.
 */
const getSection = (section: PropertyKey) => {
  const config = loadConfig();
  const value = config?.[section];
  const defaultValue = getDefaultConfig()?.[section];

  if (
    value &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    defaultValue &&
    typeof defaultValue === 'object' &&
    !Array.isArray(defaultValue)
  ) {
    return { ...defaultValue, ...value };
  }

  return value ?? defaultValue;
};

const createSectionProxy = (section: string) =>
  new Proxy(
    {},
    {
      get: (_target, prop) => getSection(section)?.[prop],
      has: (_target, prop) => prop in (getSection(section) ?? {}),
      ownKeys: () => Reflect.ownKeys(getSection(section) ?? {}),
      getOwnPropertyDescriptor: (_target, prop) => {
        const value = getSection(section);

        if (!value || !(prop in value)) return undefined;

        return {
          configurable: true,
          enumerable: true,
          writable: false,
          value: value[prop],
        };
      },
    }
  ) as any;

const configJSON = new Proxy(
  {},
  {
    get: (_target, prop) => getSection(prop),
    has: (_target, prop) => prop in (loadConfig() ?? {}),
    ownKeys: () => Reflect.ownKeys(loadConfig() ?? {}),
    getOwnPropertyDescriptor: (_target, prop) => {
      const config = loadConfig();

      if (!config || !(prop in config)) return undefined;

      return {
        configurable: true,
        enumerable: true,
        writable: false,
        value: getSection(prop),
      };
    },
  }
) as any;

export const internationalization = createSectionProxy('internationalization');
export const dictionary = createSectionProxy('dictionary');
export const routing = createSectionProxy('routing');
export const content = createSectionProxy('content');
export const system = createSectionProxy('system');
export const editor = createSectionProxy('editor');
export const analytics = createSectionProxy('analytics');
export const log = createSectionProxy('log');
export const ai = createSectionProxy('ai');
export const build = createSectionProxy('build');
export const compiler = createSectionProxy('compiler');
export const schemas = createSectionProxy('schemas');
export const plugins = configJSON.plugins;

export default configJSON;
