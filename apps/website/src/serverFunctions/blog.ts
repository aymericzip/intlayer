import { createServerFn } from '@tanstack/react-start';
import { staticFunctionMiddleware } from '@tanstack/start-static-server-functions';
import { parseMarkdown } from 'react-intlayer/markdown';
import {
  getBlogData,
  getPreviousNextBlogData,
} from '~/components/BlogPage/blogData';
import { urlRenamer } from '~/utils/markdown';

export const loadBlogPage = createServerFn()
  .validator((data: { locale: string; slugs: string[] }) => data)
  .middleware([staticFunctionMiddleware])
  .handler(async ({ data: { locale, slugs } }) => {
    const { getBlog, getBlogMetadataBySlug, getAuthor } = await import(
      '@intlayer/docs'
    );

    const blogsData = await getBlogMetadataBySlug(
      ['blog', ...slugs],
      locale,
      true
    );
    const exactMatch =
      blogsData.find(
        (blog) => blog.slugs.join('/') === ['blog', ...slugs].join('/')
      ) ?? null;

    if (!exactMatch) return { exactMatch: null, blogsData, content: null };

    const { highlightMarkdownCodeBlocks } = await import(
      '~/utils/highlightMarkdown'
    );

    const file = await getBlog(exactMatch.docKey as any, locale);
    const blogContent = urlRenamer(file, locale);
    const blogParsed = parseMarkdown(blogContent);

    // Highlighting here rather than in the browser keeps Shiki's WASM engine
    // and grammars off the critical path of every article.
    const codeStyleSheet = await highlightMarkdownCodeBlocks(blogParsed);

    const { prevBlogData, nextBlogData } = getPreviousNextBlogData(
      exactMatch.docKey as any,
      locale
    );

    const exactMatchWithAuthor = {
      ...exactMatch,
      author: exactMatch.author ? getAuthor(exactMatch.author) : undefined,
    };

    return {
      exactMatch: exactMatchWithAuthor,
      blogsData,
      content: { blogParsed, codeStyleSheet, prevBlogData, nextBlogData },
    };
  });

export const loadBlogRaw = createServerFn()
  .validator((data: { locale: string; slugs: string[] }) => data)
  // .middleware([staticFunctionMiddleware])
  .handler(async ({ data: { locale, slugs } }) => {
    const { getBlog, getBlogMetadataBySlug } = await import('@intlayer/docs');

    const blogsData = await getBlogMetadataBySlug(
      ['blog', ...slugs],
      locale,
      true
    );
    const exactMatch =
      blogsData.find(
        (blog) => blog.slugs.join('/') === ['blog', ...slugs].join('/')
      ) ?? null;

    if (!exactMatch) return null;

    const file = await getBlog(exactMatch.docKey as any, locale);
    return { file };
  });

export const loadBlogNavData = createServerFn()
  .validator((data: { locale: string }) => data)
  // .middleware([staticFunctionMiddleware])
  .handler(async ({ data: { locale } }) => {
    const { getAuthor } = await import('@intlayer/docs');
    const blogData = getBlogData(locale);

    const resolveAuthors = (data: any): any => {
      const resolved: any = {};
      for (const key of Object.keys(data)) {
        const value = data[key];
        if (!value) continue;

        resolved[key] = { ...value };
        if (value.default) {
          resolved[key].default = {
            ...value.default,
            author: value.default.author
              ? getAuthor(value.default.author)
              : undefined,
          };
        }
        if (value.subSections) {
          resolved[key].subSections = resolveAuthors(value.subSections);
        }
      }
      return resolved;
    };

    return resolveAuthors(blogData);
  });
