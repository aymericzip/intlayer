import type { DocData } from '@components/DocPage/types';
import { type Locales, getIntlayer } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getContentDeclarationNestingData = (locale: Locales): DocData => ({
  docName: 'dictionary__nesting',
  url: PagesRoutes.Doc_Dictionary_Nesting,
  githubUrl: GithubRoutes.Dictionary_Nesting,
  createdAt: new Date('2025-02-7'),
  updatedAt: new Date('2025-02-7'),
  ...getIntlayer('doc-dictionary-nesting-metadata', locale),
});
