import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getEnvironmentAngularData = (locale: LocalesValues): DocData => ({
  docName: 'intlayer_with_angular',
  url: PagesRoutes.Doc_Environment_Angular,
  githubUrl: GithubRoutes.IntlayerWithAngular,
  createdAt: new Date('2025-04-18'),
  updatedAt: new Date('2025-04-18'),
  ...getIntlayer('doc-intlayer-with-angular-metadata', locale),
});
