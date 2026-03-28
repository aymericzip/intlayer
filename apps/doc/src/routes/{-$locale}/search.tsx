import { Container, H1, Loader } from '@intlayer/design-system';
import { Doc_Search_Path } from '@intlayer/design-system/routes';
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
import { DocPageLayout } from '#/components/DocPage/DocPageLayout';
import { SearchView } from '#/components/DocPage/Search/SearchView';

export const Route = createFileRoute('/{-$locale}/search')({
  head: ({ params }) => {
    const locale = ((params as { locale?: string }).locale ??
      defaultLocale) as any;
    const content = getIntlayer('doc-search-page', locale);

    return {
      meta: [
        { title: `${content.title} | Intlayer` },
        { name: 'description', content: content.title as string },
      ],
      links: [
        {
          rel: 'canonical',
          href: getLocalizedUrl(Doc_Search_Path, locale),
        },
        ...Object.entries(getMultilingualUrls(Doc_Search_Path)).map(
          ([lang, url]) => ({
            rel: 'alternate',
            hrefLang: lang,
            href: url as string,
          })
        ),
        {
          rel: 'alternate',
          hrefLang: 'x-default',
          href: getLocalizedUrl(Doc_Search_Path, Locales.ENGLISH),
        },
      ],
    };
  },
  component: DocSearchPage,
});

function DocSearchPage() {
  const { title } = useIntlayer('doc-search-page');

  return (
    <DocPageLayout displayAsideNavigation={false}>
      <H1>{title}</H1>
      <div className="flex flex-1 flex-col items-baseline gap-10 p-10 md:mt-[10vh]">
        <Container className="mx-auto w-full max-w-4xl p-10" roundedSize="2xl">
          <Suspense fallback={<Loader />}>
            <SearchView />
          </Suspense>
        </Container>
      </div>
    </DocPageLayout>
  );
}
