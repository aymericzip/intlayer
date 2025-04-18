import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getPackagesIntlayerGetTranslationContentData = (
  locale: LocalesValues
): DocData => ({
  docName: 'package__intlayer__getTranslation',
  url: PagesRoutes['Doc_Packages_intlayer_getTranslation'],
  githubUrl: GithubRoutes['Packages_intlayer_getTranslation'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-getTranslation-intlayer-metadata', locale),
});
