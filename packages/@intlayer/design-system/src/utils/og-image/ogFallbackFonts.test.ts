// @vitest-environment node
import { describe, expect, it } from 'vitest';
import {
  detectOgLanguage,
  getOgLanguageFromLocale,
  groupFallbackCharacters,
} from './ogFallbackFonts';

describe('getOgLanguageFromLocale', () => {
  it.each([
    ['zh', 'zh-CN'],
    ['zh-CN', 'zh-CN'],
    ['zh-Hans', 'zh-CN'],
    ['zh-TW', 'zh-TW'],
    ['zh-Hant', 'zh-TW'],
    ['zh-HK', 'zh-HK'],
    ['ja', 'ja-JP'],
    ['ko', 'ko-KR'],
  ])('maps %s to %s', (locale, language) => {
    expect(getOgLanguageFromLocale(locale)).toBe(language);
  });

  it.each(['en', 'ar', 'not a locale', undefined])(
    'returns no hint for %s',
    (locale) => {
      expect(getOgLanguageFromLocale(locale)).toBeUndefined();
    }
  );
});

describe('detectOgLanguage', () => {
  it('resolves Han-only titles to Chinese', () => {
    expect(
      detectOgLanguage('Intlayer 与 i18next、next-intl 的全面对比：')
    ).toBe('zh-CN');
  });

  it('resolves titles with kana to Japanese', () => {
    expect(detectOgLanguage('Next.js の国際化ガイド')).toBe('ja-JP');
  });

  it('resolves titles with Hangul to Korean', () => {
    expect(detectOgLanguage('Next.js 국제화 가이드')).toBe('ko-KR');
  });

  it('returns no hint for Latin titles', () => {
    expect(detectOgLanguage('Next.js i18n guide')).toBeUndefined();
  });
});

describe('groupFallbackCharacters', () => {
  it('skips ASCII covered by the embedded font', () => {
    expect(groupFallbackCharacters('Next.js i18n (2026) | Intlayer').size).toBe(
      0
    );
  });

  it('groups Chinese ideographs and CJK punctuation together, deduplicated', () => {
    expect(groupFallbackCharacters('国际化、国际化：Next.js')).toEqual(
      new Map([['zh-CN', '国际化、：']])
    );
  });

  it('routes Han ideographs to the Japanese font on Japanese titles', () => {
    expect(groupFallbackCharacters('国際化ガイド')).toEqual(
      new Map([['ja-JP', '国際化ガイド']])
    );
  });

  it('routes Han ideographs to the font of the given language', () => {
    expect(groupFallbackCharacters('国際化', 'ja-JP')).toEqual(
      new Map([['ja-JP', '国際化']])
    );
    expect(groupFallbackCharacters('國際化', 'zh-TW')).toEqual(
      new Map([['zh-TW', '國際化']])
    );
  });

  it('groups each script separately', () => {
    expect(
      groupFallbackCharacters('Руководство دليل गाइड Hướng 가이드')
    ).toEqual(
      new Map([
        ['unknown', 'Руковдстướ'],
        ['ar-AR', 'دلي'],
        ['devanagari', 'गाइड'],
        ['ko-KR', '가이드'],
      ])
    );
  });

  it('leaves emoji to satori', () => {
    expect(groupFallbackCharacters('Intlayer 🚀').size).toBe(0);
  });
});
