import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesIntlayerData = (locale: Locales): DocData => ({
  docName: 'package__intlayer',
  url: PagesRoutes['Doc_Packages_intlayer'],
  githubUrl: GithubRoutes['Packages_intlayer'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-intlayer-metadata', locale),
});
