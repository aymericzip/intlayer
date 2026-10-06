import { describe, expect, it } from 'vitest';
import { isDirectoryExcluded } from './isDirectoryExcluded';

describe('isDirectoryExcluded', () => {
  const excludePatterns = ['**/node_modules/**', '**/dist/**', '**/.next/**'];

  it('detects a directory inside an excluded folder', () => {
    expect(isDirectoryExcluded('packages/ds/dist/esm', excludePatterns)).toBe(
      true
    );
    expect(isDirectoryExcluded('node_modules/ds', excludePatterns)).toBe(true);
    expect(isDirectoryExcluded('/abs/app/.next', excludePatterns)).toBe(true);
  });

  it('matches whole segments only', () => {
    expect(isDirectoryExcluded('src/distance', excludePatterns)).toBe(false);
    expect(isDirectoryExcluded('src/my-dist', excludePatterns)).toBe(false);
  });

  it('handles negated patterns and Windows separators', () => {
    expect(isDirectoryExcluded('ds\\dist\\esm', ['!**/dist/**'])).toBe(true);
  });

  it('ignores file-shaped and wildcard patterns', () => {
    expect(
      isDirectoryExcluded('src/app.config.dir', ['**/*.config.*', '**/*.d.ts'])
    ).toBe(false);
  });

  it('supports multi-segment patterns', () => {
    expect(isDirectoryExcluded('a/foo/bar/b', ['**/foo/bar/**'])).toBe(true);
    expect(isDirectoryExcluded('a/foo/b/bar', ['**/foo/bar/**'])).toBe(false);
  });
});
