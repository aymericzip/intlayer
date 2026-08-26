/**
 * Params shape expected by Next.js `generateStaticParams` for a route holding a
 * `[...slugs]` (or `[[...slugs]]`) catch-all segment.
 */
export type SlugsStaticParams = {
  slugs: string[];
};

/**
 * Keeps only the files exposed as their own page.
 *
 * A markdown file without `slugs` front matter — `readme.md`, or a page still
 * being drafted — resolves to the home page URL, which would otherwise
 * duplicate it in the sitemap.
 *
 * @param filesMetadata - Metadata of every file of a documentation section.
 * @returns The metadata of the files owning a dedicated URL.
 */
export const filterRoutableFiles = <
  FileMetadataType extends { slugs: string[] },
>(
  filesMetadata: FileMetadataType[]
): FileMetadataType[] =>
  filesMetadata.filter((fileMetadata) => fileMetadata.slugs.length > 0);

/**
 * Converts documentation file metadata into `generateStaticParams` entries for a
 * `[...slugs]` catch-all segment.
 *
 * File metadata carries the slugs of the full URL path — `['doc', 'concept',
 * 'content']` for `/doc/concept/content` — while the catch-all param only covers
 * the segments placed after the section root, here `['concept', 'content']`.
 * The leading section segment is therefore dropped, and entries left without any
 * segment are filtered out as they are served by the section index page.
 *
 * @param filesMetadata - Metadata of every file belonging to the section.
 * @returns One params object per prerenderable page.
 */
export const getSlugsStaticParams = <
  FileMetadataType extends { slugs: string[] },
>(
  filesMetadata: FileMetadataType[]
): SlugsStaticParams[] =>
  filesMetadata
    .map(({ slugs }) => ({ slugs: slugs.slice(1) }))
    .filter(({ slugs }) => slugs.length > 0);
