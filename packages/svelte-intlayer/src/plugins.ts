import type {
  DeepTransformContent as DeepTransformContentCore,
  IInterpreterPluginState as IInterpreterPluginStateCore,
  Plugins,
} from '@intlayer/core';
import type { DeclaredLocales, LocalesValues } from '@intlayer/types';
/**
 * Interface for Svelte-specific plugin functionality
 * This interface can be augmented to add more Svelte-specific transformations
 */
export type IInterpreterPluginState = IInterpreterPluginStateCore & {
  /** Any Svelte-specific properties can be added here */
  // svelteRendered?: true;
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
 * Svelte-specific node plugins for handling basic content types
 * These plugins handle strings, numbers, and bigints in Svelte applications
 */
export const svelteNodePlugins: Plugins = {
  id: 'svelte-node-plugin',
  canHandle: (node) =>
    typeof node === 'bigint' ||
    typeof node === 'string' ||
    typeof node === 'number',
  transform: (node, { children, ...rest }) => {
    // For Svelte, we can return the raw content as Svelte handles reactivity automatically
    // In more complex scenarios, you might want to wrap content in Svelte components
    return children ?? node;
  },
};

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
  transform: (node, { children, ...rest }) => {
    // Return the processed children or the node itself
    return children ?? node;
  },
};

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
