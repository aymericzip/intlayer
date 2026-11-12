import { describe, expect, it } from 'vitest';
import {
  getAccessKeyEnforcedPermissions,
  isAccessKeyExpired,
} from './oAuth2.service';

describe('isAccessKeyExpired', () => {
  const now = new Date('2026-11-10T12:00:00.000Z');

  it('never expires a key without expiry date', () => {
    expect(isAccessKeyExpired({ expiresAt: undefined }, now)).toBe(false);
  });

  it('expires a key at and after its expiry date', () => {
    expect(isAccessKeyExpired({ expiresAt: now }, now)).toBe(true);
    expect(
      isAccessKeyExpired({ expiresAt: new Date('2026-11-09T00:00:00Z') }, now)
    ).toBe(true);
  });

  it('keeps a key valid before its expiry date', () => {
    expect(
      isAccessKeyExpired({ expiresAt: new Date('2026-11-11T00:00:00Z') }, now)
    ).toBe(false);
  });
});

describe('getAccessKeyEnforcedPermissions', () => {
  it('enforces the grants of a key created with enforcement', () => {
    expect(
      getAccessKeyEnforcedPermissions({
        grants: ['dictionary:read'],
        grantsEnforced: true,
      })
    ).toEqual(['dictionary:read']);
  });

  it('enforces an empty grant list (no access)', () => {
    expect(
      getAccessKeyEnforcedPermissions({ grants: [], grantsEnforced: true })
    ).toEqual([]);
  });

  it('leaves legacy keys unrestricted until backfilled', () => {
    expect(
      getAccessKeyEnforcedPermissions({ grants: ['dictionary:read'] })
    ).toBeUndefined();
  });
});
