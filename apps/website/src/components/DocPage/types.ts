import type { DocMetadata } from '@intlayer/docs';

export type Section = Record<string, CategorizedDocMetadata>;

export type CategorizedDocMetadata = {
  title: string;
  default?: DocMetadata;
  subSections?: Section;
};
