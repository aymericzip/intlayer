import { DocData } from '@components/DocPage/types';
import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesIntlayerGetTranslationContentData = (
  locale: Locales
): DocData => ({
  docName: 'package__intlayer__getTranslationContent',
  url: PagesRoutes['Doc_Packages_intlayer_getTranslationContent'],
  githubUrl: GithubRoutes['Packages_intlayer_getTranslationContent'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-getTranslationContent-intlayer-metadata', locale),
});
