import { describe, expect, it } from 'vitest';
import { formatDictionarySelectorEnvVar } from './envVars';

describe('formatDictionarySelectorEnvVar', () => {
  it('disables the selector logic when no dictionary uses a selector', () => {
    expect(formatDictionarySelectorEnvVar(false)).toEqual({
      INTLAYER_DICTIONARY_SELECTOR: 'false',
    });
  });

  it('emits nothing when a dictionary uses a selector', () => {
    expect(formatDictionarySelectorEnvVar(true)).toEqual({});
  });

  it('applies the key and value wrappers (bundler `define` shape)', () => {
    expect(
      formatDictionarySelectorEnvVar(
        false,
        (key) => `process.env.${key}`,
        (value) => `"${value}"`
      )
    ).toEqual({
      'process.env.INTLAYER_DICTIONARY_SELECTOR': '"false"',
    });
  });
});
