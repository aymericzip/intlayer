/* AUTO-GENERATED – DO NOT EDIT */
/* REGENERATE USING `pnpm prepare` */
import { readFile } from 'fs/promises';
import { localeRecord } from 'intlayer';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const isESModule = typeof import.meta.url === 'string';
const dir = isESModule ? dirname(fileURLToPath(import.meta.url)) : __dirname;

export const frequentQuestionsEntry = {
  './frequent_questions/en/SSR_Next_no_[locale].md': localeRecord(
    ({ locale }) =>
      readFile(
        `${dir}/../../../frequent_questions/${locale}/SSR_Next_no_[locale].md`,
        'utf-8'
      )
  ),
  './frequent_questions/en/array_as_content_declaration.md': localeRecord(
    ({ locale }) =>
      readFile(
        `${dir}/../../../frequent_questions/${locale}/array_as_content_declaration.md`,
        'utf-8'
      )
  ),
  './frequent_questions/en/build_dictionaries.md': localeRecord(({ locale }) =>
    readFile(
      `${dir}/../../../frequent_questions/${locale}/build_dictionaries.md`,
      'utf-8'
    )
  ),
  './frequent_questions/en/customized_locale_list.md': localeRecord(
    ({ locale }) =>
      readFile(
        `${dir}/../../../frequent_questions/${locale}/customized_locale_list.md`,
        'utf-8'
      )
  ),
  './frequent_questions/en/domain_routing.md': localeRecord(({ locale }) =>
    readFile(
      `${dir}/../../../frequent_questions/${locale}/domain_routing.md`,
      'utf-8'
    )
  ),
  './frequent_questions/en/esbuild_error.md': localeRecord(({ locale }) =>
    readFile(
      `${dir}/../../../frequent_questions/${locale}/esbuild_error.md`,
      'utf-8'
    )
  ),
  './frequent_questions/en/get_locale_cookie.md': localeRecord(({ locale }) =>
    readFile(
      `${dir}/../../../frequent_questions/${locale}/get_locale_cookie.md`,
      'utf-8'
    )
  ),
  './frequent_questions/en/intlayer_command_undefined.md': localeRecord(
    ({ locale }) =>
      readFile(
        `${dir}/../../../frequent_questions/${locale}/intlayer_command_undefined.md`,
        'utf-8'
      )
  ),
  './frequent_questions/en/locale_incorect_in_url.md': localeRecord(
    ({ locale }) =>
      readFile(
        `${dir}/../../../frequent_questions/${locale}/locale_incorect_in_url.md`,
        'utf-8'
      )
  ),
  './frequent_questions/en/static_rendering.md': localeRecord(({ locale }) =>
    readFile(
      `${dir}/../../../frequent_questions/${locale}/static_rendering.md`,
      'utf-8'
    )
  ),
  './frequent_questions/en/translated_path_url.md': localeRecord(({ locale }) =>
    readFile(
      `${dir}/../../../frequent_questions/${locale}/translated_path_url.md`,
      'utf-8'
    )
  ),
  './frequent_questions/en/unknown_command.md': localeRecord(({ locale }) =>
    readFile(
      `${dir}/../../../frequent_questions/${locale}/unknown_command.md`,
      'utf-8'
    )
  ),
} as const;
