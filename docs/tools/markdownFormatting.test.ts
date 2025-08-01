import { describe, expect, it } from 'vitest';
import { runMarkdownFormattingTest } from './markdownFormatting';

describe('Markdown Formatting', () => {
  it('should run markdown formatting test', () => {
    const result = runMarkdownFormattingTest();

    console.info(result);
    expect(result.filesWithErrors).toBe(0);
  }, 30000); // 30 second timeout for processing many files
});
