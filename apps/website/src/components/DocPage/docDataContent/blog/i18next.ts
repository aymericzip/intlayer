import { DocData } from '@components/DocPage/types';
import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getBlogIntlayerWithI18nextData = (locale: Locales): DocData => ({
  docName: 'intlayer_with_i18next',
  url: PagesRoutes.Doc_Intlayer_with_I18next,
  githubUrl: GithubRoutes.IntlayerWithI18next,
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-intlayer-with-i18next-metadata', locale),
});
