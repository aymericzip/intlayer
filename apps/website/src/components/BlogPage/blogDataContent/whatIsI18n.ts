import { BlogData } from '@components/BlogPage/types';
import { Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getBlogWhatIsi18nData = (locale: Locales): BlogData => ({
  blogName: 'what_is_internationalization',
  url: PagesRoutes.Blog_What_is_i18n,
  githubUrl: GithubRoutes.WhatIsi18n,
  createdAt: new Date('2025-01-16'),
  updatedAt: new Date('2025-01-16'),
  ...getIntlayer('blog-what-is-i18n-metadata', locale),
});
