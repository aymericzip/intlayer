import { Container } from '@intlayer/design-system/container';
import { H1 } from '@intlayer/design-system/headers';
import { Loader } from '@intlayer/design-system/loader';
import { Doc_Search_Path } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { Suspense } from 'react';
import { useIntlayer } from 'react-intlayer';
import { DocPageLayout } from '#/components/DocPage/DocPageLayout';
import { SearchView } from '#/components/DocPage/Search/SearchView';

export const Route = createFileRoute('/{-$locale}/search')({
  head: ({ params }) => {
    const { locale } = params;
    const path = Doc_Search_Path;
    const content = getIntlayer('doc-search-page', locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: 'canonical', href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: 'alternate',
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
        {
          rel: 'alternate',
          hrefLang: 'x-default',
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: `${content.title} | Intlayer` },
        { name: 'description', content: content.description },
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
