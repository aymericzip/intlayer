import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { formatDictionaryOutput } from '@intlayer/chokidar';
import { getProjectRequire } from '@intlayer/config';
import type {
  Dictionary,
  DictionaryFormat,
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

export const extractKeyAndLocaleFromPath = (
  filePath: string,
  maskPattern: string,
  locales: Locale[],
  defaultLocale: Locale
): { key: string; locale: Locale } | null => {
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
    // Ensure key does not contain slashes to prevent matching across directories
    regexStr = regexStr.replace(escapeRegex(keyPlaceholder), '(?<key>[^/]+)');
  }

  const maskRegex = new RegExp(regexStr);
  const match = maskRegex.exec(filePath);

  // FIX: If the path doesn't strictly match the pattern, return null
  // Do not fall back to 'index' or defaultLocale for unmatched files.
  if (!match || !match.groups) {
    return null;
  }

  let locale = match.groups.locale as Locale | undefined;
  let key = (match.groups.key as string | undefined) ?? 'index';

  if (typeof key === 'undefined') {
    key = 'index';
  }

  if (typeof locale === 'undefined') {
    locale = defaultLocale;
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
  const locales = internationalization.locales;
  const defaultLocale = internationalization.defaultLocale;

  const localePattern = `{${locales.map((locale) => locale).join(',')}}`;

  const globPattern = builder({ key: '*', locale: localePattern });
  const maskPattern = builder({ key: '{{__KEY__}}', locale: '{{__LOCALE__}}' });

  const files = fg.sync(globPattern, {
    cwd: baseDir,
  });

  const result: MessagesRecord = {} as MessagesRecord;

  for (const file of files) {
    const extraction = extractKeyAndLocaleFromPath(
      file,
      maskPattern,
      locales,
      defaultLocale
    );

    // FIX: If extraction failed (regex mismatch), skip this file
    if (!extraction) {
      continue;
    }

    const { key, locale } = extraction;

    // FIX: Round Trip Check
    // 1. Generate what the path SHOULD be for this key/locale using the current builder
    const expectedPath = builder({ key, locale });

    // 2. Resolve both to absolute paths to ensure safe comparison
    const absoluteFoundPath = isAbsolute(file) ? file : resolve(baseDir, file);
    const absoluteExpectedPath = isAbsolute(expectedPath)
      ? expectedPath
      : resolve(baseDir, expectedPath);

    // 3. If the file found doesn't exactly match the file expected, it belongs to another plugin/structure
    if (absoluteFoundPath !== absoluteExpectedPath) {
      continue;
    }

    if (!result[locale as Locale]) {
      result[locale as Locale] = {};
    }

    result[locale as Locale][key as Dictionary['key']] = absoluteFoundPath;
  }

  // Ensure all declared locales are present even if the file doesn't exist yet
  const hasKeyInMask = maskPattern.includes('{{__KEY__}}');
  const discoveredKeys = new Set<string>();

  for (const locale of Object.keys(result)) {
    for (const key of Object.keys(result[locale as Locale] ?? {})) {
      discoveredKeys.add(key);
    }
  }

  if (!hasKeyInMask) {
    discoveredKeys.add('index');
  }

  const keysToEnsure =
    discoveredKeys.size > 0 ? Array.from(discoveredKeys) : [];

  for (const locale of locales) {
    if (!result[locale]) {
      result[locale] = {} as Record<Dictionary['key'], FilePath>;
    }

    for (const key of keysToEnsure) {
      if (!result[locale][key as Dictionary['key']]) {
        const builtPath = builder({ key, locale });
        const absoluteBuiltPath = isAbsolute(builtPath)
          ? builtPath
          : resolve(baseDir, builtPath);

        result[locale][key as Dictionary['key']] = absoluteBuiltPath;
      }
    }
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

  /**
   * The format of the dictionaries created by the plugin.
   *
   * Default: 'intlayer'
   *
   * The format of the dictionaries created by the plugin.
   */
  format?: DictionaryFormat;
};

export const syncJSON = (options: SyncJSONPluginOptions): Plugin => {
  // Generate a unique default location based on the source pattern.
  // This ensures that if you have multiple plugins, they don't share the same 'plugin' ID.
  const patternMarker = options.source({
    key: '{{key}}',
    locale: '{{locale}}',
  });
  const defaultLocation = `sync-json::${patternMarker}`;

  const { location, priority, format } = {
    location: defaultLocation,
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
        let json: JSONContent = {};
        try {
          json = requireFunction(path as string);
        } catch {
          json = {};
        }

        const filePath = relative(configuration.content.baseDir, path);

        const dictionary: Dictionary = {
          key,
          locale,
          fill,
          format,
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

    formatOutput: ({ dictionary }) => {
      if (!dictionary.filePath || !dictionary.locale) return dictionary;

      const builderPath = options.source({
        key: dictionary.key,
        locale: dictionary.locale,
      });

      // Verification to ensure we are formatting the correct file
      if (resolve(builderPath) !== resolve(dictionary.filePath)) {
        return dictionary;
      }

      return dictionary.content;
    },

    afterBuild: async ({ dictionaries, configuration }) => {
      const { getPerLocaleDictionary } = await import('@intlayer/core');
      const { parallelize } = await import('@intlayer/chokidar');

      const locales = configuration.internationalization.locales;

      type RecordList = {
        key: string;
        dictionary: Dictionary;
        locale: Locale;
      };

      // We get all dictionaries, but we need to filter them
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
        // Only process dictionaries that belong to THIS plugin instance.
        if (dictionary.location !== location) {
          return;
        }

        const builderPath = options.source({
          key,
          locale,
        });

        const localizedDictionary = getPerLocaleDictionary(dictionary, locale);

        const dictionaryWithFormat = {
          ...localizedDictionary,
          format,
        };

        const formattedOutput = formatDictionaryOutput(dictionaryWithFormat);
        const content = JSON.parse(JSON.stringify(formattedOutput.content));

        if (
          typeof content === 'undefined' ||
          (typeof content === 'object' &&
            Object.keys(content as Record<string, unknown>).length === 0)
        ) {
          return;
        }

        await mkdir(dirname(builderPath), { recursive: true });

        const stringContent = JSON.stringify(content, null, 2);

        await writeFile(builderPath, `${stringContent}\n`, 'utf-8');
      });
    },
  };
};
