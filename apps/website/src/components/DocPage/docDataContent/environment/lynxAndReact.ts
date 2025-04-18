import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getEnvironmentLynxAndReactData = (
  locale: LocalesValues
): DocData => ({
  docName: 'intlayer_with_lynx_react',
  url: PagesRoutes.Doc_Environment_Lynx,
  githubUrl: GithubRoutes.IntlayerWithLynxReact,
  createdAt: new Date('2025-03-09'),
  updatedAt: new Date('2025-03-09'),
  ...getIntlayer('doc-intlayer-with-lynx-and-react-metadata', locale),
});
