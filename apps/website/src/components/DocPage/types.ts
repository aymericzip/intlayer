import { type GithubRoutes, type PagesRoutes } from '@/Routes';
import { type DocsKeys } from '@intlayer/docs';
import { IntlayerNode } from 'next-intlayer';

export type DocData = {
  docName: DocsKeys;
  url: PagesRoutes;
  githubUrl: GithubRoutes;
  title: IntlayerNode | string;
  description: IntlayerNode | string;
  keywords: (IntlayerNode | string)[];
  createdAt: Date;
  updatedAt: Date;
};

export type Section = Record<string, CategorizedDocData>;

export type CategorizedDocData = {
  title: IntlayerNode | string;
  default?: DocData;
  subSections?: Section;
};
