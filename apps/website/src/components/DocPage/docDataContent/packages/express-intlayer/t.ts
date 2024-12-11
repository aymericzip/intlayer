import { DocData } from '@components/DocPage/types';
import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesExpressIntlayerTData = (locale: Locales): DocData => ({
  docName: 't_express-intlayer',
  url: PagesRoutes['Doc_Packages_express-intlayer_t'],
  githubUrl: GithubRoutes['Packages_express-intlayer_t'],
  createdAt: new Date('2024-12-02'),
  updatedAt: new Date('2024-12-02'),
  ...getIntlayer('doc-t-express-intlayer-metadata', locale),
});
