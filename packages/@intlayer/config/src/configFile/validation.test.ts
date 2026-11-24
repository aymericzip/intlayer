import { runInNewContext } from 'node:vm';
import * as Locales from '@intlayer/types/locales';
import { describe, expect, it, vi } from 'vitest';
import { buildConfigurationFields } from './buildConfigurationFields';
import { validateConfiguration } from './validateConfiguration';

describe('Configuration Validation', () => {
  it('should log an error for invalid configuration (empty locales)', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    buildConfigurationFields({
      internationalization: { locales: [] }, // Invalid: min(1)
    } as any);

    await vi.waitFor(() =>
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'internationalization.locales: Too small: expected array to have >=1 items'
        )
      )
    );
    consoleSpy.mockRestore();
  });

  it('should log an error for invalid configuration (wrong type)', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    buildConfigurationFields({
      editor: { port: 'not-a-number' }, // Invalid type
    } as any);

    await vi.waitFor(() =>
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'editor.port: Invalid input: expected number, received string'
        )
      )
    );
    consoleSpy.mockRestore();
  });

  it('should use logFunctions.error if provided', async () => {
    const errorSpy = vi.fn();

    buildConfigurationFields(
      {
        internationalization: { strictMode: 'invalid-mode' }, // Invalid enum
      } as any,
      undefined,
      { error: errorSpy } as any
    );

    await vi.waitFor(() =>
      expect(errorSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'internationalization.strictMode: Invalid option'
        )
      )
    );
  });

  it('should report no issue for valid configuration', async () => {
    const issues = await validateConfiguration({
      internationalization: {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
      },
    });

    expect(issues).toEqual([]);
  });

  it('should accept a numeric, Date and ISO-string cookie expires', async () => {
    const issues = await validateConfiguration({
      routing: {
        storage: [
          { type: 'cookie', expires: 365 },
          { type: 'cookie', expires: new Date('2027-06-08T00:00:00.000Z') },
          { type: 'cookie', expires: '2027-06-08T00:00:00.000Z' },
        ],
      },
    });

    expect(issues).toEqual([]);
  });

  it('should accept a cross-realm Date for cookie expires', async () => {
    // A config file runs in a `node:vm` sandbox, so its `Date` is from another
    // realm and fails `instanceof Date`. The schema must still accept it.
    const crossRealmDate = runInNewContext(
      'new Date("2027-06-08T00:00:00.000Z")'
    ) as Date;
    expect(crossRealmDate instanceof Date).toBe(false);

    const issues = await validateConfiguration({
      routing: { storage: [{ type: 'cookie', expires: crossRealmDate }] },
    });

    expect(issues).toEqual([]);
  });

  it('should reject an invalid cookie expires string', async () => {
    const issues = await validateConfiguration({
      routing: { storage: [{ type: 'cookie', expires: 'not-a-date' }] },
    });

    expect(issues).toEqual([
      expect.objectContaining({
        path: expect.stringContaining('routing.storage'),
      }),
    ]);
  });
});
