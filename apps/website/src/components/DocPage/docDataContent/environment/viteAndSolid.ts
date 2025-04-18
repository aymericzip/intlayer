import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getEnvironmentViteAndSolidData = (
  locale: LocalesValues
): DocData => ({
  docName: 'intlayer_with_vite_solid',
  url: PagesRoutes.Doc_Environment_ViteAndSolid,
  githubUrl: GithubRoutes.IntlayerWithViteSolid,
  createdAt: new Date('2025-04-18'),
  updatedAt: new Date('2025-04-18'),
  ...getIntlayer('doc-intlayer-with-vite-solid-metadata', locale),
});
