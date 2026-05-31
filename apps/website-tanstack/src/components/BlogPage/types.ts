import type { BlogMetadata } from '@intlayer/docs';

export type Section = Record<string, CategorizedBlogData>;

export type CategorizedBlogData = {
  title: string;
  default?: BlogMetadata;
  subSections?: Section;
};
