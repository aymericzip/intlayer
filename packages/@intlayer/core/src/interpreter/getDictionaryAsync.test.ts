import { QUALIFIER_DYNAMIC_TYPES_KEY } from '@intlayer/config/defaultValues';
import type { Dictionary } from '@intlayer/types/dictionary';
import { describe, expect, it, vi } from 'vitest';
import { getDictionaryAsync } from './getDictionaryAsync';

vi.mock('@intlayer/config/built', () => {
  const config = {
    internationalization: {
      defaultLocale: 'en',
      locales: ['en', 'fr'],
      requiredLocales: ['en'],
    },
  };
  return { ...config, default: config };
});

/** One locale chunk of the `greeting` dictionary, as emitted by the build. */
const chunk = (key: string, title: string): Dictionary =>
  ({ key, content: { title } }) as unknown as Dictionary;

describe('getDictionaryAsync', () => {
  it('loads only the chunk of the requested locale', async () => {
    const loadEnglish = vi.fn(async () => chunk('greeting', 'Hello'));
    const loadFrench = vi.fn(async () => chunk('greeting', 'Bonjour'));

    const content = await getDictionaryAsync(
      { en: loadEnglish, fr: loadFrench },
      'greeting',
      'fr'
    );

    expect(content).toEqual({ title: 'Bonjour' });
    expect(loadFrench).toHaveBeenCalledTimes(1);
    expect(loadEnglish).not.toHaveBeenCalled();
  });

  it('falls back to the default locale chunk when the locale has none', async () => {
    const loadEnglish = vi.fn(async () => chunk('farewell', 'Bye'));

    const content = await getDictionaryAsync(
      { en: loadEnglish },
      'farewell',
      'fr'
    );

    expect(content).toEqual({ title: 'Bye' });
  });

  it('resolves to the default locale when no locale is given', async () => {
    const content = await getDictionaryAsync(
      {
        en: async () => chunk('welcome', 'Hello'),
        fr: async () => chunk('welcome', 'Bonjour'),
      },
      'welcome'
    );

    expect(content).toEqual({ title: 'Hello' });
  });

  it('loads a chunk once across repeated calls', async () => {
    const loadEnglish = vi.fn(async () => chunk('cached', 'Hello'));
    const loaders = { en: loadEnglish };

    await getDictionaryAsync(loaders, 'cached', 'en');
    await getDictionaryAsync(loaders, 'cached', 'en');

    expect(loadEnglish).toHaveBeenCalledTimes(1);
  });

  it('returns null when the loader map holds no usable chunk', async () => {
    const content = await getDictionaryAsync({}, 'empty', 'fr');

    expect(content).toBeNull();
  });

  it('loads only the targeted chunk of a qualified loader map', async () => {
    const loadDefault = vi.fn(async () => chunk('promo', 'Standard'));
    const loadBlackFriday = vi.fn(async () => chunk('promo', 'Black Friday'));

    const content = await getDictionaryAsync(
      {
        [QUALIFIER_DYNAMIC_TYPES_KEY]: ['variant'],
        en: { default: loadDefault, 'black-friday': loadBlackFriday },
      },
      'promo',
      { variant: 'black-friday', locale: 'en' }
    );

    expect(content).toEqual({ title: 'Black Friday' });
    expect(loadBlackFriday).toHaveBeenCalledTimes(1);
    expect(loadDefault).not.toHaveBeenCalled();
  });

  it('retries a chunk whose load failed', async () => {
    const loadEnglish = vi
      .fn()
      .mockRejectedValueOnce(new Error('network down'))
      .mockResolvedValueOnce(chunk('flaky', 'Hello'));
    const loaders = { en: loadEnglish };

    await expect(getDictionaryAsync(loaders, 'flaky', 'en')).rejects.toThrow(
      'network down'
    );

    await expect(getDictionaryAsync(loaders, 'flaky', 'en')).resolves.toEqual({
      title: 'Hello',
    });
    expect(loadEnglish).toHaveBeenCalledTimes(2);
  });
});
