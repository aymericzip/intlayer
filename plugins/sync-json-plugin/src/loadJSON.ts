import { isAbsolute, join, relative, resolve } from 'node:path';
import { getProjectRequire } from '@intlayer/config';
import type {
  Dictionary,
  IntlayerConfig,
  LocalDictionaryId,
  Locale,
  Plugin,
} from '@intlayer/types';
import fg from 'fast-glob';
import { extractKeyAndLocaleFromPath } from './syncJSON';

type JSONContent = Record<string, any>;

type Builder = ({
  key,
  locale,
}: {
  key: string;
  locale?: Locale | (string & {});
}) => string;

type MessagesRecord = Record<Locale, Record<Dictionary['key'], FilePath>>;

const listMessages = (
  builder: Builder,
  configuration: IntlayerConfig,
  selectedLocale: Locale
): MessagesRecord => {
  const { content, internationalization } = configuration;

  const baseDir = content.baseDir;
  const locales = internationalization.locales;

  const localePattern = `{${locales.map((locale) => locale).join(',')}}`;

  const globPattern = builder({ key: '*', locale: localePattern });
  const maskPattern = builder({ key: '{{__KEY__}}', locale: '{{__LOCALE__}}' });

  const files = fg.sync(globPattern, {
    cwd: baseDir,
  });

  const result: MessagesRecord = {} as MessagesRecord;

  for (const file of files) {
    const { key, locale } = extractKeyAndLocaleFromPath(
      file,
      maskPattern,
      locales,
      selectedLocale
    );

    const absolutePath = isAbsolute(file) ? file : resolve(baseDir, file);

    if (!result[locale as Locale]) {
      result[locale as Locale] = {};
    }

    result[locale as Locale][key as Dictionary['key']] = absolutePath;
  }

  // For the load plugin we only use actual discovered files; do not fabricate
  // missing locales or keys, since we don't write outputs.
  return result;
};

type FilePath = string;

type DictionariesMap = { path: string; locale: Locale; key: string }[];

const loadMessagePathMap = (
  source: MessagesRecord | Builder,
  configuration: IntlayerConfig,
  selectedLocale: Locale
) => {
  const builder = source as Builder;
  const messages: MessagesRecord = listMessages(
    builder,
    configuration,
    selectedLocale
  );

  const maskPattern = builder({
    key: '{{__KEY__}}',
    locale: '{{__LOCALE__}}',
  });
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
          : resolve(configuration.content.baseDir, path);

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
  source: Builder;

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
};

export const loadJSON = (options: LoadJSONPluginOptions): Plugin => {
  const { location, priority, locale } = {
    location: 'plugin',
    priority: 0,
    ...options,
  };

  return {
    name: 'load-json',

    loadDictionaries: async ({ configuration }) => {
      const usedLocale = (locale ??
        configuration.internationalization.defaultLocale) as Locale;

      const dictionariesMap: DictionariesMap = loadMessagePathMap(
        options.source,
        configuration,
        usedLocale
      );

      let filePath: string = options.source({
        key: '{{key}}',
      });

      if (filePath && !isAbsolute(filePath)) {
        filePath = join(configuration.content.baseDir, filePath);
      }

      const dictionaries: Dictionary[] = [];

      for (const { path, key } of dictionariesMap) {
        const requireFunction =
          configuration.build?.require ?? getProjectRequire();
        let json: JSONContent = {};
        try {
          json = requireFunction(path as string);
        } catch {
          // File does not exist yet; default to empty content so it can be filled later
          json = {};
        }

        const filePath = relative(configuration.content.baseDir, path);

        const dictionary: Dictionary = {
          key,
          locale: usedLocale,
          fill: filePath,
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
