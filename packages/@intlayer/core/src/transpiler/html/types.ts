import type { HTMLTagDefault } from './index';

/**
 * Extract all tag names from an HTML string using type-level parsing
 */
export type ExtractHTMLTags<S extends string> =
  S extends `${string}<${infer Tag}${infer Rest}`
    ? Tag extends
        | `${infer TagName} ${string}`
        | `${infer TagName}>`
        | `${infer TagName}/`
      ? TagName extends `/${string}`
        ? ExtractHTMLTags<Rest>
        : TagName | ExtractHTMLTags<Rest>
      : ExtractHTMLTags<Rest>
    : never;

/**
 * Check if a tag is a standard HTML tag
 */
export type IsStandardHTMLTag<T extends string> =
  Lowercase<T> extends HTMLTagDefault ? true : false;

/**
 * Filter out standard HTML tags from a union of tag names
 */
export type CustomComponentsOnly<T extends string> = T extends any
  ? IsStandardHTMLTag<T> extends true
    ? never
    : T
  : never;

/**
 * Filter to get only standard HTML tags from a union of tag names
 */
export type StandardTagsOnly<T extends string> = T extends any
  ? IsStandardHTMLTag<T> extends true
    ? T
    : never
  : never;

/**
 * Base props that all HTML elements can have
 * Framework-agnostic version
 */
export interface BaseHTMLProps {
  children?: any;
  className?: string;
  id?: string;
  style?: string | Record<string, any>;
  [key: string]: any;
}

/**
 * Helper to extract custom component names from tags array or record
 */
export type ExtractTags<T> = T extends readonly (infer U extends string)[]
  ? U
  : T extends Record<infer K, any>
    ? K extends string
      ? K
      : never
    : never;
