import type { BaseHTMLProps, ExtractTags } from '@intlayer/core';
import type { VNode } from 'vue';

/**
 * Props for Vue HTML components
 * Extends base HTML props with VNode[] children
 */
export interface VueComponentProps extends BaseHTMLProps {
  children?: VNode[];
}

/**
 * Vue HTML component function type
 */
export type VueHTMLComponent = (props: VueComponentProps) => VNode | VNode[];

/**
 * Component map type for Vue
 * - Standard HTML tags are optional (Partial)
 * - Custom components are required
 */
export type VueHTMLComponentMap<T = never> = (T extends Record<string, any>
  ? {
      [K in keyof T]: (props: T[K] & { children?: VNode[] }) => VNode | VNode[];
    }
  : T extends string
    ? { [K in T]: VueHTMLComponent }
    : {}) &
  Partial<Record<string, VueHTMLComponent>>;

// Re-export for convenience
export type { ExtractTags };
