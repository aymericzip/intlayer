import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getPackagesIntlayerGetEnumerationContentData = (
  locale: LocalesValues
): DocData => ({
  docName: 'package__intlayer__getEnumeration',
  url: PagesRoutes['Doc_Packages_intlayer_getEnumeration'],
  githubUrl: GithubRoutes['Packages_intlayer_getEnumeration'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-getEnumeration-intlayer-metadata', locale),
});
