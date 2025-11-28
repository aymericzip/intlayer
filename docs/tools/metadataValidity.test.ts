import { describe, expect, it } from 'vitest';
import { runMetadataValidityTest } from './metadataValidity';

describe('Metadata Validity', () => {
  it('should ensure all markdown files have valid metadata', () => {
    const result = runMetadataValidityTest();

    expect(result.filesWithErrors).toBe(0);
  }, 60000); // 60 second timeout for processing many files
});
