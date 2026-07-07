import type { Locale } from '@intlayer/types/allLocales';
import { describe, expect, it } from 'vitest';
import { extractKeyAndLocaleFromPath } from './extractKeyAndLocaleFromPath';

const locales = ['en', 'fr', 'es'] as Locale[];
const defaultLocale = 'en' as Locale;

describe('extractKeyAndLocaleFromPath', () => {
  it('extracts key and locale when both placeholders are present', () => {
    const result = extractKeyAndLocaleFromPath(
      'messages/fr/home.json',
      'messages/{{__LOCALE__}}/{{__KEY__}}.json',
      locales,
      defaultLocale
    );

    expect(result).toEqual({ key: 'home', locale: 'fr' });
  });

  it('falls back to the default locale when the mask has no locale placeholder', () => {
    const result = extractKeyAndLocaleFromPath(
      'resources/about.json',
      'resources/{{__KEY__}}.json',
      locales,
      defaultLocale
    );

    expect(result).toEqual({ key: 'about', locale: 'en' });
  });

  it('falls back to the key "index" when the mask has no key placeholder', () => {
    const result = extractKeyAndLocaleFromPath(
      'messages/es.json',
      'messages/{{__LOCALE__}}.json',
      locales,
      defaultLocale
    );

    expect(result).toEqual({ key: 'index', locale: 'es' });
  });

  it('normalizes a leading "./" on both the path and the mask', () => {
    const result = extractKeyAndLocaleFromPath(
      'messages/fr/home.json',
      './messages/{{__LOCALE__}}/{{__KEY__}}.json',
      locales,
      defaultLocale
    );

    expect(result).toEqual({ key: 'home', locale: 'fr' });
  });

  it('supports glob wildcards in the mask', () => {
    const result = extractKeyAndLocaleFromPath(
      'blog/2024/article/home.i18n.json',
      'blog/**/{{__KEY__}}.i18n.json',
      locales,
      defaultLocale
    );

    expect(result).toEqual({ key: 'home', locale: 'en' });
  });

  it('returns null when the path does not match the mask', () => {
    const result = extractKeyAndLocaleFromPath(
      'other/fr/home.json',
      'messages/{{__LOCALE__}}/{{__KEY__}}.json',
      locales,
      defaultLocale
    );

    expect(result).toBeNull();
  });

  it('returns null when the mask contains no placeholder at all', () => {
    const result = extractKeyAndLocaleFromPath(
      'messages/en.json',
      'messages/en.json',
      locales,
      defaultLocale
    );

    expect(result).toBeNull();
  });

  it('does not match a locale that is not declared', () => {
    const result = extractKeyAndLocaleFromPath(
      'messages/de/home.json',
      'messages/{{__LOCALE__}}/{{__KEY__}}.json',
      locales,
      defaultLocale
    );

    expect(result).toBeNull();
  });
});
