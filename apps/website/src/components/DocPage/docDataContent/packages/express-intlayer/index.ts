import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getPackagesExpressIntlayerData = (
  locale: LocalesValues
): DocData => ({
  docName: 'package__express-intlayer',
  url: PagesRoutes['Doc_Packages_express-intlayer'],
  githubUrl: GithubRoutes['Packages_express-intlayer'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-express-intlayer-metadata', locale),
});
