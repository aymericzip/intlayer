/* AUTO-GENERATED – DO NOT EDIT */
/* REGENERATE USING `pnpm prepare` */
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join, dirname as pathDirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPackageJsonPath, getProjectRequire } from '@intlayer/config';
import type { LocalesValues } from '@intlayer/types';

// Robustly resolve the base directory of the @intlayer/docs package in both
// bundled environments (Next.js) and standalone CLIs (MCP via npx).
const currentDir =
  typeof __dirname !== 'undefined'
    ? __dirname
    : pathDirname(fileURLToPath(import.meta.url));

let baseDir: string;
try {
  // Prefer resolving from the location of this file (works for CLIs).
  const projectRequire = getProjectRequire(currentDir);
  const docEntryPath = projectRequire.resolve('@intlayer/docs');
  baseDir = getPackageJsonPath(docEntryPath).baseDir;
} catch {
  try {
    // Fallback: resolve from the consumer project (works for apps/bundlers).
    const projectRequire = getProjectRequire();
    const docEntryPath = projectRequire.resolve('@intlayer/docs');
    baseDir = getPackageJsonPath(docEntryPath).baseDir;
  } catch {
    // Last resort: walk up from currentDir (useful when executed inside @intlayer/docs).
    baseDir = getPackageJsonPath(currentDir).baseDir;
  }
}

const readLocale = (
  relativeAfterLocale: string,
  locale: LocalesValues
): Promise<string> => {
  const target1 = join(
    baseDir,
    `./frequent_questions/${locale}/${relativeAfterLocale}`
  );
  if (existsSync(target1)) {
    return readFile(target1, 'utf8');
  }
  const target2 = join(
    baseDir,
    `./frequent_questions/en/${relativeAfterLocale}`
  );
  if (existsSync(target2)) {
    return readFile(target2, 'utf8');
  }

  return Promise.reject(
    new Error(
      `[docs] File not found: ${relativeAfterLocale} - locale: ${locale} - path: ${target1} - path: ${target2}`
    )
  );
};

