import { beforeAll, describe, expect, it, vi } from 'vitest';

// -----------------------------------------------------------------------------
// Mock `intlayer` so that the utility can be executed in isolation.
// -----------------------------------------------------------------------------

const textEntry = [
  '- [Documentation React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_create_react_app.md)',
  '- [Documentation React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_create_react_app.md)',
  '- [markdown-to-jsx sur npm](https://www.npmjs.com/package/markdown-to-jsx)',
].join('\n');

const textEnExpected = [
  '- [Documentation React Intlayer](/doc/environment/create-react-app)',
  '- [Documentation React Intlayer](/doc/environment/create-react-app)',
  '- [markdown-to-jsx sur npm](https://www.npmjs.com/package/markdown-to-jsx)',
].join('\n');

const textFrExpected = [
  '- [Documentation React Intlayer](/fr/doc/environment/create-react-app)',
  '- [Documentation React Intlayer](/fr/doc/environment/create-react-app)',
  '- [markdown-to-jsx sur npm](https://www.npmjs.com/package/markdown-to-jsx)',
].join('\n');

vi.mock('intlayer', () => {
  // Minimal subset of the Locales enum required by the website configuration.
  const Locales = {
    ENGLISH: 'en',
    RUSSIAN: 'ru',
    JAPANESE: 'ja',
    FRENCH: 'fr',
    KOREAN: 'ko',
    CHINESE: 'zh',
    SPANISH: 'es',
    GERMAN: 'de',
    ARABIC: 'ar',
    ITALIAN: 'it',
    ENGLISH_UNITED_KINGDOM: 'en-GB',
    PORTUGUESE: 'pt',
    HINDI: 'hi',
  } as const;

  // The documentation entries required by the markdown utility.
  const docMetadata = [
    {
      githubUrl:
        'https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_create_react_app.md',
      url: '/doc/environment/create-react-app',
      relativeUrl: '/doc/environment/create-react-app',
      locale: 'fr',
    },
    {
      githubUrl:
        'https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_create_react_app.md',
      url: '/doc/environment/create-react-app',
      relativeUrl: '/doc/environment/create-react-app',
      locale: 'en',
    },
    {
      githubUrl:
        'https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_create_react_app.md',
      url: '/doc/environment/create-react-app',
      relativeUrl: '/doc/environment/create-react-app',
      locale: 'ja',
    },
  ];

  // Return the mocked helpers expected by `apps/website/src/utils/markdown.ts`.
  const getIntlayer = (key: string, _locale?: string) => {
    // Only doc-metadata is needed for these tests. Returning the same
    // dataset for every locale keeps the implementation minimal while still
    // exercising the transformation logic.
    if (key === 'doc-metadata') {
      return docMetadata;
    }
    return [];
  };

  // Simplified version of getLocalizedUrl – it keeps URLs unchanged for the
  // default locale and does not prefix other locales either. This is enough for
  // the current unit-test expectations.
  const getLocalizedUrl = (url: string, currentLocale?: string) => {
    // The real helper prefixes the route with the locale for non-default
    // languages. The default language is English ('en').
    if (!currentLocale || currentLocale === 'en') return url;
    return `/${currentLocale}${url}`;
  };

  const localeMap = (
    mapper: (locale: { locale: string }) => string
  ): string[] =>
    Object.values(Locales).map((locale) =>
      mapper({
        locale,
      })
    );

  return {
    __esModule: true,
    Locales,
    getIntlayer,
    getLocalizedUrl,
    localeMap,
  };
});

// `urlRenamer` must be imported **after** the mock is registered so that it
// uses the mocked implementation of `intlayer`.
import { formatRegExp, urlRenamer } from './markdown';

// -----------------------------------------------------------------------------
// No external fixtures are required – the test strings are defined in-file.
// -----------------------------------------------------------------------------

describe('formatRegExp', () => {
  const entry =
    'https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_react_native+expo.md';

  const result =
    'https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_react_native+expo.md';

  expect(formatRegExp(entry).exec(result)?.length).toEqual(1);
});

describe('urlRenamer', () => {
  beforeAll(() => {
    // The util requires this env var to be defined (non-null assertion).
    process.env.NEXT_PUBLIC_DOMAIN = 'intlayer.org';
  });

  it('rewrites GitHub & localized URLs to in-site routes (English)', () => {
    const output = urlRenamer(textEntry, 'en' as any).trim();
    expect(output).toEqual(textEnExpected);
  });

  it('rewrites GitHub & localized URLs to in-site routes (French)', () => {
    const output = urlRenamer(textEntry, 'fr' as any).trim();
    expect(output).toEqual(textFrExpected);
  });
});
