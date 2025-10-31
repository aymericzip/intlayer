import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { parallelize } from '@intlayer/chokidar';
import { getProjectRequire } from '@intlayer/config';
import type {
  ContentNode,
  Dictionary,
  IntlayerConfig,
  LocalDictionaryId,
  Locale,
  LocalesValues,
  Plugin,
} from '@intlayer/types';
import fg from 'fast-glob';

type JSONContent = Record<string, any>;

type Builder = ({
  key,
  locale,
}: {
  key: string;
  locale: LocalesValues | (string & {});
}) => string;

type MessagesRecord = Record<Locale, Record<Dictionary['key'], FilePath>>;

const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const extractKeyAndLocaleFromPath = (
  filePath: string,
  maskPattern: string,
  locales: Locale[]
) => {
  const keyPlaceholder = '{{__KEY__}}';
  const localePlaceholder = '{{__LOCALE__}}';

  const escapedMask = escapeRegex(maskPattern);
  const localesAlternation = locales.join('|');

  // Build a regex from the mask to capture locale (and key if present)
  let regexStr = `^${escapedMask}$`;

  regexStr = regexStr.replace(
    escapeRegex(localePlaceholder),
    `(?<locale>${localesAlternation})`
  );

  if (maskPattern.includes(keyPlaceholder)) {
    regexStr = regexStr.replace(escapeRegex(keyPlaceholder), '(?<key>[^/]+)');
  }

  const maskRegex = new RegExp(regexStr);

  const match = maskRegex.exec(filePath);

  let locale: Locale | undefined;
  let key: string | undefined;

  if (match?.groups) {
    locale = match.groups.locale as Locale | undefined;
    key = (match.groups.key as string | undefined) ?? 'index';
  }

  return {
    key,
    locale,
  };
};

const listMessages = (
  builder: Builder,
  configuration: IntlayerConfig
): MessagesRecord => {
  const { content, internationalization } = configuration;

  const baseDir = content.baseDir;
  const locales = internationalization.locales as Locale[];

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
      locales
    );

    const absolutePath = isAbsolute(file) ? file : resolve(baseDir, file);

    if (!result[locale as Locale]) {
      result[locale as Locale] = {};
    }

    result[locale as Locale][key as Dictionary['key']] = absolutePath;
  }

  return result;
};

type FilePath = string;

type DictionariesMap = { path: string; locale: Locale; key: string }[];

const loadMessagePathMap = (
  source: MessagesRecord | Builder,
  configuration: IntlayerConfig
) => {
  const messages: MessagesRecord = listMessages(
    source as Builder,
    configuration
  );

  const dictionariesPathMap: DictionariesMap = Object.entries(messages).flatMap(
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

type SyncJSONPluginOptions = {
  /**
   * The source of the plugin.
   * Is a function to build the source from the key and locale.
   *
   * ```ts
   * syncJSON({
   *   source: ({ key, locale }) => `./messages/${locale}/${key}.json`
   * })
   * ```
   */
  source: Builder;

  /**
   * Because Intlayer transform the JSON files into Dictionary, we need to identify the plugin in the dictionary.
   * Used to identify the plugin in the dictionary.
   *
   * In the case you have multiple plugins, you can use this to identify the plugin in the dictionary.
   *
   * ```ts
   * const config ={
   *   plugins: [
   *     syncJSON({
   *       source: ({ key, locale }) => `./resources/${locale}/${key}.json`
   *       location: 'plugin-i18next',
   *     }),
   *     syncJSON({
   *       source: ({ key, locale }) => `./messages/${locale}/${key}.json`
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

export const syncJSON = (options: SyncJSONPluginOptions): Plugin => {
  const { location, priority } = {
    location: 'plugin',
    priority: 0,
    ...options,
  };

  return {
    name: 'sync-json',

    loadDictionaries: async ({ configuration }) => {
      const dictionariesMap: DictionariesMap = loadMessagePathMap(
        options.source,
        configuration
      );

      let fill: string = options.source({
        key: '{{key}}',
        locale: '{{locale}}',
      });

      if (fill && !isAbsolute(fill)) {
        fill = join(configuration.content.baseDir, fill);
      }

      const dictionaries: Dictionary[] = [];

      for (const { locale, path, key } of dictionariesMap) {
        const requireFunction =
          configuration.build?.require ?? getProjectRequire();
        const json: JSONContent = requireFunction(path as string);

        const filePath = relative(configuration.content.baseDir, path);

        const dictionary: Dictionary = {
          key,
          locale,
          fill,
          localId: `${key}::${location}::${filePath}` as LocalDictionaryId,
          location: location as Dictionary['location'],
          filled:
            locale !== configuration.internationalization.defaultLocale
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
    afterBuild: async ({ dictionaries, configuration }) => {
      // Dynamic import to avoid circular dependency as core package import config, that load esbuild, that load the config file, that load the plugin
      const { getLocalizedContent } = await import('@intlayer/core');

      const locales = configuration.internationalization.locales;

      type RecordList = {
        key: string;
        dictionary: Dictionary;
        locale: Locale;
      };

      const recordList: RecordList[] = Object.entries(
        dictionaries.mergedDictionaries
      ).flatMap(([key, dictionary]) =>
        locales.map((locale) => ({
          key,
          dictionary: dictionary.dictionary as Dictionary,
          locale,
        }))
      );

      await parallelize(recordList, async ({ key, dictionary, locale }) => {
        const builderPath = options.source({
          key,
          locale,
        });

        // Remove function, Symbol, etc. as it can be written as JSON
        const flatContent = JSON.parse(JSON.stringify(dictionary.content));

        const localizedContent = getLocalizedContent(
          flatContent as unknown as ContentNode,
          locale,
          {
            dictionaryKey: key,
            keyPath: [],
          }
        );

        // Ensure directory exists before writing the file
        await mkdir(dirname(builderPath), { recursive: true });

        const stringContent = JSON.stringify(localizedContent, null, 2);

        await writeFile(
          builderPath,
          `${stringContent}\n`, // Add a new line at the end of the file to avoid formatting issues with VSCode
          'utf-8'
        );
      });
    },
    formatOutput: ({ dictionary }) => {
      if (!dictionary.filePath || !dictionary.locale) return dictionary;

      const builderPath = options.source({
        key: dictionary.key,
        locale: dictionary.locale,
      });

      // It's not one of the JSON that we synchronize, don't modify it
      if (resolve(builderPath) !== resolve(dictionary.filePath)) {
        return dictionary;
      }

      return dictionary.content;
    },
  };
};
