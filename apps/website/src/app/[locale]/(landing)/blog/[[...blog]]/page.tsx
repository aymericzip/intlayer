import {
  checkIfBlogPathExists,
  getBlogDataByPath,
  getPreviousNextBlogData,
} from '@components/BlogPage/blogData';
import { BlogRender } from '@components/BlogPage/BlogRender';
import { Link } from '@components/Link/Link';
import { getBlog } from '@intlayer/blog';
import { Container } from '@intlayer/design-system';
import { CreativeWorkHeader } from '@structuredData/CreativeWorkHeader';
import { urlRenamer } from '@utils/markdown';
import { getLocalizedUrl } from 'intlayer';
import { ChevronLeft, ChevronRight, Edit } from 'lucide-react';
import { redirect } from 'next/navigation';
import { type LocalPromiseParams, type LocalParams } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';
import type { BlogProps } from './layout';
import { PagesRoutes } from '@/Routes';

const Contribution: FC<{ githubUrl: string }> = ({ githubUrl }) => {
  const { contribution } = useIntlayer('blog-page');

  return (
    <Container
      roundedSize="md"
      transparency="full"
      border={true}
      padding="lg"
      borderColor="neutral"
      className="text-neutral dark:text-neutral-dark mx-10 flex flex-row gap-6 text-xs"
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
    <div className="flex flex-row flex-wrap justify-between gap-10 p-10 text-sm">
      {prevBlog && (
        <Link
          href={prevBlog?.url}
          label={goToPreviousSection.label.value}
          color="text"
          className="mr-auto flex flex-row items-center gap-2 text-nowrap"
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
          className="ml-auto flex flex-row items-center gap-2 text-nowrap"
        >
          {nextBlog?.title}
          <ChevronRight className="size-5" />
        </Link>
      )}
    </div>
  );
};

const BlogPage = async ({ params }: LocalPromiseParams<BlogProps>) => {
  const { locale, blog } = await params;
  const isBlogPathExists = checkIfBlogPathExists(blog);
  const blogPath = isBlogPathExists ? blog : [];
  const blogData = getBlogDataByPath(blogPath, locale);

  if (!blogData) {
    return redirect(PagesRoutes.Blog);
  }

  const { prevBlogData, nextBlogData } = getPreviousNextBlogData(
    blogData,
    locale
  );

  const file = getBlog(blogData?.blogName ?? '', locale);

  const blogContent = urlRenamer(file);

  const nextBlog: BlogPageNavigationProps['nextBlog'] = nextBlogData?.blogs
    ? {
        title: nextBlogData.title,
        url: getLocalizedUrl(nextBlogData.blogs.url, locale),
      }
    : undefined;
  const prevBlog: BlogPageNavigationProps['prevBlog'] = prevBlogData?.blogs
    ? {
        title: prevBlogData.title,
        url: getLocalizedUrl(prevBlogData.blogs.url, locale),
      }
    : undefined;

  return (
    <IntlayerServerProvider locale={locale}>
      <CreativeWorkHeader
        creativeWorkName={blogData.title}
        creativeWorkDescription={blogData.description}
        creativeWorkContent={blogContent}
        keywords={blogData.keywords.join(', ')}
        dateModified={blogData.updatedAt}
        datePublished={blogData.createdAt}
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
