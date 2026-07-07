import { parseFilePathPattern } from '@intlayer/config/utils';
import {
  buildFilePathPatternContext,
  createFileAdapter,
  createSyncPlugin,
} from '@intlayer/engine/syncPluginKit';
import type { DictionaryLocation } from '@intlayer/types/dictionary';
import type { FilePathPattern } from '@intlayer/types/filePathPattern';
import type { Plugin } from '@intlayer/types/plugin';
import { poCodec } from './poFormat';

// Re-exported for backward compatibility: these helpers used to live here.
export { extractKeyAndLocaleFromPath } from '@intlayer/engine/syncPluginKit';
export { parsePO, serializePO } from './poFormat';

export type SyncPOPluginOptions = {
  /**
   * The source of the plugin.
   * Is a function to build the source from the key and locale.
   *
   * ```ts
   * syncPO({
   *   source: ({ key, locale }) => `./messages/${locale}/${key}.po`
   * })
   * ```
   */
  source: FilePathPattern;

  /**
   * Because Intlayer transforms PO files into Dictionary, we need to identify the plugin in the dictionary.
   * Used to identify the plugin in the dictionary.
   *
   * In the case you have multiple plugins, you can use this to identify the plugin in the dictionary.
   *
   * ```ts
   * // Example usage:
   * const config = {
   *   plugins: [
   *     syncPO({
   *       source: ({ key, locale }) => `./resources/${locale}/${key}.po`,
   *       location: 'plugin-i18next-po',
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
   * Default is 0.
   */
  priority?: number;
};

/**
 * Two-way PO synchronization plugin: ingests gettext PO files as dictionaries
 * and writes the merged build output back to the same files.
 */
export const syncPO = async (options: SyncPOPluginOptions): Promise<Plugin> => {
  // Generate a unique default location based on the source pattern.
  const patternMarker = await parseFilePathPattern(
    options.source,
    buildFilePathPatternContext('{{key}}', '{{locale}}')
  );
  const defaultLocation = `sync-po::${patternMarker}`;

  return createSyncPlugin({
    name: 'sync-po',
    adapter: createFileAdapter({
      source: options.source,
      codec: poCodec,
      discovery: 'strict',
    }),
    direction: 'both',
    location: options.location ?? defaultLocation,
    priority: options.priority ?? 0,
    format: 'po',
    // PO files are flat msgid → msgstr records; there is no namespace level
    // to split on, regardless of the source pattern shape.
    splitKeys: false,
  });
};
