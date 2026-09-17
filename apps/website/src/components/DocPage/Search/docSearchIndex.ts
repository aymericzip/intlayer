import type { BlogMetadata, DocMetadata } from '@intlayer/docs';
import Fuse, { type IFuseOptions } from 'fuse.js';
import { getIntlayerAsync, type LocalesValues } from 'intlayer';

/** Fuse.js options shared by the search modal and the WebMCP search tool. */
export const docSearchFuseOptions: IFuseOptions<DocMetadata> = {
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'description', weight: 0.25 },
    { name: 'keywords', weight: 0.15 },
    { name: 'slugs', weight: 0.1 },
  ],
  threshold: 0.3, // Defines how fuzzy the matching should be (lower is more strict)
  includeScore: true,
  minMatchCharLength: 2,
};

/** Drops metadata entries that cannot be rendered nor linked. */
export const isValidDoc = (doc: DocMetadata): boolean => {
  try {
    if (!doc) return false;

    if (typeof doc.title !== 'string') {
      console.debug('Skipping doc without valid title:', doc.docKey);
      return false;
    }

    if (doc.description && typeof doc.description !== 'string') {
      console.debug('Skipping doc without valid description:', doc.docKey);
      return false;
    }

    if (typeof doc.url !== 'string') {
      console.debug('Skipping doc without valid url:', doc.docKey);
      return false;
    }

    return true;
  } catch (error) {
    console.debug('Error validating doc:', error);
    return false;
  }
};

/** Every searchable page (docs, blog posts, FAQ) for a locale. */
export const getSearchableDocs = async (
  locale: LocalesValues
): Promise<DocMetadata[]> => {
  const [docMetadata, blogMetadata, frequentQuestionMetadata] =
    await Promise.all([
      getIntlayerAsync('doc-metadata', locale) as Promise<DocMetadata[]>,
      getIntlayerAsync('blog-metadata', locale) as Promise<BlogMetadata[]>,
      getIntlayerAsync('frequent-question-metadata', locale) as Promise<
        DocMetadata[]
      >,
    ]);

  return [...docMetadata, ...blogMetadata, ...frequentQuestionMetadata].filter(
    isValidDoc
  );
};

/** Builds the fuzzy index over {@link getSearchableDocs}. */
export const createDocSearchIndex = (docs: DocMetadata[]): Fuse<DocMetadata> =>
  new Fuse(docs, docSearchFuseOptions);
