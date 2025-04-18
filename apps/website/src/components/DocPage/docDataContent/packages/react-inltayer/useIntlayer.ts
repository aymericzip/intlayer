import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getPackagesReactIntlayerUseIntlayerData = (
  locale: LocalesValues
): DocData => ({
  docName: 'package__react-intlayer__useIntlayer',
  url: PagesRoutes['Doc_Packages_react-intlayer_useIntlayer'],
  githubUrl: GithubRoutes['Packages_react-intlayer_useIntlayer'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-useIntlayer-react-intlayer-metadata', locale),
});
