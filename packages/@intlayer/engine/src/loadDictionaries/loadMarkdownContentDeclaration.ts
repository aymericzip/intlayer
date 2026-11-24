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
  item?: number;
  variant?: Dictionary['variant'];
  [key: string]: any;
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
