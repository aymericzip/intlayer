import type { Block, BlockType } from './types';

const isBlankLine = (line: string): boolean => line.trim().length === 0;
const isFencedCodeDelimiter = (line: string): boolean => /^\s*```/.test(line);
const isHeading = (line: string): boolean => /^\s*#{1,6}\s+/.test(line);
const isFrontmatterDelimiter = (line: string): boolean =>
  /^\s*---\s*$/.test(line);

/**
 * A content unit (heading, paragraph, code block or frontmatter) spanning a
 * 0-based, inclusive line range. Blank-line runs are not units of their own;
 * they are folded into the preceding unit as trailing separators (see
 * {@link segmentDocument}) so that the concatenation of every block's content
 * reproduces the document byte-for-byte.
 */
type ContentUnit = {
  type: BlockType;
  startIndex: number;
  endIndex: number;
};

/**
 * Split a markdown document into fine-grained blocks.
 *
 * Boundaries are drawn at headings, blank lines (paragraph breaks) and fenced
 * code blocks, while frontmatter and the inside of code fences are kept intact.
 * Each blank-line run is appended to the block that precedes it, so the blocks
 * form an exact partition of the document: concatenating every `content` (in
 * order) yields the original text unchanged. This is what lets the block-aware
 * review re-translate only the paragraphs/snippets that actually changed instead
 * of the whole heading section.
 *
 * @param text - The full markdown document.
 * @returns The ordered list of blocks with their 1-based line ranges.
 */
export const segmentDocument = (text: string): Block[] => {
  const lines = text.split('\n');
  const lineCount = lines.length;

  // 1. Tokenize into content units, skipping blank-line runs (folded in below).
  const units: ContentUnit[] = [];
  let index = 0;

  while (index < lineCount) {
    const currentLine = lines[index];

    if (isBlankLine(currentLine)) {
      index += 1;
      continue;
    }

    // Frontmatter: only when it opens the document.
    if (units.length === 0 && isFrontmatterDelimiter(currentLine)) {
      const startIndex = index;
      index += 1;
      while (index < lineCount && !isFrontmatterDelimiter(lines[index])) {
        index += 1;
      }
      // Include the closing delimiter when present.
      if (index < lineCount) index += 1;
      units.push({ type: 'unknown', startIndex, endIndex: index - 1 });
      continue;
    }

    // Fenced code block: consumed whole so inner blank lines and `#` lines are
    // never treated as boundaries.
    if (isFencedCodeDelimiter(currentLine)) {
      const startIndex = index;
      index += 1;
      while (index < lineCount && !isFencedCodeDelimiter(lines[index])) {
        index += 1;
      }
      // Include the closing fence when present.
      if (index < lineCount) index += 1;
      units.push({ type: 'code_block', startIndex, endIndex: index - 1 });
      continue;
    }

    // Heading: a single self-contained line.
    if (isHeading(currentLine)) {
      units.push({ type: 'heading', startIndex: index, endIndex: index });
      index += 1;
      continue;
    }

    // Paragraph: a run of consecutive lines until a blank line, a heading or a
    // code fence. Tables and tight lists stay together (no blank line between
    // their rows/items).
    const startIndex = index;
    while (
      index < lineCount &&
      !isBlankLine(lines[index]) &&
      !isHeading(lines[index]) &&
      !isFencedCodeDelimiter(lines[index])
    ) {
      index += 1;
    }
    units.push({ type: 'paragraph', startIndex, endIndex: index - 1 });
  }

  if (units.length === 0) return [];

  // 2. Turn each unit into a block whose line range extends to just before the
  //    next unit, so the trailing blank-line run is owned by it. The first block
  //    also absorbs any leading blank lines, and the last block runs to EOF.
  return units.map((unit, unitIndex): Block => {
    const blockStartIndex = unitIndex === 0 ? 0 : unit.startIndex;
    const blockEndIndex =
      unitIndex === units.length - 1
        ? lineCount - 1
        : units[unitIndex + 1].startIndex - 1;

    const blockLines = lines.slice(blockStartIndex, blockEndIndex + 1);
    // Re-append the boundary newline dropped by `split` for every block but the
    // one ending at EOF, so concatenating all blocks rebuilds the document.
    const content =
      blockEndIndex < lineCount - 1
        ? `${blockLines.join('\n')}\n`
        : blockLines.join('\n');

    return {
      type: unit.type,
      content,
      lineStart: blockStartIndex + 1,
      lineEnd: blockEndIndex + 1,
    };
  });
};

/**
 * Split a markdown document into coarse, heading-anchored sections.
 *
 * Built by grouping the fine blocks of {@link segmentDocument}: frontmatter and
 * each heading open a new section, and the following non-heading blocks are
 * folded into it. Because it only concatenates adjacent fine blocks, the result
 * is still an exact partition of the document (sections concatenate back to the
 * source unchanged).
 *
 * Sections are the robust alignment unit between a base document and its
 * translation — both share the same heading structure, so they align almost
 * perfectly and a translation that splits its prose into a different number of
 * paragraphs never causes a section to be dropped. Fine-grained review happens
 * within a section once it is known to have changed.
 *
 * @param text - The full markdown document.
 * @returns The ordered list of sections with their 1-based line ranges.
 */
export const segmentSections = (text: string): Block[] => {
  const fineBlocks = segmentDocument(text);
  const sections: Block[] = [];
  let currentBlocks: Block[] = [];

  const flushSection = (): void => {
    if (currentBlocks.length === 0) return;

    const [firstBlock] = currentBlocks;
    const lastBlock = currentBlocks[currentBlocks.length - 1];

    sections.push({
      type: firstBlock.type,
      content: currentBlocks.map((block) => block.content).join(''),
      lineStart: firstBlock.lineStart,
      lineEnd: lastBlock.lineEnd,
    });
    currentBlocks = [];
  };

  for (const block of fineBlocks) {
    // Frontmatter (a leading `unknown` block) and every heading open a section.
    const opensSection =
      block.type === 'heading' ||
      (block.type === 'unknown' && sections.length === 0);

    if (opensSection) flushSection();
    currentBlocks.push(block);
    if (block.type === 'unknown' && sections.length === 0) flushSection();
  }

  flushSection();

  return sections;
};
