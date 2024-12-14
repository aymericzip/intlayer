import { DocData } from '@components/DocPage/types';
import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesReactIntlayerUseLocaleData = (
  locale: Locales
): DocData => ({
  docName: 'package__react-intlayer__useLocale',
  url: PagesRoutes['Doc_Packages_react-intlayer_useLocale'],
  githubUrl: GithubRoutes['Packages_react-intlayer_useLocale'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-useLocale-react-intlayer-metadata', locale),
});
