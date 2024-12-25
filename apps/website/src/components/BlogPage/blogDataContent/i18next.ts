import { BlogData } from '@components/BlogPage/types';
import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getBlogIntlayerWithI18nextData = (locale: Locales): BlogData => ({
  blogName: 'intlayer_with_i18next',
  url: PagesRoutes.Blog_Intlayer_with_I18next,
  githubUrl: GithubRoutes.IntlayerWithI18next,
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('blog-intlayer-with-i18next-metadata', locale),
});
