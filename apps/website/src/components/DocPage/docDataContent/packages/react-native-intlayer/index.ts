import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getPackagesReactNativeIntlayerData = (
  locale: LocalesValues
): DocData => ({
  docName: 'package__react-native-intlayer',
  url: PagesRoutes['Doc_Packages_react-native-intlayer'],
  githubUrl: GithubRoutes['Packages_react-native-intlayer'],
  createdAt: new Date('2025-03-13'),
  updatedAt: new Date('2025-03-13'),
  ...getIntlayer('doc-react-native-intlayer-metadata', locale),
});
