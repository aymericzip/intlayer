import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getEnvironmentLynxAndReactData = (locale: Locales): DocData => ({
  docName: 'intlayer_with_lynx_react',
  url: PagesRoutes.Doc_Environment_Lynx,
  githubUrl: GithubRoutes.IntlayerWithLynxReact,
  createdAt: new Date('2025-03-09'),
  updatedAt: new Date('2025-03-09'),
  ...getIntlayer('doc-intlayer-with-lynx-and-react-metadata', locale),
});
