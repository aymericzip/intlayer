import { Container } from '@intlayer/design-system/container';
import { H1 } from '@intlayer/design-system/headers';
import { Loader } from '@intlayer/design-system/loader';
import { Website_Blog_Search_Path } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayer } from 'intlayer';
import { Suspense } from 'react';
import { useIntlayer } from 'react-intlayer';
import { BlogPageLayout } from '~/components/BlogPage/BlogPageLayout';
import { SearchView } from '~/components/DocPage/Search/SearchView';
import { loadBlogNavData } from '~/serverFunctions/blog';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';

export const Route = createFileRoute('/{-$locale}/_docs/blog/search')({
  loader: async ({ params }) => {
    const locale = params.locale ?? defaultLocale;
    const navData = await loadBlogNavData({ data: { locale } });
    return { locale, navData };
  },
  head: ({ loaderData, params }) => {
    const locale = params.locale ?? defaultLocale;
    const path = Website_Blog_Search_Path;
    const { title } = getIntlayer('blog-search-page', locale);
    const pageTitle = `${title} | Intlayer`;

    return {
      meta: [
        { title: pageTitle },
        { name: 'description', content: String(title) },
        { property: 'og:url', content: getAbsoluteUrl(path, locale) },
        { property: 'og:title', content: pageTitle },
        { property: 'og:description', content: String(title) },
      ],
      links: [
        { rel: 'canonical', href: getAbsoluteUrl(path, locale) },
        ...getHreflangLinks(path),
      ],
    };
  },
  component: BlogSearchPage,
});

function BlogSearchPage() {
  const { locale, navData } = Route.useLoaderData();
  const { title } = useIntlayer('blog-search-page');

  return (
    <BlogPageLayout
      blogData={navData}
      locale={locale}
      displayAsideNavigation={false}
    >
      <H1 className="mt-10 font-bold text-4xl">{title}</H1>
      <div className="flex flex-1 flex-col items-baseline gap-10 p-10 md:mt-[10vh]">
        <Container className="mx-auto w-full max-w-4xl p-10" roundedSize="2xl">
          <Suspense fallback={<Loader />}>
            <SearchView />
          </Suspense>
        </Container>
      </div>
    </BlogPageLayout>
  );
}
