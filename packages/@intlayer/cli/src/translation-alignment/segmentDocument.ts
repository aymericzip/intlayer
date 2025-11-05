import type { Block } from './types';

const isBlankLine = (line: string): boolean => line.trim().length === 0;

const isFencedCodeDelimiter = (line: string): boolean => /^\s*```/.test(line);

const isHeading = (line: string): boolean => /^\s*#{1,6}\s+/.test(line);

const isHorizontalRule = (line: string): boolean =>
  /^(\s*[-*_]){3,}\s*$/.test(line);

const isListItem = (line: string): boolean =>
  /^\s*([-*+]\s+|\d+\.[\t\s]+)/.test(line);

const isBlockquote = (line: string): boolean => /^\s*>\s?/.test(line);

const isTableLike = (line: string): boolean =>
  /\|/.test(line) && !isCodeFenceStart(line);

const isCodeFenceStart = (line: string): boolean => /^\s*```/.test(line);

const trimTrailingNewlines = (text: string): string =>
  text.replace(/\n+$/g, '\n');

export const segmentDocument = (text: string): Block[] => {
  const lines = text.split('\n');
  const blocks: Block[] = [];

  let index = 0;
  while (index < lines.length) {
    const startIndex = index;
    const currentLine = lines[index];

    // Code block (fenced)
    if (isFencedCodeDelimiter(currentLine)) {
      const contentLines: string[] = [currentLine];
      index += 1;
      while (index < lines.length && !isFencedCodeDelimiter(lines[index])) {
        contentLines.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) {
        contentLines.push(lines[index]);
        index += 1;
      }
      blocks.push({
        type: 'code_block',
        content: `${trimTrailingNewlines(contentLines.join('\n'))}\n`,
        lineStart: startIndex + 1,
        lineEnd: index,
      });
      continue;
    }

    // Horizontal rule
    if (isHorizontalRule(currentLine)) {
      blocks.push({
        type: 'horizontal_rule',
        content: `${currentLine}\n`,
        lineStart: startIndex + 1,
        lineEnd: startIndex + 1,
      });
      index += 1;
      continue;
    }

    // Heading
    if (isHeading(currentLine)) {
      blocks.push({
        type: 'heading',
        content: `${currentLine}\n`,
        lineStart: startIndex + 1,
        lineEnd: startIndex + 1,
      });
      index += 1;
      continue;
    }

    // List block (one or more consecutive list items)
    if (isListItem(currentLine)) {
      const contentLines: string[] = [];
      while (
        index < lines.length &&
        (isListItem(lines[index]) ||
          (!isBlankLine(lines[index]) && /^\s{2,}/.test(lines[index])))
      ) {
        contentLines.push(lines[index]);
        index += 1;
      }
      blocks.push({
        type: 'list_item',
        content: `${trimTrailingNewlines(contentLines.join('\n'))}\n`,
        lineStart: startIndex + 1,
        lineEnd: index,
      });
      continue;
    }

    // Blockquote (may span multiple lines)
    if (isBlockquote(currentLine)) {
      const contentLines: string[] = [];
      while (
        index < lines.length &&
        (isBlockquote(lines[index]) || !isBlankLine(lines[index]))
      ) {
        contentLines.push(lines[index]);
        index += 1;
      }
      blocks.push({
        type: 'blockquote',
        content: `${trimTrailingNewlines(contentLines.join('\n'))}\n`,
        lineStart: startIndex + 1,
        lineEnd: index,
      });
      continue;
    }

    // Table-like (simple heuristic)
    if (isTableLike(currentLine)) {
      const contentLines: string[] = [];
      while (
        index < lines.length &&
        /\|/.test(lines[index]) &&
        !isBlankLine(lines[index])
      ) {
        contentLines.push(lines[index]);
        index += 1;
      }
      blocks.push({
        type: 'table',
        content: `${trimTrailingNewlines(contentLines.join('\n'))}\n`,
        lineStart: startIndex + 1,
        lineEnd: index,
      });
      continue;
    }

    // Paragraph (gathers until blank line)
    if (!isBlankLine(currentLine)) {
      const contentLines: string[] = [];
      while (index < lines.length && !isBlankLine(lines[index])) {
        // stop if we detect a new structural block start
        if (
          isHeading(lines[index]) ||
          isFencedCodeDelimiter(lines[index]) ||
          isHorizontalRule(lines[index]) ||
          isListItem(lines[index]) ||
          isBlockquote(lines[index]) ||
          isTableLike(lines[index])
        ) {
          break;
        }
        contentLines.push(lines[index]);
        index += 1;
      }
      // consume a single trailing blank line if present
      if (index < lines.length && isBlankLine(lines[index])) {
        contentLines.push(lines[index]);
        index += 1;
      }
      blocks.push({
        type: 'paragraph',
        content: `${trimTrailingNewlines(contentLines.join('\n'))}\n`,
        lineStart: startIndex + 1,
        lineEnd: index,
      });
      continue;
    }

    // Blank line outside of a paragraph: keep to preserve spacing minimally
    blocks.push({
      type: 'unknown',
      content: `${currentLine}\n`,
      lineStart: startIndex + 1,
      lineEnd: startIndex + 1,
    });
    index += 1;
  }

  return blocks;
};
