import { DocData } from '@components/DocPage/types';
import { Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesNextIntlayerUseDictionaryData = (
  locale: Locales
): DocData => ({
  docName: 'package__next-intlayer__useDictionary',
  url: PagesRoutes['Doc_Packages_next-intlayer_useDictionary'],
  githubUrl: GithubRoutes['Packages_next-intlayer_useDictionary'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-useDictionary-next-intlayer-metadata', locale),
});
