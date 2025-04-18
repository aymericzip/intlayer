import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';

export const getPackagesAngularIntlayerData = (locale: Locales): DocData => ({
  docName: 'package__angular-intlayer',
  url: PagesRoutes['Doc_Packages_angular-intlayer'],
  githubUrl: GithubRoutes['Packages_angular-intlayer'],
  createdAt: new Date('2025-04-18'),
  updatedAt: new Date('2025-04-18'),
  ...getIntlayer('doc-angular-intlayer-metadata', locale),
});
