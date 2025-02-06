import { DocData } from '@components/DocPage/types';
import { Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getContentDeclarationFunctionFetchingData = (
  locale: Locales
): DocData => ({
  docName: 'content_declaration__function_fetching',
  url: PagesRoutes.Doc_ContentDeclaration_FunctionFetching,
  githubUrl: GithubRoutes.ContentDeclaration_FunctionFetching,
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-content-declaration-function-fetching-metadata', locale),
});
