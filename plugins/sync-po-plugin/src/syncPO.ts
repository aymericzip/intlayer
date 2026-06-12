import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve } from 'node:path';
import { colorizePath, getAppLogger } from '@intlayer/config/logger';
import { parseFilePathPattern } from '@intlayer/config/utils';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
import type {
  Dictionary,
  DictionaryLocation,
  LocalDictionaryId,
} from '@intlayer/types/dictionary';
import type {
  FilePathPattern,
  FilePathPatternContext,
} from '@intlayer/types/filePathPattern';
import type { Plugin } from '@intlayer/types/plugin';
import fg from 'fast-glob';

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

  return { key, locale };
};

// ─── PO format utilities ────────────────────────────────────────────────────

const unescapePO = (str: string): string =>
  str
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\r/g, '\r')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\');

const escapePO = (str: string): string =>
  str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\t/g, '\\t')
    .replace(/\r/g, '\\r');

/**
 * Parse a PO file string into a flat msgid → msgstr record.
 * Skips the PO header (msgid ""), comment lines, and plural/context keywords.
 */
export const parsePO = (fileContent: string): Record<string, string> => {
  const result: Record<string, string> = {};
  const lines = fileContent
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n');

  let msgid = '';
  let msgstr = '';
  let currentField: 'msgid' | 'msgstr' | null = null;

  const finalize = () => {
    if (msgid !== '') {
      result[msgid] = msgstr;
    }
    msgid = '';
    msgstr = '';
    currentField = null;
  };

  for (const line of lines) {
    // Skip all comment types (#, #., #:, #,, #|)
    if (line.startsWith('#')) continue;

    if (line.trim() === '') {
      finalize();
      continue;
    }

    const msgidMatch = line.match(/^msgid\s+"((?:[^"\\]|\\.)*)"$/);
    if (msgidMatch?.[1]) {
      // Starting a new entry — finalize the previous one first
      finalize();
      msgid = unescapePO(msgidMatch[1]);
      currentField = 'msgid';
      continue;
    }

    const msgstrMatch = line.match(/^msgstr\s+"((?:[^"\\]|\\.)*)"$/);
    if (msgstrMatch?.[1]) {
      msgstr = unescapePO(msgstrMatch[1]);
      currentField = 'msgstr';
      continue;
    }

    // Continuation line: `"..."` appends to the current keyword's value
    const contMatch = line.match(/^"((?:[^"\\]|\\.)*)"$/);
    if (contMatch?.[1]) {
      if (currentField === 'msgid') {
        msgid += unescapePO(contMatch[1]);
      } else if (currentField === 'msgstr') {
        msgstr += unescapePO(contMatch[1]);
      }
      continue;
    }

    // Other keywords (msgid_plural, msgstr[n], msgctxt) — not supported; reset field
    currentField = null;
  }

  // Finalize the last entry in the file (no trailing blank line needed)
  finalize();

  return result;
};

/**
 * Serialize a flat key → value record to PO file format.
 * Non-string values are silently skipped.
 */
export const serializePO = (
  content: Record<string, unknown>,
  locale?: string
): string => {
  const lines: string[] = [];

  // PO header entry
  lines.push('msgid ""');
  lines.push('msgstr ""');
  lines.push('"Content-Type: text/plain; charset=UTF-8\\n"');
  lines.push('"Content-Transfer-Encoding: 8bit\\n"');
  if (locale) {
    lines.push(`"Language: ${locale}\\n"`);
  }
  lines.push('"MIME-Version: 1.0\\n"');
  lines.push('');

  for (const [msgid, msgstr] of Object.entries(content)) {
    if (typeof msgstr !== 'string') continue;

    lines.push(`msgid "${escapePO(msgid)}"`);
    lines.push(`msgstr "${escapePO(msgstr)}"`);
    lines.push('');
  }

  return `${lines.join('\n')}\n`;
};

// ─── File-discovery helpers (format-agnostic) ────────────────────────────────

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

// ─── Plugin ──────────────────────────────────────────────────────────────────

type SyncPOPluginOptions = {
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

export const syncPO = async (options: SyncPOPluginOptions): Promise<Plugin> => {
  // Generate a unique default location based on the source pattern.
  const patternMarker = await parseFilePathPattern(options.source, {
    key: '{{key}}',
    locale: '{{locale}}',
  } as any as FilePathPatternContext);
  const defaultLocation = `sync-po::${patternMarker}`;

  const { location, priority } = {
    location: defaultLocation,
    priority: 0,
    ...options,
  };

  return {
    name: 'sync-po',

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
          `[sync-po] No dictionaries found at locations matching source pattern: ${colorizePath(pattern)}`,
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
        let poContent: Record<string, string>;
        try {
          const fileContent = await readFile(path, 'utf-8');
          poContent = parsePO(fileContent);
        } catch {
          poContent = {};
        }

        const filePath = relative(configuration.system.baseDir, path);

        const dictionary: Dictionary = {
          key,
          locale,
          fill,
          format: 'po',
          localId: `${key}::${location}::${filePath}` as LocalDictionaryId,
          location: location as Dictionary['location'],
          filled:
            locale !== configuration.internationalization.defaultLocale
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

    formatOutput: async ({ dictionary, configuration }) => {
      // Lazy import intlayer modules to avoid circular dependencies
      const { formatDictionaryOutput } = await import(
        '@intlayer/chokidar/build'
      );

      if (!dictionary.filePath || !dictionary.locale) return dictionary;

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

      const formattedOutput = formatDictionaryOutput(dictionary, 'po');

      return formattedOutput.content;
    },

    afterBuild: async ({ dictionaries, configuration }) => {
      // Lazy import intlayer modules to avoid circular dependencies
      const { getPerLocaleDictionary } = await import('@intlayer/core/plugins');
      const { parallelize } = await import('@intlayer/chokidar/utils');
      const { formatDictionaryOutput } = await import(
        '@intlayer/chokidar/build'
      );

      const { locales } = configuration.internationalization;

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
          'po'
        );

        const content = JSON.parse(
          JSON.stringify(formattedOutput.content)
        ) as Record<string, unknown>;

        if (
          typeof content === 'undefined' ||
          (typeof content === 'object' &&
            Object.keys(content as Record<string, unknown>).length === 0)
        ) {
          return;
        }

        await mkdir(dirname(builderPath), { recursive: true });

        const poContent = serializePO(content, locale);

        await writeFile(builderPath, poContent, 'utf-8');
      });
    },
  };
};
