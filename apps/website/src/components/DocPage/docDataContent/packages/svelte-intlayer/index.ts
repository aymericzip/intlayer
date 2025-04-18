import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getPackagesSvelteIntlayerData = (
  locale: LocalesValues
): DocData => ({
  docName: 'package__svelte-intlayer',
  url: PagesRoutes['Doc_Packages_svelte-intlayer'],
  githubUrl: GithubRoutes['Packages_svelte-intlayer'],
  createdAt: new Date('2025-04-18'),
  updatedAt: new Date('2025-04-18'),
  ...getIntlayer('doc-svelte-intlayer-metadata', locale),
});
