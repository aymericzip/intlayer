import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getPackagesIntlayerRemoveLocaleFromUrlData = (
  locale: LocalesValues
): DocData => ({
  docName: 'package__intlayer__removeLocaleFromUrl',
  url: PagesRoutes['Doc_Packages_intlayer_removeLocaleFromUrl'],
  githubUrl: GithubRoutes['Packages_intlayer_removeLocaleFromUrl'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-removeLocaleFromUrl-intlayer-metadata', locale),
});
