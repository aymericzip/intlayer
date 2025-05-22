import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getContentDeclarationAutoFillData = (
  locale: LocalesValues
): DocData => ({
  docName: 'autoFill',
  url: PagesRoutes.Doc_Dictionary_AutoFill,
  githubUrl: GithubRoutes.Dictionary_AutoFill,
  createdAt: new Date('2024-08-11'),
  updatedAt: new Date('2024-08-11'),
  ...getIntlayer('doc-dictionary-auto-fill-metadata', locale),
});
