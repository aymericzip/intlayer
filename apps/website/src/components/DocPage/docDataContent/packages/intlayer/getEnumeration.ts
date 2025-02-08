import { DocData } from '@components/DocPage/types';
import { Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesIntlayerGetEnumerationContentData = (
  locale: Locales
): DocData => ({
  docName: 'package__intlayer__getEnumeration',
  url: PagesRoutes['Doc_Packages_intlayer_getEnumeration'],
  githubUrl: GithubRoutes['Packages_intlayer_getEnumeration'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-getEnumeration-intlayer-metadata', locale),
});
