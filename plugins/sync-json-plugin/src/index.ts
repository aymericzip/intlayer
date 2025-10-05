import { writeFile } from 'node:fs/promises';
import { isAbsolute, join, relative, resolve } from 'node:path';
import {
  ESMxCJSRequire,
  type IntlayerConfig,
  type Locales,
  type LocalesValues,
  type Plugin,
} from '@intlayer/config';
import type { ContentNode, Dictionary } from '@intlayer/core';
import fg from 'fast-glob';

type JSONContent = Record<string, any>;

type Builder = ({
  key,
  locale,
}: {
  key: string;
  locale: LocalesValues | (string & {});
}) => string;

type MessagesRecord = Record<Locales, Record<Dictionary['key'], FilePath>>;

const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const extractKeyAndLocaleFromPath = (
  filePath: string,
  maskPattern: string,
  locales: Locales[]
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

  let locale: Locales | undefined;
  let key: string | undefined;

  if (match?.groups) {
    locale = match.groups.locale as Locales | undefined;
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
  const locales = internationalization.locales as Locales[];

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

    if (!result[locale as Locales]) {
      result[locale as Locales] = {};
    }

    result[locale as Locales][key as Dictionary['key']] = absolutePath;
  }

  return result;
};

type FilePath = string;

type DictionariesMap = { path: string; locale: Locales; key: string }[];

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
   */
  location?: string;
};

export const syncJSON = (options: SyncJSONPluginOptions) => {
  const { location } = { location: 'plugin', ...options };

  return {
    name: 'sync-json',

    loadDictionaries: async ({
      projectRequire = ESMxCJSRequire,
      configuration,
    }) => {
      const dictionariesMap: DictionariesMap = loadMessagePathMap(
        options.source,
        configuration
      );

      let autoFill: string = options.source({
        key: '{{key}}',
        locale: '{{locale}}',
      });

      if (autoFill && !isAbsolute(autoFill)) {
        autoFill = join(configuration.content.baseDir, autoFill);
      }

      const dictionaries: Dictionary[] = [];

      for (const { locale, path, key } of dictionariesMap) {
        const json: JSONContent = projectRequire(path as string);

        const filePath = relative(configuration.content.baseDir, path);

        const dictionary: Dictionary = {
          key,
          locale,
          autoFill,
          localId: `${key}::${location}::${filePath}`,
          location: location as Dictionary['location'],
          autoFilled:
            locale !== configuration.internationalization.defaultLocale
              ? true
              : undefined,
          content: json,
          filePath,
        };

        dictionaries.push(dictionary);
      }

      return dictionaries;
    },
    afterBuild: async ({ dictionaries, configuration }) => {
      const dictionariesMap = loadMessagePathMap(options.source, configuration);
      for (const { locale, path, key } of dictionariesMap) {
        const updatedDictionary =
          dictionaries.mergedDictionaries[key].dictionary;

        // Dynamic import to avoid circular dependency as core package import config, that load esbuild, that load the config file, that load the plugin
        const { getLocalizedContent } = await import('@intlayer/core');

        const localizedContent = getLocalizedContent(
          updatedDictionary.content as unknown as ContentNode,
          locale,
          {
            dictionaryKey: key,
            keyPath: [],
          }
        );

        const jsonContent = JSON.stringify(localizedContent, null, 2);

        await writeFile(
          path,
          `${jsonContent}\n`, // Add a new line at the end of the file to avoid formatting issues with VSCode
          'utf-8'
        );
      }
    },
    formatOutput: ({ dictionary }) => {
      if (!dictionary.filePath || !dictionary.locale) return dictionary;

      const builderPath = options.source({
        key: dictionary.key,
        locale: dictionary.locale,
      });

      if (resolve(builderPath) === resolve(dictionary.filePath)) {
        console.log('is the same');
        return dictionary.content;
      }

      return dictionary;
    },
  } as Plugin;
};
