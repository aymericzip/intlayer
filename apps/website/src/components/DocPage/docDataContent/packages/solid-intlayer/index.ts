import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';

export const getPackagesSolidIntlayerData = (locale: Locales): DocData => ({
  docName: 'package__solid-intlayer',
  url: PagesRoutes['Doc_Packages_solid-intlayer'],
  githubUrl: GithubRoutes['Packages_solid-intlayer'],
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-solid-intlayer-metadata', locale),
});
