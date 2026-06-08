/**
 * Vanilla JS adapter for the framework-agnostic markdown processor.
 *
 * Builds HTML strings which can be inserted into the DOM via `innerHTML`
 * or the `renderMarkdown` utility.
 */

import type { HTMLTag, MarkdownRuntime } from '@intlayer/core/markdown';

const SELF_CLOSING_TAGS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

const buildPropsString = (props: Record<string, any> | null): string => {
  if (!props) return '';

  return Object.entries(props)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([k, v]) => {
      if (typeof v === 'boolean') return v ? k : '';
      if (k === '_innerHTML') return ''; // handled separately
      return `${k}="${String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;')}"`;
    })
    .filter(Boolean)
    .join(' ');
};

const VANILLA_FRAGMENT = '__vanilla_fragment__';

/**
 * Vanilla-specific MarkdownRuntime that produces HTML strings.
 */
export const vanillaRuntime: MarkdownRuntime = {
  createElement: (
    type: any,
    props: Record<string, any> | null,
    ...children: any[]
  ): string => {
    const childStr = children.flat(Infinity).join('');

    if (type === VANILLA_FRAGMENT) return childStr;

    if (typeof type === 'string') {
      const propsStr = buildPropsString(props);
      const propsWithSpace = propsStr ? ` ${propsStr}` : '';
      const innerHTML = props?._innerHTML;

      if (SELF_CLOSING_TAGS.has(type)) {
        return `<${type}${propsWithSpace}>`;
      }

      if (innerHTML !== undefined) {
        return `<${type}${propsWithSpace}>${innerHTML}</${type}>`;
      }

      return `<${type}${propsWithSpace}>${childStr}</${type}>`;
    }

    // Function component override — returns a string
    if (typeof type === 'function') {
      try {
        const result = type({ ...props, children: childStr });
        return typeof result === 'string' ? result : childStr;
      } catch {
        return childStr;
      }
    }

    return childStr;
  },

  cloneElement: (
    element: unknown,
    _props: Record<string, any>,
    ..._children: any[]
  ): string => {
    return typeof element === 'string' ? element : String(element ?? '');
  },

  Fragment: VANILLA_FRAGMENT as any,

  /**
   * Normalize props to standard HTML attribute names.
   */
  normalizeProps: (
    _tag: HTMLTag,
    props: Record<string, any>
  ): Record<string, any> => {
    const normalized: Record<string, any> = {};

    for (const [key, value] of Object.entries(props)) {
      if (key === 'className') {
        normalized.class = value;
      } else if (key === 'htmlFor') {
        normalized.for = value;
      } else if (key === 'dangerouslySetInnerHTML' && value?.__html) {
        normalized._innerHTML = value.__html;
      } else {
        normalized[key] = value;
      }
    }

    return normalized;
  },
};

/**
 * Creates a vanilla runtime with a custom createElement for advanced use cases.
 */
export const createVanillaRuntime = (
  options: {
    onCreateElement?: (
      type: any,
      props: Record<string, any> | null,
      children: any[]
    ) => string;
  } = {}
): MarkdownRuntime => {
  const { onCreateElement } = options;

  if (onCreateElement) {
    return {
      ...vanillaRuntime,
      createElement: (
        type: any,
        props: Record<string, any> | null,
        ...children: any[]
      ): string => onCreateElement(type, props, children),
    };
  }

  return vanillaRuntime;
};

export default vanillaRuntime;
