import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getEnvironmentNuxtAndVueData = (
  locale: LocalesValues
): DocData => ({
  docName: 'intlayer_with_nuxt',
  url: PagesRoutes.Doc_Environment_NuxtAndVue,
  githubUrl: GithubRoutes.IntlayerWithNuxtAndVue,
  createdAt: new Date('2025-06-18'),
  updatedAt: new Date('2025-06-18'),
  ...getIntlayer('doc-intlayer-with-nuxt-vue-metadata', locale),
});
