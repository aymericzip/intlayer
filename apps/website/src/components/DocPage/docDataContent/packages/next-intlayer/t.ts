import { DocData } from '@components/DocPage/types';
import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesNextIntlayerTData = (locale: Locales): DocData => ({
  docName: 't_next-intlayer',
  url: PagesRoutes['Doc_Packages_next-intlayer_t'],
  githubUrl: GithubRoutes['Packages_next-intlayer_t'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-t-next-intlayer-metadata', locale),
});