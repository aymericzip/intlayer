/**
 * Angular inline component template (`template: \`…\``); group 2 is its body.
 * Global: use with `matchAll` / `replace`.
 */
export const ANGULAR_INLINE_TEMPLATE_PATTERN =
  /template\s*:\s*(["'`])([\s\S]*?)\1/g;

/**
 * Extracts script content from Svelte, Vue, and Astro files while preserving offsets.
 * Non-script content is replaced with spaces (same length) so byte offsets stay valid.
 */
export const extractScriptContent = (
  text: string,
  extension: string
): string => {
  if (
    extension !== '.vue' &&
    extension !== '.svelte' &&
    extension !== '.astro'
  ) {
    return text;
  }

  if (extension === '.astro') {
    return extractAstroScript(text);
  }

  // Vue and Svelte SFCs both carry template syntax (@click, :class, v-for,
  // {#each}, class:name) that is not valid JS/JSX and breaks the parser.
  // Keeping only the <script> blocks avoids having to match template/style
  // blocks — which nest (`<template v-for>`, `<template #slot>`) and so cannot
  // be delimited by a non-greedy regex.
  return extractScriptBlocks(text);
};

/**
 * Keep only the content of <script>...</script> blocks, replacing everything
 * else (template, style, directives) with spaces.
 *
 * Byte offsets are preserved because replacements are always 1-for-1 spaces.
 * The opening/closing <script> tags also become spaces; only the body remains.
 *
 * Offset formula: body starts at  match.index + 7 (for "<script") + attrs.length + 1 (for ">")
 */
const extractScriptBlocks = (text: string): string => {
  let result = ' '.repeat(text.length);

  for (const match of text.matchAll(
    /<script\b([^>]*)>([\s\S]*?)<\/script>/gi
  )) {
    const attrs = match[1]!;
    const body = match[2]!;
    // "<script" = 7 chars, attrs captured, ">" = 1 char → body starts here
    const bodyStart = match.index! + 7 + attrs.length + 1;
    result =
      result.slice(0, bodyStart) + body + result.slice(bodyStart + body.length);
  }

  return result;
};

/**
 * Span of the outermost `<template>` block of an SFC, tracking nesting so
 * inner `<template v-for>` / `<template #slot>` tags do not end the block.
 *
 * @returns Offsets of the block body (tags excluded), or null when absent.
 */
export const findTemplateBlock = (
  text: string
): { start: number; end: number; content: string } | null => {
  const tagRegex = /<template\b[^>]*?(\/?)>|<\/template\s*>/gi;

  let depth = 0;
  let bodyStart = -1;

  for (const match of text.matchAll(tagRegex)) {
    const isClosingTag = match[0].startsWith('</');
    const isSelfClosing = match[1] === '/';

    if (isSelfClosing) continue;

    if (!isClosingTag) {
      if (depth === 0) {
        bodyStart = match.index + match[0].length;
      }
      depth++;
      continue;
    }

    depth--;

    if (depth === 0 && bodyStart !== -1) {
      return {
        start: bodyStart,
        end: match.index,
        content: text.slice(bodyStart, match.index),
      };
    }
  }

  return null;
};

/** Replace an entire <tagName>...</tagName> block with spaces (preserves length). */
const stripBlockContent = (text: string, tagName: string): string =>
  text.replace(
    new RegExp(`(<${tagName}\\b[^>]*>)([\\s\\S]*?)(<\\/${tagName}>)`, 'gi'),
    (_, open, content, close) =>
      ' '.repeat(open.length) +
      ' '.repeat(content.length) +
      ' '.repeat(close.length)
  );

/**
 * For Astro files: replace the two `---` frontmatter delimiters with spaces so
 * the frontmatter JS/TS becomes a plain module body parseable by Babel.
 * The HTML template below the frontmatter is JSX-compatible and stays intact.
 * Client-side <script> and <style> blocks are stripped to avoid parse errors.
 */
const extractAstroScript = (text: string): string => {
  let result = text;

  const firstDelim = result.indexOf('---');
  if (firstDelim !== -1) {
    result = `${result.slice(0, firstDelim)}   ${result.slice(firstDelim + 3)}`;

    const secondDelim = result.indexOf('---', firstDelim + 3);
    if (secondDelim !== -1) {
      result = `${result.slice(0, secondDelim)}   ${result.slice(secondDelim + 3)}`;
    }
  }

  // Strip client-side <script> and <style> blocks so their JS/CSS doesn't
  // confuse Babel when it parses the remaining JSX template.
  result = stripBlockContent(result, 'script');
  result = stripBlockContent(result, 'style');

  return result;
};
