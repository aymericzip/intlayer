import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getEnvironmentViteAndReactData = (locale: Locales): DocData => ({
  docName: 'intlayer_with_vite_react',
  url: PagesRoutes.Doc_Environment_ViteAndReact,
  githubUrl: GithubRoutes.IntlayerWithViteReact,
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-intlayer-with-vite-react-metadata', locale),
});
