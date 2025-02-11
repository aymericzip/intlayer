import type { BlogData } from '@components/BlogPage/types';
import { type Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getBlogI18nTechnologiesFrameworksReactData = (
  locale: Locales
): BlogData => ({
  blogName: 'list_i18n_technologies__frameworks__react',
  url: PagesRoutes['Blog_i18n-technologies__frameworks__react'],
  githubUrl: GithubRoutes['i18n-technologies__frameworks__react'],
  createdAt: new Date('2025-01-16'),
  updatedAt: new Date('2025-01-16'),
  ...getIntlayer('blog-i18n_technologies_frameworks_react-metadata', locale),
});
