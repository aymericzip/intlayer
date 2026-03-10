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
        'internationalization.locales: Array must contain at least 1 element(s)'
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
      expect.stringContaining('editor.port: Expected number, received string')
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
      expect.stringContaining('internationalization.strictMode: Invalid input')
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
});
