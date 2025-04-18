import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getPackagesViteIntlayerData = (
  locale: LocalesValues
): DocData => ({
  docName: 'package__vite-intlayer',
  url: PagesRoutes['Doc_Packages_vite-intlayer'],
  githubUrl: GithubRoutes['Packages_vite-intlayer'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-vite-intlayer-metadata', locale),
});
