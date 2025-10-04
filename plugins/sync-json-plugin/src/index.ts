import { isAbsolute, resolve } from 'node:path';
import {
  ESMxCJSRequire,
  type IntlayerConfig,
  type Locales,
  type Plugin,
} from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import fg from 'fast-glob';

type JSONContent = Record<string, any>;

const transformICUToIntlayer = (
  key: string,
  locale: Locales,
  json: JSONContent
): Dictionary => ({
  key,
  locale,
  location: 'plugin',
  content: json,
});

type Builder = ({
  key,
  locale,
}: {
  key: string;
  locale: Locales | string;
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
    locale = match.groups['locale'] as Locales | undefined;
    key = (match.groups['key'] as string | undefined) ?? 'index';
  }

  return {
    key,
    locale,
  };
};

/**
 * Example return 1:
 * ```json
 * {
 *   en: {
 *     index: '/Users/user/Documents/myProject/messages/en.json',
 *   },
 *   de: {
 *     index: '/Users/user/Documents/myProject/messages/de.json',
 *   },
 * }
 * ```
 *
 * Example return 2:
 *
 * ```json
 * {
 *   en: {
 *     navbar: '/Users/user/Documents/myProject/messages/en/navbar.json',
 *     footer: '/Users/user/Documents/myProject/messages/en/footer.json',
 *     homePage: '/Users/user/Documents/myProject/messages/en/homePage.json',
 *   },
 *   de: {
 *     navbar: '/Users/user/Documents/myProject/messages/de/navbar.json',
 *     footer: '/Users/user/Documents/myProject/messages/de/footer.json',
 *     homePage: '/Users/user/Documents/myProject/messages/de/homePage.json',
 *   },
 * }
 * ```
 *
 * Example return 4:
 *
 * ```json
 * {
 *   en: {
 *     index: '/Users/user/Documents/myProject/en/locales.json',
 *     homePage: '/Users/user/Documents/myProject/en/locales/homePage.json',
 *   },
 *   de: {
 *     index: '/Users/user/Documents/myProject/de/locales.json',
 *     homePage: '/Users/user/Documents/myProject/de/locales/homePage.json',
 *   },
 * }
 * ```
 */
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

type ICUPluginOptions = {
  source: MessagesRecord | Builder;
};

type DictionariesMap = { path: string; locale: Locales; key: string }[];

const loadMessagePathMap = (
  source: MessagesRecord | Builder,
  configuration: IntlayerConfig
) => {
  let messages: MessagesRecord;

  if (typeof source === 'function') {
    messages = listMessages(source as Builder, configuration);
  } else {
    messages = source;
  }

  const dictionariesPathMap: DictionariesMap = Object.entries(messages).flatMap(
    ([locale, keysRecord]) =>
      Object.entries(keysRecord).map(
        ([key, path]) =>
          ({
            path,
            locale,
            key,
          }) as DictionariesMap[number]
      )
  );

  return dictionariesPathMap;
};

export const syncJSON = (options: ICUPluginOptions) =>
  ({
    name: 'sync-json',

    loadDictionaries: async ({
      projectRequire = ESMxCJSRequire,
      configuration,
    }) => {
      const dictionariesMap: DictionariesMap = loadMessagePathMap(
        options.source,
        configuration
      );

      const dictionaries: Dictionary[] = [];

      for (const { locale, path, key } of dictionariesMap) {
        const json: JSONContent = projectRequire(path as string);

        dictionaries.push(transformICUToIntlayer(key, locale as Locales, json));
      }

      return dictionaries;
    },
    afterBuild: async ({ dictionaries, configuration }) => {
      const dictionariesMap = loadMessagePathMap(options.source, configuration);
      for (const { locale, path, key } of dictionariesMap) {
        const updatedDictionary = dictionaries.mergedDictionaries[key];
        // console.log(locale);
        // await writeFile(path, presetOutputContent.content);
      }
    },
  }) as Plugin;
