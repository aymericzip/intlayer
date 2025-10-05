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

  it('should not remove ```` when the base chunk starts with it', () => {
    const base = '```test';
    const reviewed = '```test';

    const fixed = fixChunkStartEndChars(reviewed, base);
    expect(fixed).toEqual(base);
  });

  it('should add ```` when the base chunk ends with it', () => {
    const base = '```test';
    const reviewed = 'test';

    const fixed = fixChunkStartEndChars(reviewed, base);
    expect(fixed).toEqual(base);
  });

  it('should remove ```` when the base chunk starts with it', () => {
    const base = 'test';
    const reviewed = '```test';

    const fixed = fixChunkStartEndChars(reviewed, base);
    expect(fixed).toEqual(base);
  });

  it('should not remove ```` when the base chunk finishes with it', () => {
    const base = 'test```';
    const reviewed = 'test```';

    const fixed = fixChunkStartEndChars(reviewed, base);
    expect(fixed).toEqual(base);
  });

  it('should add ```` when the base chunk finishes with it', () => {
    const base = 'test```';
    const reviewed = 'test';

    const fixed = fixChunkStartEndChars(reviewed, base);
    expect(fixed).toEqual(base);
  });

  it('should remove ```` when the base chunk finishes with it', () => {
    const base = 'test';
    const reviewed = 'test```';

    const fixed = fixChunkStartEndChars(reviewed, base);
    expect(fixed).toEqual(base);
  });

  it('should add the missing char is a char list that matching char list', () => {
    // Here the base chunk as entry for the AI
    const baseChunk =
      '```\n' + '\n' + '### 2. **Check if the command is registered**\n';

    // But the translation AI returned a content that is wrong, because the firsts chars are missing
    const aiGeneratedResult =
      '\n' + '\n' + '### 2. **Vérifiez si la commande est enregistrée**\n';

    const fixed = fixChunkStartEndChars(aiGeneratedResult, baseChunk);

    // Check if it start by '```\n' + '\n' + '### 2.'
    expect(fixed).toMatch(/^```\n\n### 2\./);
  });
});
