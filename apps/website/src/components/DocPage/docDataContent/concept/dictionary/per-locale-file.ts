import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getContentDeclarationPerLocaleFileData = (
  locale: LocalesValues
): DocData => ({
  docName: 'dictionary__per_locale_file',
  url: PagesRoutes.Doc_Dictionary_PerLocaleFile,
  githubUrl: GithubRoutes.Dictionary_PerLocaleFile,
  createdAt: new Date('2025-05-09'),
  updatedAt: new Date('2025-05-09'),
  ...getIntlayer('doc-dictionary-per-locale-file-metadata', locale),
});
