import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getPackagesNextIntlayerUseDictionaryData = (
  locale: LocalesValues
): DocData => ({
  docName: 'package__next-intlayer__useDictionary',
  url: PagesRoutes['Doc_Packages_next-intlayer_useDictionary'],
  githubUrl: GithubRoutes['Packages_next-intlayer_useDictionary'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-useDictionary-next-intlayer-metadata', locale),
});
