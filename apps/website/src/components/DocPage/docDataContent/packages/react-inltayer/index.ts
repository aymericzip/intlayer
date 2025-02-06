import { DocData } from '@components/DocPage/types';
import { Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesReactIntlayerData = (locale: Locales): DocData => ({
  docName: 'package__react-intlayer',
  url: PagesRoutes['Doc_Packages_react-intlayer'],
  githubUrl: GithubRoutes['Packages_react-intlayer'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-react-intlayer-metadata', locale),
});
