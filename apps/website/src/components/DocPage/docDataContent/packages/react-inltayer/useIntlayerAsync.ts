import { DocData } from '@components/DocPage/types';
import { Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesReactIntlayerUseIntlayerAsyncData = (
  locale: Locales
): DocData => ({
  docName: 'package__react-intlayer__useIntlayerAsync',
  url: PagesRoutes['Doc_Packages_react-intlayer_useIntlayerAsync'],
  githubUrl: GithubRoutes['Packages_react-intlayer_useIntlayerAsync'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-useIntlayerAsync-react-intlayer-metadata', locale),
});
