import {
  type ContentNode,
  type DeclaredLocales,
  type Dictionary,
  NodeType,
} from '@intlayer/types';

type SplittedContentOutput<T = ContentNode> = Record<DeclaredLocales, T> & {
  common: T;
};

type SplitResult = Record<string, ContentNode | undefined> & {
  common?: ContentNode;
};

const isObject = (value: unknown): value is Record<string, any> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const hasNodeType = (value: unknown): value is { nodeType: string } =>
  isObject(value) && typeof (value as any).nodeType === 'string';

const mergeValues = (
  a: ContentNode | undefined,
  b: ContentNode | undefined
): ContentNode | undefined => {
  if (a === undefined) return b;
  if (b === undefined) return a;

  if (Array.isArray(a) && Array.isArray(b)) {
    // Concatenate arrays when merging sibling results
    return [...a, ...b] as unknown as ContentNode;
  }

  if (isObject(a) && isObject(b) && !hasNodeType(a) && !hasNodeType(b)) {
    const result: Record<string, any> = { ...a };
    for (const key of Object.keys(b)) {
      result[key] = mergeValues(
        result[key] as unknown as ContentNode | undefined,
        (b as Record<string, any>)[key] as unknown as ContentNode | undefined
      );
    }
    return result as ContentNode;
  }

  // For primitives or differing structures, prefer b (more recent)
  return b;
};

const mergeSplitResults = (
  base: SplitResult,
  addition: SplitResult
): SplitResult => {
  const result: SplitResult = { ...base };

  // Merge common
  result.common = mergeValues(base.common, addition.common);

  // Merge each locale key present in either side
  const localeKeys = new Set<string>([
    ...Object.keys(base).filter((k) => k !== 'common'),
    ...Object.keys(addition).filter((k) => k !== 'common'),
  ]);

  for (const key of localeKeys) {
    // @ts-ignore: dynamic keys for locales
    result[key] = mergeValues(
      base[key] as ContentNode | undefined,
      addition[key] as ContentNode | undefined
    );
  }

  return result;
};

const splitNode = (node: ContentNode): SplitResult => {
  // Translation node: allocate entirely to per-locale buckets
  if (isObject(node) && (node as any)?.nodeType === NodeType.Translation) {
    const translations = (node as any)[NodeType.Translation] as Record<
      string,
      ContentNode
    >;

    const result: SplitResult = {};
    for (const locale of Object.keys(translations)) {
      const child = translations[locale];
      const childSplit = splitNode(child);

      // The content under a translation belongs to the locale, not common
      // Merge common portion of the child (if any) into the locale as well
      const mergedForLocale = mergeValues(childSplit.common, undefined);

      // Compose locale content: prefer the fully rebuilt child by resolving deeper translations recursively
      // which are already split inside childSplit. We need to recompose a single node for this locale.
      // Recompose by merging all keys in childSplit except 'common' into a single node, then merge child's common.
      let recomposed: ContentNode | undefined;
      for (const key of Object.keys(childSplit)) {
        if (key === 'common') continue;
        recomposed = mergeValues(
          recomposed,
          childSplit[key] as ContentNode | undefined
        );
      }
      const finalLocaleNode = mergeValues(mergedForLocale, recomposed);

      if (finalLocaleNode !== undefined) {
        // @ts-ignore dynamic locale key
        result[locale] = finalLocaleNode;
      }
    }

    return result;
  }

  // Arrays: split each element and merge results index-wise
  if (Array.isArray(node)) {
    const commonArray: any[] = [];
    const perLocaleArrays: Record<string, any[]> = {};

    node.forEach((child) => {
      const childSplit = splitNode(child as ContentNode);

      if (childSplit.common !== undefined) {
        commonArray.push(childSplit.common);
      }

      for (const key of Object.keys(childSplit)) {
        if (key === 'common') continue;
        if (!perLocaleArrays[key]) perLocaleArrays[key] = [];
        const value = childSplit[key];
        if (value !== undefined) perLocaleArrays[key].push(value);
      }
    });

    const result: SplitResult = {};
    if (commonArray.length > 0)
      result.common = commonArray as unknown as ContentNode;
    for (const key of Object.keys(perLocaleArrays)) {
      // @ts-ignore dynamic locale key
      result[key] = perLocaleArrays[key] as unknown as ContentNode;
    }
    return result;
  }

  // Objects (non-typed): recursively split properties
  if (isObject(node) && !hasNodeType(node)) {
    let accumulated: SplitResult = {};

    for (const key of Object.keys(node)) {
      const childSplit = splitNode((node as any)[key] as ContentNode);

      // Assign property into common
      if (childSplit.common !== undefined) {
        accumulated = mergeSplitResults(accumulated, {
          common: { [key]: childSplit.common } as unknown as ContentNode,
        });
      }

      // Assign property into each locale bucket
      for (const locale of Object.keys(childSplit)) {
        if (locale === 'common') continue;
        accumulated = mergeSplitResults(accumulated, {
          // @ts-ignore dynamic locale key
          [locale]: { [key]: childSplit[locale] } as unknown as ContentNode,
        });
      }
    }

    return accumulated;
  }

  // Primitives or typed nodes (non-translation): entirely common
  return { common: node } as SplitResult;
};

export const getSplittedContent = (
  content: ContentNode
): SplittedContentOutput => {
  const split = splitNode(content);

  // Build final output with only defined sections
  const output: Record<string, ContentNode> = {};
  if (split.common !== undefined) {
    output.common = split.common;
  }
  for (const key of Object.keys(split)) {
    if (key === 'common') continue;
    const value = split[key] as ContentNode | undefined;
    if (value !== undefined) {
      output[key] = value;
    }
  }

  return output as unknown as SplittedContentOutput;
};

/**
 * Splits the `content` field of a Dictionary into "common" and per-locale buckets.
 *
 * Given a dictionary like:
 * ```js
 * {
 *   key: "my-key",
 *   content: {
 *     commonContent: "common content",
 *     multilingualContent: t({
 *       en: "english content",
 *       fr: "french content",
 *       de: "german content",
 *     }),
 *   },
 * }
 * ```
 *
 * It produces:
 * ```js
 * {
 *   common: { commonContent: "common content" },
 *   en: { multilingualContent: "english content" },
 *   fr: { multilingualContent: "french content" },
 *   de: { multilingualContent: "german content" },
 * }
 * ```
 *
 * @param dictionary - The input dictionary object with possible multilingual or common content.
 * @returns An object mapping "common" and each locale to their corresponding content subtrees.
 */
export const getSplittedDictionaryContent = (
  dictionary: Dictionary
): SplittedContentOutput<Dictionary['content']> =>
  getSplittedContent(dictionary.content);
