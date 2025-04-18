import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getPackagesNextIntlayerData = (
  locale: LocalesValues
): DocData => ({
  docName: 'package__next-intlayer',
  url: PagesRoutes['Doc_Packages_next-intlayer'],
  githubUrl: GithubRoutes['Packages_next-intlayer'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-next-intlayer-metadata', locale),
});
