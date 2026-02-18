import type { HTMLTag, MarkdownRuntime } from '@intlayer/core/markdown';

/**
 * Svelte-specific runtime for the markdown processor.
 * Renders markdown to HTML strings since Svelte uses {@html ...} for dynamic HTML.
 */
export const svelteHtmlRuntime: MarkdownRuntime = {
  createElement: (
    tag: any,
    props: Record<string, any> | null,
    ...children: any[]
  ): string => {
    const isStringTag = typeof tag === 'string';

    if (!isStringTag) {
      // If tag is a function (component override), call it.
      // In Svelte, components are often objects or functions.
      // If it's a function that returns an HTMLElement or string, handle it.
      if (typeof tag === 'function') {
        try {
          const result = tag({ ...props, children: children.flat() });
          return typeof result === 'string'
            ? result
            : result?.outerHTML || String(result);
        } catch {
          return `<!-- Error rendering component ${tag.name || 'unknown'} -->`;
        }
      }
      return `<!-- Unsupported component type: ${typeof tag} -->`;
    }

    const tagName = tag as HTMLTag;
    const attributes = Object.entries(props || {})
      .map(([k, v]) => {
        if (v === undefined || v === null || v === false || k === 'key')
          return '';
        const attrName = k === 'className' ? 'class' : k;
        const attrValue =
          v === true ? '' : `="${String(v).replace(/"/g, '&quot;')}"`;
        return ` ${attrName}${attrValue}`;
      })
      .join('');

    const childrenStr = children
      .flat()
      .map((c) => (c === undefined || c === null ? '' : String(c)))
      .join('');

    // Self-closing tags
    const selfClosingTags = [
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
    ];

    if (selfClosingTags.includes(tagName.toLowerCase())) {
      return `<${tagName}${attributes} />`;
    }

    return `<${tagName}${attributes}>${childrenStr}</${tagName}>`;
  },

  cloneElement: (element: unknown, _props: Record<string, any>): string => {
    // Basic implementation: if it's an HTML string, we can't easily merge props
    // without re-parsing. For now, just return as is or wrap if needed.
    return String(element);
  },

  Fragment: (_props: any, ...children: any[]): string =>
    children
      .flat()
      .map((c) => (c === undefined || c === null ? '' : String(c)))
      .join(''),

  normalizeProps: (_tag: HTMLTag, props: Record<string, any>) => props,
};

export default svelteHtmlRuntime;
