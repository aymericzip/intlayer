import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getPackagesIntlayerGetConfigurationData = (
  locale: LocalesValues
): DocData => ({
  docName: 'package__intlayer__getConfiguration',
  url: PagesRoutes['Doc_Packages_intlayer_getConfiguration'],
  githubUrl: GithubRoutes['Packages_intlayer_getConfiguration'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-getConfiguration-intlayer-metadata', locale),
});
