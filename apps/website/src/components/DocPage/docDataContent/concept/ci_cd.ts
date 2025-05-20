import { GithubRoutes, PagesRoutes } from '@/Routes';
import type { DocData } from '@components/DocPage/types';
import { getIntlayer, LocalesValues } from 'intlayer';

export const getCI_CDData = (locale: LocalesValues): DocData => ({
  docName: 'ci_cd',
  url: PagesRoutes.Doc_CI_CD,
  githubUrl: GithubRoutes.Doc_CI_CD,
  createdAt: new Date('2025-05-20'),
  updatedAt: new Date('2025-05-20'),
  ...getIntlayer('doc-ci-cd-metadata', locale),
});
