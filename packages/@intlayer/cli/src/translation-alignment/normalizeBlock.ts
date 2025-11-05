import type { Block, NormalizedBlock } from './types';

const removeMarkdownFormatting = (text: string): string => {
  return text
    .replace(/`{1,3}[^`]*`{1,3}/g, ' ')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/~~([^~]+)~~/g, '$1')
    .replace(/!?\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/^\s*#{1,6}\s+/gm, '')
    .replace(/^\s*>\s?/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '');
};

const collapseWhitespace = (text: string): string =>
  text.replace(/\s+/g, ' ').trim();

const stripLettersKeepDigitsAndSymbols = (text: string): string => {
  // Keep digits and non-letter characters, remove all letters (including accents)
  return text.replace(/\p{L}+/gu, '');
};

export const normalizeBlock = (block: Block): NormalizedBlock => {
  const contentWithoutMarkdown = removeMarkdownFormatting(block.content);
  const semanticLowercased = contentWithoutMarkdown.toLowerCase();
  const semanticCollapsed = collapseWhitespace(semanticLowercased);

  const anchorOnlySymbols = stripLettersKeepDigitsAndSymbols(block.content);
  const anchorCollapsed = collapseWhitespace(anchorOnlySymbols);

  return {
    ...block,
    semanticText: semanticCollapsed,
    anchorText: anchorCollapsed,
  };
};
