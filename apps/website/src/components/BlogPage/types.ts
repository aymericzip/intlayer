import { type BlogsKeys } from '@intlayer/blogs';
import { type PagesRoutes, type GithubRoutes } from '@/Routes';

export type BlogData = {
  blogName: BlogsKeys;
  url: PagesRoutes;
  githubUrl: GithubRoutes;
  title: string;
  description: string;
  keywords: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type Section = Record<string, CategorizedBlogData>;

export type CategorizedBlogData = {
  title: string;
  default?: BlogData;
  subSections?: Section;
};
