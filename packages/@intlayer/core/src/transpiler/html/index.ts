import { formatNodeType, NodeType, type TypedNodeModel } from '@intlayer/types';
import { getHTMLCustomComponents } from './getHTMLCustomComponents';

export type HTMLContentConstructor<
  Content = string,
  T extends Record<string, any> = {},
> = TypedNodeModel<NodeType.HTML, Content, T>;

export type HTMLContent<Content = string> = HTMLContentConstructor<
  Content,
  {
    customComponents: string[];
  }
>;

/**
 * Function intended to be used to build intlayer dictionaries.
 *
 * Allow to parse HTML/JSX-like strings and replace tags with components during interpretation.
 *
 * Usage:
 *
 * ```ts
 * html('Hello <b>World</b>')
 * ```
 *
 */
export const html = (content: string): HTMLContent =>
  formatNodeType(NodeType.HTML, content, {
    customComponents: getHTMLCustomComponents(content),
  });

/**
 * List of standard HTML tags to provide as default components.
 * These allow users to use standard HTML tags in their html() content
 * without having to pass them explicitly.
 *
 * Used by framework-specific plugins (react-intlayer, vue-intlayer, etc.)
 * to create default HTML tag components.
 */
export const HTML_TAGS = [
  // Document structure
  'html',
  'head',
  'body',
  'main',
  'header',
  'footer',
  'nav',
  'aside',
  'article',
  'section',
  'div',
  'span',
  // Headings
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  // Text content
  'p',
  'a',
  'strong',
  'b',
  'em',
  'i',
  'u',
  's',
  'del',
  'ins',
  'mark',
  'small',
  'sub',
  'sup',
  'code',
  'pre',
  'blockquote',
  'q',
  'cite',
  'abbr',
  'address',
  'time',
  'kbd',
  'samp',
  'var',
  // Lists
  'ul',
  'ol',
  'li',
  'dl',
  'dt',
  'dd',
  // Tables
  'table',
  'thead',
  'tbody',
  'tfoot',
  'tr',
  'th',
  'td',
  'caption',
  'colgroup',
  'col',
  // Forms
  'form',
  'input',
  'textarea',
  'button',
  'select',
  'option',
  'optgroup',
  'label',
  'fieldset',
  'legend',
  'datalist',
  'output',
  'progress',
  'meter',
  // Media
  'img',
  'video',
  'audio',
  'source',
  'track',
  'picture',
  'figure',
  'figcaption',
  'iframe',
  'embed',
  'object',
  'canvas',
  'svg',
  // Interactive
  'details',
  'summary',
  'dialog',
  // Other
  'br',
  'hr',
  'wbr',
  'ruby',
  'rt',
  'rp',
  'bdi',
  'bdo',
  'data',
  'template',
  'slot',
] as const;

export type HTMLTagDefault = (typeof HTML_TAGS)[number];
