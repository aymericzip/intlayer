import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getPackagesLynxIntlayerData = (locale: Locales): DocData => ({
  docName: 'package__lynx-intlayer',
  url: PagesRoutes['Doc_Packages_lynx-intlayer'],
  githubUrl: GithubRoutes['Packages_lynx-intlayer'],
  createdAt: new Date('2025-03-13'),
  updatedAt: new Date('2025-03-13'),
  ...getIntlayer('doc-lynx-intlayer-metadata', locale),
});
