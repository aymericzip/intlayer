import { createServerFn } from '@tanstack/react-start';
import { parseMarkdown } from 'react-intlayer/markdown';
import { urlRenamer } from '~/utils/markdown';

export const loadFaqPage = createServerFn()
  .inputValidator((data: { locale: string; slugs: string[] }) => data)
  .handler(async ({ data: { locale, slugs } }) => {
    const { getFrequentQuestion, getFrequentQuestionMetadataBySlug } =
      await import('@intlayer/docs');

    const faqsData = await getFrequentQuestionMetadataBySlug(slugs, locale);
    const exactMatch =
      faqsData.find((faq) => faq.slugs.join('/') === slugs.join('/')) ?? null;

    if (!exactMatch) return { exactMatch: null, faqsData, content: null };

    const file = await getFrequentQuestion(exactMatch.docKey as any, locale);
    const blogContent = urlRenamer(file, locale);
    const blogParsed = parseMarkdown(blogContent);

    return {
      exactMatch,
      faqsData,
      content: { blogContent, blogParsed },
    };
  });

export const loadFaqIndex = createServerFn()
  .inputValidator((data: { locale: string }) => data)
  .handler(async ({ data: { locale } }) => {
    const { getFrequentQuestionMetadataRecord } = await import(
      '@intlayer/docs'
    );
    return getFrequentQuestionMetadataRecord(locale);
  });
