import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getPackagesIntlayerGetMultilingualUrlsData = (
  locale: LocalesValues
): DocData => ({
  docName: 'package__intlayer__getMultilingualUrls',
  url: PagesRoutes['Doc_Packages_intlayer_getMultilingualUrls'],
  githubUrl: GithubRoutes['Packages_intlayer_getMultilingualUrls'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-getMultilingualUrls-intlayer-metadata', locale),
});
