import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getPackagesReactIntlayerUseDictionaryData = (
  locale: LocalesValues
): DocData => ({
  docName: 'package__react-intlayer__useDictionary',
  url: PagesRoutes['Doc_Packages_react-intlayer_useDictionary'],
  githubUrl: GithubRoutes['Packages_next-intlayer_useDictionary'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-useDictionary-react-intlayer-metadata', locale),
});
