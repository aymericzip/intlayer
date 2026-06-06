import { Website_PrivacyPolicy } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale } from 'intlayer';
import { DocumentationRender } from '~/components/DocPage/DocumentationRender';
import { loadLegalContent } from '~/serverFunctions/legal';
import { CreativeWorkHeader } from '~/structuredData/CreativeWorkHeader';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';

export const Route = createFileRoute('/{-$locale}/_docs/privacy-notice')({
  loader: async ({ params }) => {
    const locale = params.locale ?? defaultLocale;
    return loadLegalContent({
      data: { locale, docKey: './legal/en/privacy_notice.md' },
    });
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { title, description, keywords } = loaderData;
    const path = Website_PrivacyPolicy;
    const locale = defaultLocale;

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
        { property: 'og:url', content: getAbsoluteUrl(path, locale) },
        { property: 'og:title', content: String(title) },
        { property: 'og:description', content: String(description) },
      ],
      links: [
        { rel: 'canonical', href: getAbsoluteUrl(path, locale) },
        ...getHreflangLinks(path),
      ],
    };
  },
  component: PrivacyNoticePage,
});

function PrivacyNoticePage() {
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
