import type { Dictionary } from '@intlayer/types/dictionary';
import { describe, expect, it, vi } from 'vitest';
import type { Plugins } from './getContent';
import { getDictionary } from './getDictionary';

vi.mock('@intlayer/config/built', () => {
  const config = {
    log: { mode: 'disabled' },
    internationalization: {
      defaultLocale: 'en',
      locales: ['en', 'fr'],
      requiredLocales: ['en'],
    },
  };
  return { ...config, default: config };
});

/** A fresh dictionary per test, so one test never reads another's memo. */
const createDictionary = (key: string): Dictionary =>
  ({
    key,
    content: {
      title: {
        nodeType: 'translation',
        translation: { en: 'Hello', fr: 'Bonjour' },
      },
    },
  }) as unknown as Dictionary;

/**
 * The build optimization rewrites `useIntlayer('key')` into
 * `useDictionary(dictionary)`, so the memo has to live on the dictionary
 * object: keying it on the dictionary key would never be reached by the
 * rewritten calls, which no longer carry one.
 */
describe('getDictionary memoization', () => {
  it('returns the same content for repeated reads of one locale', () => {
    const dictionary = createDictionary('repeated-reads');

    expect(getDictionary(dictionary, 'en')).toBe(
      getDictionary(dictionary, 'en')
    );
  });

  it('keeps one entry per locale', () => {
    const dictionary = createDictionary('per-locale');

    const english = getDictionary(dictionary, 'en');
    const french = getDictionary(dictionary, 'fr');

    expect(english).not.toBe(french);
    expect(String(english.title)).toBe('Hello');
    expect(String(french.title)).toBe('Bonjour');
    expect(getDictionary(dictionary, 'fr')).toBe(french);
  });

  it('treats an omitted locale as the default one', () => {
    const dictionary = createDictionary('default-locale');

    expect(getDictionary(dictionary)).toBe(getDictionary(dictionary, 'en'));
  });

  it('does not share entries between two dictionaries holding the same key', () => {
    const first = createDictionary('same-key');
    const second = createDictionary('same-key');

    expect(getDictionary(first, 'en')).not.toBe(getDictionary(second, 'en'));
  });

  /**
   * `solid-intlayer` passes a callable stand-in proxy while the chunk loads:
   * one stable object whose content changes the moment the resource resolves.
   * Memoizing it would freeze the pending, empty state forever.
   */
  it('never memoizes a callable stand-in whose content resolves later', () => {
    // Pending, the stand-in exposes an empty content — exactly what a Solid
    // loadable proxy reads out of a resource that has not resolved yet.
    let loaded: Dictionary = { key: 'stand-in', content: {} } as Dictionary;

    const standIn = new Proxy((() => undefined) as unknown as Dictionary, {
      get: (_target, property) => loaded[property as keyof Dictionary],
    });

    expect(getDictionary(standIn, 'en').title).toBeUndefined();

    loaded = createDictionary('stand-in');

    expect(String(getDictionary(standIn, 'en').title)).toBe('Hello');
  });

  it('does not serve one custom plugin set the content of another', () => {
    const dictionary = createDictionary('custom-plugins');

    const constantPlugin = (value: string): Plugins[] => [
      {
        id: `constant-${value}`,
        canHandle: (node: unknown) =>
          typeof node === 'object' &&
          node !== null &&
          (node as { nodeType?: string }).nodeType === 'translation',
        transform: () => value,
      } as unknown as Plugins,
    ];

    const first = getDictionary(dictionary, 'en', constantPlugin('first'));
    const second = getDictionary(dictionary, 'en', constantPlugin('second'));

    expect(first.title).toBe('first');
    expect(second.title).toBe('second');
  });

  it('reuses the memo when a framework hands over the same plugin array', () => {
    const dictionary = createDictionary('stable-plugins');
    const transform = vi.fn(() => 'transformed');
    const plugins = [
      {
        id: 'counting-plugin',
        canHandle: (node: unknown) =>
          typeof node === 'object' &&
          node !== null &&
          (node as { nodeType?: string }).nodeType === 'translation',
        transform,
      } as unknown as Plugins,
    ];

    // Reading `title` forces the lazy leaf transform on the first pass only.
    expect(getDictionary(dictionary, 'en', plugins).title).toBe('transformed');
    expect(getDictionary(dictionary, 'en', plugins).title).toBe('transformed');

    expect(transform).toHaveBeenCalledTimes(1);
  });
});
