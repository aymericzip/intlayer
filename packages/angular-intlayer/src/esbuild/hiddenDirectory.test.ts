import { describe, expect, it } from 'vitest';
import { isInHiddenDirectory } from './hiddenDirectory';

describe('isInHiddenDirectory', () => {
  const baseDir = '/workspace/app';

  it('flags the default .intlayer output directories', () => {
    expect(isInHiddenDirectory(baseDir, '/workspace/app/.intlayer/types')).toBe(
      true
    );
    expect(
      isInHiddenDirectory(baseDir, '/workspace/app/generated/.cache/types')
    ).toBe(true);
  });

  it('accepts directories without a dot segment', () => {
    expect(isInHiddenDirectory(baseDir, '/workspace/app/intlayer-types')).toBe(
      false
    );
    expect(isInHiddenDirectory(baseDir, '/workspace/app/src/types')).toBe(
      false
    );
  });

  it('does not treat parent traversal as hidden', () => {
    expect(isInHiddenDirectory(baseDir, '/workspace/shared/types')).toBe(false);
  });
});
