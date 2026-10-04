import type { AuthorProfile, BlogMetadata } from '@intlayer/docs';

/** Blog metadata as served to the page: the author handle resolved to a profile. */
export type BlogNavMetadata = Omit<BlogMetadata, 'author'> & {
  author?: AuthorProfile;
};

export type Section<
  Metadata extends BlogNavMetadata | BlogMetadata = BlogMetadata,
> = Record<string, CategorizedBlogData<Metadata>>;

export type CategorizedBlogData<
  Metadata extends BlogNavMetadata | BlogMetadata = BlogMetadata,
> = {
  title: string;
  default?: Metadata;
  subSections?: Section<Metadata>;
  /** Framework keys this section applies to. If absent, always visible. */
  frameworks?: string[];
};
