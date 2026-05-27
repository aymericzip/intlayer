/** @jsxImportSource react */

import { BlogPageLayout } from '@components/BlogPage/BlogPageLayout';
import { DocHeader } from '@components/DocPage/DocHeader/DocHeader';
import { DocPageNavigation } from '@components/DocPage/DocPageNavigation/DocPageNavigation';
import { DocumentationRender } from '@components/DocPage/DocumentationRender';
import { CreativeWorkHeader } from '@structuredData/CreativeWorkHeader';
import type { LocalesValues } from 'intlayer';
import type { FC } from 'react';
import { WebsiteIslandWrapper } from './WebsiteIslandWrapper';

type BlogPageIslandProps = {
  locale: LocalesValues;
  slugs: string[];
  blogData: {
    title: string;
    description: string;
    keywords: string[];
    createdAt: string;
    updatedAt: string;
    url: string;
    docKey: string;
    slugs: string[];
    author?: string;
    history?: { date: string; version: string; changes: string }[];
  };
  blogContent: string;
  nextBlog?: { title: string; url: string };
  prevBlog?: { title: string; url: string };
};

export const BlogPageIsland: FC<BlogPageIslandProps> = ({
  locale,
  slugs,
  blogData,
  blogContent,
  nextBlog,
  prevBlog,
}) => (
  <WebsiteIslandWrapper locale={locale}>
    <BlogPageLayout activeSlugs={slugs} locale={locale}>
      <CreativeWorkHeader
        creativeWorkName={blogData.title}
        creativeWorkDescription={blogData.description}
        creativeWorkContent={blogContent}
        keywords={blogData.keywords.join(', ')}
        dateModified={new Date(blogData.updatedAt)}
        datePublished={new Date(blogData.createdAt)}
        url={blogData.url}
      />
      <DocHeader {...(blogData as any)} markdownContent={blogContent} />
      <DocumentationRender>{blogContent}</DocumentationRender>
      <DocPageNavigation nextDoc={nextBlog} prevDoc={prevBlog} />
    </BlogPageLayout>
  </WebsiteIslandWrapper>
);
