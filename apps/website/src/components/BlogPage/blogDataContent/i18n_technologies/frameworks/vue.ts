import { BlogData } from '@components/BlogPage/types';
import { Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getBlogI18nTechnologiesFrameworksVueData = (
  locale: Locales
): BlogData => ({
  blogName: 'list_i18n_technologies__frameworks__vue',
  url: PagesRoutes['Blog_i18n-technologies__frameworks__vue'],
  githubUrl: GithubRoutes['i18n-technologies__frameworks__vue'],
  createdAt: new Date('2025-01-16'),
  updatedAt: new Date('2025-01-16'),
  ...getIntlayer('blog-i18n_technologies_frameworks_vue-metadata', locale),
});
