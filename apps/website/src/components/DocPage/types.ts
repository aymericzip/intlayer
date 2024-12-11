import { type DocsKeys } from '@intlayer/docs';
import { type PagesRoutes, type GithubRoutes } from '@/Routes';

export type DocData = {
  docName: DocsKeys;
  url: PagesRoutes;
  githubUrl: GithubRoutes;
  title: string;
  description: string;
  keywords: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type Section = Record<string, CategorizedDocData>;

export type CategorizedDocData = {
  title: string;
  default?: DocData;
  subSections?: Section;
};
