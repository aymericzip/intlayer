/**
 * Preact-specific MarkdownRuntime implementation.
 */

import type { HTMLTag, MarkdownRuntime } from '@intlayer/core';
import {
  type Component,
  cloneElement,
  createElement,
  Fragment,
  type VNode,
} from 'preact';

/**
 * Preact-specific runtime for the markdown processor.
 */
export const preactRuntime: MarkdownRuntime = {
  createElement: (
    type: string | Component,
    props: Record<string, any> | null,
    ...children: any[]
  ): any => createElement(type as any, props, ...children),

  cloneElement: (
    element: unknown,
    props: Record<string, any>,
    ...children: any[]
  ): any => cloneElement(element as VNode, props, ...children),

  Fragment,

  normalizeProps: (
    _tag: HTMLTag,
    props: Record<string, any>
  ): Record<string, any> => props,
};

export default preactRuntime;
