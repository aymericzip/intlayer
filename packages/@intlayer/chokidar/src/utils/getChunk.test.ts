import { describe, expect, it } from 'vitest';

import { getChunk } from './getChunk';

// Sample multiline string used across test cases
const sampleText = [
  'Line 0: The quick brown fox jumps over the lazy dog.',
  'Line 1: Pack my box with five dozen liquor jugs.',
  'Line 2: How razorback-jumping frogs can level six piqued gymnasts!',
  'Line 3: Cozy lummox gives smart squid who asks for job pen.',
  'Line 4: A mad boxer shot a quick, gloved jab to the jaw of his dizzy opponent.',
].join('\n');

describe('getChunk', () => {
  it('returns the whole text when no filters are provided', () => {
    const result = getChunk(sampleText);
    expect(result).toBe(sampleText);
  });

  it('applies lineStart and lineLength filters', () => {
    const result = getChunk(sampleText, { lineStart: 1, lineLength: 2 });

    // Expected substring is lines 1 and 2 plus the newline in-between
    const expected = [
      'Line 1: Pack my box with five dozen liquor jugs.\n',
      'Line 2: How razorback-jumping frogs can level six piqued gymnasts!\n',
    ].join('');

    expect(result).toBe(expected);
  });

  it('applies charStart and charLength filters', () => {
    // Grab substring "quick brown fox" from first line
    const charStart = sampleText.indexOf('quick');
    const charLength = 'quick brown fox'.length;

    const result = getChunk(sampleText, { charStart, charLength });

    expect(result).toBe('quick brown fox');
  });

  it('combines line and char filters by intersecting their ranges', () => {
    // Restrict to lines 0-2, then further to characters within those lines
    const partial = getChunk(sampleText, {
      lineStart: 0,
      lineLength: 3, // lines 0, 1, 2
      // Grab only the first 10 characters of the selected block
      charStart: 0,
      charLength: 10,
    });

    expect(partial).toBe('Line 0: Th');
  });

  it('returns an empty string when effectiveStart > effectiveEnd', () => {
    const result = getChunk(sampleText, { charStart: 10, charLength: 0 });
    expect(result).toBe('');
  });
});
