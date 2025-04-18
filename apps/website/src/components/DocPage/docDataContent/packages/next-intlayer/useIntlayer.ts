import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getPackagesNextIntlayerUseIntlayerData = (
  locale: LocalesValues
): DocData => ({
  docName: 'package__next-intlayer__useIntlayer',
  url: PagesRoutes['Doc_Packages_next-intlayer_useIntlayer'],
  githubUrl: GithubRoutes['Packages_next-intlayer_useIntlayer'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-useIntlayer-next-intlayer-metadata', locale),
});
