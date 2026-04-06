import { Container } from '@intlayer/design-system/container';
import { H1 } from '@intlayer/design-system/headers';
import { Loader } from '@intlayer/design-system/loader';
import { Website_Blog_Search } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  getMultilingualUrls,
  Locales,
} from 'intlayer';
import { Suspense } from 'react';
import { useIntlayer } from 'react-intlayer';
import { BlogPageLayout } from '#/components/BlogPage/BlogPageLayout';
import { SearchView } from '#/components/DocPage/Search/SearchView';

export const Route = createFileRoute('/{-$locale}/blog/search')({
  head: ({ params }) => {
    const locale = ((params as { locale?: string }).locale ??
      defaultLocale) as any;
    const content = getIntlayer('blog-search-page', locale);
    const path = Website_Blog_Search;

    return {
      meta: [
        { title: `${content.title} | Intlayer` },
        { name: 'description', content: content.title as string },
      ],
      links: [
        { rel: 'canonical', href: getLocalizedUrl(path, locale) },
        ...Object.entries(getMultilingualUrls(path)).map(([lang, url]) => ({
          rel: 'alternate',
          hrefLang: lang,
          href: url as string,
        })),
        {
          rel: 'alternate',
          hrefLang: 'x-default',
          href: getLocalizedUrl(path, Locales.ENGLISH),
        },
      ],
    };
  },
  component: BlogSearchPage,
});

function BlogSearchPage() {
  const { title } = useIntlayer('blog-search-page');

  return (
    <BlogPageLayout displayAsideNavigation={false}>
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
