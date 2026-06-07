import { createServerFn } from '@tanstack/react-start';
import { createCompositeComponent } from '@tanstack/react-start/rsc';
import type { FC } from 'react';
import { parseMarkdown } from 'react-intlayer/markdown';
import { DocumentationRenderServer } from '~/components/DocPage/DocumentationRenderServer';
import {
  getDocData,
  getPreviousNextDocMetadata,
} from '~/components/DocPage/docData';
import type { FrameworkKey } from '~/components/I18nBenchmark';
import { urlRenamer } from '~/utils/markdown';

export const loadDocPage = createServerFn()
  .validator((data: { locale: string; slugs: string[] }) => data)
  .handler(async ({ data: { locale, slugs } }) => {
    const { getDoc, getDocMetadata, getDocMetadataBySlug } = await import(
      '@intlayer/docs'
    );

    const docsData = await getDocMetadataBySlug(
      ['doc', ...slugs],
      locale,
      true
    );
    const exactMatch =
      docsData.find(
        (doc) => doc.slugs.join('/') === ['doc', ...slugs].join('/')
      ) ?? null;

    if (!exactMatch) return { exactMatch: null, docsData, content: null };

    const defaultDocData = await getDocMetadata(exactMatch.docKey as any);
    const file = await getDoc(exactMatch.docKey as any, locale);
    const docContent = urlRenamer(file, locale);
    const docParsed = parseMarkdown(docContent);

    const { prevDocData, nextDocData } = getPreviousNextDocMetadata(
      exactMatch.docKey as any,
      locale
    );

    const docContentSrc = await createCompositeComponent(
      (props: {
        I18nBenchmarkComponent?: FC<{ framework?: FrameworkKey }>;
      }) => (
        <DocumentationRenderServer
          locale={locale as any}
          I18nBenchmarkSlot={props.I18nBenchmarkComponent}
        >
          {docParsed}
        </DocumentationRenderServer>
      )
    );

    return {
      exactMatch,
      docsData,
      content: {
        defaultDocData,
        docContent,
        docContentSrc,
        prevDocData,
        nextDocData,
      },
    };
  });

export const loadNavData = createServerFn()
  .validator((data: { locale: string }) => data)
  .handler(async ({ data: { locale } }) => getDocData(locale));

export const loadDocRaw = createServerFn()
  .validator((data: { locale: string; slugs: string[] }) => data)
  .handler(async ({ data: { locale, slugs } }) => {
    const { getDoc, getDocMetadata, getDocMetadataBySlug, getDocsKeys } =
      await import('@intlayer/docs');

    const normalizedSlugs = ['doc', ...slugs];
    let metadata = null as Awaited<ReturnType<typeof getDocMetadata>> | null;

    try {
      const matches = await getDocMetadataBySlug(normalizedSlugs, locale, true);
      if (matches?.length > 0) metadata = matches[0];
    } catch {}

    if (!metadata) {
      const pathFromSlugs = slugs.join('/');
      const potentialDocKey = `./docs/en/${pathFromSlugs}.md`;
      const docsKeys = getDocsKeys();

      if (docsKeys.includes(potentialDocKey as any)) {
        metadata = await getDocMetadata(potentialDocKey as any, locale);
      } else {
        const lowerPotentialKey = potentialDocKey.toLowerCase();
        const matchedKey = docsKeys.find(
          (key) => key.toLowerCase() === lowerPotentialKey
        );
        if (matchedKey) {
          metadata = await getDocMetadata(matchedKey as any, locale);
        }
      }
    }

    if (!metadata) return null;

    const file = await getDoc(metadata.docKey as any, locale);
    return { metadata, file };
  });
