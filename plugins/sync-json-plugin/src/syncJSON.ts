import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve } from 'node:path';
import { loadExternalFile } from '@intlayer/config/file';
import { colorizePath, getAppLogger } from '@intlayer/config/logger';
import { parseFilePathPattern } from '@intlayer/config/utils';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
import type {
  Dictionary,
  DictionaryFormat,
  DictionaryLocation,
  LocalDictionaryId,
} from '@intlayer/types/dictionary';
import type {
  FilePathPattern,
  FilePathPatternContext,
} from '@intlayer/types/filePathPattern';
import type { Plugin } from '@intlayer/types/plugin';
import fg from 'fast-glob';

type JSONContent = Record<string, any>;

type FilePath = string;

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

  // fast-glob strips leading "./" from returned paths; normalize both sides
  const normalize = (path: string) =>
    path.startsWith('./') ? path.slice(2) : path;

  const normalizedFilePath = normalize(filePath);
  const normalizedMask = normalize(maskPattern);

  const localesAlternation = locales.join('|');

  // Escape special regex chars, then convert glob wildcards to regex equivalents.
  // Must replace ** before * to avoid double-replacing.
  let regexStr = `^${escapeRegex(normalizedMask)}$`;
  regexStr = regexStr.replace(/\\\*\\\*/g, '.*'); // ** → match any path segments
  regexStr = regexStr.replace(/\\\*/g, '[^/]*'); // * → match within a single segment

  regexStr = regexStr.replace(
    escapeRegex(localePlaceholder),
    `(?<locale>${localesAlternation})`
  );

  if (normalizedMask.includes(keyPlaceholder)) {
    regexStr = regexStr.replace(escapeRegex(keyPlaceholder), '(?<key>.+)');
  }

  const maskRegex = new RegExp(regexStr);
  const match = maskRegex.exec(normalizedFilePath);

  if (!match?.groups) {
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
      const extraction = extractKeyAndLocaleFromPath(
        file,
        maskPatternLocale,
        locales,
        locale
      );

      if (!extraction) {
        continue;
      }

      const { key, locale: extractedLocale } = extraction;

      // Generate what the path SHOULD be for this key/locale using the current builder
      const expectedPath = await parseFilePathPattern(source, {
        key,
        locale: extractedLocale,
      } as any as FilePathPatternContext);

      // Resolve both to absolute paths to ensure safe comparison
      const absoluteFoundPath = isAbsolute(file)
        ? file
        : resolve(baseDir, file);
      const absoluteExpectedPath = isAbsolute(expectedPath)
        ? expectedPath
        : resolve(baseDir, expectedPath);

      // If the file found doesn't exactly match the file expected, it belongs to another plugin/structure
      if (absoluteFoundPath !== absoluteExpectedPath) {
        continue;
      }

      const usedLocale = extractedLocale as Locale;
      if (!result[usedLocale]) {
        result[usedLocale] = {};
      }

      result[usedLocale][key as Dictionary['key']] = absoluteFoundPath;
    }
  }

  // Ensure all declared locales are present even if the file doesn't exist yet
  const maskWithKey = await parseFilePathPattern(source, {
    key: '{{__KEY__}}',
    locale: locales[0],
  } as any as FilePathPatternContext);

  const hasKeyInMask = maskWithKey.includes('{{__KEY__}}');
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
        const builtPath = await parseFilePathPattern(source, {
          key,
          locale,
        } as any as FilePathPatternContext);
        const absoluteBuiltPath = isAbsolute(builtPath)
          ? builtPath
          : resolve(baseDir, builtPath);

        result[locale][key as Dictionary['key']] = absoluteBuiltPath;
      }
    }
  }

  return result;
};

type DictionariesMap = { path: string; locale: Locale; key: string }[];

