import type { Dictionary } from '@intlayer/types';
import { describe, expect, it } from 'vitest';
import { t } from '../transpiler';
import { mergeDictionaries } from './mergeDictionaries';

describe('mergeDictionaries', () => {
  it('should consider the first dictionary in case of conflict', () => {
    const key = 'test-array-index-merge';

    const first = {
      key,
      content: 'test1',
      localId: `${key}::local::first`,
    } satisfies Dictionary;

    const second = {
      key,
      content: 'test2',
      localId: `${key}::local::second`,
    } satisfies Dictionary;

    const merged = mergeDictionaries([first, second]);

    expect(merged.content).toBe('test1');
  });

  it('should consider the first dictionary first for merging objects', () => {
    const key = 'test-array-index-merge';

    const first = {
      key,
      content: {
        key1: 'value1',
      },
      localId: `${key}::local::first`,
    } satisfies Dictionary;

    const second = {
      key,
      content: {
        key1: 'value2',
      },
      localId: `${key}::local::second`,
    } satisfies Dictionary;

    const merged = mergeDictionaries([first, second]);

    expect(merged.content).toEqual({ key1: 'value1' });
  });

  it('should consider the first dictionary first for merging arrays', () => {
    const key = 'test-array-index-merge';

    const first = {
      key,
      content: {
        items: ['value1', 'value2', 'value3'],
      },
      localId: `${key}::local::first`,
    } satisfies Dictionary;

    const second = {
      key,
      content: {
        items: ['value3', 'value4', undefined, 'value5'],
      },
      localId: `${key}::local::second`,
    } satisfies Dictionary;

    const merged = mergeDictionaries([first, second]);

    expect(merged.content).toEqual({
      items: ['value3', 'value4', undefined, 'value5'],
    });
  });

  it('merges translation locales without dropping missing ones (keeps tr)', () => {
    const key = 'not-found';

    // Base dictionary without tr
    const base = {
      key,
      content: {
        title: t({
          en: '404 - Page not found',
          fr: '404 - Page non trouvée',
        }),
        content: t({
          en: 'Page not found',
          fr: 'Page non trouvée',
        }),
      },
      localId: `${key}::local::base`,
    } satisfies Dictionary;

    // Additional dictionary providing tr locale
    const withTr = {
      key,
      content: {
        title: t({
          tr: '404 - Sayfa Bulunamadı',
        }),
        content: t({
          tr: 'Sayfa bulunamadı',
        }),
      },
      localId: `${key}::remote::withTr`,
    } satisfies Dictionary;

    const merged = mergeDictionaries([base, withTr]);

    // Ensure locales from both are preserved
    expect(merged.content.title.translation.en).toBe('404 - Page not found');
    expect(merged.content.content.translation.en).toBe('Page not found');

    // Critical assertion: tr exists and is not emptied
    expect(merged.content.title.translation.tr).toBe('404 - Sayfa Bulunamadı');
    expect(merged.content.content.translation.tr).toBe('Sayfa bulunamadı');
  });

  it('order of inputs should not cause loss of tr locale', () => {
    const key = 'not-found';
    const withTr = {
      key,
      content: {
        title: t({
          tr: '404 - Sayfa Bulunamadı',
        }),
        content: t({
          tr: 'Sayfa bulunamadı',
        }),
      },
      localId: `${key}::remote::withTr`,
    } satisfies Dictionary;

    const base = {
      key,
      content: {
        title: t({
          en: '404 - Page not found',
          fr: '404 - Page non trouvée',
        }),
        content: t({
          en: 'Page not found',
          fr: 'Page non trouvée',
        }),
      },
      localId: `${key}::local::base`,
    } satisfies Dictionary;

    const merged = mergeDictionaries([withTr, base]);

    expect(merged.content.title.translation.tr).toBe('404 - Sayfa Bulunamadı');
    expect(merged.content.content.translation.tr).toBe('Sayfa bulunamadı');
  });

  it('should use fallback values when first dictionary has undefined values', () => {
    const key = 'not-found';

    // First dictionary with undefined values for tr locale
    const withUndefinedTr = {
      key,
      content: {
        title: t({
          en: '404 - Page not found',
          fr: '404 - Page non trouvée',
          tr: undefined,
        }),
        content: t({
          en: 'Page not found',
          fr: 'Page non trouvée',
          tr: undefined,
        }),
      },
      localId: `${key}::remote::withUndefined`,
    } satisfies Dictionary;

    // Second dictionary with defined tr locale
    const withDefinedTr = {
      key,
      content: {
        title: t({
          tr: '404 - Sayfa Bulunamadı',
        }),
        content: t({
          tr: 'Sayfa bulunamadı',
        }),
      },
      localId: `${key}::local::withDefined`,
    } satisfies Dictionary;

    const merged = mergeDictionaries([withUndefinedTr, withDefinedTr]);

    // Should use the defined values from second dictionary, not undefined
    expect(merged.content.title.translation.en).toBe('404 - Page not found');
    expect(merged.content.title.translation.fr).toBe('404 - Page non trouvée');
    expect(merged.content.title.translation.tr).toBe('404 - Sayfa Bulunamadı');
    expect(merged.content.content.translation.tr).toBe('Sayfa bulunamadı');

    // Ensure undefined is not in the result
    expect(merged.content.title.translation.tr).not.toBe(undefined);
    expect(merged.content.content.translation.tr).not.toBe(undefined);
  });

  it('should handle nested undefined values and use fallback', () => {
    const key = 'test-nested';

    const firstDict = {
      key,
      content: {
        nested: t({
          en: {
            title: 'English Title',
            description: undefined,
          },
          fr: undefined,
        }),
      },
      localId: `${key}::local::first`,
    } satisfies Dictionary;

    const secondDict = {
      key,
      content: {
        nested: t({
          en: {
            description: 'English Description',
          },
          fr: {
            title: 'Titre Français',
            description: 'Description Française',
          },
        }),
      },
      localId: `${key}::local::second`,
    } satisfies Dictionary;

    const merged = mergeDictionaries([firstDict, secondDict]);

    // Should keep en.title from first and add en.description from second
    expect(merged.content.nested.translation.en.title).toBe('English Title');
    expect(merged.content.nested.translation.en.description).toBe(
      'English Description'
    );

    // Should use fr from second since it's undefined in first
    expect(merged.content.nested.translation.fr.title).toBe('Titre Français');
    expect(merged.content.nested.translation.fr.description).toBe(
      'Description Française'
    );
  });

  it('should merge objects in arrays by index when no key is present', () => {
    const key = 'test-array-index-merge';

    const firstDict = {
      key,
      content: {
        items: [
          { title: t({ en: 'First Item', fr: 'Premier Article' }) },
          { title: t({ en: 'Second Item', fr: 'Deuxième Article' }) },
        ],
      },
      localId: `${key}::local::first`,
    } satisfies Dictionary;

    const secondDict = {
      key,
      content: {
        items: [
          {
            description: t({
              en: 'First Description',
              fr: 'Première Description',
            }),
          },
          {
            title: t({
              en: 'Updated Second Item',
              fr: 'Deuxième Article Mis à Jour',
            }),
          },
          { title: t({ en: 'Third Item', fr: 'Troisième Article' }) },
        ],
      },
      localId: `${key}::local::second`,
    } satisfies Dictionary;

    const merged = mergeDictionaries([firstDict, secondDict]);

    const items = merged.content.items;

    // Should have 3 items total
    expect(items).toEqual([
      {
        title: t({ en: 'First Item', fr: 'Premier Article' }),
        description: t({
          en: 'First Description',
          fr: 'Première Description',
        }),
      },
      {
        title: t({
          en: 'Second Item',
          fr: 'Deuxième Article',
        }),
      },
      { title: t({ en: 'Third Item', fr: 'Troisième Article' }) },
    ]);
  });

  it('should handle mixed keyed and non-keyed objects in arrays', () => {
    const key = 'test-mixed-array-merge';

    const firstDict = {
      key,
      content: {
        items: [
          {
            key: 'item1',
            title: t({ en: 'Keyed Item 1', fr: 'Article Clé 1' }),
          },
          {
            key: 'item2',
            title: t({ en: 'Keyed Item 2' }),
          },
        ],
      },
      localId: `${key}::local::first`,
    } satisfies Dictionary;

    const secondDict = {
      key,
      content: {
        items: [
          {
            key: 'item3',
            title: t({ en: 'Keyed Item 3', fr: 'Article Clé 3' }),
          },
          {
            key: 'item4',
            title: t({ en: 'Keyed Item 4', fr: 'Article Clé 4' }),
          },
        ],
      },
      localId: `${key}::local::second`,
    } satisfies Dictionary;

    const merged = mergeDictionaries([firstDict, secondDict]);

    // Should have 4 items total (item1, item2, item3, item4)
    expect(merged).toEqual({
      key,
      content: {
        items: [
          {
            key: 'item1',
            title: t({ en: 'Keyed Item 1', fr: 'Article Clé 1' }),
          },
          {
            key: 'item2',
            title: t({ en: 'Keyed Item 2', fr: 'Article Clé 4' }),
          },
        ],
      },
      localIds: [`${key}::local::first`, `${key}::local::second`],
    });
  });
});
