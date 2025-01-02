import { BlogData } from '@components/BlogPage/types';
import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getBlogReactI18nVSReactIntlVSIntlayerData = (
  locale: Locales
): BlogData => ({
  blogName: 'next-i18next_vs_next-intl_vs_intlayer',
  url: PagesRoutes['Blog_React-i18next_vs_React-intl_vs_Intlayer'],
  githubUrl: GithubRoutes['React-i18next_vs_React-intl_vs_Intlayer'],
  createdAt: new Date('2025-01-02'),
  updatedAt: new Date('2025-01-02'),
  ...getIntlayer('blog-next-i18n-vs-next-intl-vs-intlayer-metadata', locale),
});
