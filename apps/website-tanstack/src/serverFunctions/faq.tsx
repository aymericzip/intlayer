import { createServerFn } from '@tanstack/react-start';
import { createCompositeComponent } from '@tanstack/react-start/rsc';
import type { FC } from 'react';
import { parseMarkdown } from 'react-intlayer/markdown';
import { DocumentationRenderServer } from '~/components/DocPage/DocumentationRenderServer';
import type { FrameworkKey } from '~/components/I18nBenchmark';
import { urlRenamer } from '~/utils/markdown';

export const loadFaqPage = createServerFn()
  .validator((data: { locale: string; slugs: string[] }) => data)
  .handler(async ({ data: { locale, slugs } }) => {
    const { getFrequentQuestion, getFrequentQuestionMetadataBySlug } =
      await import('@intlayer/docs');

    const fullSlugs = ['frequent-questions', ...slugs];
    const faqsData = await getFrequentQuestionMetadataBySlug(fullSlugs, locale);
    const exactMatch =
      faqsData.find((faq) => faq.slugs.join('/') === fullSlugs.join('/')) ??
      null;

    if (!exactMatch) return { exactMatch: null, faqsData, content: null };

    const file = await getFrequentQuestion(exactMatch.docKey as any, locale);
    const faqContent = urlRenamer(file, locale);
    const faqParsed = parseMarkdown(faqContent);

    const faqContentSrc = await createCompositeComponent(
      (props: {
        I18nBenchmarkComponent?: FC<{ framework?: FrameworkKey }>;
      }) => (
        <DocumentationRenderServer
          locale={locale as any}
          I18nBenchmarkSlot={props.I18nBenchmarkComponent}
        >
          {faqParsed}
        </DocumentationRenderServer>
      )
    );

    return {
      exactMatch,
      faqsData,
      content: { faqContent, faqContentSrc },
    };
  });

export const loadFaqRaw = createServerFn()
  .validator((data: { locale: string; slugs: string[] }) => data)
  .handler(async ({ data: { locale, slugs } }) => {
    const { getFrequentQuestion, getFrequentQuestionMetadataBySlug } =
      await import('@intlayer/docs');

    const fullSlugs = ['frequent-questions', ...slugs];
    const faqsData = await getFrequentQuestionMetadataBySlug(fullSlugs, locale);
    const exactMatch =
      faqsData.find((faq) => faq.slugs.join('/') === fullSlugs.join('/')) ??
      null;

    if (!exactMatch) return null;

    const file = await getFrequentQuestion(exactMatch.docKey as any, locale);
    return { file };
  });

export const loadFaqIndex = createServerFn()
  .validator((data: { locale: string }) => data)
  .handler(async ({ data: { locale } }) => {
    const { getFrequentQuestionMetadataRecord } = await import(
      '@intlayer/docs'
    );
    return getFrequentQuestionMetadataRecord(locale);
  });
