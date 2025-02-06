import { BlogData } from '@components/BlogPage/types';
import { Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getBlogReactI18nVSReactIntlVSIntlayerData = (
  locale: Locales
): BlogData => ({
  blogName: 'react-i18next_vs_react-intl_vs_intlayer',
  url: PagesRoutes['Blog_React-i18next_vs_React-intl_vs_Intlayer'],
  githubUrl: GithubRoutes['React-i18next_vs_React-intl_vs_Intlayer'],
  createdAt: new Date('2025-01-02'),
  updatedAt: new Date('2025-01-02'),
  ...getIntlayer('blog-next-i18n-vs-next-intl-vs-intlayer-metadata', locale),
});
