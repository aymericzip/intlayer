import { describe, expect, it } from 'vitest';
import { fixChunkStartEndChars } from './fixChunkStartEndChars';

// Helper to visualise new line at the beginning/end of a string when debugging
const visible = (str: string) => str.replace(/\n/g, '\\n');

describe('fixChunkStartEndChars', () => {
  it('should add the missing starting character when the base chunk starts with it', () => {
    const base = '\nHello world';
    const reviewed = 'Hello world';

    const fixed = fixChunkStartEndChars(reviewed, base);
    expect(visible(fixed)).toEqual(visible(base));
  });

  it('should add the missing ending character when the base chunk ends with it', () => {
    const base = 'console.log("hi")```';
    const reviewed = 'console.log("hi")';

    const fixed = fixChunkStartEndChars(reviewed, base);
    expect(fixed).toEqual(base);
  });

  it('should remove the extra starting character when the base chunk does not start with it', () => {
    const base = 'Hello world';
    const reviewed = '\nHello world';

    const fixed = fixChunkStartEndChars(reviewed, base);
    expect(visible(fixed)).toEqual(visible(base));
  });

  it('should remove the extra ending character when the base chunk does not end with it', () => {
    const base = 'Hello world';
    const reviewed = 'Hello world---';

    const fixed = fixChunkStartEndChars(reviewed, base);
    expect(fixed).toEqual(base);
  });

  it('should return the reviewed chunk untouched when already matching the base structure', () => {
    const base = 'Plain text without special markers';
    const reviewed = 'Plain text without special markers';

    const fixed = fixChunkStartEndChars(reviewed, base);
    expect(fixed).toEqual(base);
  });
});
