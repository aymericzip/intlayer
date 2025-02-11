import type { BlogData } from '@components/BlogPage/types';
import { type Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getBlogNextI18nVSNextIntlVSIntlayerData = (
  locale: Locales
): BlogData => ({
  blogName: 'next-i18next_vs_next-intl_vs_intlayer',
  url: PagesRoutes['Blog_Next-i18next_vs_Next-intl_vs_Intlayer'],
  githubUrl: GithubRoutes['Next-i18next_vs_Next-intl_vs_Intlayer'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2025-01-02'),
  ...getIntlayer('blog-next-i18n-vs-next-intl-vs-intlayer-metadata', locale),
});
