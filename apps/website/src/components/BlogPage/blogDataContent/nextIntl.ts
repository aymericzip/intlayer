import type { BlogData } from '@components/BlogPage/types';
import { type Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getBlogIntlayerWithNextIntlData = (locale: Locales): BlogData => ({
  blogName: 'intlayer_with_next-intl',
  url: PagesRoutes['Blog_Intlayer_with_Next-intl'],
  githubUrl: GithubRoutes.IntlayerWithNextIntl,
  createdAt: new Date('2025-01-02'),
  updatedAt: new Date('2025-01-02'),
  ...getIntlayer('blog-intlayer-with-next-intl-metadata', locale),
});
