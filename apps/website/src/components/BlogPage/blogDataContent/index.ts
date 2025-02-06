import { BlogData } from '@components/BlogPage/types';
import { Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getBlogIndexData = (locale: Locales): BlogData => ({
  blogName: 'index',
  url: PagesRoutes.Blog,
  githubUrl: GithubRoutes.BlogIndex,
  createdAt: new Date('2024-24-12'),
  updatedAt: new Date('2024-24-12'),
  ...getIntlayer('blog-metadata', locale),
});
