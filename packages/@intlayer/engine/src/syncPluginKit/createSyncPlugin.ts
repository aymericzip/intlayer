import { relative, resolve } from 'node:path';
import { colorizePath, getAppLogger } from '@intlayer/config/logger';
import type { Locale } from '@intlayer/types/allLocales';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types/dictionary';
import type { Plugin } from '@intlayer/types/plugin';
import type {
  CreateSyncPluginOptions,
  SyncContent,
  SyncPluginContext,
} from './types';

/**
 * Content that carries nothing to persist: `undefined`, `null`, or an object
 * without any own key. Writing it back would erase the target.
 */
const isEmptyContent = (content: unknown): boolean =>
  typeof content === 'undefined' ||
  content === null ||
  (typeof content === 'object' && Object.keys(content).length === 0);

/**
 * Deep-clone formatted output into plain JSON data, stripping prototypes and
 * non-serializable values before the emptiness check and the write.
 */
const toPlainContent = (content: unknown): unknown =>
  typeof content === 'undefined'
    ? undefined
    : JSON.parse(JSON.stringify(content));

/**
 * Build an Intlayer {@link Plugin} from a transport adapter.
 *
 * The factory implements the three plugin hooks once — ingestion
 * (`loadDictionaries`), content-declaration reformatting (`formatOutput`) and
 * write-back (`afterBuild`) — so adapters only describe *where* content lives
 * (filesystem, TMS such as Crowdin, extra CMS…) and codecs only describe the
 * payload format. Write-back only processes dictionaries whose `location`
 * matches this plugin instance, so adapters never see foreign content.
 */
