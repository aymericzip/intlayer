import { BlogData } from '@components/BlogPage/types';
import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getBlogSEOData = (locale: Locales): BlogData => ({
  blogName: 'internationalization_and_SEO',
  url: PagesRoutes.Blog_SEO_and_i18n,
  githubUrl: GithubRoutes.I18nAndSEO,
  createdAt: new Date('2024-12-24'),
  updatedAt: new Date('2024-12-24'),
  ...getIntlayer('blog-i18n-and-SEO-metadata', locale),
});