export const frequentQuestionsEntry = {
  './frequent_questions/en/SSR_Next_no_[locale].md': {
    en: readLocale('SSR_Next_no_[locale].md', 'en'),
    ru: readLocale('SSR_Next_no_[locale].md', 'ru'),
    ja: readLocale('SSR_Next_no_[locale].md', 'ja'),
    fr: readLocale('SSR_Next_no_[locale].md', 'fr'),
    ko: readLocale('SSR_Next_no_[locale].md', 'ko'),
    zh: readLocale('SSR_Next_no_[locale].md', 'zh'),
    es: readLocale('SSR_Next_no_[locale].md', 'es'),
    de: readLocale('SSR_Next_no_[locale].md', 'de'),
    ar: readLocale('SSR_Next_no_[locale].md', 'ar'),
    it: readLocale('SSR_Next_no_[locale].md', 'it'),
    'en-GB': readLocale('SSR_Next_no_[locale].md', 'en-GB'),
    pt: readLocale('SSR_Next_no_[locale].md', 'pt'),
    hi: readLocale('SSR_Next_no_[locale].md', 'hi'),
    tr: readLocale('SSR_Next_no_[locale].md', 'tr'),
    pl: readLocale('SSR_Next_no_[locale].md', 'pl'),
    id: readLocale('SSR_Next_no_[locale].md', 'id'),
    vi: readLocale('SSR_Next_no_[locale].md', 'vi'),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './frequent_questions/en/array_as_content_declaration.md': {
    en: readLocale('array_as_content_declaration.md', 'en'),
    ru: readLocale('array_as_content_declaration.md', 'ru'),
    ja: readLocale('array_as_content_declaration.md', 'ja'),
    fr: readLocale('array_as_content_declaration.md', 'fr'),
    ko: readLocale('array_as_content_declaration.md', 'ko'),
    zh: readLocale('array_as_content_declaration.md', 'zh'),
    es: readLocale('array_as_content_declaration.md', 'es'),
    de: readLocale('array_as_content_declaration.md', 'de'),
    ar: readLocale('array_as_content_declaration.md', 'ar'),
    it: readLocale('array_as_content_declaration.md', 'it'),
    'en-GB': readLocale('array_as_content_declaration.md', 'en-GB'),
    pt: readLocale('array_as_content_declaration.md', 'pt'),
    hi: readLocale('array_as_content_declaration.md', 'hi'),
    tr: readLocale('array_as_content_declaration.md', 'tr'),
    pl: readLocale('array_as_content_declaration.md', 'pl'),
    id: readLocale('array_as_content_declaration.md', 'id'),
    vi: readLocale('array_as_content_declaration.md', 'vi'),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './frequent_questions/en/build_dictionaries.md': {
    en: readLocale('build_dictionaries.md', 'en'),
    ru: readLocale('build_dictionaries.md', 'ru'),
    ja: readLocale('build_dictionaries.md', 'ja'),
    fr: readLocale('build_dictionaries.md', 'fr'),
    ko: readLocale('build_dictionaries.md', 'ko'),
    zh: readLocale('build_dictionaries.md', 'zh'),
    es: readLocale('build_dictionaries.md', 'es'),
    de: readLocale('build_dictionaries.md', 'de'),
    ar: readLocale('build_dictionaries.md', 'ar'),
    it: readLocale('build_dictionaries.md', 'it'),
    'en-GB': readLocale('build_dictionaries.md', 'en-GB'),
    pt: readLocale('build_dictionaries.md', 'pt'),
    hi: readLocale('build_dictionaries.md', 'hi'),
    tr: readLocale('build_dictionaries.md', 'tr'),
    pl: readLocale('build_dictionaries.md', 'pl'),
    id: readLocale('build_dictionaries.md', 'id'),
    vi: readLocale('build_dictionaries.md', 'vi'),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './frequent_questions/en/build_error_CI_CD.md': {
    en: readLocale('build_error_CI_CD.md', 'en'),
    ru: readLocale('build_error_CI_CD.md', 'ru'),
    ja: readLocale('build_error_CI_CD.md', 'ja'),
    fr: readLocale('build_error_CI_CD.md', 'fr'),
    ko: readLocale('build_error_CI_CD.md', 'ko'),
    zh: readLocale('build_error_CI_CD.md', 'zh'),
    es: readLocale('build_error_CI_CD.md', 'es'),
    de: readLocale('build_error_CI_CD.md', 'de'),
    ar: readLocale('build_error_CI_CD.md', 'ar'),
    it: readLocale('build_error_CI_CD.md', 'it'),
    'en-GB': readLocale('build_error_CI_CD.md', 'en-GB'),
    pt: readLocale('build_error_CI_CD.md', 'pt'),
    hi: readLocale('build_error_CI_CD.md', 'hi'),
    tr: readLocale('build_error_CI_CD.md', 'tr'),
    pl: readLocale('build_error_CI_CD.md', 'pl'),
    id: readLocale('build_error_CI_CD.md', 'id'),
    vi: readLocale('build_error_CI_CD.md', 'vi'),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './frequent_questions/en/bun_set_up.md': {
    en: readLocale('bun_set_up.md', 'en'),
    ru: readLocale('bun_set_up.md', 'ru'),
    ja: readLocale('bun_set_up.md', 'ja'),
    fr: readLocale('bun_set_up.md', 'fr'),
    ko: readLocale('bun_set_up.md', 'ko'),
    zh: readLocale('bun_set_up.md', 'zh'),
    es: readLocale('bun_set_up.md', 'es'),
    de: readLocale('bun_set_up.md', 'de'),
    ar: readLocale('bun_set_up.md', 'ar'),
    it: readLocale('bun_set_up.md', 'it'),
    'en-GB': readLocale('bun_set_up.md', 'en-GB'),
    pt: readLocale('bun_set_up.md', 'pt'),
    hi: readLocale('bun_set_up.md', 'hi'),
    tr: readLocale('bun_set_up.md', 'tr'),
    pl: readLocale('bun_set_up.md', 'pl'),
    id: readLocale('bun_set_up.md', 'id'),
    vi: readLocale('bun_set_up.md', 'vi'),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './frequent_questions/en/customized_locale_list.md': {
    en: readLocale('customized_locale_list.md', 'en'),
    ru: readLocale('customized_locale_list.md', 'ru'),
    ja: readLocale('customized_locale_list.md', 'ja'),
    fr: readLocale('customized_locale_list.md', 'fr'),
    ko: readLocale('customized_locale_list.md', 'ko'),
    zh: readLocale('customized_locale_list.md', 'zh'),
    es: readLocale('customized_locale_list.md', 'es'),
    de: readLocale('customized_locale_list.md', 'de'),
    ar: readLocale('customized_locale_list.md', 'ar'),
    it: readLocale('customized_locale_list.md', 'it'),
    'en-GB': readLocale('customized_locale_list.md', 'en-GB'),
    pt: readLocale('customized_locale_list.md', 'pt'),
    hi: readLocale('customized_locale_list.md', 'hi'),
    tr: readLocale('customized_locale_list.md', 'tr'),
    pl: readLocale('customized_locale_list.md', 'pl'),
    id: readLocale('customized_locale_list.md', 'id'),
    vi: readLocale('customized_locale_list.md', 'vi'),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './frequent_questions/en/domain_routing.md': {
    en: readLocale('domain_routing.md', 'en'),
    ru: readLocale('domain_routing.md', 'ru'),
    ja: readLocale('domain_routing.md', 'ja'),
    fr: readLocale('domain_routing.md', 'fr'),
    ko: readLocale('domain_routing.md', 'ko'),
    zh: readLocale('domain_routing.md', 'zh'),
    es: readLocale('domain_routing.md', 'es'),
    de: readLocale('domain_routing.md', 'de'),
    ar: readLocale('domain_routing.md', 'ar'),
    it: readLocale('domain_routing.md', 'it'),
    'en-GB': readLocale('domain_routing.md', 'en-GB'),
    pt: readLocale('domain_routing.md', 'pt'),
    hi: readLocale('domain_routing.md', 'hi'),
    tr: readLocale('domain_routing.md', 'tr'),
    pl: readLocale('domain_routing.md', 'pl'),
    id: readLocale('domain_routing.md', 'id'),
    vi: readLocale('domain_routing.md', 'vi'),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './frequent_questions/en/esbuild_error.md': {
    en: readLocale('esbuild_error.md', 'en'),
    ru: readLocale('esbuild_error.md', 'ru'),
    ja: readLocale('esbuild_error.md', 'ja'),
    fr: readLocale('esbuild_error.md', 'fr'),
    ko: readLocale('esbuild_error.md', 'ko'),
    zh: readLocale('esbuild_error.md', 'zh'),
    es: readLocale('esbuild_error.md', 'es'),
    de: readLocale('esbuild_error.md', 'de'),
    ar: readLocale('esbuild_error.md', 'ar'),
    it: readLocale('esbuild_error.md', 'it'),
    'en-GB': readLocale('esbuild_error.md', 'en-GB'),
    pt: readLocale('esbuild_error.md', 'pt'),
    hi: readLocale('esbuild_error.md', 'hi'),
    tr: readLocale('esbuild_error.md', 'tr'),
    pl: readLocale('esbuild_error.md', 'pl'),
    id: readLocale('esbuild_error.md', 'id'),
    vi: readLocale('esbuild_error.md', 'vi'),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './frequent_questions/en/get_locale_cookie.md': {
    en: readLocale('get_locale_cookie.md', 'en'),
    ru: readLocale('get_locale_cookie.md', 'ru'),
    ja: readLocale('get_locale_cookie.md', 'ja'),
    fr: readLocale('get_locale_cookie.md', 'fr'),
    ko: readLocale('get_locale_cookie.md', 'ko'),
    zh: readLocale('get_locale_cookie.md', 'zh'),
    es: readLocale('get_locale_cookie.md', 'es'),
    de: readLocale('get_locale_cookie.md', 'de'),
    ar: readLocale('get_locale_cookie.md', 'ar'),
    it: readLocale('get_locale_cookie.md', 'it'),
    'en-GB': readLocale('get_locale_cookie.md', 'en-GB'),
    pt: readLocale('get_locale_cookie.md', 'pt'),
    hi: readLocale('get_locale_cookie.md', 'hi'),
    tr: readLocale('get_locale_cookie.md', 'tr'),
    pl: readLocale('get_locale_cookie.md', 'pl'),
    id: readLocale('get_locale_cookie.md', 'id'),
    vi: readLocale('get_locale_cookie.md', 'vi'),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './frequent_questions/en/intlayer_command_undefined.md': {
    en: readLocale('intlayer_command_undefined.md', 'en'),
    ru: readLocale('intlayer_command_undefined.md', 'ru'),
    ja: readLocale('intlayer_command_undefined.md', 'ja'),
    fr: readLocale('intlayer_command_undefined.md', 'fr'),
    ko: readLocale('intlayer_command_undefined.md', 'ko'),
    zh: readLocale('intlayer_command_undefined.md', 'zh'),
    es: readLocale('intlayer_command_undefined.md', 'es'),
    de: readLocale('intlayer_command_undefined.md', 'de'),
    ar: readLocale('intlayer_command_undefined.md', 'ar'),
    it: readLocale('intlayer_command_undefined.md', 'it'),
    'en-GB': readLocale('intlayer_command_undefined.md', 'en-GB'),
    pt: readLocale('intlayer_command_undefined.md', 'pt'),
    hi: readLocale('intlayer_command_undefined.md', 'hi'),
    tr: readLocale('intlayer_command_undefined.md', 'tr'),
    pl: readLocale('intlayer_command_undefined.md', 'pl'),
    id: readLocale('intlayer_command_undefined.md', 'id'),
    vi: readLocale('intlayer_command_undefined.md', 'vi'),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './frequent_questions/en/locale_incorect_in_url.md': {
    en: readLocale('locale_incorect_in_url.md', 'en'),
    ru: readLocale('locale_incorect_in_url.md', 'ru'),
    ja: readLocale('locale_incorect_in_url.md', 'ja'),
    fr: readLocale('locale_incorect_in_url.md', 'fr'),
    ko: readLocale('locale_incorect_in_url.md', 'ko'),
    zh: readLocale('locale_incorect_in_url.md', 'zh'),
    es: readLocale('locale_incorect_in_url.md', 'es'),
    de: readLocale('locale_incorect_in_url.md', 'de'),
    ar: readLocale('locale_incorect_in_url.md', 'ar'),
    it: readLocale('locale_incorect_in_url.md', 'it'),
    'en-GB': readLocale('locale_incorect_in_url.md', 'en-GB'),
    pt: readLocale('locale_incorect_in_url.md', 'pt'),
    hi: readLocale('locale_incorect_in_url.md', 'hi'),
    tr: readLocale('locale_incorect_in_url.md', 'tr'),
    pl: readLocale('locale_incorect_in_url.md', 'pl'),
    id: readLocale('locale_incorect_in_url.md', 'id'),
    vi: readLocale('locale_incorect_in_url.md', 'vi'),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './frequent_questions/en/static_rendering.md': {
    en: readLocale('static_rendering.md', 'en'),
    ru: readLocale('static_rendering.md', 'ru'),
    ja: readLocale('static_rendering.md', 'ja'),
    fr: readLocale('static_rendering.md', 'fr'),
    ko: readLocale('static_rendering.md', 'ko'),
    zh: readLocale('static_rendering.md', 'zh'),
    es: readLocale('static_rendering.md', 'es'),
    de: readLocale('static_rendering.md', 'de'),
    ar: readLocale('static_rendering.md', 'ar'),
    it: readLocale('static_rendering.md', 'it'),
    'en-GB': readLocale('static_rendering.md', 'en-GB'),
    pt: readLocale('static_rendering.md', 'pt'),
    hi: readLocale('static_rendering.md', 'hi'),
    tr: readLocale('static_rendering.md', 'tr'),
    pl: readLocale('static_rendering.md', 'pl'),
    id: readLocale('static_rendering.md', 'id'),
    vi: readLocale('static_rendering.md', 'vi'),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './frequent_questions/en/translated_path_url.md': {
    en: readLocale('translated_path_url.md', 'en'),
    ru: readLocale('translated_path_url.md', 'ru'),
    ja: readLocale('translated_path_url.md', 'ja'),
    fr: readLocale('translated_path_url.md', 'fr'),
    ko: readLocale('translated_path_url.md', 'ko'),
    zh: readLocale('translated_path_url.md', 'zh'),
    es: readLocale('translated_path_url.md', 'es'),
    de: readLocale('translated_path_url.md', 'de'),
    ar: readLocale('translated_path_url.md', 'ar'),
    it: readLocale('translated_path_url.md', 'it'),
    'en-GB': readLocale('translated_path_url.md', 'en-GB'),
    pt: readLocale('translated_path_url.md', 'pt'),
    hi: readLocale('translated_path_url.md', 'hi'),
    tr: readLocale('translated_path_url.md', 'tr'),
    pl: readLocale('translated_path_url.md', 'pl'),
    id: readLocale('translated_path_url.md', 'id'),
    vi: readLocale('translated_path_url.md', 'vi'),
  } as unknown as Record<LocalesValues, Promise<string>>,
  './frequent_questions/en/unknown_command.md': {
    en: readLocale('unknown_command.md', 'en'),
    ru: readLocale('unknown_command.md', 'ru'),
    ja: readLocale('unknown_command.md', 'ja'),
    fr: readLocale('unknown_command.md', 'fr'),
    ko: readLocale('unknown_command.md', 'ko'),
    zh: readLocale('unknown_command.md', 'zh'),
    es: readLocale('unknown_command.md', 'es'),
    de: readLocale('unknown_command.md', 'de'),
    ar: readLocale('unknown_command.md', 'ar'),
    it: readLocale('unknown_command.md', 'it'),
    'en-GB': readLocale('unknown_command.md', 'en-GB'),
    pt: readLocale('unknown_command.md', 'pt'),
    hi: readLocale('unknown_command.md', 'hi'),
    tr: readLocale('unknown_command.md', 'tr'),
    pl: readLocale('unknown_command.md', 'pl'),
    id: readLocale('unknown_command.md', 'id'),
    vi: readLocale('unknown_command.md', 'vi'),
  } as unknown as Record<LocalesValues, Promise<string>>,
} as const;
