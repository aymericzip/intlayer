import { describe, expect, it } from 'vitest';
import { hasUrlRoutingFramework } from './urlRoutingFramework';

describe('hasUrlRoutingFramework', () => {
  it('detects web frontend frameworks', () => {
    expect(hasUrlRoutingFramework({ next: '^16.0.0' })).toBe(true);
    expect(hasUrlRoutingFramework({ react: '^19.0.0' })).toBe(true);
    expect(hasUrlRoutingFramework({ vue: '^3.0.0' })).toBe(true);
    expect(hasUrlRoutingFramework({ '@sveltejs/kit': '^2.0.0' })).toBe(true);
    expect(hasUrlRoutingFramework({ vite: '^7.0.0' })).toBe(true);
  });

  it('excludes React Native / Expo apps', () => {
    expect(
      hasUrlRoutingFramework({ react: '^19.0.0', 'react-native': '^0.80.0' })
    ).toBe(false);
    expect(hasUrlRoutingFramework({ react: '^19.0.0', expo: '^54.0.0' })).toBe(
      false
    );
  });

  it('excludes backend-only projects', () => {
    expect(hasUrlRoutingFramework({ express: '^5.0.0' })).toBe(false);
    expect(hasUrlRoutingFramework({})).toBe(false);
  });
});
