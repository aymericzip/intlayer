import type {
  DeepTransformContent as DeepTransformContentCore,
  IInterpreterPluginState as IInterpreterPluginStateCore,
  Plugins,
} from '@intlayer/core';
import type { DeclaredLocales, LocalesValues } from '@intlayer/types';
import { ContentSelectorWrapper } from './editor';
import { renderIntlayerNode } from './renderIntlayerNode';

/**
 * Interface for Svelte-specific plugin functionality
 * This interface can be augmented to add more Svelte-specific transformations
 */
export type IInterpreterPluginState = IInterpreterPluginStateCore & {
  /** Any Svelte-specific properties can be added here */
  intlayerNode: true;
};

/**
 * Type that represents the deep transformation of content for Svelte
 * This applies Svelte-specific transformations recursively to all content
 */
export type DeepTransformContent<
  T,
  L extends LocalesValues = DeclaredLocales,
> = DeepTransformContentCore<T, IInterpreterPluginState, L>;

/**
 * Basic Intlayer node plugins for content handling
 * These handle the core content transformation logic
 */
export const intlayerNodePlugins: Plugins = {
  id: 'intlayer-node-plugin',
  canHandle: (node) =>
    typeof node === 'bigint' ||
    typeof node === 'string' ||
    typeof node === 'number',
  transform: (node, { children, ...rest }) =>
    renderIntlayerNode({
      value: children ?? node,
      component: ContentSelectorWrapper,
      props: rest,
    }),
};

/**
 * Svelte-specific node plugins for handling basic content types
 * These plugins handle strings, numbers, and bigints in Svelte applications
 */
export const svelteNodePlugins: Plugins = intlayerNodePlugins;

/**
 * Markdown plugin for handling markdown content in Svelte
 * This can be extended to integrate with Svelte markdown processors
 */
export const markdownPlugin: Plugins = {
  id: 'markdown-plugin',
  canHandle: (node) => typeof node === 'string',
  transform: (node, _props) => {
    // Basic markdown handling - can be extended with proper markdown parser
    return node;
  },
};

export interface IInterpreterPluginSvelte<T> {
  intlayerNode: T extends string | number
    ? ReturnType<typeof renderIntlayerNode>
    : never;
}
