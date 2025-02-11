import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesIntlayerGetConfigurationData = (
  locale: Locales
): DocData => ({
  docName: 'package__intlayer__getConfiguration',
  url: PagesRoutes['Doc_Packages_intlayer_getConfiguration'],
  githubUrl: GithubRoutes['Packages_intlayer_getConfiguration'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-getConfiguration-intlayer-metadata', locale),
});
