import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';

export const getEnvironmentViteAndSvelteData = (locale: Locales): DocData => ({
  docName: 'intlayer_with_vite_svelte',
  url: PagesRoutes.Doc_Environment_ViteAndSvelte,
  githubUrl: GithubRoutes.IntlayerWithViteSvelte,
  createdAt: new Date('2025-04-18'),
  updatedAt: new Date('2025-04-18'),
  ...getIntlayer('doc-intlayer-with-vite-svelte-metadata', locale),
});
