import { BlogData } from '@components/BlogPage/types';
import { Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getBlogIntlayerWithReactI18nextData = (
  locale: Locales
): BlogData => ({
  blogName: 'intlayer_with_react-i18next',
  url: PagesRoutes['Blog_Intlayer_with_React-i18next'],
  githubUrl: GithubRoutes.IntlayerWithReactI18next,
  createdAt: new Date('2025-01-02'),
  updatedAt: new Date('2025-01-02'),
  ...getIntlayer('blog-intlayer-with-react-i18next-metadata', locale),
});
