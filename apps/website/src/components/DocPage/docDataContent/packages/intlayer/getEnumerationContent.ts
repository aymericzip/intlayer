import { DocData } from '@components/DocPage/types';
import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesIntlayerGetEnumerationContentData = (
  locale: Locales
): DocData => ({
  docName: 'package__intlayer__getEnumerationContent',
  url: PagesRoutes['Doc_Packages_intlayer_getEnumerationContent'],
  githubUrl: GithubRoutes['Packages_intlayer_getEnumerationContent'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-getEnumerationContent-intlayer-metadata', locale),
});
