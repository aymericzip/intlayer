import { type GithubRoutes, type PagesRoutes } from '@/Routes';
import { type DocsKeys } from '@intlayer/docs';
import { IntlayerNode } from 'next-intlayer';

export type DocData = {
  docName: DocsKeys;
  url: `${PagesRoutes}` | PagesRoutes;
  githubUrl: `${GithubRoutes}` | GithubRoutes;
  title: IntlayerNode | string;
  description: IntlayerNode | string;
  keywords: (IntlayerNode | string)[];
  createdAt: string;
  updatedAt: string;
};

export type Section = Record<string, CategorizedDocData>;

export type CategorizedDocData = {
  title: IntlayerNode | string;
  default?: DocData;
  subSections?: Section;
};
