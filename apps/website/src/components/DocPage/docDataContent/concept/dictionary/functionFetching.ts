import { DocData } from '@components/DocPage/types';
import { Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getContentDeclarationFunctionFetchingData = (
  locale: Locales
): DocData => ({
  docName: 'dictionary__function_fetching',
  url: PagesRoutes.Doc_Dictionary_FunctionFetching,
  githubUrl: GithubRoutes.Dictionary_FunctionFetching,
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-dictionary-function-fetching-metadata', locale),
});
