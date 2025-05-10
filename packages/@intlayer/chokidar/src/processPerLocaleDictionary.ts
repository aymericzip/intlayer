import { deepTransformNode, Plugins, t, type Dictionary } from '@intlayer/core';

/**
 *
 * Should transform per locale dictionaries to multi-locale dictionaries
 *
 * Example:
 *
 * ```json5
 * // .intlayer/dictionaries/home.fr.json
 * { 'key': 'home', 'locale': 'fr', 'content': { 'example': "value", ... } },
 * ```
 *
 * Result:
 *
 * ```json5
 * // .intlayer/dictionaries/home.json
 * {
 *   'key': 'home',
 *   'content': {
 *     'example': {
 *     'nodeType': 'translation',
 *     'translation': {
 *       'fr': 'valeur',
 *     }
 * }, ... } },
 * ```
 *
 * @param dictionary
 * @returns
 */
export const processPerLocaleDictionary = (dictionary: Dictionary) => {
  const isPerLocaleDictionary = typeof dictionary.locale === 'string';

  if (!isPerLocaleDictionary) {
    return dictionary;
  }

  const transformStringToTranslationPlugin: Plugins = {
    id: 'transform-string-to-translation-plugin',
    canHandle: (node) => typeof node === 'string' || typeof node === 'number',
    transform: (node: string | number) =>
      t({ [dictionary.locale as string]: node }),
  };

  return {
    ...dictionary,
    locale: undefined,
    content: deepTransformNode(dictionary.content, {
      dictionaryKey: dictionary.key,
      keyPath: [],
      plugins: [transformStringToTranslationPlugin],
    }),
  };
};
