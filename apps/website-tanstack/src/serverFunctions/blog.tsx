import { createServerFn } from '@tanstack/react-start';
import { createCompositeComponent } from '@tanstack/react-start/rsc';
import type { FC } from 'react';
import { parseMarkdown } from 'react-intlayer/markdown';
import {
  getBlogData,
  getPreviousNextBlogData,
} from '~/components/BlogPage/blogData';
import { DocumentationRenderServer } from '~/components/DocPage/DocumentationRenderServer';
import type { FrameworkKey } from '~/components/I18nBenchmark';
import { urlRenamer } from '~/utils/markdown';

export const loadBlogPage = createServerFn()
  .validator((data: { locale: string; slugs: string[] }) => data)
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

    const blogContentSrc = await createCompositeComponent(
      (props: {
        I18nBenchmarkComponent?: FC<{ framework?: FrameworkKey }>;
      }) => (
        <DocumentationRenderServer
          locale={locale as any}
          I18nBenchmarkSlot={props.I18nBenchmarkComponent}
        >
          {blogParsed}
        </DocumentationRenderServer>
      )
    );

    return {
      exactMatch,
      blogsData,
      content: { blogContent, blogContentSrc, prevBlogData, nextBlogData },
    };
  });

export const loadBlogRaw = createServerFn()
  .validator((data: { locale: string; slugs: string[] }) => data)
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
  .handler(async ({ data: { locale } }) => getBlogData(locale));
