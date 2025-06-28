import { describe, expect, it } from 'vitest';
import { reorderParagraphs } from './reorderParagraphs';

const baseText = [
  '! Lorem ipsum dolor sit amet consectetur adipiscing elit.',
  // '> Lorem ipsum dolor sit amet consectetur adipiscing elit.', // Additional content
  '+ Lorem dolor sit amet consectetur adipiscing elit.', // Similar n1
  '- Lorem ipsum dolor sit amet consectetur adipiscing elit.',
  '\n\n', // Empty line
  '* Lorem ipsum dolor sit amet consectetur adipiscing elit.',
  'Lorem ipsum dolor sit amet consectetur adipiscing elit.', // No special char
  '+ Lorem dolor sit amet consectetur adipiscing elit.', // Similar n2
  '+ Lorem ipsum dolor sit amet consectetur adipiscing elit.', // Similar n3 but different content
  '= Lorem ipsum dolor sit amet consectetur adipiscing elit.', // Missing content
  '& Lorem ipsum dolor sit amet consectetur adipiscing elit.',
].join('\n\n');

const textToReorder = [
  '! Lorem ipsum dolor sit amet consectetur adipiscing elit.',
  // '> Lorem ipsum dolor sit amet consectetur adipiscing elit.', // Additional content
  '+ Lorem dolor sit amet consectetur adipiscing elit.', // Similar n1
  '\n\n', // Empty line
  '* Lorem ipsum dolor sit amet consectetur adipiscing elit.',
  '- Lorem ipsum dolor sit amet consectetur adipiscing elit.',
  '+ Lorem dolor sit amet consectetur adipiscing elit.', // Similar n2
  'Lorem ipsum dolor sit amet consectetur adipiscing elit.', // No special char
  '+ Lorem ipsum dolor sit amet consectetur adipiscing elit.', // Similar n3 but different content
  '& Lorem ipsum dolor sit amet consectetur adipiscing elit.',
  '= Lorem ipsum dolor sit amet consectetur adipiscing elit.', // Missing content
].join('\n\n');

const texReordered = [
  '! Lorem ipsum dolor sit amet consectetur adipiscing elit.',
  // '> Lorem ipsum dolor sit amet consectetur adipiscing elit.', // Additional content
  '+ Lorem dolor sit amet consectetur adipiscing elit.', // Similar n1
  '- Lorem ipsum dolor sit amet consectetur adipiscing elit.',
  '\n\n', // Empty line
  '* Lorem ipsum dolor sit amet consectetur adipiscing elit.',
  'Lorem ipsum dolor sit amet consectetur adipiscing elit.', // No special char
  '+ Lorem dolor sit amet consectetur adipiscing elit.', // Similar n2
  '+ Lorem ipsum dolor sit amet consectetur adipiscing elit.', // Similar n3 but different content
  '= Lorem ipsum dolor sit amet consectetur adipiscing elit.', // Missing content
  '& Lorem ipsum dolor sit amet consectetur adipiscing elit.',
].join('\n\n');

describe('reorderParagraphs', () => {
  it('should keep the same order when input matches base text', () => {
    const result = reorderParagraphs(baseText, baseText);
    expect(result).toEqual(baseText);
  });

  it('should reorder the paragraphs', () => {
    const result = reorderParagraphs(textToReorder, baseText);
    expect(result).toEqual(texReordered);
  });
});
