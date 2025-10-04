/* AUTO-GENERATED – DO NOT EDIT */
/* REGENERATE USING `pnpm prepare` */
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { LocalesValues } from '@intlayer/config';

const isESModule = typeof import.meta.url === 'string';
const dir = isESModule ? dirname(fileURLToPath(import.meta.url)) : __dirname;

const readLocale = (relativeAfterLocale: string, locale: LocalesValues): Promise<string> => {
  const target = join(dir, `../../../frequent_questions/${locale}/${relativeAfterLocale}`);
  if (!existsSync(target)) {
    console.error(`File not found: ${target}`);
    return readFile(join(dir, `../../../frequent_questions/en/${relativeAfterLocale}`), 'utf8');
  }
  return readFile(target, 'utf8');
};


export const frequentQuestionsEntry = {
  './frequent_questions/en/SSR_Next_no_[locale].md': {
    'en': readLocale('SSR_Next_no_[locale].md', 'en'),
    'fr': readLocale('SSR_Next_no_[locale].md', 'fr'),
    'ru': readLocale('SSR_Next_no_[locale].md', 'ru'),
    'ja': readLocale('SSR_Next_no_[locale].md', 'ja'),
    'ko': readLocale('SSR_Next_no_[locale].md', 'ko'),
    'zh': readLocale('SSR_Next_no_[locale].md', 'zh'),
    'es': readLocale('SSR_Next_no_[locale].md', 'es'),
    'de': readLocale('SSR_Next_no_[locale].md', 'de'),
    'ar': readLocale('SSR_Next_no_[locale].md', 'ar'),
    'pt': readLocale('SSR_Next_no_[locale].md', 'pt'),
    'en-GB': readLocale('SSR_Next_no_[locale].md', 'en-GB'),
    'it': readLocale('SSR_Next_no_[locale].md', 'it'),
    'hi': readLocale('SSR_Next_no_[locale].md', 'hi'),
    'tr': readLocale('SSR_Next_no_[locale].md', 'tr')
  } as unknown as Record<LocalesValues, Promise<string>>,
  './frequent_questions/en/array_as_content_declaration.md': {
    'en': readLocale('array_as_content_declaration.md', 'en'),
    'fr': readLocale('array_as_content_declaration.md', 'fr'),
    'ru': readLocale('array_as_content_declaration.md', 'ru'),
    'ja': readLocale('array_as_content_declaration.md', 'ja'),
    'ko': readLocale('array_as_content_declaration.md', 'ko'),
    'zh': readLocale('array_as_content_declaration.md', 'zh'),
    'es': readLocale('array_as_content_declaration.md', 'es'),
    'de': readLocale('array_as_content_declaration.md', 'de'),
    'ar': readLocale('array_as_content_declaration.md', 'ar'),
    'pt': readLocale('array_as_content_declaration.md', 'pt'),
    'en-GB': readLocale('array_as_content_declaration.md', 'en-GB'),
    'it': readLocale('array_as_content_declaration.md', 'it'),
    'hi': readLocale('array_as_content_declaration.md', 'hi'),
    'tr': readLocale('array_as_content_declaration.md', 'tr')
  } as unknown as Record<LocalesValues, Promise<string>>,
  './frequent_questions/en/build_dictionaries.md': {
    'en': readLocale('build_dictionaries.md', 'en'),
    'fr': readLocale('build_dictionaries.md', 'fr'),
    'ru': readLocale('build_dictionaries.md', 'ru'),
    'ja': readLocale('build_dictionaries.md', 'ja'),
    'ko': readLocale('build_dictionaries.md', 'ko'),
    'zh': readLocale('build_dictionaries.md', 'zh'),
    'es': readLocale('build_dictionaries.md', 'es'),
    'de': readLocale('build_dictionaries.md', 'de'),
    'ar': readLocale('build_dictionaries.md', 'ar'),
    'pt': readLocale('build_dictionaries.md', 'pt'),
    'en-GB': readLocale('build_dictionaries.md', 'en-GB'),
    'it': readLocale('build_dictionaries.md', 'it'),
    'hi': readLocale('build_dictionaries.md', 'hi'),
    'tr': readLocale('build_dictionaries.md', 'tr')
  } as unknown as Record<LocalesValues, Promise<string>>,
  './frequent_questions/en/build_error_CI_CD.md': {
    'en': readLocale('build_error_CI_CD.md', 'en'),
    'fr': readLocale('build_error_CI_CD.md', 'fr'),
    'ru': readLocale('build_error_CI_CD.md', 'ru'),
    'ja': readLocale('build_error_CI_CD.md', 'ja'),
    'ko': readLocale('build_error_CI_CD.md', 'ko'),
    'zh': readLocale('build_error_CI_CD.md', 'zh'),
    'es': readLocale('build_error_CI_CD.md', 'es'),
    'de': readLocale('build_error_CI_CD.md', 'de'),
    'ar': readLocale('build_error_CI_CD.md', 'ar'),
    'pt': readLocale('build_error_CI_CD.md', 'pt'),
    'en-GB': readLocale('build_error_CI_CD.md', 'en-GB'),
    'it': readLocale('build_error_CI_CD.md', 'it'),
    'hi': readLocale('build_error_CI_CD.md', 'hi'),
    'tr': readLocale('build_error_CI_CD.md', 'tr')
  } as unknown as Record<LocalesValues, Promise<string>>,
  './frequent_questions/en/customized_locale_list.md': {
    'en': readLocale('customized_locale_list.md', 'en'),
    'fr': readLocale('customized_locale_list.md', 'fr'),
    'ru': readLocale('customized_locale_list.md', 'ru'),
    'ja': readLocale('customized_locale_list.md', 'ja'),
    'ko': readLocale('customized_locale_list.md', 'ko'),
    'zh': readLocale('customized_locale_list.md', 'zh'),
    'es': readLocale('customized_locale_list.md', 'es'),
    'de': readLocale('customized_locale_list.md', 'de'),
    'ar': readLocale('customized_locale_list.md', 'ar'),
    'pt': readLocale('customized_locale_list.md', 'pt'),
    'en-GB': readLocale('customized_locale_list.md', 'en-GB'),
    'it': readLocale('customized_locale_list.md', 'it'),
    'hi': readLocale('customized_locale_list.md', 'hi'),
    'tr': readLocale('customized_locale_list.md', 'tr')
  } as unknown as Record<LocalesValues, Promise<string>>,
  './frequent_questions/en/domain_routing.md': {
    'en': readLocale('domain_routing.md', 'en'),
    'fr': readLocale('domain_routing.md', 'fr'),
    'ru': readLocale('domain_routing.md', 'ru'),
    'ja': readLocale('domain_routing.md', 'ja'),
    'ko': readLocale('domain_routing.md', 'ko'),
    'zh': readLocale('domain_routing.md', 'zh'),
    'es': readLocale('domain_routing.md', 'es'),
    'de': readLocale('domain_routing.md', 'de'),
    'ar': readLocale('domain_routing.md', 'ar'),
    'pt': readLocale('domain_routing.md', 'pt'),
    'en-GB': readLocale('domain_routing.md', 'en-GB'),
    'it': readLocale('domain_routing.md', 'it'),
    'hi': readLocale('domain_routing.md', 'hi'),
    'tr': readLocale('domain_routing.md', 'tr')
  } as unknown as Record<LocalesValues, Promise<string>>,
  './frequent_questions/en/esbuild_error.md': {
    'en': readLocale('esbuild_error.md', 'en'),
    'fr': readLocale('esbuild_error.md', 'fr'),
    'ru': readLocale('esbuild_error.md', 'ru'),
    'ja': readLocale('esbuild_error.md', 'ja'),
    'ko': readLocale('esbuild_error.md', 'ko'),
    'zh': readLocale('esbuild_error.md', 'zh'),
    'es': readLocale('esbuild_error.md', 'es'),
    'de': readLocale('esbuild_error.md', 'de'),
    'ar': readLocale('esbuild_error.md', 'ar'),
    'pt': readLocale('esbuild_error.md', 'pt'),
    'en-GB': readLocale('esbuild_error.md', 'en-GB'),
    'it': readLocale('esbuild_error.md', 'it'),
    'hi': readLocale('esbuild_error.md', 'hi'),
    'tr': readLocale('esbuild_error.md', 'tr')
  } as unknown as Record<LocalesValues, Promise<string>>,
  './frequent_questions/en/get_locale_cookie.md': {
    'en': readLocale('get_locale_cookie.md', 'en'),
    'fr': readLocale('get_locale_cookie.md', 'fr'),
    'ru': readLocale('get_locale_cookie.md', 'ru'),
    'ja': readLocale('get_locale_cookie.md', 'ja'),
    'ko': readLocale('get_locale_cookie.md', 'ko'),
    'zh': readLocale('get_locale_cookie.md', 'zh'),
    'es': readLocale('get_locale_cookie.md', 'es'),
    'de': readLocale('get_locale_cookie.md', 'de'),
    'ar': readLocale('get_locale_cookie.md', 'ar'),
    'pt': readLocale('get_locale_cookie.md', 'pt'),
    'en-GB': readLocale('get_locale_cookie.md', 'en-GB'),
    'it': readLocale('get_locale_cookie.md', 'it'),
    'hi': readLocale('get_locale_cookie.md', 'hi'),
    'tr': readLocale('get_locale_cookie.md', 'tr')
  } as unknown as Record<LocalesValues, Promise<string>>,
  './frequent_questions/en/intlayer_command_undefined.md': {
    'en': readLocale('intlayer_command_undefined.md', 'en'),
    'fr': readLocale('intlayer_command_undefined.md', 'fr'),
    'ru': readLocale('intlayer_command_undefined.md', 'ru'),
    'ja': readLocale('intlayer_command_undefined.md', 'ja'),
    'ko': readLocale('intlayer_command_undefined.md', 'ko'),
    'zh': readLocale('intlayer_command_undefined.md', 'zh'),
    'es': readLocale('intlayer_command_undefined.md', 'es'),
    'de': readLocale('intlayer_command_undefined.md', 'de'),
    'ar': readLocale('intlayer_command_undefined.md', 'ar'),
    'pt': readLocale('intlayer_command_undefined.md', 'pt'),
    'en-GB': readLocale('intlayer_command_undefined.md', 'en-GB'),
    'it': readLocale('intlayer_command_undefined.md', 'it'),
    'hi': readLocale('intlayer_command_undefined.md', 'hi'),
    'tr': readLocale('intlayer_command_undefined.md', 'tr')
  } as unknown as Record<LocalesValues, Promise<string>>,
  './frequent_questions/en/locale_incorect_in_url.md': {
    'en': readLocale('locale_incorect_in_url.md', 'en'),
    'fr': readLocale('locale_incorect_in_url.md', 'fr'),
    'ru': readLocale('locale_incorect_in_url.md', 'ru'),
    'ja': readLocale('locale_incorect_in_url.md', 'ja'),
    'ko': readLocale('locale_incorect_in_url.md', 'ko'),
    'zh': readLocale('locale_incorect_in_url.md', 'zh'),
    'es': readLocale('locale_incorect_in_url.md', 'es'),
    'de': readLocale('locale_incorect_in_url.md', 'de'),
    'ar': readLocale('locale_incorect_in_url.md', 'ar'),
    'pt': readLocale('locale_incorect_in_url.md', 'pt'),
    'en-GB': readLocale('locale_incorect_in_url.md', 'en-GB'),
    'it': readLocale('locale_incorect_in_url.md', 'it'),
    'hi': readLocale('locale_incorect_in_url.md', 'hi'),
    'tr': readLocale('locale_incorect_in_url.md', 'tr')
  } as unknown as Record<LocalesValues, Promise<string>>,
  './frequent_questions/en/static_rendering.md': {
    'en': readLocale('static_rendering.md', 'en'),
    'fr': readLocale('static_rendering.md', 'fr'),
    'ru': readLocale('static_rendering.md', 'ru'),
    'ja': readLocale('static_rendering.md', 'ja'),
    'ko': readLocale('static_rendering.md', 'ko'),
    'zh': readLocale('static_rendering.md', 'zh'),
    'es': readLocale('static_rendering.md', 'es'),
    'de': readLocale('static_rendering.md', 'de'),
    'ar': readLocale('static_rendering.md', 'ar'),
    'pt': readLocale('static_rendering.md', 'pt'),
    'en-GB': readLocale('static_rendering.md', 'en-GB'),
    'it': readLocale('static_rendering.md', 'it'),
    'hi': readLocale('static_rendering.md', 'hi'),
    'tr': readLocale('static_rendering.md', 'tr')
  } as unknown as Record<LocalesValues, Promise<string>>,
  './frequent_questions/en/translated_path_url.md': {
    'en': readLocale('translated_path_url.md', 'en'),
    'fr': readLocale('translated_path_url.md', 'fr'),
    'ru': readLocale('translated_path_url.md', 'ru'),
    'ja': readLocale('translated_path_url.md', 'ja'),
    'ko': readLocale('translated_path_url.md', 'ko'),
    'zh': readLocale('translated_path_url.md', 'zh'),
    'es': readLocale('translated_path_url.md', 'es'),
    'de': readLocale('translated_path_url.md', 'de'),
    'ar': readLocale('translated_path_url.md', 'ar'),
    'pt': readLocale('translated_path_url.md', 'pt'),
    'en-GB': readLocale('translated_path_url.md', 'en-GB'),
    'it': readLocale('translated_path_url.md', 'it'),
    'hi': readLocale('translated_path_url.md', 'hi'),
    'tr': readLocale('translated_path_url.md', 'tr')
  } as unknown as Record<LocalesValues, Promise<string>>,
  './frequent_questions/en/unknown_command.md': {
    'en': readLocale('unknown_command.md', 'en'),
    'fr': readLocale('unknown_command.md', 'fr'),
    'ru': readLocale('unknown_command.md', 'ru'),
    'ja': readLocale('unknown_command.md', 'ja'),
    'ko': readLocale('unknown_command.md', 'ko'),
    'zh': readLocale('unknown_command.md', 'zh'),
    'es': readLocale('unknown_command.md', 'es'),
    'de': readLocale('unknown_command.md', 'de'),
    'ar': readLocale('unknown_command.md', 'ar'),
    'pt': readLocale('unknown_command.md', 'pt'),
    'en-GB': readLocale('unknown_command.md', 'en-GB'),
    'it': readLocale('unknown_command.md', 'it'),
    'hi': readLocale('unknown_command.md', 'hi'),
    'tr': readLocale('unknown_command.md', 'tr')
  } as unknown as Record<LocalesValues, Promise<string>>,
} as const;
