import { PagesRoutes } from '@/Routes';
import { getPreviousNextBlogData } from '@components/BlogPage/blogData';
import { BlogRender } from '@components/BlogPage/BlogRender';
import { Link } from '@components/Link/Link';
import { Container } from '@intlayer/design-system';
import { BlogKey, getBlog, getBlogMetadataBySlug } from '@intlayer/docs';
import { CreativeWorkHeader } from '@structuredData/CreativeWorkHeader';
import { urlRenamer } from '@utils/markdown';
import { getLocalizedUrl } from 'intlayer';
import { ChevronLeft, ChevronRight, Edit } from 'lucide-react';
import { type LocalPromiseParams } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import { redirect } from 'next/navigation';
import type { FC } from 'react';
import type { BlogProps } from './layout';

const Contribution: FC<{ githubUrl: string }> = ({ githubUrl }) => {
  const { contribution } = useIntlayer('blog-page');

  return (
    <Container
      roundedSize="md"
      transparency="full"
      border={true}
      padding="lg"
      borderColor="neutral"
      className="text-neutral mx-10 flex flex-row gap-6 text-xs"
    >
      <Edit className="ml-3 mt-1 size-5" size={24} />
      <div className="flex flex-1 flex-col gap-2">
        <p>{contribution.text}</p>
        <Link
          href={githubUrl}
          label={contribution.buttonLabel.value}
          target="_blank"
          rel="noreferrer"
          color="text"
        >
          {contribution.button}
        </Link>
      </div>
    </Container>
  );
};

type BlogPageNavigationProps = {
  nextBlog?: {
    title: string;
    url: string;
  };
  prevBlog?: {
    title: string;
    url: string;
  };
};

const BlogPageNavigation: FC<BlogPageNavigationProps> = ({
  nextBlog,
  prevBlog,
}) => {
  const { goToNextSection, goToPreviousSection } = useIntlayer('blog-page');

  return (
    <div className="flex flex-row flex-wrap justify-between gap-3 text-sm px-10 mt-3">
      {prevBlog && (
        <Link
          href={prevBlog?.url}
          label={goToPreviousSection.label.value}
          color="text"
          className="mr-auto flex flex-row justify-start items-center break-words whitespace-normal gap-2 px-2 py-5 text-nowrap max-w-1/2 rounded-lg border-text border-1 h-auto flex-1"
        >
          <ChevronLeft className="size-5" />
          {prevBlog?.title}
        </Link>
      )}
      {nextBlog && (
        <Link
          href={nextBlog?.url}
          label={goToNextSection.label.value}
          color="text"
          className="ml-auto flex flex-row justify-end items-center break-words whitespace-normal gap-2 px-2 py-5 text-nowrap max-w-1/2 rounded-lg border-text border-1 h-auto flex-1"
        >
          {nextBlog?.title}
          <ChevronRight className="size-5" />
        </Link>
      )}
    </div>
  );
};

const BlogPage = async ({ params }: LocalPromiseParams<BlogProps>) => {
  const { locale, slugs } = await params;
  const blogsData = await getBlogMetadataBySlug(slugs, locale);

  const filteredBlogsData = blogsData.filter(
    (blog) => blog.slugs.length === slugs.length + 1
  );

  if (!filteredBlogsData || filteredBlogsData.length === 0) {
    return redirect(PagesRoutes.Blog);
  }

  const blogData = filteredBlogsData[0];

  const { prevBlogData, nextBlogData } = getPreviousNextBlogData(
    blogData.docKey as BlogKey,
    locale
  );

  const file = await getBlog(blogData?.docKey as BlogKey, locale);

  const blogContent = urlRenamer(file, locale);

  const nextBlog: BlogPageNavigationProps['nextBlog'] = nextBlogData?.blogs
    ? {
        title: nextBlogData.title,
        url: getLocalizedUrl(nextBlogData.blogs.relativeUrl, locale),
      }
    : undefined;
  const prevBlog: BlogPageNavigationProps['prevBlog'] = prevBlogData?.blogs
    ? {
        title: prevBlogData.title,
        url: getLocalizedUrl(prevBlogData.blogs.relativeUrl, locale),
      }
    : undefined;

  return (
    <IntlayerServerProvider locale={locale}>
      <CreativeWorkHeader
        creativeWorkName={blogData.title}
        creativeWorkDescription={blogData.description}
        creativeWorkContent={blogContent}
        keywords={blogData.keywords.join(', ')}
        dateModified={new Date(blogData.updatedAt)}
        datePublished={new Date(blogData.createdAt)}
        url={blogData.url}
      />
      <BlogRender>{blogContent}</BlogRender>
      <Contribution
        githubUrl={blogData.githubUrl.replace('/en/', `/${locale}/`)}
      />
      <BlogPageNavigation nextBlog={nextBlog} prevBlog={prevBlog} />
    </IntlayerServerProvider>
  );
};
export default BlogPage;
