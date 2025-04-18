import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';

export const getPackagesVueIntlayerData = (locale: Locales): DocData => ({
  docName: 'package__vue-intlayer',
  url: PagesRoutes['Doc_Packages_vue-intlayer'],
  githubUrl: GithubRoutes['Packages_vue-intlayer'],
  createdAt: new Date('2025-04-18'),
  updatedAt: new Date('2025-04-18'),
  ...getIntlayer('doc-vue-intlayer-metadata', locale),
});
