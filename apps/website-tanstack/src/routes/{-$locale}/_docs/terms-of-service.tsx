import { Website_TermsOfService } from '@intlayer/design-system/routes';
import { getCreativeWorkHeader } from '@intlayer/design-system/structured-data';
import { createFileRoute } from '@tanstack/react-router';
import { CompositeComponent } from '@tanstack/react-start/rsc';
import { defaultLocale } from 'intlayer';
import { loadLegalPage } from '~/serverFunctions/legal';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';

export const Route = createFileRoute('/{-$locale}/_docs/terms-of-service')({
  ssr: true,
  loader: async ({ params }) => {
    const locale = params.locale ?? defaultLocale;
    return loadLegalPage({
      data: { locale, docKey: './legal/en/terms_of_service.md' },
    });
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { title, description, keywords } = loaderData;
    const path = Website_TermsOfService;
    const locale = defaultLocale;

    return {
      meta: [
        { title: String(title) },
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
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            getCreativeWorkHeader({
              locale,
              type: 'WebPage',
              creativeWorkName: String(title),
              creativeWorkDescription: String(description),
              creativeWorkContent: loaderData.file,
              keywords: Array.isArray(keywords)
                ? keywords.join(', ')
                : String(keywords || ''),
              dateModified: new Date(loaderData.updatedAt),
              datePublished: new Date(loaderData.createdAt),
            })
          ),
        },
      ],
    };
  },
  component: TermsOfServicePage,
});

function TermsOfServicePage() {
  const { contentSrc } = Route.useLoaderData();

  return (
    <div className="m-auto max-w-2xl">
      <CompositeComponent src={contentSrc} />
    </div>
  );
}
