import type { DocMetadata } from '@intlayer/docs';

export type Section = Record<string, CategorizedDocMetadata>;

export type CategorizedDocMetadata = {
  title: string;
  default?: DocMetadata;
  subSections?: Section;
  /** Framework keys this section applies to. If absent, always visible. */
  frameworks?: string[];
  /**
   * Whether the section's accordion is expanded (unrolled) by default.
   * Defaults to `true`. Set to `false` to render the section collapsed (rolled).
   */
  deployed?: boolean;
};

/**
 * The only metadata the navigation and the breadcrumb read off a document.
 *
 * `DocMetadata` also carries the description, keywords, revision history and
 * GitHub locations of every page — hundreds of entries' worth on a tree that
 * ships with each documentation page, none of which the sidebar renders.
 */
export type NavDocMetadata = Pick<DocMetadata, 'slugs' | 'relativeUrl' | 'url'>;

/** Navigation tree: the shape of {@link Section} reduced to what it renders. */
export type NavSection = Record<string, NavCategorizedDoc>;

export type NavCategorizedDoc = Omit<
  CategorizedDocMetadata,
  'default' | 'subSections'
> & {
  default?: NavDocMetadata;
  subSections?: NavSection;
};
