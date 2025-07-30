import { describe, expect, it } from 'vitest';
import { runSlugConsistencyTest } from './slugConsistancy';

describe('Slug Consistency', () => {
  it('should ensure slugs in front matter are identical across all language versions', () => {
    const result = runSlugConsistencyTest();

    expect(result.filesWithSlugMismatches).toBe(0);
  }, 60000); // 60 second timeout for processing many files across languages
});
