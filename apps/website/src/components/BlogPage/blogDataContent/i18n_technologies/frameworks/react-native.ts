import { BlogData } from '@components/BlogPage/types';
import { Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getBlogI18nTechnologiesFrameworksReactNativeData = (
  locale: Locales
): BlogData => ({
  blogName: 'list_i18n_technologies__frameworks__react-native',
  url: PagesRoutes['Blog_i18n-technologies__frameworks__react-native'],
  githubUrl: GithubRoutes['i18n-technologies__frameworks__react-native'],
  createdAt: new Date('2025-01-16'),
  updatedAt: new Date('2025-01-16'),
  ...getIntlayer(
    'blog-i18n_technologies_frameworks_react-native-metadata',
    locale
  ),
});
