import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getContentDeclarationFunctionFetchingData = (
  locale: LocalesValues
): DocData => ({
  docName: 'dictionary__function_fetching',
  url: PagesRoutes.Doc_Dictionary_FunctionFetching,
  githubUrl: GithubRoutes.Dictionary_FunctionFetching,
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-dictionary-function-fetching-metadata', locale),
});
