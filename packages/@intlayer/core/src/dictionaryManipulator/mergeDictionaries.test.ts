import { describe, expect, it } from 'vitest';
import { t } from '../transpiler/translation';
import type { Dictionary } from '../types/dictionary';
import { mergeDictionaries } from './mergeDictionaries';

describe('mergeDictionaries', () => {
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
    expect((merged.content as any).title.translation.en).toBe(
      '404 - Page not found'
    );
    expect((merged.content as any).content.translation.en).toBe(
      'Page not found'
    );

    // Critical assertion: tr exists and is not emptied
    expect((merged.content as any).title.translation.tr).toBe(
      '404 - Sayfa Bulunamadı'
    );
    expect((merged.content as any).content.translation.tr).toBe(
      'Sayfa bulunamadı'
    );
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

    expect((merged.content as any).title.translation.tr).toBe(
      '404 - Sayfa Bulunamadı'
    );
    expect((merged.content as any).content.translation.tr).toBe(
      'Sayfa bulunamadı'
    );
  });
});
