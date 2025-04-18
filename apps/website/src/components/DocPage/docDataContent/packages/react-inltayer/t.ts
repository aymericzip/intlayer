import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getPackagesReactIntlayerTData = (
  locale: LocalesValues
): DocData => ({
  docName: 'package__react-intlayer__t',
  url: PagesRoutes['Doc_Packages_react-intlayer_t'],
  githubUrl: GithubRoutes['Packages_react-intlayer_t'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-t-react-intlayer-metadata', locale),
});
