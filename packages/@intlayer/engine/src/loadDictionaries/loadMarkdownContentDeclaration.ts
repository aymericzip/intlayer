import { readFile } from 'node:fs/promises';
import { getMarkdownMetadata } from '@intlayer/core/markdown';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import { MARKDOWN } from '@intlayer/types/nodeType';
import { parseContentDeclarationFileName } from '../utils/parseContentDeclarationFileName';

type MarkdownFrontmatter = {
  key?: string;
  locale?: string;
  title?: string;
  description?: string;
  tags?: string[];
  fill?: any;
  importMode?: string;
  location?: string;
  priority?: number;
  version?: string;
  item?: Dictionary['item'];
  variant?: Dictionary['variant'];
  [key: string]: any;
};

/**
 * Frontmatter fields that configure the dictionary itself (identity, build and
 * sync behaviour) rather than describing its content, so they stay out of
 * `metadata`.
 */
const DICTIONARY_CONFIGURATION_FIELDS = [
  'key',
  'locale',
  'item',
  'variant',
  'fill',
  'importMode',
  'location',
  'priority',
  'version',
] as const satisfies ReadonlyArray<keyof Dictionary>;

/** A frontmatter field that configures the dictionary. */
type DictionaryConfigurationField =
  (typeof DICTIONARY_CONFIGURATION_FIELDS)[number];

const dictionaryConfigurationFieldSet: ReadonlySet<string> = new Set(
  DICTIONARY_CONFIGURATION_FIELDS
);

/** The fields of a frontmatter that end up in the dictionary `metadata`. */
export type FrontmatterMetadata<Frontmatter extends Record<string, unknown>> =
  Omit<Frontmatter, DictionaryConfigurationField>;

/**
 * Builds the dictionary `metadata` from a frontmatter: every field except the
 * dictionary configuration ones (`title`, `description` and `tags` are kept,
 * since they describe the content). Returns `undefined` when nothing remains.
 *
 * @param frontmatter - The parsed frontmatter of a `.content.md` file.
 */
export const getFrontmatterMetadata = <
  Frontmatter extends Record<string, unknown>,
>(
  frontmatter: Frontmatter
): FrontmatterMetadata<Frontmatter> | undefined => {
  const metadataEntries = Object.entries(frontmatter).filter(
    ([fieldName]) => !dictionaryConfigurationFieldSet.has(fieldName)
  );

  return metadataEntries.length > 0
    ? (Object.fromEntries(metadataEntries) as FrontmatterMetadata<Frontmatter>)
    : undefined;
};

export const loadMarkdownContentDeclaration = async (
  path: string,
  configuration: IntlayerConfig
): Promise<Dictionary | undefined> => {
  try {
    const fileContent = await readFile(path, 'utf-8');
    const frontmatter = getMarkdownMetadata<MarkdownFrontmatter>(fileContent);

    // Derive key and locale from the file name (e.g. "my-doc.fr.content.md" →
    // key "my-doc", locale "fr") for whatever the frontmatter does not declare
    const fileNameDeclaration = parseContentDeclarationFileName(
      path,
      configuration
    );
    const key = frontmatter.key ?? fileNameDeclaration.key;

    if (!key) {
      console.error(
        `[intlayer] Missing key in markdown content declaration: ${path}`
      );
      return undefined;
    }

    const {
      key: _key,
      locale: frontmatterLocale,
      title,
      description,
      tags,
      fill,
      importMode,
      location,
      priority,
      version,
      item,
      variant,
    } = frontmatter;

    const locale = frontmatterLocale ?? fileNameDeclaration.locale;

    const metadata = getFrontmatterMetadata(frontmatter);

    return {
      key,
      ...(locale !== undefined && { locale }),
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(tags !== undefined && { tags }),
      ...(fill !== undefined && { fill }),
      ...(importMode !== undefined && { importMode }),
      ...(location !== undefined && { location }),
      ...(priority !== undefined && { priority }),
      ...(version !== undefined && { version }),
      ...(item !== undefined && { item }),
      ...(variant !== undefined && { variant }),
      ...(metadata !== undefined && { metadata }),
      content: {
        nodeType: MARKDOWN,
        [MARKDOWN]: fileContent,
        metadata: frontmatter,
      },
    } as Dictionary;
  } catch (error) {
    console.error(
      `Error loading markdown content declaration at ${path}:`,
      error
    );
    return undefined;
  }
};
