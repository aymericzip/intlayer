import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesIntlayerGetLocaleNameData = (
  locale: Locales
): DocData => ({
  docName: 'package__intlayer__getLocaleName',
  url: PagesRoutes['Doc_Packages_intlayer_getLocaleName'],
  githubUrl: GithubRoutes['Packages_intlayer_getLocaleName'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-getLocaleName-intlayer-metadata', locale),
});
