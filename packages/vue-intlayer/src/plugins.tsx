import {
  type DeepTransformContent as DeepTransformContentCore,
  type IInterpreterPluginState as IInterpreterPluginStateCore,
  type Plugins,
} from '@intlayer/core';
import { h } from 'vue';
import { ContentSelectorWrapper } from './editor';
import { renderIntlayerNode } from './renderIntlayerNode';

/** ---------------------------------------------
 *  INTLAYER NODE PLUGIN
 *  --------------------------------------------- */

export type IntlayerNodeCond<T> = T extends number | string
  ? IntlayerNode<T>
  : never;

export interface IntlayerNode<T, P = {}> {
  value: T;
  children?: any;
  additionalProps?: P;
}

/** Translation plugin. Replaces node with a locale string if nodeType = Translation. */
export const intlayerNodePlugins: Plugins = {
  id: 'intlayer-node-plugin',
  canHandle: (node) =>
    typeof node === 'bigint' ||
    typeof node === 'string' ||
    typeof node === 'number',
  transform: (_node, { children, ...rest }) =>
    renderIntlayerNode({
      ...rest,
      value: children,
      children: () =>
        h(
          // EditorSelectorRenderer, // Maximum stack size exceeded
          ContentSelectorWrapper,
          {
            dictionaryKey: rest.dictionaryKey,
            keyPath: rest.keyPath,
          },
          {
            default: () => children,
          }
        ),
    }),
};

/** ---------------------------------------------
 *  PLUGINS RESULT
 *  --------------------------------------------- */

export interface IInterpreterPluginVue<T> {
  intlayerNode: IntlayerNodeCond<T>;
}

/**
 * Insert this type as param of `DeepTransformContent` to avoid `intlayer` package pollution.
 *
 * Otherwise the the `vue-intlayer` plugins will override the types of `intlayer` functions.
 */
export type IInterpreterPluginState = IInterpreterPluginStateCore & {
  intlayerNode: true;
};

export type DeepTransformContent<T> = DeepTransformContentCore<
  T,
  IInterpreterPluginState
>;
