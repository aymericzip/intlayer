import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesReactIntlayerUseIntlayerData = (
  locale: Locales
): DocData => ({
  docName: 'package__react-intlayer__useIntlayer',
  url: PagesRoutes['Doc_Packages_react-intlayer_useIntlayer'],
  githubUrl: GithubRoutes['Packages_react-intlayer_useIntlayer'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-useIntlayer-react-intlayer-metadata', locale),
});
