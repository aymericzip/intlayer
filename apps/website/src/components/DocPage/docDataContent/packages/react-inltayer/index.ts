import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getPackagesReactIntlayerData = (
  locale: LocalesValues
): DocData => ({
  docName: 'package__react-intlayer',
  url: PagesRoutes['Doc_Packages_react-intlayer'],
  githubUrl: GithubRoutes['Packages_react-intlayer'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-react-intlayer-metadata', locale),
});
