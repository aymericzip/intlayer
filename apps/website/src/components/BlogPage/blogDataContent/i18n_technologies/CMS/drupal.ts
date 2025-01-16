import { BlogData } from '@components/BlogPage/types';
import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getBlogI18nTechnologiesCMSDrupalData = (
  locale: Locales
): BlogData => ({
  blogName: 'list_i18n_technologies__CMS__drupal',
  url: PagesRoutes['Blog_i18n-technologies__CMS__drupal'],
  githubUrl: GithubRoutes['i18n-technologies__CMS__drupal'],
  createdAt: new Date('2025-01-16'),
  updatedAt: new Date('2025-01-16'),
  ...getIntlayer('blog-i18n_technologies_CMS_drupal-metadata', locale),
});