export const createSyncPlugin = (options: CreateSyncPluginOptions): Plugin => {
  const {
    name,
    adapter,
    direction = 'both',
    location,
    priority = 0,
    format,
    localeOverride,
  } = options;

  let splitKeysPromise: Promise<boolean> | undefined;

  /**
   * `splitKeys` resolution is asynchronous (adapter auto-detection may parse
   * an async source pattern), so it is resolved lazily and memoized.
   */
  const resolveSplitKeys = (): Promise<boolean> => {
    splitKeysPromise ??= (async () =>
      options.splitKeys ?? (await adapter.detectSplitKeys?.()) ?? false)();

    return splitKeysPromise;
  };

  const loadDictionaries: Plugin['loadDictionaries'] = async ({
    configuration,
  }) => {
    const context: SyncPluginContext = { configuration };
    const appLogger = getAppLogger(configuration);

    const entries = await adapter.list(context);

    if (entries.length === 0) {
      const sourceDescription =
        (await adapter.describeSource?.(context)) ?? name;

      appLogger(
        `[${name}] No dictionaries found at locations matching source pattern: ${colorizePath(sourceDescription)}`,
        { level: 'warn' }
      );
    }

    const shouldSplitByKeys = await resolveSplitKeys();
    const { baseDir } = configuration.system;
    const { defaultLocale } = configuration.internationalization;

    // Sync plugins advertise the source pattern (with {{key}}/{{locale}}
    // markers) as fill target; pull-only plugins fill each entry in place.
    let patternFill: string | undefined;

    if (direction === 'both' && adapter.getFillPattern) {
      const fillPattern = await adapter.getFillPattern(context);
      patternFill = relative(baseDir, resolve(baseDir, fillPattern));
    }

    const dictionaries: Dictionary[] = [];

    for (const entry of entries) {
      const content = (await adapter.read(entry, context)) ?? {};

      const relativeFilePath = entry.filePath
        ? relative(baseDir, entry.filePath)
        : undefined;

      const usedLocale = (localeOverride ?? entry.locale) as Locale;
      const filled = usedLocale !== defaultLocale ? true : undefined;
      const fill = patternFill ?? relativeFilePath;
      const identifier = relativeFilePath ?? entry.uri;

      // One entry groups several namespaces by its first-level keys: emit one
      // dictionary per top-level key (e.g. `Hero`, `Nav`, …).
      if (shouldSplitByKeys) {
        for (const [namespaceKey, namespaceContent] of Object.entries(
          content
        )) {
          dictionaries.push({
            key: namespaceKey,
            locale: usedLocale,
            fill,
            format,
            localId:
              `${namespaceKey}::${location}::${identifier}` as LocalDictionaryId,
            location: location as Dictionary['location'],
            filled,
            content: namespaceContent as SyncContent,
            filePath: relativeFilePath,
            priority,
          } as Dictionary);
        }
        continue;
      }

      dictionaries.push({
        key: entry.key,
        locale: usedLocale,
        fill,
        format,
        localId:
          `${entry.key}::${location}::${identifier}` as LocalDictionaryId,
        location: location as Dictionary['location'],
        filled,
        content,
        filePath: relativeFilePath,
        priority,
      } as Dictionary);
    }

    return dictionaries;
  };

  if (direction === 'pull') {
    return { name, loadDictionaries };
  }

  const formatOutput: Plugin['formatOutput'] = async ({
    dictionary,
    configuration,
  }) => {
    if (!dictionary.filePath || !dictionary.locale) return dictionary;

    // In split mode several namespaces share the same target; the target is
    // re-assembled in `afterBuild`. Skip here to avoid overwriting the whole
    // target with a single namespace.
    if (await resolveSplitKeys()) return dictionary;

    // Ownership check: only reformat declarations this adapter can identify
    // as its own canonical target.
    if (!adapter.resolveUri) return dictionary;

    const canonicalUri = await adapter.resolveUri(
      { key: dictionary.key, locale: dictionary.locale as Locale },
      { configuration }
    );

    const { baseDir } = configuration.system;

    if (
      resolve(baseDir, canonicalUri) !== resolve(baseDir, dictionary.filePath)
    ) {
      return dictionary;
    }

    // Lazy import to keep the module graph light when configs are transpiled
    const { formatDictionaryOutput } = await import('../formatDictionary');

    return formatDictionaryOutput(dictionary as Dictionary, format).content;
  };

  const afterBuild: Plugin['afterBuild'] = async ({
    dictionaries,
    configuration,
  }) => {
    // Lazy imports to keep the module graph light when configs are transpiled
    const { getPerLocaleDictionary } = await import('@intlayer/core/plugins');
    const { formatDictionaryOutput } = await import('../formatDictionary');
    const { parallelize } = await import('../utils/parallelize');

    const context: SyncPluginContext = { configuration };
    const { locales } = configuration.internationalization;

    // Only ever hand the adapter dictionaries owned by THIS plugin instance.
    const ownedDictionaries = Object.entries(dictionaries.mergedDictionaries)
      .map(([key, result]) => ({
        key,
        dictionary: result.dictionary as Dictionary,
      }))
      .filter(({ dictionary }) => dictionary.location === location);

    if (await resolveSplitKeys()) {
      // Split mode: every namespace dictionary writes back into the same
      // per-locale target. Re-assemble them under their top-level key and
      // write each target once, instead of one write per key (which would
      // overwrite).
      const mergedContentByLocale = {} as Record<Locale, SyncContent>;
      const writeKeyByLocale = {} as Record<Locale, string>;

      for (const { key, dictionary } of ownedDictionaries) {
        for (const locale of locales) {
          const localizedDictionary = getPerLocaleDictionary(
            dictionary,
            locale
          );

          const formattedOutput = formatDictionaryOutput(
            localizedDictionary,
            format
          );

          const content = toPlainContent(formattedOutput.content);

          if (isEmptyContent(content)) continue;

          mergedContentByLocale[locale] ??= {};
          mergedContentByLocale[locale][key] = content;
          writeKeyByLocale[locale] = key;
        }
      }

      await parallelize(
        Object.keys(mergedContentByLocale) as Locale[],
        async (locale) => {
          await adapter.write(
            { key: writeKeyByLocale[locale], locale },
            mergedContentByLocale[locale],
            context
          );
        }
      );

      return;
    }

    const writeTasks = ownedDictionaries.flatMap(({ key, dictionary }) =>
      locales.map((locale) => ({ key, dictionary, locale }))
    );

    await parallelize(writeTasks, async ({ key, dictionary, locale }) => {
      const localizedDictionary = getPerLocaleDictionary(dictionary, locale);

      const formattedOutput = formatDictionaryOutput(
        localizedDictionary,
        format
      );

      const content = toPlainContent(formattedOutput.content);

      if (isEmptyContent(content)) return;

      await adapter.write({ key, locale }, content as SyncContent, context);
    });
  };

  return { name, loadDictionaries, formatOutput, afterBuild };
};
