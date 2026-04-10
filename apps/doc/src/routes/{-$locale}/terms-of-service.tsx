import { Website_TermsOfService } from '@intlayer/design-system/routes';
import { getLegal, getLegalMetadata } from '@intlayer/docs';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getLocalizedUrl, localeMap } from 'intlayer';
import { DocumentationRender } from '#/components/DocPage/DocumentationRender';

const TERMS_KEY = './legal/en/terms_of_service.md' as const;

export const Route = createFileRoute('/{-$locale}/terms-of-service')({
  loader: async ({ params }) => {
    const locale = ((params as { locale?: string }).locale ??
      defaultLocale) as string;
    const file = await getLegal(TERMS_KEY, locale);
    return { file, locale };
  },
  head: async ({ params }) => {
    const { locale } = params;
    const { title, description, keywords } = await getLegalMetadata(
      TERMS_KEY,
      locale
    );
    const path = Website_TermsOfService;

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
        { title: `${title} | Intlayer` },
        { name: 'description', content: description },
        { name: 'keywords', content: keywords.join(', ') },
      ],
    };
  },
  component: TermsOfServicePage,
});

function TermsOfServicePage() {
  const { file } = Route.useLoaderData();

  return (
    <div className="m-auto max-w-2xl px-4 py-10">
      <DocumentationRender>{file}</DocumentationRender>
    </div>
  );
}
