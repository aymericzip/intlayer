import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesExpressIntlayerData = (locale: Locales): DocData => ({
  docName: 'package__express-intlayer',
  url: PagesRoutes['Doc_Packages_express-intlayer'],
  githubUrl: GithubRoutes['Packages_express-intlayer'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-express-intlayer-metadata', locale),
});
