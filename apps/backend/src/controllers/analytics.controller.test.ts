import { describe, expect, it } from 'vitest';
import { isProjectPageUrl } from './analytics.controller';

describe('isProjectPageUrl', () => {
  const applicationUrl = 'https://example.com/app';

  it('accepts pages of the application origin', () => {
    expect(
      isProjectPageUrl('https://example.com/en/pricing', applicationUrl)
    ).toBe(true);
  });

  it('rejects other origins, schemes and ports', () => {
    expect(isProjectPageUrl('https://evil.com/', applicationUrl)).toBe(false);
    expect(isProjectPageUrl('http://example.com/', applicationUrl)).toBe(false);
    expect(isProjectPageUrl('https://example.com:8443/', applicationUrl)).toBe(
      false
    );
    expect(isProjectPageUrl('http://169.254.169.254/', applicationUrl)).toBe(
      false
    );
  });

  it('rejects everything without an application URL', () => {
    expect(isProjectPageUrl('https://example.com/', undefined)).toBe(false);
    expect(isProjectPageUrl('not a url', applicationUrl)).toBe(false);
  });
});
