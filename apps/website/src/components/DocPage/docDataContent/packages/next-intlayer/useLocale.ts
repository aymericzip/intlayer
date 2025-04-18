import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getPackagesNextIntlayerUseLocaleData = (
  locale: LocalesValues
): DocData => ({
  docName: 'package__next-intlayer__useLocale',
  url: PagesRoutes['Doc_Packages_next-intlayer_useLocale'],
  githubUrl: GithubRoutes['Packages_next-intlayer_useLocale'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-useLocale-next-intlayer-metadata', locale),
});
