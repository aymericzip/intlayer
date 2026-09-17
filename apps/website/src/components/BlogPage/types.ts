import type { BlogMetadata } from '@intlayer/docs';

export type Section = Record<string, CategorizedBlogData>;

export type CategorizedBlogData = {
  title: string;
  default?: BlogMetadata;
  subSections?: Section;
  /** Framework keys this section applies to. If absent, always visible. */
  frameworks?: string[];
};
