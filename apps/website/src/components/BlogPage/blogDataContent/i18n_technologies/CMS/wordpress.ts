import { BlogData } from '@components/BlogPage/types';
import { Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getBlogI18nTechnologiesCMSWordpressData = (
  locale: Locales
): BlogData => ({
  blogName: 'list_i18n_technologies__CMS__wordpress',
  url: PagesRoutes['Blog_i18n-technologies__CMS__wordpress'],
  githubUrl: GithubRoutes['i18n-technologies__CMS__wordpress'],
  createdAt: new Date('2025-01-16'),
  updatedAt: new Date('2025-01-16'),
  ...getIntlayer('blog-i18n_technologies_CMS_wordpress-metadata', locale),
});
