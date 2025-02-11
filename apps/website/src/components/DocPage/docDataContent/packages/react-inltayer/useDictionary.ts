import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesReactIntlayerUseDictionaryData = (
  locale: Locales
): DocData => ({
  docName: 'package__react-intlayer__useDictionary',
  url: PagesRoutes['Doc_Packages_react-intlayer_useDictionary'],
  githubUrl: GithubRoutes['Packages_next-intlayer_useDictionary'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-useDictionary-react-intlayer-metadata', locale),
});
