import { DocData } from '@components/DocPage/types';
import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getEnvironmentExpressData = (locale: Locales): DocData => ({
  docName: 'intlayer_with_express',
  url: PagesRoutes.Doc_Environment_Express,
  githubUrl: GithubRoutes.IntlayerWithExpress,
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-intlayer-with-express-metadata', locale),
});
