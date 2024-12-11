import { DocData } from '@components/DocPage/types';
import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getContentDeclarationGetStatedData = (
  locale: Locales
): DocData => ({
  docName: 'content_declaration__get_started',
  url: PagesRoutes.Doc_ContentDeclaration,
  githubUrl: GithubRoutes.ContentDeclaration_GetStarted,
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-content-declaration-metadata', locale),
});
