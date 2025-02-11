import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesIntlayerRemoveLocaleFromUrlData = (
  locale: Locales
): DocData => ({
  docName: 'package__intlayer__removeLocaleFromUrl',
  url: PagesRoutes['Doc_Packages_intlayer_removeLocaleFromUrl'],
  githubUrl: GithubRoutes['Packages_intlayer_removeLocaleFromUrl'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-removeLocaleFromUrl-intlayer-metadata', locale),
});
