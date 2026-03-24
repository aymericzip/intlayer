import type { HTMLTagsType } from '@intlayer/core/transpiler';

/**
 * Helper to extract specific props from the configuration value.
 */
type PropsFromConfig<Value> = Value extends true
  ? {}
  : Value extends object
    ? Value
    : {};

/**
 * Common props for HTML elements rendered in vanilla JS.
 * Components receive these as a plain object and return an HTML string.
 */
type ElementProps = Record<string, unknown> & {
  children?: string;
};

/**
 * Vanilla component type — a function that takes props and returns a string of HTML.
 */
type VanillaHTMLComponent<P = {}> = (props: P & ElementProps) => string;

/**
 * Helper: Defines the mapping for the explicitly listed keys in T.
 */
type DefinedComponents<T, IsRequired extends boolean> = IsRequired extends true
  ? {
      [K in keyof T]: VanillaHTMLComponent<PropsFromConfig<T[K]>>;
    }
  : {
      [K in keyof T]?: VanillaHTMLComponent<PropsFromConfig<T[K]>>;
    };

/**
 * Helper: Defines the standard HTML tags NOT listed in T.
 */
type RestHTMLComponents<T> = {
  [K in Exclude<keyof HTMLTagsType, keyof T>]?: VanillaHTMLComponent;
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
 * Component map for HTML rendering in vanilla JS.
 * Each component receives props and children and returns an HTML string.
 */
export type HTMLComponents<
  Mode extends HTMLComponentMode = 'optional',
  T = {},
> = Mode extends 'strict'
  ? DefinedComponents<T, true>
  : Mode extends 'inclusive'
    ? DefinedComponents<T, true> & RestHTMLComponents<T>
    : Mode extends 'permissive'
      ? DefinedComponents<T, false> &
          RestHTMLComponents<T> & {
            [key: string]: VanillaHTMLComponent;
          }
      : DefinedComponents<T, false> & RestHTMLComponents<T>;
