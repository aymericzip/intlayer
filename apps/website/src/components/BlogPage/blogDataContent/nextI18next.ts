import type { BlogData } from '@components/BlogPage/types';
import { type Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getBlogIntlayerWithNextI18nextData = (
  locale: Locales
): BlogData => ({
  blogName: 'intlayer_with_next-i18next',
  url: PagesRoutes['Blog_Intlayer_with_Next-i18next'],
  githubUrl: GithubRoutes.IntlayerWithNextI18next,
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2025-01-02'),
  ...getIntlayer('blog-intlayer-with-next-i18next-metadata', locale),
});
