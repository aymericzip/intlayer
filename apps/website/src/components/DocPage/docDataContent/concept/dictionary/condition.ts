import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getContentDeclarationConditionData = (
  locale: LocalesValues
): DocData => ({
  docName: 'dictionary__condition',
  url: PagesRoutes.Doc_Dictionary_Condition,
  githubUrl: GithubRoutes.Dictionary_Condition,
  createdAt: new Date('2025-02-7'),
  updatedAt: new Date('2025-02-7'),
  ...getIntlayer('doc-dictionary-condition-metadata', locale),
});
