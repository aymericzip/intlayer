import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getPackagesNextIntlayerUseIntlayerAsyncData = (
  locale: LocalesValues
): DocData => ({
  docName: 'package__next-intlayer__useIntlayerAsync',
  url: PagesRoutes['Doc_Packages_next-intlayer_useIntlayerAsync'],
  githubUrl: GithubRoutes['Packages_next-intlayer_useIntlayerAsync'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-useIntlayerAsync-next-intlayer-metadata', locale),
});
