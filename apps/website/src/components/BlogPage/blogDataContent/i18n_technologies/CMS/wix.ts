import { BlogData } from '@components/BlogPage/types';
import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getBlogI18nTechnologiesCMSWixData = (
  locale: Locales
): BlogData => ({
  blogName: 'list_i18n_technologies__CMS__wix',
  url: PagesRoutes['Blog_i18n-technologies__CMS__wix'],
  githubUrl: GithubRoutes['i18n-technologies__CMS__wix'],
  createdAt: new Date('2025-01-16'),
  updatedAt: new Date('2025-01-16'),
  ...getIntlayer('blog-i18n_technologies_CMS_wix-metadata', locale),
});
