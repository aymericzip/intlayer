import { DocData } from '@components/DocPage/types';
import { Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesIntlayerGetLocalizedUrlData = (
  locale: Locales
): DocData => ({
  docName: 'package__intlayer__getLocalizedUrl',
  url: PagesRoutes['Doc_Packages_intlayer_getLocalizedUrl'],
  githubUrl: GithubRoutes['Packages_intlayer_getLocalizedUrl'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-getLocalizedUrl-intlayer-metadata', locale),
});
