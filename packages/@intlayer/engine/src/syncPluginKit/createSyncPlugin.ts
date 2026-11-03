import { relative, resolve } from 'node:path';
import { colorizePath, getAppLogger } from '@intlayer/config/logger';
import type { Locale } from '@intlayer/types/allLocales';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types/dictionary';
import type { Plugin } from '@intlayer/types/plugin';
import type {
  CreateSyncPluginOptions,
  SplitKeysMode,
  SyncContent,
  SyncPluginContext,
} from './types';

/** Separator between the dictionary segment and the key remainder of a flat id. */
const KEY_PREFIX_SEPARATOR = '.';

/**
 * Groups a flat map of dotted ids by their first segment.
 *
 * `{ 'footer.github': 'GitHub', 'footer.contact': 'Contact', 'banner': '!' }`
 * becomes `{ footer: { github: 'GitHub', contact: 'Contact' }, banner: '!' }`.
 *
 * An id without a separator names a dictionary whose content is the value
 * itself — the shape the optimize pass binds with an empty key remainder.
 * Nested (non-flat) values are passed through under their own key, so a
 * catalog mixing both shapes still round-trips.
 */
const groupByKeyPrefix = (
  content: SyncContent
): Record<string, SyncContent | unknown> => {
  const grouped: Record<string, SyncContent | unknown> = {};

  for (const [id, value] of Object.entries(content)) {
    const separatorIndex = id.indexOf(KEY_PREFIX_SEPARATOR);

    if (separatorIndex === -1) {
      grouped[id] = value;
      continue;
    }

    const prefix = id.slice(0, separatorIndex);
    const remainder = id.slice(separatorIndex + 1);
    const bucket = grouped[prefix];

    // A scalar already sits here (`'a'` seen before `'a.b'`): keep the scalar
    // and leave the dotted id whole, rather than silently dropping either.
    if (bucket !== undefined && typeof bucket !== 'object') {
      grouped[id] = value;
      continue;
    }

    grouped[prefix] = { ...((bucket ?? {}) as object), [remainder]: value };
  }

  return grouped;
};

/**
 * Inverse of {@link groupByKeyPrefix} for one dictionary: re-joins a grouped
 * bucket back into the flat dotted ids the source file stores.
 */
const flattenKeyPrefix = (
  prefix: string,
  content: unknown
): Record<string, unknown> => {
  if (
    content === null ||
    typeof content !== 'object' ||
    Array.isArray(content)
  ) {
    // Dot-less id — the dictionary content *is* the message.
    return { [prefix]: content };
  }

  const flattened: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(content)) {
    flattened[`${prefix}${KEY_PREFIX_SEPARATOR}${key}`] = value;
  }
  return flattened;
};

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

  let splitKeysPromise: Promise<SplitKeysMode> | undefined;

  /**
   * `splitKeys` resolution is asynchronous (adapter auto-detection may parse
   * an async source pattern), so it is resolved lazily and memoized.
   */
  const resolveSplitKeys = (): Promise<SplitKeysMode> => {
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

      // One entry groups several namespaces: emit one dictionary per
      // namespace. `true` reads them from the first-level keys (`Hero`,
      // `Nav`, …); `'key-prefix'` derives them from the first dot-segment of
      // a flat catalog's dotted ids (`footer.github` → `footer`).
      if (shouldSplitByKeys) {
        const splitContent =
          shouldSplitByKeys === 'key-prefix'
            ? groupByKeyPrefix(content)
            : content;

        for (const [namespaceKey, namespaceContent] of Object.entries(
          splitContent
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
    const { parallelize } = await import('@intlayer/config/utils');

    const context: SyncPluginContext = { configuration };
    const { locales } = configuration.internationalization;

    // Only ever hand the adapter dictionaries owned by THIS plugin instance.
    const ownedDictionaries = Object.entries(dictionaries.mergedDictionaries)
      .map(([key, result]) => ({
        key,
        dictionary: result.dictionary as Dictionary,
      }))
      .filter(({ dictionary }) => dictionary.location === location);

    const splitMode = await resolveSplitKeys();

    if (splitMode) {
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

          // `'key-prefix'` split the flat dotted ids apart on read; restore
          // them so the source file keeps the shape its library expects,
          // instead of gaining a nested object per prefix.
          if (splitMode === 'key-prefix') {
            Object.assign(
              mergedContentByLocale[locale],
              flattenKeyPrefix(key, content)
            );
          } else {
            mergedContentByLocale[locale][key] = content;
          }

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
