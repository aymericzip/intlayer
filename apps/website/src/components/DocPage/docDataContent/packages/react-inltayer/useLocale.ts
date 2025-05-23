import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getPackagesReactIntlayerUseLocaleData = (
  locale: LocalesValues
): DocData => ({
  docName: 'package__react-intlayer__useLocale',
  url: PagesRoutes['Doc_Packages_react-intlayer_useLocale'],
  githubUrl: GithubRoutes['Packages_react-intlayer_useLocale'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-useLocale-react-intlayer-metadata', locale),
});
