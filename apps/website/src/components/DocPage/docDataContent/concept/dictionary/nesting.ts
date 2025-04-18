import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getContentDeclarationNestingData = (
  locale: LocalesValues
): DocData => ({
  docName: 'dictionary__nesting',
  url: PagesRoutes.Doc_Dictionary_Nesting,
  githubUrl: GithubRoutes.Dictionary_Nesting,
  createdAt: new Date('2025-02-7'),
  updatedAt: new Date('2025-02-7'),
  ...getIntlayer('doc-dictionary-nesting-metadata', locale),
});
