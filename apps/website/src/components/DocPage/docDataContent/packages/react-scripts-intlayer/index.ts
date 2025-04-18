import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getPackagesReactScriptsIntlayerData = (
  locale: LocalesValues
): DocData => ({
  docName: 'package__react-scripts-intlayer',
  url: PagesRoutes['Doc_Packages_react-scripts-intlayer'],
  githubUrl: GithubRoutes['Packages_react-scripts-intlayer'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-react-scripts-intlayer-metadata', locale),
});
