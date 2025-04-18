import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getContentDeclarationGetStatedData = (
  locale: LocalesValues
): DocData => ({
  docName: 'dictionary__get_started',
  url: PagesRoutes.Doc_ContentDeclaration,
  githubUrl: GithubRoutes.Dictionary_GetStarted,
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-dictionary-metadata', locale),
});
