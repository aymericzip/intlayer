import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';

export const getPackagesPreactIntlayerData = (locale: Locales): DocData => ({
  docName: 'package__preact-intlayer',
  url: PagesRoutes['Doc_Packages_preact-intlayer'],
  githubUrl: GithubRoutes['Packages_preact-intlayer'],
  createdAt: new Date('2025-04-18'),
  updatedAt: new Date('2025-04-18'),
  ...getIntlayer('doc-preact-intlayer-metadata', locale),
});
