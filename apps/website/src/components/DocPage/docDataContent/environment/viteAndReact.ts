import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getEnvironmentViteAndReactData = (
  locale: LocalesValues
): DocData => ({
  docName: 'intlayer_with_vite_react',
  url: PagesRoutes.Doc_Environment_ViteAndReact,
  githubUrl: GithubRoutes.IntlayerWithViteReact,
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-intlayer-with-vite-react-metadata', locale),
});
