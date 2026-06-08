import { buildComponentFilesList } from '@intlayer/chokidar/utils';
import { IMPORT_MODE } from '@intlayer/config/defaultValues';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import type { MinifyPluginOptions } from './babel-plugin-intlayer-minify';
import type { PurgePluginOptions } from './babel-plugin-intlayer-purge';

// ── Shared config helpers ─────────────────────────────────────────────────────

/**
 * Attempts to load compiled dictionaries from `@intlayer/dictionaries-entry`.
 * Returns an empty array if the entry point is not available (e.g. dictionaries
 * have not been built yet).
 */
const loadDictionaries = (config: IntlayerConfig): Dictionary[] => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getDictionaries } = require('@intlayer/dictionaries-entry');
    const dictionariesRecord = getDictionaries(config) as Record<
      string,
      Dictionary
    >;
    return Object.values(dictionariesRecord);
  } catch {
    return [];
  }
};

// ── getPurgePluginOptions ─────────────────────────────────────────────────────

type GetPurgePluginOptionsParams = {
  /**
   * Options forwarded to the intlayer configuration loader.
   * Pass this when `intlayer.config.ts` lives outside the default search path
   * (e.g. in a monorepo workspace root).
   */
  configOptions?: GetConfigurationOptions;

  /**
   * Pre-loaded dictionaries (optional – loaded automatically when omitted).
   * Providing them avoids a second `getDictionaries` call when you already
   * have them at hand.
   */
  dictionaries?: Dictionary[];

  /**
   * Override specific resolved option values after the defaults are computed.
   */
  overrides?: Partial<PurgePluginOptions>;
};

/**
 * Returns fully-resolved options for {@link intlayerPurgeBabelPlugin}.
 *
 * Loads the intlayer configuration once at babel.config.js evaluation time so
 * the plugin itself does not need to re-read the config on every file
 * transform.
 *
 * @example
 * ```js
 * // babel.config.js
 * const {
 *   intlayerPurgeBabelPlugin,
 *   getPurgePluginOptions,
 * } = require("@intlayer/babel");
 *
 * module.exports = {
 *   presets: ["next/babel"],
 *   plugins: [
 *     [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
 *   ],
 * };
 * ```
 */
export const getPurgePluginOptions = (
  params?: GetPurgePluginOptionsParams
): PurgePluginOptions => {
  const {
    configOptions,
    dictionaries: providedDictionaries,
    overrides,
  } = params ?? {};

  const config = getConfiguration(configOptions);

  const { baseDir, dictionariesDir, dynamicDictionariesDir } = config.system;
  const { purge, minify, optimize } = config.build;
  const editorEnabled = config.editor.enabled;

  const importMode = config.build.importMode ?? config.dictionary?.importMode;

  const componentFilesList = buildComponentFilesList(config);

  const dictionaries = providedDictionaries ?? loadDictionaries(config);

  const dictionaryKeyToImportModeMap: Record<
    string,
    'static' | 'dynamic' | 'fetch' | undefined
  > = {};
  for (const dictionary of dictionaries) {
    dictionaryKeyToImportModeMap[dictionary.key] =
      dictionary.importMode ?? importMode ?? IMPORT_MODE;
  }

  return {
    baseDir,
    purge: Boolean(purge),
    minify: Boolean(minify),
    optimize,
    editorEnabled,
    dictionariesDir,
    dynamicDictionariesDir,
    componentFilesList,
    dictionaryKeyToImportModeMap,
    ...overrides,
  };
};

// ── getMinifyPluginOptions ────────────────────────────────────────────────────

type GetMinifyPluginOptionsParams = {
  /**
   * Options forwarded to the intlayer configuration loader.
   */
  configOptions?: GetConfigurationOptions;

  /**
   * Override specific resolved option values after the defaults are computed.
   */
  overrides?: Partial<MinifyPluginOptions>;
};

/**
 * Returns fully-resolved options for {@link intlayerMinifyBabelPlugin}.
 *
 * Loads the intlayer configuration once at babel.config.js evaluation time.
 *
 * @example
 * ```js
 * // babel.config.js
 * const {
 *   intlayerMinifyBabelPlugin,
 *   getMinifyPluginOptions,
 * } = require("@intlayer/babel");
 *
 * module.exports = {
 *   presets: ["next/babel"],
 *   plugins: [
 *     [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
 *   ],
 * };
 * ```
 */
export const getMinifyPluginOptions = (
  params?: GetMinifyPluginOptionsParams
): MinifyPluginOptions => {
  const { configOptions, overrides } = params ?? {};

  const config = getConfiguration(configOptions);

  const { baseDir } = config.system;
  const { minify, optimize } = config.build;
  const editorEnabled = config.editor.enabled;

  return {
    baseDir,
    minify: Boolean(minify),
    optimize,
    editorEnabled,
    ...overrides,
  };
};
