import type { Dictionary } from '@intlayer/types';
import { describe, expect, it } from 'vitest';
import { t } from '../transpiler';
import { getMultilingualDictionary } from './getMultilingualDictionary';

describe('getMultilingualDictionary', () => {
  it('should wrap primitives with t({[locale]: value}) and remove locale', () => {
    const input: Dictionary = {
      key: 'about',
      locale: 'en',
      content: {
        title: 'Hello',
        count: 2,
        active: true,
        nested: { label: 'X' },
        arr: ['y', 1, false],
      },
    };

    const result = getMultilingualDictionary(input);

    expect(result).toEqual({
      key: 'about',
      content: {
        title: t({ en: 'Hello' }),
        count: t({ en: 2 }),
        active: t({ en: true }),
        nested: { label: t({ en: 'X' }) },
        arr: [t({ en: 'y' }), t({ en: 1 }), t({ en: false })],
      },
    });
    // Ensure locale is removed
    expect((result as any).locale).toBeUndefined();
  });

  it('should return dictionary unchanged when no locale is provided', () => {
    const input: Dictionary = {
      key: 'noop',
      content: { value: 'unchanged' },
    };

    const result = getMultilingualDictionary(input);

    expect(result).toBe(input);
    expect(result).toEqual({ key: 'noop', content: { value: 'unchanged' } });
  });
});
