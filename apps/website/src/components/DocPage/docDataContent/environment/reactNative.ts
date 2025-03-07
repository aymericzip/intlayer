import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getEnvironmentReactNativeAndExpoData = (
  locale: Locales
): DocData => ({
  docName: 'intlayer_with_react_native_and_expo',
  url: PagesRoutes.Doc_Environment_ReactNativeAndExpo,
  githubUrl: GithubRoutes.IntlayerWithViteReact,
  createdAt: new Date('2025-03-07'),
  updatedAt: new Date('2025-03-07'),
  ...getIntlayer('doc-intlayer-with-react-native-expo-metadata', locale),
});
