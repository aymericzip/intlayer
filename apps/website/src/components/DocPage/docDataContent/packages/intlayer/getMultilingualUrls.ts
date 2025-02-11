import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesIntlayerGetMultilingualUrlsData = (
  locale: Locales
): DocData => ({
  docName: 'package__intlayer__getMultilingualUrls',
  url: PagesRoutes['Doc_Packages_intlayer_getMultilingualUrls'],
  githubUrl: GithubRoutes['Packages_intlayer_getMultilingualUrls'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-getMultilingualUrls-intlayer-metadata', locale),
});
