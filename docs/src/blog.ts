import { Locales } from '@intlayer/config';
import { localeRecord } from 'intlayer';
import { readFileContent } from './readFileContent';

const blogs = {
  index: localeRecord(({ locale }) =>
    readFileContent(`/blog/${locale}/index.md`)
  ),
  what_is_internationalization: localeRecord(({ locale }) =>
    readFileContent(`/blog/${locale}/what_is_internationalization.md`)
  ),
  internationalization_and_SEO: localeRecord(({ locale }) =>
    readFileContent(`/blog/${locale}/internationalization_and_SEO.md`)
  ),
  'intlayer_with_next-i18next': localeRecord(({ locale }) =>
    readFileContent(`/blog/${locale}/intlayer_with_next-i18next.md`)
  ),
  'intlayer_with_next-intl': localeRecord(({ locale }) =>
    readFileContent(`/blog/${locale}/intlayer_with_next-intl.md`)
  ),
  'intlayer_with_react-i18next': localeRecord(({ locale }) =>
    readFileContent(`/blog/${locale}/intlayer_with_react-i18next.md`)
  ),
  'intlayer_with_react-intl': localeRecord(({ locale }) =>
    readFileContent(`/blog/${locale}/intlayer_with_react-intl.md`)
  ),
  'next-i18next_vs_next-intl_vs_intlayer': localeRecord(({ locale }) =>
    readFileContent(`/blog/${locale}/next-i18next_vs_next-intl_vs_intlayer.md`)
  ),
  'react-i18next_vs_react-intl_vs_intlayer': localeRecord(({ locale }) =>
    readFileContent(
      `/blog/${locale}/react-i18next_vs_react-intl_vs_intlayer.md`
    )
  ),
  list_i18n_technologies__frameworks__angular: localeRecord(({ locale }) =>
    readFileContent(
      `/blog/${locale}/list_i18n_technologies/frameworks/angular.md`
    )
  ),
  list_i18n_technologies__frameworks__react: localeRecord(({ locale }) =>
    readFileContent(
      `/blog/${locale}/list_i18n_technologies/frameworks/react.md`
    )
  ),
  list_i18n_technologies__frameworks__vue: localeRecord(({ locale }) =>
    readFileContent(`/blog/${locale}/list_i18n_technologies/frameworks/vue.md`)
  ),
  list_i18n_technologies__frameworks__svelte: localeRecord(({ locale }) =>
    readFileContent(
      `/blog/${locale}/list_i18n_technologies/frameworks/svelte.md`
    )
  ),
  list_i18n_technologies__frameworks__flutter: localeRecord(({ locale }) =>
    readFileContent(
      `/blog/${locale}/list_i18n_technologies/frameworks/flutter.md`
    )
  ),
  'list_i18n_technologies__frameworks__react-native': localeRecord(
    ({ locale }) =>
      readFileContent(
        `/blog/${locale}/list_i18n_technologies/frameworks/react-native.md`
      )
  ),
  list_i18n_technologies__CMS__wordpress: localeRecord(({ locale }) =>
    readFileContent(`/blog/${locale}/list_i18n_technologies/CMS/wordpress.md`)
  ),
  list_i18n_technologies__CMS__drupal: localeRecord(({ locale }) =>
    readFileContent(`/blog/${locale}/list_i18n_technologies/CMS/drupal.md`)
  ),
  list_i18n_technologies__CMS__wix: localeRecord(({ locale }) =>
    readFileContent(`/blog/${locale}/list_i18n_technologies/CMS/wix.md`)
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
) => {
  const blog = await blogs[docName]?.[lang];

  if (!blog) {
    const englishBlog = await blogs[docName][Locales.ENGLISH];

    if (!englishBlog) {
      throw new Error(`Blog ${docName} not found`);
    }

    return englishBlog;
  }

  return blog;
};
