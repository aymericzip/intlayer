import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getPackagesVueIntlayerData = (locale: LocalesValues): DocData => ({
  docName: 'package__vue-intlayer',
  url: PagesRoutes['Doc_Packages_vue-intlayer'],
  githubUrl: GithubRoutes['Packages_vue-intlayer'],
  createdAt: new Date('2025-04-18'),
  updatedAt: new Date('2025-04-18'),
  ...getIntlayer('doc-vue-intlayer-metadata', locale),
});
