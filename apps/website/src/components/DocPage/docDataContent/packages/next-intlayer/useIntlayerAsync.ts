import { DocData } from '@components/DocPage/types';
import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesNextIntlayerUseIntlayerAsyncData = (
  locale: Locales
): DocData => ({
  docName: 'package__next-intlayer__useIntlayerAsync',
  url: PagesRoutes['Doc_Packages_next-intlayer_useIntlayerAsync'],
  githubUrl: GithubRoutes['Packages_next-intlayer_useIntlayerAsync'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-useIntlayerAsync-next-intlayer-metadata', locale),
});
