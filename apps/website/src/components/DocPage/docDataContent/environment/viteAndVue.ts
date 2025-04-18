import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';

export const getEnvironmentViteAndVueData = (locale: Locales): DocData => ({
  docName: 'intlayer_with_vite_vue',
  url: PagesRoutes.Doc_Environment_ViteAndVue,
  githubUrl: GithubRoutes.IntlayerWithViteVue,
  createdAt: new Date('2025-04-18'),
  updatedAt: new Date('2025-04-18'),
  ...getIntlayer('doc-intlayer-with-vite-vue-metadata', locale),
});
