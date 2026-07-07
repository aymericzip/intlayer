import {
  createFileAdapter,
  createSyncPlugin,
} from '@intlayer/engine/syncPluginKit';
import type { Locale } from '@intlayer/types/allLocales';
import type { DictionaryFormat } from '@intlayer/types/dictionary';
import type { FilePathPattern } from '@intlayer/types/filePathPattern';
import type { Plugin } from '@intlayer/types/plugin';
import { jsonCodec, readJSONEntry } from './jsonCodec';

export type LoadJSONPluginOptions = {
  /**
   * The source of the plugin.
   * Is a function to build the source from the key and locale.
   *
   * @example
   * ```ts
   * loadJSON({
   *   source: ({ key }) => `blog/${'**'}/${key}.i18n.json`,
   * })
   * ```
   */
  source: FilePathPattern;

  /**
   * Locale
   *
   * If not provided, the plugin will consider the default locale.
   *
   * @example
   * ```ts
   * loadJSON({
   *   source: ({ key }) => `blog/${'**'}/${key}.i18n.json`,
   *   locale: Locales.ENGLISH,
   * })
   * ```
   */
  locale?: Locale;

  /**
   * Because Intlayer transform the JSON files into Dictionary, we need to identify the plugin in the dictionary.
   * Used to identify the plugin in the dictionary.
   *
   * In the case you have multiple plugins, you can use this to identify the plugin in the dictionary.
   *
   * @example
   * ```ts
   * const config = {
   *   plugins: [
   *     loadJSON({
   *       source: ({ key }) => `./resources/${key}.json`,
   *       location: 'plugin-i18next',
   *     }),
   *     loadJSON({
   *       source: ({ key }) => `./messages/${key}.json`,
   *       location: 'plugin-next-intl',
   *     }),
   *   ]
   * }
   * ```
   */
  location?: string;

  /**
   * The priority of the dictionaries created by the plugin.
   *
   * In the case of conflicts with remote dictionaries, or .content files, the dictionary with the highest priority will override the other dictionaries.
   *
   * Default is -1. (.content file priority is 0)
   *
   */
  priority?: number;

  /**
   * The format of the dictionary content.
   *
   * @example
   * ```ts
   * loadJSON({
   *   format: 'icu',
   * })
   * ```
   */
  format?: DictionaryFormat;

  /**
   * Whether each top-level key of the JSON file should become its own
   * dictionary (keyed by that top-level key) instead of a single dictionary
   * holding the whole file.
   *
   * This matches the namespace model of libraries such as `next-intl` /
   * `react-intl`, where a single `messages/{locale}.json` file groups several
   * namespaces by its first-level keys.
   *
   * When omitted, it is auto-detected: the file is split when the `source`
   * pattern has no `{{key}}` segment, and kept as a single dictionary otherwise.
   */
  splitKeys?: boolean;
};

/**
 * Read-only JSON ingestion plugin: loads JSON message files as dictionaries
 * without ever writing back to them.
 */
export const loadJSON = (options: LoadJSONPluginOptions): Plugin =>
  createSyncPlugin({
    name: 'load-json',
    adapter: createFileAdapter({
      source: options.source,
      codec: jsonCodec,
      readEntry: readJSONEntry,
      discovery: 'inclusive',
    }),
    direction: 'pull',
    location: options.location ?? 'plugin',
    priority: options.priority ?? 0,
    format: options.format,
    splitKeys: options.splitKeys,
    localeOverride: options.locale,
  });
