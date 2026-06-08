import { runInNewContext } from 'node:vm';
import * as Locales from '@intlayer/types/locales';
import { describe, expect, it, vi } from 'vitest';
import { buildConfigurationFields } from './buildConfigurationFields';

describe('Configuration Validation', () => {
  it('should log an error for invalid configuration (empty locales)', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const invalidConfig = {
      internationalization: {
        locales: [], // Invalid: min(1)
      },
    } as any;

    buildConfigurationFields(invalidConfig);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        'internationalization.locales: Too small: expected array to have >=1 items'
      )
    );
    consoleSpy.mockRestore();
  });

  it('should log an error for invalid configuration (wrong type)', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const invalidConfig = {
      editor: {
        port: 'not-a-number', // Invalid type
      },
    } as any;

    buildConfigurationFields(invalidConfig);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        'editor.port: Invalid input: expected number, received string'
      )
    );
    consoleSpy.mockRestore();
  });

  it('should use logFunctions.error if provided', () => {
    const errorSpy = vi.fn();
    const invalidConfig = {
      internationalization: {
        strictMode: 'invalid-mode', // Invalid enum
      },
    } as any;

    buildConfigurationFields(invalidConfig, undefined, {
      error: errorSpy,
    } as any);

    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('internationalization.strictMode: Invalid option')
    );
  });

  it('should not log errors for valid configuration', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const validConfig = {
      internationalization: {
        locales: [Locales.ENGLISH, Locales.FRENCH],
        defaultLocale: Locales.ENGLISH,
      },
    };

    buildConfigurationFields(validConfig);

    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should accept a numeric, Date and ISO-string cookie expires', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    buildConfigurationFields({
      routing: {
        storage: [
          { type: 'cookie', expires: 365 },
          { type: 'cookie', expires: new Date('2027-06-08T00:00:00.000Z') },
          { type: 'cookie', expires: '2027-06-08T00:00:00.000Z' },
        ],
      },
    });

    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should accept a cross-realm Date for cookie expires', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // A config file runs in a `node:vm` sandbox, so its `Date` is from another
    // realm and fails `instanceof Date`. The schema must still accept it.
    const crossRealmDate = runInNewContext(
      'new Date("2027-06-08T00:00:00.000Z")'
    ) as Date;
    expect(crossRealmDate instanceof Date).toBe(false);

    buildConfigurationFields({
      routing: {
        storage: [{ type: 'cookie', expires: crossRealmDate }],
      },
    });

    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should reject an invalid cookie expires string', () => {
    const errorSpy = vi.fn();

    buildConfigurationFields(
      {
        routing: {
          storage: [{ type: 'cookie', expires: 'not-a-date' }],
        },
      },
      undefined,
      { error: errorSpy } as any
    );

    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('routing.storage')
    );
  });
});
