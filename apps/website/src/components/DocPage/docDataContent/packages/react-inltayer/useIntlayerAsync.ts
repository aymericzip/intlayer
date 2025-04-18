import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getPackagesReactIntlayerUseIntlayerAsyncData = (
  locale: LocalesValues
): DocData => ({
  docName: 'package__react-intlayer__useIntlayerAsync',
  url: PagesRoutes['Doc_Packages_react-intlayer_useIntlayerAsync'],
  githubUrl: GithubRoutes['Packages_react-intlayer_useIntlayerAsync'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-useIntlayerAsync-react-intlayer-metadata', locale),
});
