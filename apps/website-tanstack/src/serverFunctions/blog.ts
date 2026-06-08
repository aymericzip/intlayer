import { createServerFn } from '@tanstack/react-start';
import { parseMarkdown } from 'react-intlayer/markdown';
import {
  getBlogData,
  getPreviousNextBlogData,
} from '~/components/BlogPage/blogData';
import { urlRenamer } from '~/utils/markdown';

export const loadBlogPage = createServerFn()
  .inputValidator((data: { locale: string; slugs: string[] }) => data)
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

    if (!exactMatch) return { exactMatch: null, blogsData, content: null };

    const file = await getBlog(exactMatch.docKey as any, locale);
    const blogContent = urlRenamer(file, locale);
    const blogParsed = parseMarkdown(blogContent);

    const { prevBlogData, nextBlogData } = getPreviousNextBlogData(
      exactMatch.docKey as any,
      locale
    );

    return {
      exactMatch,
      blogsData,
      content: { blogContent, blogParsed, prevBlogData, nextBlogData },
    };
  });

export const loadBlogRaw = createServerFn()
  .inputValidator((data: { locale: string; slugs: string[] }) => data)
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
  .inputValidator((data: { locale: string }) => data)
  .handler(async ({ data: { locale } }) => getBlogData(locale));
