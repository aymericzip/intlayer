import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getContentDeclarationGetStatedData = (
  locale: Locales
): DocData => ({
  docName: 'dictionary__get_started',
  url: PagesRoutes.Doc_ContentDeclaration,
  githubUrl: GithubRoutes.Dictionary_GetStarted,
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-dictionary-metadata', locale),
});
