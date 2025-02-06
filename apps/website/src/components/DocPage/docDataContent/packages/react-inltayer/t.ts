import { DocData } from '@components/DocPage/types';
import { Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesReactIntlayerTData = (locale: Locales): DocData => ({
  docName: 'package__react-intlayer__t',
  url: PagesRoutes['Doc_Packages_react-intlayer_t'],
  githubUrl: GithubRoutes['Packages_react-intlayer_t'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-t-react-intlayer-metadata', locale),
});
