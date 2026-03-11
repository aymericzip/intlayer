import { isAbsolute, join, relative, resolve } from 'node:path';
import { loadExternalFile } from '@intlayer/config/file';
import { parseFilePathPattern } from '@intlayer/config/utils';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
import type {
  Dictionary,
  DictionaryFormat,
  LocalDictionaryId,
} from '@intlayer/types/dictionary';
import type {
  FilePathPattern,
  FilePathPatternContext,
} from '@intlayer/types/filePathPattern';
import type { Plugin } from '@intlayer/types/plugin';
import fg from 'fast-glob';
import { extractKeyAndLocaleFromPath } from './syncJSON';

type JSONContent = Record<string, any>;

type FilePath = string;

type MessagesRecord = Record<Locale, Record<Dictionary['key'], FilePath>>;

const listMessages = async (
  source: FilePathPattern,
  configuration: IntlayerConfig,
  selectedLocale: Locale
): Promise<MessagesRecord> => {
  const { system, internationalization } = configuration;

  const { baseDir } = system;
  const { locales } = internationalization;

  const result: MessagesRecord = {} as MessagesRecord;

  for (const locale of locales) {
    const globPatternLocale = await parseFilePathPattern(source, {
      key: '*',
      locale,
    } as any as FilePathPatternContext);

    const maskPatternLocale = await parseFilePathPattern(source, {
      key: '{{__KEY__}}',
      locale,
    } as any as FilePathPatternContext);

    if (!globPatternLocale || !maskPatternLocale) {
      continue;
    }

    const files = await fg(globPatternLocale, {
      cwd: baseDir,
    });

    for (const file of files) {
      const extraction = extractKeyAndLocaleFromPath(
        file,
        maskPatternLocale,
        locales,
        selectedLocale
      );

      if (!extraction) {
        continue;
      }

      const { key, locale: extractedLocale } = extraction;

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
  configuration: IntlayerConfig,
  selectedLocale: Locale
) => {
  const sourcePattern = source as FilePathPattern;
  const messages: MessagesRecord = await listMessages(
    sourcePattern,
    configuration,
    selectedLocale
  );

  const maskPattern = await parseFilePathPattern(sourcePattern, {
    key: '{{__KEY__}}',
    locale: '{{__LOCALE__}}',
  } as any as FilePathPatternContext);
  const hasLocaleInMask = maskPattern.includes('{{__LOCALE__}}');

  const entries = (
    hasLocaleInMask && selectedLocale
      ? Object.entries(messages).filter(([locale]) => locale === selectedLocale)
      : Object.entries(messages)
  ) as [Locale, Record<Dictionary['key'], FilePath>][];

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

type LoadJSONPluginOptions = {
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
};

export const loadJSON = (options: LoadJSONPluginOptions): Plugin => {
  const { location, priority, locale, format } = {
    location: 'plugin',
    priority: 0,
    ...options,
  } as const;

  return {
    name: 'load-json',

    loadDictionaries: async ({ configuration }) => {
      const usedLocale = (locale ??
        configuration.internationalization.defaultLocale) as Locale;

      const dictionariesMap: DictionariesMap = await loadMessagePathMap(
        options.source,
        configuration,
        usedLocale
      );

      let filePath: string = await parseFilePathPattern(options.source, {
        key: '{{key}}',
      } as any as FilePathPatternContext);

      if (filePath && !isAbsolute(filePath)) {
        filePath = join(configuration.system.baseDir, filePath);
      }

      const dictionaries: Dictionary[] = [];

      for (const { path, key } of dictionariesMap) {
        let json: JSONContent = {};
        try {
          json = await loadExternalFile(path as string);
        } catch {
          // File does not exist yet; default to empty content so it can be filled later
          json = {};
        }

        const filePath = relative(configuration.system.baseDir, path);

        const dictionary: Dictionary = {
          key,
          locale: usedLocale,
          fill: filePath,
          format,
          localId: `${key}::${location}::${filePath}` as LocalDictionaryId,
          location: location as Dictionary['location'],
          filled:
            usedLocale !== configuration.internationalization.defaultLocale
              ? true
              : undefined,
          content: json,
          filePath,
          priority,
        };

        dictionaries.push(dictionary);
      }

      return dictionaries;
    },
  };
};
