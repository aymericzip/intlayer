import { createServerFn } from '@tanstack/react-start';
import { createCompositeComponent } from '@tanstack/react-start/rsc';
import { parseMarkdown } from 'react-intlayer/markdown';
import { DocumentationRenderServer } from '~/components/DocPage/DocumentationRenderServer';
import { urlRenamer } from '~/utils/markdown';

/**
 * Loads the raw legal file plus metadata.
 * Used by both raw .md routes and the page route.
 */
export const loadLegalContent = createServerFn()
  .validator((data: { locale: string; docKey: string }) => data)
  .handler(async ({ data: { locale, docKey } }) => {
    const { getLegal, getLegalMetadata } = await import('@intlayer/docs');

    const file = await getLegal(docKey as any, locale);
    const { title, description, keywords, updatedAt, createdAt } =
      await getLegalMetadata(docKey as any, locale);

    return { file, title, description, keywords, updatedAt, createdAt };
  });

/**
 * Loads legal content pre-rendered as an RSC composite component.
 * Used by the page routes for SSR.
 */
export const loadLegalPage = createServerFn()
  .validator((data: { locale: string; docKey: string }) => data)
  .handler(async ({ data: { locale, docKey } }) => {
    const { getLegal, getLegalMetadata } = await import('@intlayer/docs');

    const file = await getLegal(docKey as any, locale);
    const { title, description, keywords, updatedAt, createdAt } =
      await getLegalMetadata(docKey as any, locale);

    const content = urlRenamer(file, locale);
    const contentParsed = parseMarkdown(content);

    const contentSrc = await createCompositeComponent(() => (
      <DocumentationRenderServer locale={locale as any}>
        {contentParsed}
      </DocumentationRenderServer>
    ));

    return { file, contentSrc, title, description, keywords, updatedAt, createdAt };
  });
