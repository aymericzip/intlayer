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