const loadMessagePathMap = async (
  source: MessagesRecord | FilePathPattern,
  configuration: IntlayerConfig
) => {
  const messages: MessagesRecord = await listMessages(
    source as FilePathPattern,
    configuration
  );

  const dictionariesPathMap: DictionariesMap = Object.entries(messages).flatMap(
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

type SyncJSONPluginOptions = {
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

export const syncJSON = async (
  options: SyncJSONPluginOptions
): Promise<Plugin> => {
  // Generate a unique default location based on the source pattern.
  // This ensures that if you have multiple plugins, they don't share the same 'plugin' ID.
  const patternMarker = await parseFilePathPattern(options.source, {
    key: '{{key}}',
    locale: '{{locale}}',
  } as any as FilePathPatternContext);
  const defaultLocation = `sync-json::${patternMarker}`;

  const { location, priority, format } = {
    location: defaultLocation,
    priority: 0,
    ...options,
  };

  // When the source pattern has no `{{key}}` segment, a single file holds every
  // namespace as a first-level key (the next-intl / react-intl model). In that
  // case each top-level key becomes its own dictionary. Can be forced via the
  // `splitKeys` option.
  const hasKeyPlaceholder = patternMarker.includes('{{key}}');
  const shouldSplitByKeys = options.splitKeys ?? !hasKeyPlaceholder;

  return {
    name: 'sync-json',

    loadDictionaries: async ({ configuration }) => {
      const appLogger = getAppLogger(configuration);
      const dictionariesMap: DictionariesMap = await loadMessagePathMap(
        options.source,
        configuration
      );

      if (dictionariesMap.length === 0) {
        const pattern = await parseFilePathPattern(options.source, {
          key: '{{key}}',
          locale: '{{locale}}',
        } as any as FilePathPatternContext);

        appLogger(
          `[sync-json] No dictionaries found at locations matching source pattern: ${colorizePath(pattern)}`,
          { level: 'warn' }
        );
      }

      let fill: string = await parseFilePathPattern(options.source, {
        key: '{{key}}',
        locale: '{{locale}}',
      } as any as FilePathPatternContext);

      if (fill) {
        fill = relative(
          configuration.system.baseDir,
          resolve(configuration.system.baseDir, fill)
        );
      }

      const dictionaries: Dictionary[] = [];

      for (const { locale, path, key } of dictionariesMap) {
        // loadExternalFile swallows errors and returns undefined for missing files;
        // the try/catch does not help here — use ?? {} to guarantee a plain object.
        const json: JSONContent =
          (await loadExternalFile(path, { logError: false })) ?? {};

        const filePath = relative(configuration.system.baseDir, path);

        const filled =
          locale !== configuration.internationalization.defaultLocale
            ? true
            : undefined;

        // One file groups several namespaces by its first-level keys: emit one
        // dictionary per top-level key (e.g. `Hero`, `Nav`, …).
        if (shouldSplitByKeys) {
          for (const [namespaceKey, namespaceContent] of Object.entries(json)) {
            dictionaries.push({
              key: namespaceKey,
              locale,
              fill,
              format,
              localId:
                `${namespaceKey}::${location}::${filePath}` as LocalDictionaryId,
              location: location as Dictionary['location'],
              filled,
              content: namespaceContent as JSONContent,
              filePath,
              priority,
            });
          }
          continue;
        }

        dictionaries.push({
          key,
          locale,
          fill,
          format,
          localId: `${key}::${location}::${filePath}` as LocalDictionaryId,
          location: location as Dictionary['location'],
          filled,
          content: json,
          filePath,
          priority,
        });
      }

      return dictionaries;
    },

    formatOutput: async ({ dictionary, configuration }) => {
      // Lazy import intlayer modules to avoid circular dependencies
      const { formatDictionaryOutput } = await import('@intlayer/engine/build');

      if (!dictionary.filePath || !dictionary.locale) return dictionary;

      // In split mode several namespaces share the same file; the file is
      // re-assembled in `afterBuild`. Skip here to avoid overwriting the whole
      // file with a single namespace.
      if (shouldSplitByKeys) return dictionary;

      const builderPath = await parseFilePathPattern(options.source, {
        key: dictionary.key,
        locale: dictionary.locale,
      } as FilePathPatternContext);

      // Verification to ensure we are formatting the correct file
      if (
        resolve(configuration.system.baseDir, builderPath) !==
        resolve(configuration.system.baseDir, dictionary.filePath)
      ) {
        return dictionary;
      }

      const formattedOutput = formatDictionaryOutput(dictionary, format);

      return formattedOutput.content;
    },

    afterBuild: async ({ dictionaries, configuration }) => {
      // Lazy import intlayer modules to avoid circular dependencies
      const { getPerLocaleDictionary } = await import('@intlayer/core/plugins');
      const { parallelize } = await import('@intlayer/engine/utils');
      const { formatDictionaryOutput } = await import('@intlayer/engine/build');

      const { locales } = configuration.internationalization;

      // Split mode: every namespace dictionary writes back into the same
      // per-locale file. Re-assemble them under their top-level key and write
      // each file once, instead of one file per key (which would overwrite).
      if (shouldSplitByKeys) {
        const mergedByLocale: Record<string, Record<string, unknown>> = {};
        const filePathByLocale: Record<string, string> = {};

        for (const [key, entry] of Object.entries(
          dictionaries.mergedDictionaries
        )) {
          const dictionary = entry.dictionary as Dictionary;

          // Only process dictionaries that belong to THIS plugin instance.
          if (dictionary.location !== location) continue;

          for (const locale of locales) {
            const localizedDictionary = getPerLocaleDictionary(
              dictionary,
              locale
            );

            const formattedOutput = formatDictionaryOutput(
              localizedDictionary,
              format
            );

            const content = JSON.parse(JSON.stringify(formattedOutput.content));

            if (
              typeof content === 'undefined' ||
              (typeof content === 'object' &&
                content !== null &&
                Object.keys(content as Record<string, unknown>).length === 0)
            ) {
              continue;
            }

            mergedByLocale[locale] ??= {};
            mergedByLocale[locale][key] = content;
            filePathByLocale[locale] = await parseFilePathPattern(
              options.source,
              { key, locale } as any as FilePathPatternContext
            );
          }
        }

        await parallelize(Object.keys(mergedByLocale), async (locale) => {
          const builderPath = filePathByLocale[locale];

          if (!builderPath) return;

          await mkdir(dirname(builderPath), { recursive: true });

          const stringContent = JSON.stringify(mergedByLocale[locale], null, 2);

          await writeFile(builderPath, `${stringContent}\n`, 'utf-8');
        });

        return;
      }

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

        const builderPath = await parseFilePathPattern(options.source, {
          key,
          locale,
        } as any as FilePathPatternContext);

        const localizedDictionary = getPerLocaleDictionary(dictionary, locale);

        const formattedOutput = formatDictionaryOutput(
          localizedDictionary,
          format
        );

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
