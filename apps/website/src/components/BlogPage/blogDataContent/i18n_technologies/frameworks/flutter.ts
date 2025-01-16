import { BlogData } from '@components/BlogPage/types';
import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getBlogI18nTechnologiesFrameworksFlutterData = (
  locale: Locales
): BlogData => ({
  blogName: 'list_i18n_technologies__frameworks__flutter',
  url: PagesRoutes['Blog_i18n-technologies__frameworks__flutter'],
  githubUrl: GithubRoutes['i18n-technologies__frameworks__flutter'],
  createdAt: new Date('2025-01-16'),
  updatedAt: new Date('2025-01-16'),
  ...getIntlayer('blog-i18n_technologies_frameworks_flutter-metadata', locale),
});
