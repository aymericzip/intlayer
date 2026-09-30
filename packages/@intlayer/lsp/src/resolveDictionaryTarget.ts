import { getLibraryRootDictionaryKey } from './usageAnalyzer';

/** A dictionary and the path of a field inside its content. */
export type DictionaryTarget = {
  dictionaryKey: string;
  fieldPath: string[];
};

/** A usage-derived target, with the library that produced it. */
export type UsageTarget = DictionaryTarget & {
  /** Caller library, e.g. `'lingui'` — selects its whole-file catalog. */
  library?: string;
};

/** A target matched against the built dictionaries. */
export type ResolvedDictionaryTarget<TDictionary> = DictionaryTarget & {
  /** Every built dictionary (one per source file / locale) under the key. */
  dictionaries: TDictionary[];
  /**
   * `true` when `fieldPath` exists in the content. `fieldPath` then holds the
   * actual property names, flat dotted keys joined (`['profile.title']`).
   */
  isFieldResolved: boolean;
};

/**
 * Dictionary produced by a JSON source holding a whole namespace-less catalog
 * (`./locales/{{locale}}.json`), which i18next's default namespace resolves to.
 */
const WHOLE_FILE_DICTIONARY_KEY = 'index';

/**
 * Minimal shape read from a built dictionary.
 */
type DictionaryWithContent = { content?: unknown };

/**
 * Dictionaries loaded by key; `null`/`undefined`/empty when none is built.
 */
export type DictionaryLoader<TDictionary> = (
  dictionaryKey: string
) =>
  | TDictionary[]
  | null
  | undefined
  | Promise<TDictionary[] | null | undefined>;

/** Unwrap an intlayer translation node down to one locale's value. */
const unwrapTranslationNode = (node: unknown): unknown => {
  if (!node || typeof node !== 'object') return node;

  const record = node as Record<string, unknown>;

  if (record['nodeType'] !== 'translation') return node;

  const translations = record['translation'];

  if (!translations || typeof translations !== 'object') return node;

  return Object.values(translations)[0];
};

/**
 * Walk `segments` through `content`, letting one property consume several
 * segments when its name is their dotted join — catalogs mix nested objects
 * and flat dotted keys (`{ settings: { 'profile.title': … } }`).
 *
 * @returns The property names actually traversed, or `null` when absent.
 */
export const findContentPath = (
  content: unknown,
  segments: string[]
): string[] | null => {
  if (segments.length === 0) return [];

  const node = unwrapTranslationNode(content);

  if (!node || typeof node !== 'object') return null;

  const record = node as Record<string, unknown>;

  for (let length = 1; length <= segments.length; length++) {
    const propertyName = segments.slice(0, length).join('.');

    if (!Object.hasOwn(record, propertyName)) continue;

    const rest = findContentPath(record[propertyName], segments.slice(length));

    if (rest) return [propertyName, ...rest];
  }

  return null;
};

/**
 * Every dictionary/path pair a usage may read, most specific first.
 *
 * The analyzer guesses the dictionary from the source alone: a root-scope id
 * (`t('shared.footer.github')`) names its first segment. The runtime adapters
 * fall back to the whole-file catalog (`index`, lingui's `messages`) when that
 * segment is no dictionary, with or without the segment kept in the path.
 */
export const getUsageTargetCandidates = ({
  dictionaryKey,
  fieldPath,
  library,
}: UsageTarget): DictionaryTarget[] => {
  const libraryRootKey = library
    ? getLibraryRootDictionaryKey(library)
    : undefined;
  const rootKeys = [WHOLE_FILE_DICTIONARY_KEY, libraryRootKey].filter(
    (rootKey): rootKey is string => Boolean(rootKey)
  );

  const candidates: DictionaryTarget[] = [{ dictionaryKey, fieldPath }];

  if (rootKeys.includes(dictionaryKey)) {
    // A single-segment id parked in the root catalog may be its own
    // dictionary (`mockBanner` split out of `messages`).
    const [firstSegment, ...rest] = fieldPath.flatMap((segment) =>
      segment.split('.')
    );

    if (firstSegment) {
      candidates.push({ dictionaryKey: firstSegment, fieldPath: rest });
    }
  } else {
    for (const rootKey of rootKeys) {
      candidates.push(
        { dictionaryKey: rootKey, fieldPath: [dictionaryKey, ...fieldPath] },
        { dictionaryKey: rootKey, fieldPath }
      );
    }
  }

  return candidates;
};

/**
 * Match a usage against the built dictionaries: the first candidate whose
 * field exists wins, else the first candidate whose dictionary exists (the
 * field is then missing, but the dictionary is still a useful target).
 *
 * @param target - Dictionary key + field path guessed from the source.
 * @param loadDictionaries - Built dictionaries by key.
 */
export const resolveDictionaryTarget = async <
  TDictionary extends DictionaryWithContent,
>(
  target: UsageTarget,
  loadDictionaries: DictionaryLoader<TDictionary>
): Promise<ResolvedDictionaryTarget<TDictionary> | null> => {
  let fallback: ResolvedDictionaryTarget<TDictionary> | null = null;

  for (const candidate of getUsageTargetCandidates(target)) {
    const dictionaries =
      (await loadDictionaries(candidate.dictionaryKey)) ?? [];

    if (dictionaries.length === 0) continue;

    for (const dictionary of dictionaries) {
      const contentPath = findContentPath(
        dictionary.content,
        candidate.fieldPath
      );

      if (contentPath) {
        return {
          dictionaryKey: candidate.dictionaryKey,
          fieldPath: contentPath,
          dictionaries,
          isFieldResolved: true,
        };
      }
    }

    fallback ??= { ...candidate, dictionaries, isFieldResolved: false };
  }

  return fallback;
};
