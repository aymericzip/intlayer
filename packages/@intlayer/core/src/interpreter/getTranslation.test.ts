import type {
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { describe, expect, it } from 'vitest';
import { getTranslation } from './getTranslation';

/** Loosely typed locale map, since the test locales are not augmented. */
const localeMap = <Content>(content: Record<string, Content>) =>
  content as unknown as StrictModeLocaleMap<Content>;

const asLocale = (locale: string) => locale as LocalesValues;

describe('getTranslation', () => {
  it('returns the string of the exact locale', () => {
    expect(
      getTranslation(localeMap({ en: 'Hello', fr: 'Bonjour' }), asLocale('fr'))
    ).toBe('Bonjour');
  });

  it('falls back to the generic locale, then to the fallback', () => {
    const content = localeMap({ en: 'Hello', fr: 'Bonjour' });

    expect(getTranslation(content, asLocale('fr-CA'))).toBe('Bonjour');
    expect(getTranslation(content, asLocale('es'), asLocale('en'))).toBe(
      'Hello'
    );
  });

  it('deep merges a partial object with its fallback', () => {
    const content = localeMap<{ title: string; subtitle?: string }>({
      en: { title: 'Title', subtitle: 'Subtitle' },
      fr: { title: 'Titre' },
    });

    expect(getTranslation(content, asLocale('fr'), asLocale('en'))).toEqual({
      title: 'Titre',
      subtitle: 'Subtitle',
    });
  });

  it('returns undefined when no candidate exists', () => {
    expect(
      getTranslation(localeMap({ en: 'Hello' }), asLocale('fr'))
    ).toBeUndefined();
  });
});
