import type { Font, FontWeight } from 'satori';

/**
 * Google Fonts CSS hosts, tried in order. The `.cn` mirror serves the same
 * files and stays reachable from mainland China, where the intlayer.cn build
 * is deployed.
 */
const GOOGLE_FONTS_HOSTS = ['fonts.googleapis.com', 'fonts.googleapis.cn'];

const FETCH_TIMEOUT_MS = 4000;

/** Weights rendered by the OG card: description (400) and title (800). */
const FALLBACK_FONT_WEIGHTS: FontWeight[] = [400, 800];

/**
 * Google Fonts families for each script the embedded Geist subset lacks, keyed
 * by satori `lang` codes. `unknown` is every other non-ASCII character
 * (Cyrillic, Vietnamese, Latin extended…): full Geist first to keep the brand
 * face, then Noto Sans for whatever Geist lacks.
 */
const FONT_FAMILIES_BY_LANGUAGE: Record<string, string[]> = {
  'zh-CN': ['Noto Sans SC'],
  'zh-TW': ['Noto Sans TC'],
  'zh-HK': ['Noto Sans HK'],
  'ja-JP': ['Noto Sans JP'],
  'ko-KR': ['Noto Sans KR'],
  'th-TH': ['Noto Sans Thai'],
  'bn-IN': ['Noto Sans Bengali'],
  'ar-AR': ['Noto Sans Arabic'],
  'ta-IN': ['Noto Sans Tamil'],
  'ml-IN': ['Noto Sans Malayalam'],
  'he-IL': ['Noto Sans Hebrew'],
  'te-IN': ['Noto Sans Telugu'],
  devanagari: ['Noto Sans Devanagari'],
  kannada: ['Noto Sans Kannada'],
  unknown: ['Geist', 'Noto Sans'],
};

/**
 * Script of a character, as a satori `lang` code. Han is resolved separately
 * because it is shared by Chinese and Japanese. Kana and Hangul match on
 * `Script`, not `Script_Extensions`: CJK punctuation such as `、` lists them
 * as extensions and would flag a Chinese title as Japanese.
 */
const SCRIPT_PATTERNS: [language: string, pattern: RegExp][] = [
  ['ja-JP', /[\p{sc=Hiragana}\p{sc=Katakana}]/u],
  ['ko-KR', /\p{sc=Hangul}/u],
  ['th-TH', /\p{scx=Thai}/u],
  ['bn-IN', /\p{scx=Bengali}/u],
  ['ar-AR', /\p{scx=Arabic}/u],
  ['ta-IN', /\p{scx=Tamil}/u],
  ['ml-IN', /\p{scx=Malayalam}/u],
  ['he-IL', /\p{scx=Hebrew}/u],
  ['te-IN', /\p{scx=Telugu}/u],
  ['devanagari', /\p{scx=Devanagari}/u],
  ['kannada', /\p{scx=Kannada}/u],
];

const HAN_PATTERN = /[\p{scx=Han}\u3000-\u303F\uFF00-\uFFEF]/u;

/** Emoji and symbols are left to satori; no text font covers them. */
const SKIPPED_PATTERN = /[\p{Extended_Pictographic}\p{Emoji_Component}]/u;

/** Printable ASCII is covered by the embedded Geist subset. */
const EMBEDDED_PATTERN = /[\u0020-\u007E]/;

const MAX_CACHE_ENTRIES = 200;

/** In-flight font subsets, keyed by family, weight and requested text. */
const fontSubsetCache = new Map<string, Promise<ArrayBuffer>>();

/** satori `lang` codes whose fonts cover Han ideographs. */
const HAN_LANGUAGES = new Set(['zh-CN', 'zh-TW', 'zh-HK', 'ja-JP', 'ko-KR']);

/**
 * Maps a page locale to the satori `lang` code of its script, when that
 * script needs regional glyph forms (Han is drawn differently in Chinese,
 * Japanese and Korean). Returns `undefined` for other or invalid locales.
 */
export const getOgLanguageFromLocale = (
  locale: string | undefined
): string | undefined => {
  if (!locale) return undefined;

  let parsedLocale: Intl.Locale;
  try {
    parsedLocale = new Intl.Locale(locale).maximize();
  } catch {
    return undefined;
  }

  const { language, script, region } = parsedLocale;
  if (language === 'ja') return 'ja-JP';
  if (language === 'ko') return 'ko-KR';
  if (language !== 'zh') return undefined;
  if (region === 'HK' || region === 'MO') return 'zh-HK';
  return script === 'Hant' ? 'zh-TW' : 'zh-CN';
};

/**
 * Guesses the `lang` hint from the text itself, for callers that pass no
 * locale. Han-only text is assumed Chinese: satori would otherwise default it
 * to Japanese glyph forms.
 */
