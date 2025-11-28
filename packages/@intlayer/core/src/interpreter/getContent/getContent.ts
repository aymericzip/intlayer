import configuration from '@intlayer/config/built';
import { getAppLogger } from '@intlayer/config/client';
import type {
  ContentNode,
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types';
import { deepTransformNode } from './deepTransform';
import {
  conditionPlugin,
  type DeepTransformContent,
  enumerationPlugin,
  filePlugin,
  type IInterpreterPluginState,
  insertionPlugin,
  type NodeProps,
  nestedPlugin,
  type Plugins,
  translationPlugin,
} from './plugins';

/**
 * Transforms a node in a single pass, applying each plugin as needed.
 *
 * @param node The node to transform.
 * @param locale The locale to use if your transformers need it (e.g. for translations).
 */
export const getContent = <
  T extends ContentNode,
  L extends LocalesValues = DeclaredLocales,
>(
  node: T,
  nodeProps: NodeProps,
  locale?: L
) => {
  const defaultLocale = configuration?.internationalization?.defaultLocale;
  const importMode = configuration?.build?.importMode;

  const plugins: Plugins[] = [
    insertionPlugin,
    translationPlugin(
      locale ?? defaultLocale,
      defaultLocale,
      (locale, fallback, keyPath) => {
        const logger = getAppLogger();
        if (
          process.env.NODE_ENV === 'development' &&
          importMode === 'dynamic'
        ) {
          logger(
            [
              `The locale ${locale} is not found, using fallback ${fallback}. Key path: ${keyPath.join('.')}.`,
              `In dynamic mode, intlayer will not load the fallback content in production, it will throw an error, or lead to undefined content.`,
              'You can detect missing content using the `npx intlayer test` command',
            ],
            { level: 'error' }
          );
        }
      }
    ),
    enumerationPlugin,
    conditionPlugin,
    nestedPlugin,
    filePlugin,
    ...(nodeProps.plugins ?? []),
  ];

  return deepTransformNode(node, {
    ...nodeProps,
    plugins,
  }) as DeepTransformContent<T, IInterpreterPluginState, L>;
};
