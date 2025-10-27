import configuration from '@intlayer/config/built';
import type {
  DeclaredLocales,
  Dictionary,
  LocalesValues,
} from '@intlayer/types';
import { type ContentNode, type KeyPath, NodeType } from '@intlayer/types';
import {
  type DeepTransformContent,
  getTranslation,
  type NodeProps,
  type Plugins,
} from '../interpreter';
import { deepTransformNode } from '../interpreter/getContent/deepTransform';
import { type TranslationContent, t as tCore } from '../transpiler';

/**
 * Helper function to check if a node or its children contain translation nodes
 */
const hasTranslationNodes = (node: any): boolean => {
  if (typeof node !== 'object' || node === null) {
    return false;
  }

  if (node?.nodeType === NodeType.Translation) {
    return true;
  }

  if (Array.isArray(node)) {
    return node.some(hasTranslationNodes);
  }

  return Object.values(node).some(hasTranslationNodes);
};

/**
 * Get all keys from an object, recursively
 */
const getObjectKeys = (obj: any): Set<string> => {
  const keys = new Set<string>();

  if (typeof obj !== 'object' || obj === null) {
    return keys;
  }

  for (const key in obj) {
    keys.add(key);
  }

  return keys;
};

/**
 * Check if two objects have the same structure (same keys)
 */
const hasSameStructure = (obj1: any, obj2: any): boolean => {
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return typeof obj1 === typeof obj2;
  }

  if (obj1 === null || obj2 === null) {
    return obj1 === obj2;
  }

  if (Array.isArray(obj1) !== Array.isArray(obj2)) {
    return false;
  }

  const keys1 = getObjectKeys(obj1);
  const keys2 = getObjectKeys(obj2);

  if (keys1.size !== keys2.size) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.has(key)) {
      return false;
    }
  }

  return true;
};

/**
 * Check if all locales in a translation node have the same structure (recursively)
 * Returns an object with locales that have missing keys
 */
const checkTranslationStructureConsistency = (
  translationNode: Record<string, any>
): { hasInconsistency: boolean; localesWithMissingKeys: Set<string> } => {
  const locales = Object.keys(translationNode);
  const localesWithMissingKeys = new Set<string>();

  if (locales.length <= 1) {
    return { hasInconsistency: false, localesWithMissingKeys };
  }

  // Helper function to check structure recursively
  const checkStructureRecursive = (
    path: string,
    localeValues: Map<string, any>
  ): Set<string> => {
    const localesWithIssues = new Set<string>();

    // Get all unique keys across all locale values at this path
    const allKeys = new Set<string>();
    const objectLocales = new Map<string, any>();

    for (const [locale, value] of localeValues.entries()) {
      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        objectLocales.set(locale, value);
        const keys = getObjectKeys(value);
        for (const key of keys) {
          allKeys.add(key);
        }
      }
    }

    // If no objects at this level, no inconsistency
    if (objectLocales.size === 0) {
      return localesWithIssues;
    }

    // Check if each locale has all the keys at this level
    for (const [locale, value] of objectLocales.entries()) {
      const keys = getObjectKeys(value);
      if (keys.size !== allKeys.size) {
        localesWithIssues.add(locale);
      }
    }

    // Recursively check nested objects
    for (const key of allKeys) {
      const nestedValues = new Map<string, any>();
      for (const [locale, value] of objectLocales.entries()) {
        if (value[key] !== undefined) {
          nestedValues.set(locale, value[key]);
        }
      }

      if (nestedValues.size > 1) {
        const nestedIssues = checkStructureRecursive(
          path ? `${path}.${key}` : key,
          nestedValues
        );
        for (const locale of nestedIssues) {
          localesWithIssues.add(locale);
        }
      }
    }

    return localesWithIssues;
  };

  // Start recursive check from root
  const rootValues = new Map<string, any>();
  for (const locale of locales) {
    rootValues.set(locale, translationNode[locale]);
  }

  const issuesFound = checkStructureRecursive('', rootValues);
  const hasInconsistency = issuesFound.size > 0;

  for (const locale of issuesFound) {
    localesWithMissingKeys.add(locale);
  }

  return { hasInconsistency, localesWithMissingKeys };
};

