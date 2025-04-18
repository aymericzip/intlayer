import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getPackagesIntlayerGetLocaleNameData = (
  locale: LocalesValues
): DocData => ({
  docName: 'package__intlayer__getLocaleName',
  url: PagesRoutes['Doc_Packages_intlayer_getLocaleName'],
  githubUrl: GithubRoutes['Packages_intlayer_getLocaleName'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-getLocaleName-intlayer-metadata', locale),
});
