import { type GithubRoutes, type PagesRoutes } from '@/Routes';
import { type BlogsKeys } from '@intlayer/docs';

export type BlogData = {
  docName: BlogsKeys;
  url: `${PagesRoutes}`;
  githubUrl: `${GithubRoutes}`;
  title: string;
  description: string;
  keywords: string[];
  createdAt: string;
  updatedAt: string;
};

export type Section = Record<string, CategorizedBlogData>;

export type CategorizedBlogData = {
  title: string;
  default?: BlogData;
  subSections?: Section;
};
