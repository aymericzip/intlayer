import { DocData } from '@components/DocPage/types';
import { Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesNextIntlayerUseLocaleData = (
  locale: Locales
): DocData => ({
  docName: 'package__next-intlayer__useLocale',
  url: PagesRoutes['Doc_Packages_next-intlayer_useLocale'],
  githubUrl: GithubRoutes['Packages_next-intlayer_useLocale'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-useLocale-next-intlayer-metadata', locale),
});
