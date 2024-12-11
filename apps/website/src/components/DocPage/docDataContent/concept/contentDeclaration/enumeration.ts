import { DocData } from '@components/DocPage/types';
import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getContentDeclarationEnumerationData = (
  locale: Locales
): DocData => ({
  docName: 'content_declaration__enumeration',
  url: PagesRoutes.Doc_ContentDeclaration_Enumeration,
  githubUrl: GithubRoutes.ContentDeclaration_Enumeration,
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-content-declaration-enumeration-metadata', locale),
});
