import { parseFilePathPattern } from '@intlayer/config/utils';
import {
  buildFilePathPatternContext,
  createFileAdapter,
  createSyncPlugin,
} from '@intlayer/engine/syncPluginKit';
import type {
  DictionaryFormat,
  DictionaryLocation,
} from '@intlayer/types/dictionary';
import type { FilePathPattern } from '@intlayer/types/filePathPattern';
import type { Plugin } from '@intlayer/types/plugin';
import { jsonCodec, readJSONEntry } from './jsonCodec';

// Re-exported for backward compatibility: this helper used to live here.
export { extractKeyAndLocaleFromPath } from '@intlayer/engine/syncPluginKit';

export type SyncJSONPluginOptions = {
  /**
   * The source of the plugin.
   * Is a function to build the source from the key and locale.
   *
   * ```ts
   * syncJSON({
   * source: ({ key, locale }) => `./messages/${locale}/${key}.json`
   * })
   * ```
   */
  source: FilePathPattern;

  /**
   * Because Intlayer transform the JSON files into Dictionary, we need to identify the plugin in the dictionary.
   * Used to identify the plugin in the dictionary.
   *
   * In the case you have multiple plugins, you can use this to identify the plugin in the dictionary.
   *
   * ```ts
   * // Example usage:
   * const config = {
   *   plugins: [
   *     syncJSON({
   *       source: ({ key, locale }) => `./resources/${locale}/${key}.json`,
   *       location: 'plugin-i18next',
   *     }),
   *     syncJSON({
   *       source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
   *       location: 'plugin-next-intl',
   *     }),
   *   ]
   * }
   * ```
   */
  location?: DictionaryLocation | (string & {});

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
   * The format of the dictionaries created by the plugin.
   *
   * Default: 'intlayer'
   *
   * The format of the dictionaries created by the plugin.
   */
  format?: DictionaryFormat;

  /**
   * Whether each top-level key of the JSON file should become its own
   * dictionary (keyed by that top-level key) instead of a single dictionary
   * holding the whole file.
   *
   * This matches the namespace model of libraries such as `next-intl` /
   * `react-intl`, where a single `messages/{locale}.json` file groups several
   * namespaces by its first-level keys and each namespace is addressed
   * independently (e.g. `useTranslations('Hero')` → dictionary `Hero`).
   *
   * When omitted, it is auto-detected: the file is split when the `source`
   * pattern has no `{{key}}` segment (i.e. one file holds every namespace),
   * and kept as a single dictionary otherwise (one file per key).
   *
   * @example
   * ```ts
   * // messages/en.json → dictionaries: Hero, Nav, About, …
   * syncJSON({
   *   source: ({ locale }) => `./messages/${locale}.json`,
   *   splitKeys: true,
   * })
   * ```
   */
  splitKeys?: boolean;
};

/**
 * Two-way JSON synchronization plugin: ingests JSON message files as
 * dictionaries and writes the merged build output back to the same files.
 */
export const syncJSON = async (
  options: SyncJSONPluginOptions
): Promise<Plugin> => {
  // Generate a unique default location based on the source pattern.
  // This ensures that if you have multiple plugins, they don't share the same 'plugin' ID.
  const patternMarker = await parseFilePathPattern(
    options.source,
    buildFilePathPatternContext('{{key}}', '{{locale}}')
  );
  const defaultLocation = `sync-json::${patternMarker}`;

  return createSyncPlugin({
    name: 'sync-json',
    adapter: createFileAdapter({
      source: options.source,
      codec: jsonCodec,
      readEntry: readJSONEntry,
      discovery: 'strict',
    }),
    direction: 'both',
    location: options.location ?? defaultLocation,
    priority: options.priority ?? 0,
    format: options.format,
    // Auto-detected by the file adapter when omitted: split when the source
    // pattern has no `{{key}}` segment (one file holds every namespace).
    splitKeys: options.splitKeys,
  });
};
