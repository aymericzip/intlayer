import type { BaseHTMLProps, ExtractTags } from '@intlayer/core';
import type { ReactNode } from 'react';

/**
 * Props for React HTML components
 * Extends base HTML props with ReactNode children
 */
export interface ReactComponentProps extends BaseHTMLProps {
  children?: ReactNode;
}

/**
 * React HTML component function type
 */
export type ReactHTMLComponent = (props: ReactComponentProps) => ReactNode;

/**
 * Component map type for React
 * - Standard HTML tags are optional (Partial)
 * - Custom components are required
 */
export type ReactHTMLComponentMap<T = never> = (T extends Record<string, any>
  ? { [K in keyof T]: (props: T[K] & { children?: ReactNode }) => ReactNode }
  : T extends string
    ? { [K in T]: ReactHTMLComponent }
    : {}) &
  Partial<Record<string, ReactHTMLComponent>>;

// Re-export for convenience
export type { ExtractTags };
