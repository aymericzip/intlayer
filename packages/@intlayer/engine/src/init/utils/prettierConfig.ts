/**
 * The Intlayer Prettier setup, as `intlayer init prettier` writes it.
 *
 * Declared locally: `@intlayer/engine` must not depend on the Prettier plugin
 * just to write its name into a JSON file.
 */
export const PRETTIER_PLUGIN_PACKAGE_NAME = 'prettier-plugin-intlayer';

/**
 * Prettier config files holding JSON (`.prettierrc` may also be YAML: it is
 * only patched when it parses as JSON).
 */
export const JSON_PRETTIER_CONFIG_FILES = ['.prettierrc.json', '.prettierrc'];

/** Every Prettier config file name, JSON or not. */
export const PRETTIER_CONFIG_FILES = [
  ...JSON_PRETTIER_CONFIG_FILES,
  '.prettierrc.json5',
  '.prettierrc.yaml',
  '.prettierrc.yml',
  '.prettierrc.toml',
  '.prettierrc.js',
  '.prettierrc.mjs',
  '.prettierrc.cjs',
  '.prettierrc.ts',
  '.prettierrc.mts',
  '.prettierrc.cts',
  'prettier.config.js',
  'prettier.config.mjs',
  'prettier.config.cjs',
  'prettier.config.ts',
  'prettier.config.mts',
  'prettier.config.cts',
];

/** The Prettier config fields init reads and writes. */
export type PrettierConfig = {
  plugins?: unknown[];
  [option: string]: unknown;
};

/** True when the project formats with Prettier. */
export const hasPrettier = (dependencies: Record<string, string>): boolean =>
  Boolean(dependencies.prettier);

/**
 * Adds the Intlayer plugin to a Prettier config, in place.
 *
 * @returns Whether the plugin was added.
 */
export const addIntlayerPluginToPrettierConfig = (
  prettierConfig: PrettierConfig
): boolean => {
  prettierConfig.plugins ??= [];

  if (prettierConfig.plugins.includes(PRETTIER_PLUGIN_PACKAGE_NAME)) {
    return false;
  }

  prettierConfig.plugins.push(PRETTIER_PLUGIN_PACKAGE_NAME);

  return true;
};
