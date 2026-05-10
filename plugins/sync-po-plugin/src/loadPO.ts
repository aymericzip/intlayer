import { readFile } from 'node:fs/promises';
import { isAbsolute, relative, resolve } from 'node:path';
import { parseFilePathPattern } from '@intlayer/config/utils';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types/dictionary';
import type {
  FilePathPattern,
  FilePathPatternContext,
} from '@intlayer/types/filePathPattern';
import type { Plugin } from '@intlayer/types/plugin';
import fg from 'fast-glob';
import { extractKeyAndLocaleFromPath, parsePO } from './syncPO';

type FilePath = string;

type MessagesRecord = Record<Locale, Record<Dictionary['key'], FilePath>>;

const listMessages = async (
  source: FilePathPattern,
  configuration: IntlayerConfig
): Promise<MessagesRecord> => {
  const { system, internationalization } = configuration;

  const { baseDir } = system;
  const { locales } = internationalization;

  const result: MessagesRecord = {} as MessagesRecord;

  for (const locale of locales) {
    const globPatternLocale = await parseFilePathPattern(source, {
      key: '**',
      locale,
    } as any as FilePathPatternContext);

    const maskPatternLocale = await parseFilePathPattern(source, {
      key: '{{__KEY__}}',
      locale,
    } as any as FilePathPatternContext);

    if (!globPatternLocale || !maskPatternLocale) {
      continue;
    }

    const normalizedGlobPattern = globPatternLocale.startsWith('./')
      ? globPatternLocale.slice(2)
      : globPatternLocale;

    const files = await fg(normalizedGlobPattern, {
      cwd: baseDir,
    });

    for (const file of files) {
      // extractKeyAndLocaleFromPath requires at least one named capture group
      // ({{__LOCALE__}} or {{__KEY__}}) in the mask to return a non-null result.
      // When the mask is fully concrete (e.g. `messages/en.po` — the source has
      // {{locale}} but no {{key}}), no groups exist and it returns null.
      // In that case, fall back directly to the loop locale and key = 'index'.
      const hasLocaleInMask = maskPatternLocale.includes('{{__LOCALE__}}');
      const hasKeyInMask = maskPatternLocale.includes('{{__KEY__}}');

      let key: string;
      let extractedLocale: Locale;

      if (hasLocaleInMask || hasKeyInMask) {
        const extraction = extractKeyAndLocaleFromPath(
          file,
          maskPatternLocale,
          locales,
          locale
        );

        if (!extraction) {
          continue;
        }

        key = extraction.key;
        extractedLocale = extraction.locale;
      } else {
        // Mask has no placeholders — attribute directly to the current loop locale.
        key = 'index';
        extractedLocale = locale;
      }

      const absolutePath = isAbsolute(file) ? file : resolve(baseDir, file);

      const usedLocale = extractedLocale as Locale;
      if (!result[usedLocale]) {
        result[usedLocale] = {};
      }

      result[usedLocale][key as Dictionary['key']] = absolutePath;
    }
  }

  // For the load plugin we only use actual discovered files; do not fabricate
  // missing locales or keys, since we don't write outputs.
  return result;
};

type DictionariesMap = { path: string; locale: Locale; key: string }[];

const loadMessagePathMap = async (
  source: MessagesRecord | FilePathPattern,
  configuration: IntlayerConfig
) => {
  const sourcePattern = source as FilePathPattern;
  const messages: MessagesRecord = await listMessages(
    sourcePattern,
    configuration
  );

  const entries = Object.entries(messages) as [
    Locale,
    Record<Dictionary['key'], FilePath>,
  ][];

  const dictionariesPathMap: DictionariesMap = entries.flatMap(
    ([locale, keysRecord]) =>
      Object.entries(keysRecord).map(([key, path]) => {
        const absolutePath = isAbsolute(path)
          ? path
          : resolve(configuration.system.baseDir, path);

        return {
          path: absolutePath,
          locale,
          key,
        } as DictionariesMap[number];
      })
  );

  return dictionariesPathMap;
};

type LoadPOPluginOptions = {
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

export const loadPO = (options: LoadPOPluginOptions): Plugin => {
  const { location, priority, locale } = {
    location: 'plugin',
    priority: 0,
    ...options,
  } as const;

  return {
    name: 'load-po',

    loadDictionaries: async ({ configuration }) => {
      const dictionariesMap: DictionariesMap = await loadMessagePathMap(
        options.source,
        configuration
      );

      const dictionaries: Dictionary[] = [];

      for (const { path, key, locale: entryLocale } of dictionariesMap) {
        let poContent: Record<string, string>;
        try {
          const fileContent = await readFile(path, 'utf-8');
          poContent = parsePO(fileContent);
        } catch {
          poContent = {};
        }

        const filePath = relative(configuration.system.baseDir, path);

        // Use the per-entry locale discovered from the file path. If a fixed
        // locale override was provided, use it only as a fallback.
        const entryUsedLocale = (locale ?? entryLocale) as Locale;

        const dictionary: Dictionary = {
          key,
          locale: entryUsedLocale,
          fill: filePath,
          format: 'po',
          localId: `${key}::${location}::${filePath}` as LocalDictionaryId,
          location: location as Dictionary['location'],
          filled:
            entryUsedLocale !== configuration.internationalization.defaultLocale
              ? true
              : undefined,
          content: poContent,
          filePath,
          priority,
        };

        dictionaries.push(dictionary);
      }

      return dictionaries;
    },
  };
};
