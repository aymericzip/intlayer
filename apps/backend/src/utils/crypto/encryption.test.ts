import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { decryptSecret, encryptSecret, isEncryptedSecret } from './encryption';

const ORIGINAL_SECRET = process.env.BETTER_AUTH_SECRET;

beforeAll(() => {
  process.env.BETTER_AUTH_SECRET = 'test-better-auth-secret-value';
});

afterAll(() => {
  process.env.BETTER_AUTH_SECRET = ORIGINAL_SECRET;
});

describe('encryption', () => {
  it('round-trips a plaintext secret', () => {
    const plain = 're_live_1234567890abcdef';
    const encrypted = encryptSecret(plain);

    expect(encrypted).not.toContain(plain);
    expect(decryptSecret(encrypted)).toBe(plain);
  });

  it('produces a different payload each time (random IV)', () => {
    const plain = 'same-secret';

    expect(encryptSecret(plain)).not.toBe(encryptSecret(plain));
  });

  it('detects encrypted payloads', () => {
    expect(isEncryptedSecret(encryptSecret('abc'))).toBe(true);
    expect(isEncryptedSecret('plain-value')).toBe(false);
  });

  it('throws on a tampered payload', () => {
    const encrypted = encryptSecret('secret');
    const tampered = `${encrypted.slice(0, -2)}00`;

    expect(() => decryptSecret(tampered)).toThrow();
  });

  it('throws on a malformed payload', () => {
    expect(() => decryptSecret('not-a-valid-payload')).toThrow();
  });
});
