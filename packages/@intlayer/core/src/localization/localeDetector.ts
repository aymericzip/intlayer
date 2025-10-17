import type { Locales } from '@intlayer/config/client';
import { localeResolver } from './localeResolver';

/**
 * Module variables.
 */
const simpleLanguageRegExp = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;

type LanguageSpec = {
  prefix: string;
  suffix?: string;
  q: number;
  i: number;
  full: string;
};

type PrioritySpec = {
  i: number;
  o: number;
  q: number;
  s: number;
};

type ComparableSpec = {
  q: number;
  s?: number;
  o?: number;
  i: number;
};

/**
 * Parse the Accept-Language header.
 */
const parseAcceptLanguage = (accept: string): LanguageSpec[] => {
  const rawAccepts = accept.split(',');
  const accepts: LanguageSpec[] = [];

  for (let i = 0; i < rawAccepts.length; i++) {
    const language = parseLanguage(rawAccepts[i].trim(), i);
    if (language) accepts.push(language);
  }

  return accepts;
};

/**
 * Parse a language from the Accept-Language header.
 */
const parseLanguage = (str: string, i: number): LanguageSpec | null => {
  const match = simpleLanguageRegExp.exec(str);
  if (!match) return null;

  const prefix = match[1];
  const suffix = match[2];
  let full = prefix;

  if (suffix) full = `${prefix}-${suffix}`;

  let q = 1;
  if (match[3]) {
    const params = match[3].split(';');
    for (let j = 0; j < params.length; j++) {
      const p = params[j].split('=');
      if (p[0] === 'q') q = parseFloat(p[1]);
    }
  }

  return {
    prefix,
    suffix,
    q,
    i,
    full,
  };
};

/**
 * Get the priority of a language.
 */
const getLanguagePriority = (
  language: string,
  accepted: LanguageSpec[],
  index: number
): PrioritySpec => {
  let priority: PrioritySpec = { o: -1, q: 0, s: 0, i: index };

  for (let i = 0; i < accepted.length; i++) {
    const spec = specify(language, accepted[i], index);
    if (
      spec &&
      (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0
    ) {
      priority = spec;
    }
  }

  return priority;
};

/**
 * Get the specificity of the language.
 */
const specify = (
  language: string,
  spec: LanguageSpec,
  index: number
): PrioritySpec | null => {
  const p = parseLanguage(language, index);
  if (!p) return null;
  let s = 0;
  if (spec.full.toLowerCase() === p.full.toLowerCase()) {
    s |= 4;
  } else if (spec.prefix.toLowerCase() === p.full.toLowerCase()) {
    s |= 2;
  } else if (spec.full.toLowerCase() === p.prefix.toLowerCase()) {
    s |= 1;
  } else if (spec.full !== '*') {
    return null;
  }

  return {
    i: index,
    o: spec.i,
    q: spec.q,
    s,
  };
};

/**
 * Get the preferred languages from an Accept-Language header.
 */
const preferredLanguages = (
  accept: string | undefined,
  provided?: string[]
): string[] => {
  // RFC 2616 sec 14.4: no header = *
  const accepts = parseAcceptLanguage(
    accept === undefined ? '*' : (accept ?? '')
  );

  if (!provided) {
    return accepts.filter(isQuality).sort(compareSpecs).map(getFullLanguage);
  }

  const priorities = provided.map((type, index) =>
    getLanguagePriority(type, accepts, index)
  );

  return priorities
    .filter(isQuality)
    .sort(compareSpecs)
    .map((priority) => provided[priorities.indexOf(priority)]);
};

/**
 * Compare two specs.
 */
const compareSpecs = (a: ComparableSpec, b: ComparableSpec): number =>
  b.q - a.q ||
  (b.s ?? 0) - (a.s ?? 0) ||
  (a.o ?? 0) - (b.o ?? 0) ||
  a.i - b.i ||
  0;

/**
 * Get full language string.
 */
const getFullLanguage = (spec: LanguageSpec): string => spec.full;

/**
 * Check if a spec has any quality.
 */
const isQuality = (spec: { q: number }): boolean => spec.q > 0;

/**
 * Detects the locale from the request headers
 *
 * Headers are provided by the browser and can be used to determine the user's preferred language
 */
export const localeDetector = (
  headers: Record<string, string | undefined>,
  locales?: Locales[],
  defaultLocale?: Locales
): Locales => {
  const accept = headers['accept-language'];
  const languages = preferredLanguages(accept);
  return localeResolver(languages as Locales[], locales, defaultLocale);
};
