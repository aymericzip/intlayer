import { BlogData } from '@components/BlogPage/types';
import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getBlogIntlayerWithReactIntlData = (
  locale: Locales
): BlogData => ({
  blogName: 'intlayer_with_react-intl',
  url: PagesRoutes['Blog_Intlayer_with_React-intl'],
  githubUrl: GithubRoutes.IntlayerWithReactIntl,
  createdAt: new Date('2025-01-02'),
  updatedAt: new Date('2025-01-02'),
  ...getIntlayer('blog-intlayer-with-react-intl-metadata', locale),
});
