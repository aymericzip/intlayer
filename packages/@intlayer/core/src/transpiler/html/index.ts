import { formatNodeType, NodeType, type TypedNodeModel } from '@intlayer/types';
import { getHTMLCustomComponents } from './getHTMLCustomComponents';

type PropsType = 'number' | 'string' | 'node';

type ComponentName = string;

export type HTMLContentConstructor<
  Content = unknown,
  T extends Record<string, any> = {},
> = TypedNodeModel<NodeType.HTML, Content, T>;

export type HTMLContent<
  Content = unknown,
  Components extends Record<ComponentName, PropsType> = Record<
    ComponentName,
    PropsType
  >,
> = HTMLContentConstructor<
  Content,
  {
    tags: string[] | Components;
  }
>;

// Export types for framework-specific implementations
export type { BaseHTMLProps, ExtractTags } from './types';

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
export const html = <
  Components extends Record<string, any> = Record<string, any>,
  Content = unknown,
>(
  content: Content,
  components?: Components
): HTMLContent<Content, Components> => {
  const getComponents = () => {
    if (components) {
      return components;
    }

    if (typeof content === 'string') {
      return getHTMLCustomComponents(content);
    }

    let stringContent: any;

    if (typeof content === 'function') {
      stringContent = content();
    } else if (typeof (content as Promise<string>).then === 'function') {
      stringContent = async () =>
        getHTMLCustomComponents((await (content as Promise<string>)) as string);
    }

    if (typeof stringContent === 'string') {
      return getHTMLCustomComponents(stringContent);
    }

    try {
      return getHTMLCustomComponents(JSON.stringify(content));
    } catch (_e) {
      return [];
    }
  };

  return formatNodeType(NodeType.HTML, content, {
    tags: getComponents(),
  });
};

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

export type HTMLTagsType = {
  // Document structure
  html: HTMLHtmlElement;
  head: HTMLHeadElement;
  body: HTMLBodyElement;
  main: HTMLElement;
  header: HTMLElement;
  footer: HTMLElement;
  nav: HTMLElement;
  aside: HTMLElement;
  article: HTMLElement;
  section: HTMLElement;
  div: HTMLDivElement;
  span: HTMLSpanElement;

  // Headings
  h1: HTMLHeadingElement;
  h2: HTMLHeadingElement;
  h3: HTMLHeadingElement;
  h4: HTMLHeadingElement;
  h5: HTMLHeadingElement;
  h6: HTMLHeadingElement;

  // Text content
  p: HTMLParagraphElement;
  a: HTMLAnchorElement;
  strong: HTMLElement;
  b: HTMLElement;
  em: HTMLElement;
  i: HTMLElement;
  u: HTMLElement;
  s: HTMLElement;
  del: HTMLModElement;
  ins: HTMLModElement;
  mark: HTMLElement;
  small: HTMLElement;
  sub: HTMLElement;
  sup: HTMLElement;
  code: HTMLElement;
  pre: HTMLPreElement;
  blockquote: HTMLQuoteElement;
  q: HTMLQuoteElement;
  cite: HTMLElement;
  abbr: HTMLElement;
  address: HTMLElement;
  time: HTMLTimeElement;
  kbd: HTMLElement;
  samp: HTMLElement;
  var: HTMLElement;

  // Lists
  ul: HTMLUListElement;
  ol: HTMLOListElement;
  li: HTMLLIElement;
  dl: HTMLDListElement;
  dt: HTMLElement;
  dd: HTMLElement;

  // Tables
  table: HTMLTableElement;
  thead: HTMLTableSectionElement;
  tbody: HTMLTableSectionElement;
  tfoot: HTMLTableSectionElement;
  tr: HTMLTableRowElement;
  th: HTMLTableCellElement;
  td: HTMLTableCellElement;
  caption: HTMLTableCaptionElement;
  colgroup: HTMLTableColElement;
  col: HTMLTableColElement;

  // Forms
  form: HTMLFormElement;
  input: HTMLInputElement;
  textarea: HTMLTextAreaElement;
  button: HTMLButtonElement;
  select: HTMLSelectElement;
  option: HTMLOptionElement;
  optgroup: HTMLOptGroupElement;
  label: HTMLLabelElement;
  fieldset: HTMLFieldSetElement;
  legend: HTMLLegendElement;
  datalist: HTMLDataListElement;
  output: HTMLOutputElement;
  progress: HTMLProgressElement;
  meter: HTMLMeterElement;

  // Media
  img: HTMLImageElement;
  video: HTMLVideoElement;
  audio: HTMLAudioElement;
  source: HTMLSourceElement;
  track: HTMLTrackElement;
  picture: HTMLPictureElement;
  figure: HTMLElement;
  figcaption: HTMLElement;
  iframe: HTMLIFrameElement;
  embed: HTMLEmbedElement;
  object: HTMLObjectElement;
  canvas: HTMLCanvasElement;
  svg: SVGSVGElement;

  // Interactive
  details: HTMLDetailsElement;
  summary: HTMLElement;
  dialog: HTMLDialogElement;

  // Other
  br: HTMLBRElement;
  hr: HTMLHRElement;
  wbr: HTMLElement;
  ruby: HTMLElement;
  rt: HTMLElement;
  rp: HTMLElement;
  bdi: HTMLElement;
  bdo: HTMLElement;
  data: HTMLDataElement;
  template: HTMLTemplateElement;
  slot: HTMLSlotElement;
};

export type HTMLTagDefault = (typeof HTML_TAGS)[number];
