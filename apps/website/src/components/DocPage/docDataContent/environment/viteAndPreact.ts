import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';

export const getEnvironmentViteAndPreactData = (locale: Locales): DocData => ({
  docName: 'intlayer_with_vite_preact',
  url: PagesRoutes.Doc_Environment_ViteAndPreact,
  githubUrl: GithubRoutes.IntlayerWithVitePreact,
  createdAt: new Date('2025-04-18'),
  updatedAt: new Date('2025-04-18'),
  ...getIntlayer('doc-intlayer-with-vite-preact-metadata', locale),
});
