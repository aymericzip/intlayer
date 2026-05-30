import { Website_TermsOfService } from '@intlayer/design-system/routes';
import { getLegal, getLegalMetadata } from '@intlayer/docs';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getLocalizedUrl, localeMap } from 'intlayer';
import { parseMarkdown } from 'react-intlayer/markdown';
import { DocumentationRender } from '~/components/DocPage/DocumentationRender';
import { CreativeWorkHeader } from '~/structuredData/CreativeWorkHeader';

export const Route = createFileRoute('/{-$locale}/_docs/terms-of-service')({
  loader: async ({ params }) => {
    const locale = params.locale ?? defaultLocale;
    const file = await getLegal('./legal/en/terms_of_service.md', locale);
    const { title, description, keywords, updatedAt, createdAt } =
      await getLegalMetadata('./legal/en/terms_of_service.md', locale);
    const fileParsed = parseMarkdown(file);

    return {
      locale,
      file,
      fileParsed,
      title,
      description,
      keywords,
      updatedAt,
      createdAt,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { title, description, keywords, locale } = loaderData;
    const path = Website_TermsOfService;

    return {
      title: String(title),
      meta: [
        { name: 'description', content: String(description) },
        {
          name: 'keywords',
          content: Array.isArray(keywords)
            ? keywords.join(', ')
            : String(keywords || ''),
        },
        { property: 'og:url', content: getLocalizedUrl(path, locale) },
        { property: 'og:title', content: String(title) },
        { property: 'og:description', content: String(description) },
      ],
      links: [
        { rel: 'canonical', href: getLocalizedUrl(path, locale) },
        { rel: 'alternate', hrefLang: 'x-default', href: path },
        ...localeMap(({ locale: mapLocale }) => ({
          rel: 'alternate',
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),
      ],
    };
  },
  component: TermsOfServicePage,
});

function TermsOfServicePage() {
  const {
    file,
    fileParsed,
    title,
    description,
    keywords,
    updatedAt,
    createdAt,
  } = Route.useLoaderData();

  return (
    <>
      <CreativeWorkHeader
        type="WebPage"
        creativeWorkName={String(title)}
        creativeWorkDescription={String(description)}
        creativeWorkContent={file}
        keywords={
          Array.isArray(keywords) ? keywords.join(', ') : String(keywords || '')
        }
        dateModified={new Date(updatedAt)}
        datePublished={new Date(createdAt)}
      />
      <div className="m-auto max-w-2xl">
        <DocumentationRender>{fileParsed}</DocumentationRender>
      </div>
    </>
  );
}
