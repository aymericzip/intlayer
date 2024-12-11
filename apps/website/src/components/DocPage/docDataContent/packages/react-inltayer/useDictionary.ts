import { DocData } from '@components/DocPage/types';
import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesReactIntlayerUseDictionaryData = (
  locale: Locales
): DocData => ({
  docName: 'useDictionary_react-intlayer',
  url: PagesRoutes['Doc_Packages_react-intlayer_useDictionary'],
  githubUrl: GithubRoutes['Packages_next-intlayer_useDictionary'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-useDictionary-react-intlayer-metadata', locale),
});