/**
 * Check if array elements have consistent structures
 */
const checkArrayStructureConsistency = (arr: any[]): boolean => {
  if (arr.length <= 1) {
    return true;
  }

  const firstElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (!hasSameStructure(firstElement, arr[i])) {
      return false;
    }
  }

  return true;
};

/** Translation plugin. Replaces node with a locale string if nodeType = Translation. */
export const filterMissingTranslationsOnlyPlugin = (
  localeToCheck: LocalesValues
): Plugins => ({
  id: 'filter-missing-translations-only-plugin',
  canHandle: (node: ContentNode) => {
    // Only handle objects and arrays, not primitives
    return typeof node === 'object' && node !== null;
  },
  transform: (node: ContentNode, props, deepTransformNode) => {
    if (typeof node === 'object' && node?.nodeType === NodeType.Translation) {
      const result = structuredClone(
        (node as TranslationContent)[NodeType.Translation]
      );

      const hasLocaleTranslation = Object.keys(result).includes(localeToCheck);

      // Check for structural inconsistencies across locales
      const { hasInconsistency, localesWithMissingKeys } =
        checkTranslationStructureConsistency(result);

      // If there's a structural inconsistency and the locale being checked
      // has missing keys, treat it as a missing translation
      const hasStructuralIssue =
        hasInconsistency && localesWithMissingKeys.has(localeToCheck);

      if (hasLocaleTranslation && !hasStructuralIssue) {
        return undefined; // Return undefined to remove the node
      }

      // Transform nested content
      for (const key in result) {
        const childProps = {
          ...props,
          children: result[key as unknown as keyof typeof result],
          keyPath: [
            ...props.keyPath,
            { type: NodeType.Translation, key } as KeyPath,
          ],
        };
        result[key as unknown as keyof typeof result] = deepTransformNode(
          result[key as unknown as keyof typeof result],
          {
            ...childProps,
            plugins: [
              ...(props.plugins ?? ([] as Plugins[])).filter(
                (plugin) =>
                  plugin.id !== 'filter-missing-translations-only-plugin'
              ),
            ],
          }
        );
      }

      // Return the base locale content as a translation node
      // If base locale is missing, use any available locale as fallback
      const baseLocale = configuration?.internationalization?.defaultLocale;
      const availableLocales = Object.keys(result);

      if (availableLocales.length === 0) {
        return undefined; // No translations available
      }

      // Try to get the base locale first, then any available locale as fallback
      const fallbackLocale = availableLocales.includes(baseLocale)
        ? baseLocale
        : availableLocales[0];

      const fallbackValue = getTranslation(result, baseLocale, fallbackLocale);

      // Return the translation node structure with only the fallback locale
      return tCore({ [fallbackLocale]: fallbackValue });
    } else if (
      typeof node === 'object' &&
      node !== null &&
      !Array.isArray(node) &&
      !node?.nodeType
    ) {
      // For regular objects, include only children that are related to translations
      // - Keep children that contain translation nodes (directly or nested)
      // - Keep arrays (they may mix translated and non-translated values)
      // - Exclude primitive values (string/number/boolean/null/undefined) at object level
      const result: Record<string, any> = {};
      let hasMissingTranslations = false;
      const arrayKeysIncluded: string[] = [];
      const primitiveSiblingsToAppend: any[] = [];

      for (const key in node as any) {
        const originalChild = (node as any)[key];
        const childProps = {
          ...props,
          children: originalChild,
          keyPath: [
            ...props.keyPath,
            { type: NodeType.Object, key } as KeyPath,
          ],
        };
        const transformedChild = deepTransformNode(originalChild, childProps);

        const isPrimitiveSibling =
          originalChild === null ||
          (typeof originalChild !== 'object' &&
            typeof originalChild !== 'function');

        if (isPrimitiveSibling) {
          // Defer primitives; they may be appended to an array sibling later
          if (originalChild !== undefined) {
            primitiveSiblingsToAppend.push(originalChild);
          }
          continue;
        }

        const includeChild =
          transformedChild !== undefined &&
          (hasTranslationNodes(originalChild) || Array.isArray(originalChild));

        if (includeChild) {
          result[key] = transformedChild;
          hasMissingTranslations = true;
          if (Array.isArray(transformedChild)) {
            arrayKeysIncluded.push(key);
          }
        }
      }

      // If any array child is present, append primitive siblings into the first array
      if (
        arrayKeysIncluded.length > 0 &&
        primitiveSiblingsToAppend.length > 0
      ) {
        const targetArrayKey = arrayKeysIncluded[0];
        // Ensure array exists in result (it should, but be defensive)
        if (Array.isArray(result[targetArrayKey])) {
          result[targetArrayKey] = [
            ...result[targetArrayKey],
            ...primitiveSiblingsToAppend,
          ];
          hasMissingTranslations = true;
        }
      }

      // Only return the object if it has missing translations-related content
      return hasMissingTranslations ? result : undefined;
    } else if (Array.isArray(node)) {
      // Check if array elements have consistent structures
      const hasConsistentStructure = checkArrayStructureConsistency(node);

      // For arrays, only include items that have missing translations
      const result = node
        .map((child, index) => {
          const childProps = {
            ...props,
            children: child,
            keyPath: [
              ...props.keyPath,
              { type: NodeType.Array, key: index } as KeyPath,
            ],
          };
          return deepTransformNode(child, childProps);
        })
        .filter((item) => item !== null && item !== undefined);

      // If there's structural inconsistency in the array, include it
      // even if it has no missing translations, to flag the issue
      if (!hasConsistentStructure && result.length === 0) {
        // Return a marker to indicate structural inconsistency
        return node; // Return original array to show the issue
      }

      // Only return the array if it has items with missing translations
      return result.length > 0 ? result : undefined;
    }

    return node; // Return non-translation content as is
  },
});

