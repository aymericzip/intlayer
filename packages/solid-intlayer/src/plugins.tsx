import type { Plugins } from '@intlayer/core';

/**
 * Interface for Solid-specific plugin functionality
 * This interface can be augmented to add more Solid-specific transformations
 */
export interface IInterpreterPluginSolid<T> {
  /** Any Solid-specific properties can be added here */
  solidRendered?: T;
}

/**
 * Type that represents the deep transformation of content for Solid
 * This applies Solid-specific transformations recursively to all content
 */
export type DeepTransformContent<T> = T extends object
  ? {
      [K in keyof T]: DeepTransformContent<T[K]>;
    } & IInterpreterPluginSolid<T>
  : T;

/**
 * Solid-specific node plugins for handling basic content types
 * These plugins handle strings, numbers, and bigints in Solid applications
 */
export const solidNodePlugins: Plugins = {
  id: 'solid-node-plugin',
  canHandle: (node) =>
    typeof node === 'bigint' ||
    typeof node === 'string' ||
    typeof node === 'number',
  transform: (node, { children, ...rest }) => {
    // For Solid, we can return the raw content as Solid handles reactivity automatically
    // In more complex scenarios, you might want to wrap content in Solid components
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
 * Markdown plugin for handling markdown content in Solid
 * This can be extended to integrate with Solid markdown processors
 */
export const markdownPlugin: Plugins = {
  id: 'markdown-plugin',
  canHandle: (node) => typeof node === 'string',
  transform: (node, props) => {
    // Basic markdown handling - can be extended with proper markdown parser
    return node;
  },
};
