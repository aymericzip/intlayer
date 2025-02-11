import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesExpressIntlayerTData = (locale: Locales): DocData => ({
  docName: 'package__express-intlayer__t',
  url: PagesRoutes['Doc_Packages_express-intlayer_t'],
  githubUrl: GithubRoutes['Packages_express-intlayer_t'],
  createdAt: new Date('2024-12-02'),
  updatedAt: new Date('2024-12-02'),
  ...getIntlayer('doc-t-express-intlayer-metadata', locale),
});
