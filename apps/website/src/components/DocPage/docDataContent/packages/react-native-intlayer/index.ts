import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesReactNativeIntlayerData = (
  locale: Locales
): DocData => ({
  docName: 'package__react-native-intlayer',
  url: PagesRoutes['Doc_Packages_react-native-intlayer'],
  githubUrl: GithubRoutes['Packages_react-native-intlayer'],
  createdAt: new Date('2025-03-13'),
  updatedAt: new Date('2025-03-13'),
  ...getIntlayer('doc-react-native-intlayer-metadata', locale),
});
