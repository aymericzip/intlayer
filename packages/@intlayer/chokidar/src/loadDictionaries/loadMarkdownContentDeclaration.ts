import { readFile } from 'node:fs/promises';
import { basename } from 'node:path';
import { getMarkdownMetadata } from '@intlayer/core/markdown';
import type { Dictionary } from '@intlayer/types/dictionary';
import { MARKDOWN } from '@intlayer/types/nodeType';

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
  [key: string]: any;
};

export const loadMarkdownContentDeclaration = async (
  path: string
): Promise<Dictionary | undefined> => {
  try {
    const fileContent = await readFile(path, 'utf-8');
    const frontmatter = getMarkdownMetadata<MarkdownFrontmatter>(fileContent);

    // Derive key from filename (e.g. "my-doc.content.md" → "my-doc") if not in frontmatter
    const fileName = basename(path).replace(/\.content\.md$/, '');
    const key = frontmatter.key ?? fileName;

    if (!key) {
      console.error(
        `[intlayer] Missing key in markdown content declaration: ${path}`
      );
      return undefined;
    }

    const {
      key: _key,
      locale,
      title,
      description,
      tags,
      fill,
      importMode,
      location,
      priority,
      version,
    } = frontmatter;

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
      content: {
        nodeType: MARKDOWN,
        [MARKDOWN]: fileContent,
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
