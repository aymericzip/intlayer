import { createServerFn } from '@tanstack/react-start';
import { parseMarkdown } from 'react-intlayer/markdown';

export const loadLegalContent = createServerFn()
  .inputValidator((data: { locale: string; docKey: string }) => data)
  .handler(async ({ data: { locale, docKey } }) => {
    const { getLegal, getLegalMetadata } = await import('@intlayer/docs');

    const file = await getLegal(docKey as any, locale);
    const { title, description, keywords, updatedAt, createdAt } =
      await getLegalMetadata(docKey as any, locale);
    const fileParsed = parseMarkdown(file);

    return {
      file,
      fileParsed,
      title,
      description,
      keywords,
      updatedAt,
      createdAt,
    };
  });
