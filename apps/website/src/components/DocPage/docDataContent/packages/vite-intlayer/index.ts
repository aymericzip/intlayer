import { DocData } from '@components/DocPage/types';
import { Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesViteIntlayerData = (locale: Locales): DocData => ({
  docName: 'package__vite-intlayer',
  url: PagesRoutes['Doc_Packages_vite-intlayer'],
  githubUrl: GithubRoutes['Packages_vite-intlayer'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-vite-intlayer-metadata', locale),
});
