import { extname } from 'node:path';

/**
 * A script block extracted from an SFC (Vue or Svelte) source file.
 *
 *   `content`            – The raw JS/TS text between the opening and closing
 *                          `<script>` tags (does NOT include the tags).
 *   `contentStartOffset` – Byte offset of `content[0]` in the full source string.
 *   `contentEndOffset`   – Byte offset one past the last byte of `content` in the
 *                          full source string (i.e. `source.slice(start, end) === content`).
 */
export type ScriptBlock = {
  content: string;
  contentStartOffset: number;
  contentEndOffset: number;
};

// ── SFC script extraction ─────────────────────────────────────────────────────

/**
 * Regex that matches every `<script …>…</script>` block in an SFC (Vue or
 * Svelte).  Works for both instance scripts and module/setup scripts.
 *
 * Limitations (shared with `@intlayer/svelte-compiler`'s own approach):
 *  - A literal `</script>` inside a string or comment inside the script block
 *    would prematurely close the match.  This is an accepted trade-off for the
 *    vast majority of real-world files.
 */
const SFC_SCRIPT_RE = /<script([^>]*)>([\s\S]*?)<\/script>/g;

/**
 * Matches an Astro frontmatter block: the JS/TS code between the opening `---`
 * and closing `---` at the top of an `.astro` file.
 *
 * Group 1 captures the raw script content (without the fence markers).
 */
const ASTRO_FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/;

/**
 * Extracts the frontmatter script block from a raw `.astro` source file.
 * Returns an empty array when no frontmatter fence is present (static pages).
 */
const extractAstroFrontmatter = (code: string): ScriptBlock[] => {
  const match = ASTRO_FRONTMATTER_RE.exec(code);
  if (!match) return [];

  const openingFence = match[0].slice(0, match[0].indexOf('\n') + 1); // "---\n" or "---\r\n"
  const contentStartOffset = openingFence.length;
  const content = match[1] ?? '';

  return [
    {
      content,
      contentStartOffset,
      contentEndOffset: contentStartOffset + content.length,
    },
  ];
};

/**
 * Extracts all `<script>` blocks from a Vue SFC or Svelte source string,
 * returning each block's text content together with its start/end byte offsets
 * in the original source.
 *
 * Uses the same regex strategy as `@intlayer/svelte-compiler` internally.
 */
const extractSFCScriptBlocks = (code: string): ScriptBlock[] => {
  const blocks: ScriptBlock[] = [];
  SFC_SCRIPT_RE.lastIndex = 0;

  for (
    let match = SFC_SCRIPT_RE.exec(code);
    match !== null;
    match = SFC_SCRIPT_RE.exec(code)
  ) {
    // match[0]: full `<script ATTRS>CONTENT</script>`
    // match[1]: the attribute string (may be empty)
    // match[2]: the script content
    const attrs = match[1] ?? '';
    const openingTagLength = '<script'.length + attrs.length + '>'.length;
    const contentStart = match.index + openingTagLength;
    const content = match[2] ?? '';
    blocks.push({
      content,
      contentStartOffset: contentStart,
      contentEndOffset: contentStart + content.length,
    });
  }

  return blocks;
};

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Extracts the script block(s) from a source file, dispatching by extension:
 *
 *  - `.vue` / `.svelte` → searches for `<script>` blocks using a regex.
 *    Returns an **empty array** when no `<script>` tag is found, which
 *    happens both for template-only SFCs and for already-compiled JS that
 *    Vite passes to `enforce:'post'` transform hooks.
 *  - `.astro` → extracts the frontmatter block between the opening and closing
 *    `---` fences.  Returns an empty array when called on already-compiled JS
 *    (no fences present), which is the case inside the `enforce:'post'`
 *    transform hook where Astro has already compiled the file.
 *  - everything else → treats the whole file as a single script block and
 *    returns it wrapped in a single-element array.
 */
export const extractScriptBlocks = (
  filePath: string,
  code: string
): ScriptBlock[] => {
  const ext = extname(filePath);

  if (ext === '.vue' || ext === '.svelte') {
    return extractSFCScriptBlocks(code);
  }

  if (ext === '.astro') {
    return extractAstroFrontmatter(code);
  }

  // Plain JS / TS / JSX / TSX / MJS / CJS – the whole file is the script.
  return [
    {
      content: code,
      contentStartOffset: 0,
      contentEndOffset: code.length,
    },
  ];
};

/**
 * Applies modified script block content back into the original source string.
 *
 * Each entry in `modifications` pairs an original `ScriptBlock` (as returned
 * by `extractScriptBlocks`) with the replacement text for its content.
 * Replacements are applied in reverse offset order so that earlier offsets
 * remain valid while later replacements are being processed.
 *
 * Returns `originalCode` unchanged when `modifications` is empty.
 */
export const injectScriptBlocks = (
  originalCode: string,
  modifications: ReadonlyArray<{
    block: ScriptBlock;
    modifiedContent: string;
  }>
): string => {
  if (modifications.length === 0) return originalCode;

  const sorted = [...modifications].sort(
    (a, b) => b.block.contentStartOffset - a.block.contentStartOffset
  );

  let result = originalCode;
  for (const { block, modifiedContent } of sorted) {
    result =
      result.slice(0, block.contentStartOffset) +
      modifiedContent +
      result.slice(block.contentEndOffset);
  }

  return result;
};
