import { mkdir, readFile } from 'node:fs/promises';
import { dirname, isAbsolute, resolve } from 'node:path';
import { parseFilePathPattern } from '@intlayer/config/utils';
import type { Locale } from '@intlayer/types/allLocales';
import type { FilePathPattern } from '@intlayer/types/filePathPattern';
import fg from 'fast-glob';
import { writeFileIfChanged } from '../writeFileIfChanged';
import { extractKeyAndLocaleFromPath } from './extractKeyAndLocaleFromPath';
import { buildFilePathPatternContext } from './filePathPatternHelpers';
import type {
  ContentAdapter,
  ContentEntry,
  FormatCodec,
  SyncContent,
  SyncPluginContext,
} from './types';

/**
 * Discovery strategy of the file adapter:
 * - `strict`: keep only files whose path rebuilds identically from the source
 *   pattern, and fabricate entries for missing locales/keys so every declared
 *   locale has a write-back target (sync plugins).
 * - `inclusive`: keep every glob match without fabricating missing entries
 *   (read-only load plugins, whose patterns may contain free `**` globs).
 */
export type FileAdapterDiscovery = 'strict' | 'inclusive';

export type CreateFileAdapterOptions = {
  /**
   * Location of the files, as a static string, a templated string
   * (e.g. `./messages/{{locale}}/{{key}}.json`) or a function building the
   * path from the key and locale.
   */
  source: FilePathPattern;

  /**
   * Format of the files: string payload ↔ structured content.
   */
  codec: FormatCodec;

  /**
   * Optional override of how one file is read and parsed. Defaults to a plain
   * utf-8 read followed by `codec.parse`, returning `undefined` for missing or
   * unreadable files. Adapters needing richer loading (e.g. JSON5 or
   * transpiled TS sources) provide their own implementation here.
   */
  readEntry?: (
    absoluteFilePath: string,
    context: SyncPluginContext
  ) => Promise<SyncContent | undefined>;

  /**
   * Discovery strategy. Defaults to `'strict'`.
   */
  discovery?: FileAdapterDiscovery;
};

type FilePath = string;
type MessagesRecord = Record<Locale, Record<string, FilePath>>;

/**
 * Create a filesystem {@link ContentAdapter} for `createSyncPlugin`.
 *
 * Handles glob discovery of the source pattern, key/locale extraction from
 * paths, base-directory resolution, and change-detected atomic writes.
 */
