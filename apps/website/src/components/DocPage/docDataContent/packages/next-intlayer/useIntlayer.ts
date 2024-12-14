import { DocData } from '@components/DocPage/types';
import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesNextIntlayerUseIntlayerData = (
  locale: Locales
): DocData => ({
  docName: 'package__next-intlayer__useIntlayer',
  url: PagesRoutes['Doc_Packages_next-intlayer_useIntlayer'],
  githubUrl: GithubRoutes['Packages_next-intlayer_useIntlayer'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-useIntlayer-next-intlayer-metadata', locale),
});
