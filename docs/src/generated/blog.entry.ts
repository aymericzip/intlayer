/* AUTO-GENERATED – DO NOT EDIT */
/* REGENERATE USING `pnpm prepare` */
import { readFile } from 'fs/promises';
import { localeRecord } from 'intlayer';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const isESModule = typeof import.meta.url === 'string';
const dir = isESModule ? dirname(fileURLToPath(import.meta.url)) : __dirname;

export const blogEntry = {
  './blog/en/index.md': localeRecord(({ locale }) =>
    readFile(`${dir}/../../../blog/${locale}/index.md`, 'utf-8')
  ),
  './blog/en/internationalization_and_SEO.md': localeRecord(({ locale }) =>
    readFile(
      `${dir}/../../../blog/${locale}/internationalization_and_SEO.md`,
      'utf-8'
    )
  ),
  './blog/en/intlayer_with_i18next.md': localeRecord(({ locale }) =>
    readFile(`${dir}/../../../blog/${locale}/intlayer_with_i18next.md`, 'utf-8')
  ),
  './blog/en/intlayer_with_next-i18next.md': localeRecord(({ locale }) =>
    readFile(
      `${dir}/../../../blog/${locale}/intlayer_with_next-i18next.md`,
      'utf-8'
    )
  ),
  './blog/en/intlayer_with_next-intl.md': localeRecord(({ locale }) =>
    readFile(
      `${dir}/../../../blog/${locale}/intlayer_with_next-intl.md`,
      'utf-8'
    )
  ),
  './blog/en/intlayer_with_react-i18next.md': localeRecord(({ locale }) =>
    readFile(
      `${dir}/../../../blog/${locale}/intlayer_with_react-i18next.md`,
      'utf-8'
    )
  ),
  './blog/en/intlayer_with_react-intl.md': localeRecord(({ locale }) =>
    readFile(
      `${dir}/../../../blog/${locale}/intlayer_with_react-intl.md`,
      'utf-8'
    )
  ),
  './blog/en/list_i18n_technologies/CMS/drupal.md': localeRecord(({ locale }) =>
    readFile(
      `${dir}/../../../blog/${locale}/list_i18n_technologies/CMS/drupal.md`,
      'utf-8'
    )
  ),
  './blog/en/list_i18n_technologies/CMS/wix.md': localeRecord(({ locale }) =>
    readFile(
      `${dir}/../../../blog/${locale}/list_i18n_technologies/CMS/wix.md`,
      'utf-8'
    )
  ),
  './blog/en/list_i18n_technologies/CMS/wordpress.md': localeRecord(
    ({ locale }) =>
      readFile(
        `${dir}/../../../blog/${locale}/list_i18n_technologies/CMS/wordpress.md`,
        'utf-8'
      )
  ),
  './blog/en/list_i18n_technologies/frameworks/angular.md': localeRecord(
    ({ locale }) =>
      readFile(
        `${dir}/../../../blog/${locale}/list_i18n_technologies/frameworks/angular.md`,
        'utf-8'
      )
  ),
  './blog/en/list_i18n_technologies/frameworks/flutter.md': localeRecord(
    ({ locale }) =>
      readFile(
        `${dir}/../../../blog/${locale}/list_i18n_technologies/frameworks/flutter.md`,
        'utf-8'
      )
  ),
  './blog/en/list_i18n_technologies/frameworks/react-native.md': localeRecord(
    ({ locale }) =>
      readFile(
        `${dir}/../../../blog/${locale}/list_i18n_technologies/frameworks/react-native.md`,
        'utf-8'
      )
  ),
  './blog/en/list_i18n_technologies/frameworks/react.md': localeRecord(
    ({ locale }) =>
      readFile(
        `${dir}/../../../blog/${locale}/list_i18n_technologies/frameworks/react.md`,
        'utf-8'
      )
  ),
  './blog/en/list_i18n_technologies/frameworks/svelte.md': localeRecord(
    ({ locale }) =>
      readFile(
        `${dir}/../../../blog/${locale}/list_i18n_technologies/frameworks/svelte.md`,
        'utf-8'
      )
  ),
  './blog/en/list_i18n_technologies/frameworks/vue.md': localeRecord(
    ({ locale }) =>
      readFile(
        `${dir}/../../../blog/${locale}/list_i18n_technologies/frameworks/vue.md`,
        'utf-8'
      )
  ),
  './blog/en/next-i18next_vs_next-intl_vs_intlayer.md': localeRecord(
    ({ locale }) =>
      readFile(
        `${dir}/../../../blog/${locale}/next-i18next_vs_next-intl_vs_intlayer.md`,
        'utf-8'
      )
  ),
  './blog/en/react-i18next_vs_react-intl_vs_intlayer.md': localeRecord(
    ({ locale }) =>
      readFile(
        `${dir}/../../../blog/${locale}/react-i18next_vs_react-intl_vs_intlayer.md`,
        'utf-8'
      )
  ),
  './blog/en/what_is_internationalization.md': localeRecord(({ locale }) =>
    readFile(
      `${dir}/../../../blog/${locale}/what_is_internationalization.md`,
      'utf-8'
    )
  ),
} as const;
