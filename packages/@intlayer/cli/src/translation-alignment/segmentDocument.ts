import type { Block } from './types';

const isBlankLine = (line: string): boolean => line.trim().length === 0;
const isFencedCodeDelimiter = (line: string): boolean => /^\s*```/.test(line);
const isHeading = (line: string): boolean => /^\s*#{1,6}\s+/.test(line);
const isFrontmatterDelimiter = (line: string): boolean =>
  /^\s*---\s*$/.test(line);
const trimTrailingNewlines = (text: string): string =>
  text.replace(/\n+$/g, '\n');

export const segmentDocument = (text: string): Block[] => {
  const lines = text.split('\n');
  const blocks: Block[] = [];

  let index = 0;
  let insideCodeBlock = false;

  // Buffers
  let currentSectionLines: string[] = [];
  let currentSectionStartLine = 1;

  const flushCurrentSection = (endIndex: number) => {
    if (currentSectionLines.length > 0) {
      // Filter out leading blank lines from the block content to keep it clean,
      // but strictly speaking, we just want to ensure non-empty content.
      const rawContent = currentSectionLines.join('\n');

      if (rawContent.trim().length > 0) {
        blocks.push({
          type: 'paragraph', // Generic type
          content: `${trimTrailingNewlines(rawContent)}\n`,
          lineStart: currentSectionStartLine,
          lineEnd: endIndex,
        });
      }
      currentSectionLines = [];
    }
  };

  while (index < lines.length) {
    const currentLine = lines[index];

    // 1. Handle Frontmatter (Must be at start of file)
    if (blocks.length === 0 && isFrontmatterDelimiter(currentLine)) {
      const startLine = index + 1;
      const contentLines: string[] = [currentLine];
      index++;

      while (index < lines.length && !isFrontmatterDelimiter(lines[index])) {
        contentLines.push(lines[index]);
        index++;
      }

      if (index < lines.length && isFrontmatterDelimiter(lines[index])) {
        contentLines.push(lines[index]);
        index++;
      }

      blocks.push({
        type: 'paragraph',
        content: `${trimTrailingNewlines(contentLines.join('\n'))}\n`,
        lineStart: startLine,
        lineEnd: index,
      });
      continue;
    }

    // 2. Track Code Blocks (Headers inside code blocks are ignored)
    if (isFencedCodeDelimiter(currentLine)) {
      insideCodeBlock = !insideCodeBlock;
    }

    const isHeader = !insideCodeBlock && isHeading(currentLine);

    // 3. Split on Headers
    if (isHeader) {
      // If we have accumulated content, flush it as the previous block
      if (currentSectionLines.length > 0) {
        flushCurrentSection(index);
      }
      // Start a new section with this header
      currentSectionStartLine = index + 1;
      currentSectionLines = [currentLine];
    } else {
      // Accumulate content
      if (currentSectionLines.length === 0 && !isBlankLine(currentLine)) {
        currentSectionStartLine = index + 1;
      }
      currentSectionLines.push(currentLine);
    }

    index++;
  }

  // Flush remaining content
  flushCurrentSection(index);

  return blocks;
};
