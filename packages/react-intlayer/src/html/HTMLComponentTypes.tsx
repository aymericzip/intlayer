import type { HTMLTagsType } from '@intlayer/core/transpiler';
import type { ComponentProps, FC, HTMLAttributes, JSX } from 'react';

/**
 * Helper to map string types from dictionary to TypeScript types
 */
type PropTypeMap<T> = T extends 'string'
  ? string
  : T extends 'number'
    ? number
    : T extends 'boolean'
      ? boolean
      : T;

/**
 * Helper to extract specific props from the configuration value.
 */
type PropsFromConfig<Value> = Value extends true
  ? {}
  : Value extends object
    ? { [K in Exclude<keyof Value, 'children'>]?: PropTypeMap<Value[K]> }
    : {};

/**
 * Smart Type to resolve props based on the key K.
 */
type ElementProps<K> = K extends keyof JSX.IntrinsicElements
  ? ComponentProps<K>
  : HTMLAttributes<HTMLElement>;

/**
 * Helper: Defines the mapping for the explicitly listed keys in T.
 * Handles whether they are Required or Optional.
 */
type DefinedComponents<T, IsRequired extends boolean> = IsRequired extends true
  ? {
      // Required Case
      [K in keyof T]: FC<ElementProps<K> & PropsFromConfig<T[K]>>;
    }
  : {
      // Optional Case
      [K in keyof T]?: FC<ElementProps<K> & PropsFromConfig<T[K]>>;
    };

/**
 * Helper: Defines the standard HTML tags NOT listed in T.
 * These are always optional when included.
 */
type RestHTMLComponents<T> = {
  [K in Exclude<keyof HTMLTagsType, keyof T>]?: FC<
    K extends keyof JSX.IntrinsicElements
      ? ComponentProps<K>
      : HTMLAttributes<HTMLElement>
  >;
};

/**
 * The supported modes for the HTMLComponents type.
 */
export type HTMLComponentMode =
  | 'permissive' // T is optional, HTML is optional, unknown strings allowed
  | 'optional' // T is optional, HTML is optional (Default)
  | 'inclusive' // T is required, HTML is optional
  | 'strict'; // T is required, HTML is forbidden

/**
 * The main component definition with Mode support.
 */
export type HTMLComponents<
  Mode extends HTMLComponentMode = 'optional',
  T = {},
> = Mode extends 'strict'
  ? // Strict: Only keys in T are allowed, and they are required.
    DefinedComponents<T, true>
  : Mode extends 'inclusive'
    ? // Inclusive: Keys in T are required. Rest of HTML is optional.
      DefinedComponents<T, true> & RestHTMLComponents<T>
    : Mode extends 'permissive'
      ? // Permissive: Keys in T optional. Rest of HTML optional. Any other string allowed.
        DefinedComponents<T, false> &
          RestHTMLComponents<T> & {
            [key: string]: FC<any>;
          }
      : // Optional (Default): Keys in T optional. Rest of HTML optional.
        DefinedComponents<T, false> & RestHTMLComponents<T>;