export const detectOgLanguage = (text: string): string | undefined => {
  if (/[\p{sc=Hiragana}\p{sc=Katakana}]/u.test(text)) return 'ja-JP';
  if (/\p{sc=Hangul}/u.test(text)) return 'ko-KR';
  if (/\p{scx=Han}/u.test(text)) return 'zh-CN';
  return undefined;
};

/**
 * Groups the characters of `text` the embedded Geist subset cannot render by
 * the language whose fonts cover them, deduplicated. Han ideographs go to
 * `language` when it is a Han language, else to the one guessed from `text`.
 */
export const groupFallbackCharacters = (
  text: string,
  language: string | undefined = detectOgLanguage(text)
): Map<string, string> => {
  const hanLanguage =
    language && HAN_LANGUAGES.has(language) ? language : 'zh-CN';
  const charactersByLanguage = new Map<string, Set<string>>();

  for (const character of text) {
    if (EMBEDDED_PATTERN.test(character) || SKIPPED_PATTERN.test(character)) {
      continue;
    }
    const characterLanguage =
      SCRIPT_PATTERNS.find(([, pattern]) => pattern.test(character))?.[0] ??
      (HAN_PATTERN.test(character) ? hanLanguage : 'unknown');

    const characters =
      charactersByLanguage.get(characterLanguage) ?? new Set<string>();
    characters.add(character);
    charactersByLanguage.set(characterLanguage, characters);
  }

  return new Map(
    Array.from(charactersByLanguage, ([characterLanguage, characters]) => [
      characterLanguage,
      Array.from(characters).join(''),
    ])
  );
};

/** Downloads the TrueType subset of `family` that covers exactly `text`. */
const fetchFontSubset = async (
  family: string,
  weight: FontWeight,
  text: string
): Promise<ArrayBuffer> => {
  const query = new URLSearchParams({
    family: `${family}:wght@${weight}`,
    text,
  });
  let lastError: unknown;

  for (const host of GOOGLE_FONTS_HOSTS) {
    try {
      const cssResponse = await fetch(`https://${host}/css2?${query}`, {
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
      if (!cssResponse.ok) {
        throw new Error(`${host} answered ${cssResponse.status}`);
      }
      const css = await cssResponse.text();
      // Without a browser user agent the API serves TrueType, which satori
      // parses (it cannot read woff2).
      const fontUrl = css.match(
        /src: url\((.+?)\) format\('(?:truetype|opentype)'\)/
      )?.[1];
      if (!fontUrl) throw new Error(`${host} returned no font for ${family}`);

      const fontResponse = await fetch(fontUrl, {
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
      if (!fontResponse.ok) {
        throw new Error(`${fontUrl} answered ${fontResponse.status}`);
      }
      return await fontResponse.arrayBuffer();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
};

const getFontSubset = (
  family: string,
  weight: FontWeight,
  text: string
): Promise<ArrayBuffer> => {
  const cacheKey = `${family}:${weight}:${text}`;
  const cached = fontSubsetCache.get(cacheKey);
  if (cached) return cached;

  const subsetPromise = fetchFontSubset(family, weight, text).catch(
    (error: unknown) => {
      // A failed download must not be memoised, or the glyphs never recover.
      fontSubsetCache.delete(cacheKey);
      throw error;
    }
  );

  if (fontSubsetCache.size >= MAX_CACHE_ENTRIES) {
    const oldestKey = fontSubsetCache.keys().next().value;
    if (oldestKey) fontSubsetCache.delete(oldestKey);
  }
  fontSubsetCache.set(cacheKey, subsetPromise);
  return subsetPromise;
};

/**
 * Loads the font subsets covering every character of `text` the embedded
 * Geist subset lacks, to append to satori's `fonts`. `language` is the
 * satori `lang` hint of the card (see {@link getOgLanguageFromLocale}).
 *
 * Passed per render rather than through satori's `loadAdditionalAsset`:
 * satori caches one font loader per font list and that hook mutates it, so
 * subsets would pile up for the process lifetime and shadow each other.
 *
 * Throws when a subset cannot be downloaded, so the caller serves its static
 * fallback instead of a card full of missing-glyph boxes.
 */
export const loadOgFallbackFonts = async (
  text: string,
  language?: string
): Promise<Font[]> =>
  Promise.all(
    Array.from(groupFallbackCharacters(text, language)).flatMap(
      ([scriptLanguage, characters]) =>
        (FONT_FAMILIES_BY_LANGUAGE[scriptLanguage] ?? []).flatMap((family) =>
          FALLBACK_FONT_WEIGHTS.map(
            async (weight): Promise<Font> => ({
              // A distinct name keeps these subsets from shadowing Geist.
              name: `${family} fallback`,
              data: await getFontSubset(family, weight, characters),
              weight,
              style: 'normal',
              lang: scriptLanguage === 'unknown' ? undefined : scriptLanguage,
            })
          )
        )
    )
  );
