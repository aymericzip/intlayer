import {
  createFileAdapter,
  createSyncPlugin,
} from '@intlayer/engine/syncPluginKit';
import type { Locale } from '@intlayer/types/allLocales';
import type { FilePathPattern } from '@intlayer/types/filePathPattern';
import type { Plugin } from '@intlayer/types/plugin';
import { poCodec } from './poFormat';

export type LoadPOPluginOptions = {
  /**
   * The source of the plugin.
   * Is a function to build the source from the key and locale.
   *
   * @example
   * ```ts
   * loadPO({
   *   source: ({ key }) => `blog/${'**'}/${key}.i18n.po`,
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
   * loadPO({
   *   source: ({ key }) => `blog/${'**'}/${key}.i18n.po`,
   *   locale: Locales.ENGLISH,
   * })
   * ```
   */
  locale?: Locale;

  /**
   * Because Intlayer transforms PO files into Dictionary, we need to identify the plugin in the dictionary.
   * Used to identify the plugin in the dictionary.
   *
   * In the case you have multiple plugins, you can use this to identify the plugin in the dictionary.
   *
   * @example
   * ```ts
   * const config = {
   *   plugins: [
   *     loadPO({
   *       source: ({ key }) => `./resources/${key}.po`,
   *       location: 'plugin-i18next-po',
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
   * Default is 0.
   */
  priority?: number;
};

/**
 * Read-only PO ingestion plugin: loads gettext PO files as dictionaries
 * without ever writing back to them.
 */
export const loadPO = (options: LoadPOPluginOptions): Plugin =>
  createSyncPlugin({
    name: 'load-po',
    adapter: createFileAdapter({
      source: options.source,
      codec: poCodec,
      discovery: 'inclusive',
    }),
    direction: 'pull',
    location: options.location ?? 'plugin',
    priority: options.priority ?? 0,
    format: 'po',
    // PO files are flat msgid → msgstr records; never split on first level.
    splitKeys: false,
    localeOverride: options.locale,
  });
