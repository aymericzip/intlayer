import { DocData } from '@components/DocPage/types';
import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesReactScriptsIntlayerData = (
  locale: Locales
): DocData => ({
  docName: 'package__react-scripts-intlayer',
  url: PagesRoutes['Doc_Packages_react-scripts-intlayer'],
  githubUrl: GithubRoutes['Packages_react-scripts-intlayer'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-react-scripts-intlayer-metadata', locale),
});
