import { createServerFn } from '@tanstack/react-start';
import { staticFunctionMiddleware } from '@tanstack/start-static-server-functions';
import { parseMarkdown } from 'react-intlayer/markdown';
import { urlRenamer } from '~/utils/markdown';

export const loadFaqPage = createServerFn()
  .validator((data: { locale: string; slugs: string[] }) => data)
  .middleware([staticFunctionMiddleware])
  .handler(async ({ data: { locale, slugs } }) => {
    const {
      getFrequentQuestion,
      getFrequentQuestionMetadataBySlug,
      getAuthor,
    } = await import('@intlayer/docs');

    const fullSlugs = ['frequent-questions', ...slugs];
    const faqsData = await getFrequentQuestionMetadataBySlug(fullSlugs, locale);
    const exactMatch =
      faqsData.find((faq) => faq.slugs.join('/') === fullSlugs.join('/')) ??
      null;

    if (!exactMatch) return { exactMatch: null, faqsData, content: null };

    const file = await getFrequentQuestion(exactMatch.docKey as any, locale);
    const { highlightMarkdownCodeBlocks } = await import(
      '~/utils/highlightMarkdown'
    );

    const blogContent = urlRenamer(file, locale);
    const blogParsed = parseMarkdown(blogContent);

    // Highlighting here rather than in the browser keeps Shiki's WASM engine
    // and grammars off the critical path of every question page.
    const codeStyleSheet = await highlightMarkdownCodeBlocks(blogParsed);

    const exactMatchWithAuthor = {
      ...exactMatch,
      author: exactMatch.author ? getAuthor(exactMatch.author) : undefined,
    };

    return {
      exactMatch: exactMatchWithAuthor,
      faqsData,
      content: { blogParsed, codeStyleSheet },
    };
  });

export const loadFaqRaw = createServerFn()
  .validator((data: { locale: string; slugs: string[] }) => data)
  // .middleware([staticFunctionMiddleware])
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
  // .middleware([staticFunctionMiddleware])
  .handler(async ({ data: { locale } }) => {
    const { getFrequentQuestionMetadataRecord } = await import(
      '@intlayer/docs'
    );
    return getFrequentQuestionMetadataRecord(locale);
  });
