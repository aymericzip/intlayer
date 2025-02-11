import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesNextIntlayerData = (locale: Locales): DocData => ({
  docName: 'package__next-intlayer',
  url: PagesRoutes['Doc_Packages_next-intlayer'],
  githubUrl: GithubRoutes['Packages_next-intlayer'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-next-intlayer-metadata', locale),
});