/**
 * For each translation node, it compare is both localeToCheck and baseLocale are present.
 *
 * If yes, it should remove the node from the content.
 * If no, it should keep the node
 *
 * In complete mode, for large dictionaries, we want to filter all content that is already translated
 *
 * locale: fr
 *
 * { test1: t({ ar: 'Hello', en: 'Hello', fr: 'Bonjour' } }) -> {}
 * { test2: t({ ar: 'Hello', en: 'Hello' }) } -> { test2: t({ ar: 'Hello', en: 'Hello' }) }
 *
 */
export const getFilterMissingTranslationsContent = <
  T extends ContentNode,
  L extends LocalesValues = DeclaredLocales,
>(
  node: T,
  localeToCheck: L,
  nodeProps: NodeProps
) => {
  const plugins: Plugins[] = [
    filterMissingTranslationsOnlyPlugin(localeToCheck),
    ...(nodeProps.plugins ?? []),
  ];

  const result = deepTransformNode(node, {
    ...nodeProps,
    plugins,
  }) as DeepTransformContent<T>;

  // Stringify the result to remove the undefined values
  if (result === undefined) {
    // No missing translations found
    return {} as DeepTransformContent<T>;
  }
  return JSON.parse(JSON.stringify(result));
};

export const getFilterMissingTranslationsDictionary = (
  dictionary: Dictionary,
  localeToCheck: LocalesValues
) => ({
  ...dictionary,
  content: getFilterMissingTranslationsContent(
    dictionary.content,
    localeToCheck,
    {
      dictionaryKey: dictionary.key,
      keyPath: [],
      plugins: [],
    }
  ),
});