export const createFileAdapter = (
  options: CreateFileAdapterOptions
): ContentAdapter => {
  const { source, codec, discovery = 'strict' } = options;
  const readEntry = options.readEntry ?? createFileReader(codec.parse);

  let patternMarkerPromise: Promise<string> | undefined;

  /**
   * Source pattern with `{{key}}` / `{{locale}}` markers kept verbatim,
   * memoized because pattern functions can be asynchronous.
   */
  const getPatternMarker = () => {
    patternMarkerPromise ??= parseFilePathPattern(
      source,
      buildFilePathPatternContext('{{key}}', '{{locale}}')
    );

    return patternMarkerPromise;
  };

  const listMessages = async (
    context: SyncPluginContext
  ): Promise<MessagesRecord> => {
    const { system, internationalization } = context.configuration;
    const { baseDir } = system;
    const { locales } = internationalization;

    const result: MessagesRecord = {} as MessagesRecord;

    for (const locale of locales) {
      const globPatternLocale = await parseFilePathPattern(
        source,
        buildFilePathPatternContext('**', locale)
      );

      const maskPatternLocale = await parseFilePathPattern(
        source,
        buildFilePathPatternContext('{{__KEY__}}', locale)
      );

      if (!globPatternLocale || !maskPatternLocale) {
        continue;
      }

      const normalizedGlobPattern = globPatternLocale.startsWith('./')
        ? globPatternLocale.slice(2)
        : globPatternLocale;

      const files = await fg(normalizedGlobPattern, {
        cwd: baseDir,
      });

      const hasLocaleInMask = maskPatternLocale.includes('{{__LOCALE__}}');
      const hasKeyInMask = maskPatternLocale.includes('{{__KEY__}}');

      for (const file of files) {
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
        } else if (discovery === 'inclusive') {
          // Mask has no placeholders — the file was found via a concrete
          // locale glob. Attribute it directly to the current loop locale.
          key = 'index';
          extractedLocale = locale;
        } else {
          // Strict mode relies on the fabrication step below to attribute
          // placeholder-free sources to their canonical paths.
          continue;
        }

        const absoluteFoundPath = isAbsolute(file)
          ? file
          : resolve(baseDir, file);

        if (discovery === 'strict') {
          // Rebuild what the path SHOULD be for this key/locale. A mismatch
          // means the file belongs to another plugin/structure.
          const expectedPath = await parseFilePathPattern(
            source,
            buildFilePathPatternContext(key, extractedLocale)
          );

          const absoluteExpectedPath = isAbsolute(expectedPath)
            ? expectedPath
            : resolve(baseDir, expectedPath);

          if (absoluteFoundPath !== absoluteExpectedPath) {
            continue;
          }
        }

        result[extractedLocale] ??= {};
        result[extractedLocale][key] = absoluteFoundPath;
      }
    }

    if (discovery === 'inclusive') {
      // Read-only mode only uses actual discovered files; do not fabricate
      // missing locales or keys, since no outputs are written.
      return result;
    }

    // Ensure all declared locales are present even if the file doesn't exist yet
    const maskWithKey = await parseFilePathPattern(
      source,
      buildFilePathPatternContext('{{__KEY__}}', locales[0])
    );

    const hasKeyInMask = maskWithKey.includes('{{__KEY__}}');
    const discoveredKeys = new Set<string>();

    for (const locale of Object.keys(result) as Locale[]) {
      for (const key of Object.keys(result[locale] ?? {})) {
        discoveredKeys.add(key);
      }
    }

    if (!hasKeyInMask) {
      discoveredKeys.add('index');
    }

    for (const locale of locales) {
      result[locale] ??= {};

      for (const key of discoveredKeys) {
        if (!result[locale][key]) {
          const builtPath = await parseFilePathPattern(
            source,
            buildFilePathPatternContext(key, locale)
          );

          result[locale][key] = isAbsolute(builtPath)
            ? builtPath
            : resolve(baseDir, builtPath);
        }
      }
    }

    return result;
  };

  return {
    list: async (context) => {
      const messages = await listMessages(context);

      const entries: ContentEntry[] = (
        Object.entries(messages) as [Locale, Record<string, FilePath>][]
      ).flatMap(([locale, keysRecord]) =>
        Object.entries(keysRecord).map(([key, absoluteFilePath]) => ({
          key,
          locale,
          uri: absoluteFilePath,
          filePath: absoluteFilePath,
        }))
      );

      return entries;
    },

    read: async (entry, context) => await readEntry(entry.uri, context),

    write: async ({ key, locale }, content, { configuration }) => {
      const builderPath = await parseFilePathPattern(
        source,
        buildFilePathPatternContext(key, locale)
      );

      const absoluteFilePath = resolve(
        configuration.system.baseDir,
        builderPath
      );

      await mkdir(dirname(absoluteFilePath), { recursive: true });

      await writeFileIfChanged(
        absoluteFilePath,
        codec.serialize(content, { locale }),
        { tempDir: configuration.system?.tempDir }
      );
    },

    resolveUri: async ({ key, locale }, { configuration }) => {
      const builderPath = await parseFilePathPattern(
        source,
        buildFilePathPatternContext(key, locale)
      );

      return resolve(configuration.system.baseDir, builderPath);
    },

    getFillPattern: async () => await getPatternMarker(),

    describeSource: async () => await getPatternMarker(),

    detectSplitKeys: async () =>
      !(await getPatternMarker()).includes('{{key}}'),
  };
};

/**
 * Default `readEntry` implementation: plain utf-8 read followed by the given
 * parser. Returns `undefined` for missing or unreadable files.
 */
export const createFileReader =
  (parse: (raw: string) => SyncContent) =>
  async (absoluteFilePath: string): Promise<SyncContent | undefined> => {
    try {
      const raw = await readFile(absoluteFilePath, 'utf-8');

      return parse(raw);
    } catch {
      return undefined;
    }
  };
