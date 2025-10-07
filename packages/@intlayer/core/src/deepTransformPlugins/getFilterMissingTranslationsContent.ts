import configuration from '@intlayer/config/built';
import type { Locales, LocalesValues } from '@intlayer/config/client';
import { getTranslation } from '../interpreter';
import { deepTransformNode } from '../interpreter/getContent/deepTransform';
import type {
  DeepTransformContent,
  NodeProps,
  Plugins,
} from '../interpreter/getContent/plugins';
import type { TranslationContent } from '../transpiler';
import { type ContentNode, type KeyPath, NodeType } from '../types';

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

/** Translation plugin. Replaces node with a locale string if nodeType = Translation. */
export const filterTranslationsOnlyPlugin = (
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

      if (hasLocaleTranslation) {
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

      // Return the base locale content using getTranslation
      // If base locale is missing, use any available locale as fallback
      const baseLocale = configuration?.internationalization.defaultLocale;
      const availableLocales = Object.keys(result);

      if (availableLocales.length === 0) {
        return undefined; // No translations available
      }

      // Try to get the base locale first, then any available locale as fallback
      const fallbackLocale = availableLocales.includes(baseLocale)
        ? baseLocale
        : availableLocales[0];

      return getTranslation(result, baseLocale, fallbackLocale);
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

      // Only return the array if it has items with missing translations
      return result.length > 0 ? result : undefined;
    }

    return node; // Return non-translation content as is
  },
});

/**
 * For each translation node, it compare is both localeToCheck and baseLocale are present.
 * If yes, it should remove the node from the content.
 * If no, it should keep the node
 */
export const getFilterMissingTranslationsContent = <
  T extends ContentNode,
  L extends LocalesValues = Locales,
>(
  node: T,
  localeToCheck: L,
  nodeProps: NodeProps
) => {
  const plugins: Plugins[] = [
    filterTranslationsOnlyPlugin(localeToCheck),
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
