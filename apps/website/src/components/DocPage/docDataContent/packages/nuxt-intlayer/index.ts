import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getPackagesNuxtIntlayerData = (
  locale: LocalesValues
): DocData => ({
  docName: 'package__nuxt-intlayer',
  url: PagesRoutes['Doc_Packages_nuxt-intlayer'],
  githubUrl: GithubRoutes['Packages_nuxt-intlayer'],
  createdAt: new Date('2025-06-18'),
  updatedAt: new Date('2025-06-18'),
  ...getIntlayer('doc-nuxt-intlayer-metadata', locale),
});
