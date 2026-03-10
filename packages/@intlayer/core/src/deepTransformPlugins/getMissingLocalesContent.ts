import configuration from '@intlayer/config/built';
import type { Locale } from '@intlayer/types/allLocales';
import type { ContentNode, Dictionary } from '@intlayer/types/dictionary';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { NodeType } from '@intlayer/types/nodeType';
import type { DeepTransformContent, NodeProps, Plugins } from '../interpreter';
import { deepTransformNode } from '../interpreter/getContent/deepTransform';
import type { TranslationContent } from '../transpiler';

/**
 * Returns all key paths present in obj, INCLUDING those whose leaf value is null.
 * Used for structural presence checks (a locale must have every key another locale has,
 * even if the value is a null placeholder).
 */
const getAllKeyPaths = (obj: any, prefix: string[] = []): string[][] => {
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    return [];
  }

  return Object.keys(obj).flatMap((key) => {
    const newPath = [...prefix, key];
    const value = obj[key];
    // Stop recursing into null — include the path but don't descend further
    if (value === null) {
      return [newPath];
    }
    return [newPath, ...getAllKeyPaths(value, newPath)];
  });
};

/**
 * Returns key paths whose leaf value is non-null.
 * Used for translation value checks (a locale must not have null where another locale
 * already has a real translated value).
 */
const getNonNullKeyPaths = (obj: any, prefix: string[] = []): string[][] => {
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    return [];
  }

  return Object.keys(obj).flatMap((key) => {
    const newPath = [...prefix, key];
    const value = obj[key];
    // Skip null-valued keys entirely
    if (value === null) {
      return [];
    }
    return [newPath, ...getNonNullKeyPaths(value, newPath)];
  });
};

/**
 * Returns true if the key path EXISTS in obj (even if the terminal value is null).
 * Used for the structural presence check.
 */
const hasKey = (obj: any, keyPath: string[]): boolean => {
  let current = obj;
  for (const key of keyPath) {
    if (
      current === undefined ||
      current === null ||
      typeof current !== 'object'
    ) {
      return false;
    }
    if (!(key in current)) {
      return false;
    }
    current = current[key];
  }
  return true; // key exists; value may be null
};

/**
 * Returns true if the key path exists in obj AND the terminal value is non-null.
 * Used for the translation value check.
 */
const hasNonNullValue = (obj: any, keyPath: string[]): boolean => {
  let current = obj;
  for (const key of keyPath) {
    if (
      current === undefined ||
      current === null ||
      typeof current !== 'object'
    ) {
      return false;
    }
    if (!(key in current)) {
      return false;
    }
    current = current[key];
  }
  // null is treated as a missing translation (e.g., i18next-scanner sets null for untranslated keys)
  return current !== null;
};

/** Translation plugin. Replaces node with a locale string if nodeType = Translation. */
export const checkMissingLocalesPlugin = (
  locales: Locale[],
  onMissingLocale: (locale: Locale) => void
): Plugins => ({
  id: 'check-missing-locales-plugin',
  canHandle: (node) =>
    typeof node === 'object' && node?.nodeType === NodeType.Translation,
  transform: (node: TranslationContent, props, deepTransformNode) => {
    const translations = node[NodeType.Translation] as Record<string, any>;

    /**
     * Two path sets built from all locales' content:
     *
     * presentPaths — every key path that exists in ANY locale, even those whose value
     *   is null. A locale that is missing a path from this set is structurally incomplete
     *   (the key doesn't exist at all).
     *
     * nonNullPaths — every key path that has a non-null value in at least one locale.
     *   A locale that has the key but with null, when another locale already has a real
     *   value, needs translation.
     */
    const presentPaths = new Set<string>();
    const nonNullPaths = new Set<string>();

    for (const locale of locales) {
      const value = translations[locale];
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        getAllKeyPaths(value).forEach((path) => {
          presentPaths.add(JSON.stringify(path));
        });

        getNonNullKeyPaths(value).forEach((path) => {
          nonNullPaths.add(JSON.stringify(path));
        });
      }
    }

    // If no locale has any content at all (all are null/undefined), the key is
    // universally pending — don't flag anyone.
    const hasAnyDefinedValue = locales.some(
      (locale) =>
        translations[locale] !== undefined && translations[locale] !== null
    );

    for (const locale of locales) {
      const value = translations[locale];

      if (value === null) {
        // Entire locale content is a null placeholder.
        // Flag only when some other locale already has real content.
        if (hasAnyDefinedValue) {
          onMissingLocale(locale);
        }
        continue;
      }

      if (!value) {
        // undefined / entirely absent
        onMissingLocale(locale);
        continue;
      }

      let flagged = false;

      // Structural check: every key that exists in any locale must also exist here
      // (even if the local value is null — at least the key must be present).
      for (const pathStr of presentPaths) {
        if (!hasKey(value, JSON.parse(pathStr))) {
          onMissingLocale(locale);
          flagged = true;
          break;
        }
      }

      if (!flagged) {
        // Value check: every key that has a non-null value in some locale must also
        // be non-null here (null = untranslated, needs filling).
        for (const pathStr of nonNullPaths) {
          if (!hasNonNullValue(value, JSON.parse(pathStr))) {
            onMissingLocale(locale);
            break;
          }
        }
      }
    }

    // Continue traversal inside the translation values
    for (const key in translations) {
      const child = translations[key];
      deepTransformNode(child, {
        ...props,
        children: child,
      });
    }

    // Return the original node; the return value is ignored by the caller
    return node;
  },
});

/**
 * Return the content of a node with only the translation plugin.
 *
 * @param node The node to transform.
 * @param locales The locales to check for missing translations.
 */
export const getMissingLocalesContent = <T extends ContentNode>(
  node: T,
  locales: LocalesValues[] = configuration?.internationalization?.locales,
  nodeProps: NodeProps
): Locale[] => {
  const missingLocales = new Set<Locale>();

  const plugins: Plugins[] = [
    checkMissingLocalesPlugin(locales as Locale[], (locale) =>
      missingLocales.add(locale)
    ),
    ...(nodeProps.plugins ?? []),
  ];

  deepTransformNode(node, {
    ...nodeProps,
    plugins,
  }) as DeepTransformContent<T>;

  return Array.from(missingLocales);
};

export const getMissingLocalesContentFromDictionary = (
  dictionary: Dictionary,
  locales: LocalesValues[] = configuration?.internationalization?.locales
) =>
  getMissingLocalesContent(dictionary.content, locales, {
    dictionaryKey: dictionary.key,
    keyPath: [],
  });
