import { isValidElement, type ReactNode } from 'react';

/**
 * Tags that end a line in extracted text, so the content of two consecutive
 * blocks is not glued into one word.
 *
 * Only the tags the markdown renderer leaves as intrinsic elements are listed;
 * the ones it overrides with a component (`ul`, `blockquote`, headings…) wrap
 * these anyway.
 */
const BLOCK_LEVEL_TAGS = new Set([
  'address',
  'article',
  'br',
  'div',
  'dd',
  'dt',
  'figcaption',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hr',
  'li',
  'p',
  'pre',
  'section',
  'td',
  'th',
  'tr',
]);

/** Flattens a rendered tree into text, one line per block-level element. */
const flattenText = (node: ReactNode): string => {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(flattenText).join('');

  if (isValidElement<{ children?: ReactNode }>(node)) {
    const text = flattenText(node.props.children);

    return typeof node.type === 'string' && BLOCK_LEVEL_TAGS.has(node.type)
      ? `${text}\n`
      : text;
  }

  return '';
};

/**
 * Reads a rendered markdown block back as the plain text a structured-data
 * node holds.
 *
 * The documentation blocks receive their content as already-rendered markdown,
 * so the text has to be collected from the element tree. Formatting carries no
 * meaning for a structured-data consumer, and the whitespace of the markdown
 * layout is collapsed so the result reads as one line per block.
 *
 * @example
 * ```tsx
 * extractPlainText(<><p>Two realistic options:</p><ul><li>Intlayer</li></ul></>);
 * // → 'Two realistic options:\nIntlayer'
 * ```
 */
export const extractPlainText = (node: ReactNode): string =>
  flattenText(node)
    .replace(/[^\S\n]+/g, ' ')
    .replace(/\s*\n\s*/g, '\n')
    .replace(/\n+/g, '\n')
    .trim();
