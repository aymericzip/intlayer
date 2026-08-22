import { describe, expect, it } from 'vitest';
import { isPackageInstalled } from './isPackageInstalled';

describe('isPackageInstalled', () => {
  it('should detect a package present in the dependency tree', () => {
    expect(isPackageInstalled('@intlayer/types')).toBe(true);
  });

  it('should return false for a package that is not installed', () => {
    expect(isPackageInstalled('@intlayer/not-a-real-package')).toBe(false);
  });

  it('should resolve from the provided base directory', () => {
    expect(isPackageInstalled('@intlayer/types', process.cwd())).toBe(true);
    expect(
      isPackageInstalled('@intlayer/not-a-real-package', process.cwd())
    ).toBe(false);
  });
});
