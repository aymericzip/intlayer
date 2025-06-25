import { Locales } from '@intlayer/config';
import { localeRecord, readFileFunction } from './common';

const blogs = {
  index: localeRecord(({ locale }) =>
    readFileFunction(`/blog/${locale}/index.md`)
  ),
  what_is_internationalization: localeRecord(({ locale }) =>
    readFileFunction(`/blog/${locale}/what_is_internationalization.md`)
  ),
  internationalization_and_SEO: localeRecord(({ locale }) =>
    readFileFunction(`/blog/${locale}/internationalization_and_SEO.md`)
  ),
  'intlayer_with_next-i18next': localeRecord(({ locale }) =>
    readFileFunction(`/blog/${locale}/intlayer_with_next-i18next.md`)
  ),
  'intlayer_with_next-intl': localeRecord(({ locale }) =>
    readFileFunction(`/blog/${locale}/intlayer_with_next-intl.md`)
  ),
  'intlayer_with_react-i18next': localeRecord(({ locale }) =>
    readFileFunction(`/blog/${locale}/intlayer_with_react-i18next.md`)
  ),
  'intlayer_with_react-intl': localeRecord(({ locale }) =>
    readFileFunction(`/blog/${locale}/intlayer_with_react-intl.md`)
  ),
  'next-i18next_vs_next-intl_vs_intlayer': localeRecord(({ locale }) =>
    readFileFunction(`/blog/${locale}/next-i18next_vs_next-intl_vs_intlayer.md`)
  ),
  'react-i18next_vs_react-intl_vs_intlayer': localeRecord(({ locale }) =>
    readFileFunction(
      `/blog/${locale}/react-i18next_vs_react-intl_vs_intlayer.md`
    )
  ),
  list_i18n_technologies__frameworks__angular: localeRecord(({ locale }) =>
    readFileFunction(
      `/blog/${locale}/list_i18n_technologies/frameworks/angular.md`
    )
  ),
  list_i18n_technologies__frameworks__react: localeRecord(({ locale }) =>
    readFileFunction(
      `/blog/${locale}/list_i18n_technologies/frameworks/react.md`
    )
  ),
  list_i18n_technologies__frameworks__vue: localeRecord(({ locale }) =>
    readFileFunction(`/blog/${locale}/list_i18n_technologies/frameworks/vue.md`)
  ),
  list_i18n_technologies__frameworks__svelte: localeRecord(({ locale }) =>
    readFileFunction(
      `/blog/${locale}/list_i18n_technologies/frameworks/svelte.md`
    )
  ),
  list_i18n_technologies__frameworks__flutter: localeRecord(({ locale }) =>
    readFileFunction(
      `/blog/${locale}/list_i18n_technologies/frameworks/flutter.md`
    )
  ),
  'list_i18n_technologies__frameworks__react-native': localeRecord(
    ({ locale }) =>
      readFileFunction(
        `/blog/${locale}/list_i18n_technologies/frameworks/react-native.md`
      )
  ),
  list_i18n_technologies__CMS__wordpress: localeRecord(({ locale }) =>
    readFileFunction(`/blog/${locale}/list_i18n_technologies/CMS/wordpress.md`)
  ),
  list_i18n_technologies__CMS__drupal: localeRecord(({ locale }) =>
    readFileFunction(`/blog/${locale}/list_i18n_technologies/CMS/drupal.md`)
  ),
  list_i18n_technologies__CMS__wix: localeRecord(({ locale }) =>
    readFileFunction(`/blog/${locale}/list_i18n_technologies/CMS/wix.md`)
  ),
};

export const getBlogs = async (lang = Locales.ENGLISH) => {
  const blogsEntries = await Promise.all(
    Object.entries(blogs)
      .map(([key, value]) => [key, value[lang]])
      .map(async ([key, value]) => [key, await value])
  );
  const blogsResult = Object.fromEntries(blogsEntries);
  return blogsResult;
};

export const getBlog = async (
  docName: keyof typeof blogs,
  lang = Locales.ENGLISH
) => await blogs[docName]?.[lang];
