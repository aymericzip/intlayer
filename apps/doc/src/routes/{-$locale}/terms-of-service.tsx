import { getLegal, getLegalMetadata } from '@intlayer/docs';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getLocalizedUrl,
  getMultilingualUrls,
  Locales,
} from 'intlayer';
import { DocumentationRender } from '#/components/DocPage/DocumentationRender';
import { PagesRoutes } from '#/Routes';

const TERMS_KEY = './legal/en/terms_of_service.md' as const;

export const Route = createFileRoute('/{-$locale}/terms-of-service')({
  loader: async ({ params }) => {
    const locale = ((params as { locale?: string }).locale ??
      defaultLocale) as string;
    const file = await getLegal(TERMS_KEY, locale as any);
    return { file, locale };
  },
  head: async ({ params }) => {
    const locale = ((params as { locale?: string }).locale ??
      defaultLocale) as any;
    const { title, description, keywords } = await getLegalMetadata(
      TERMS_KEY,
      locale
    );
    const path = PagesRoutes.TermsOfService;

    return {
      meta: [
        { title: `${title} | Intlayer` },
        { name: 'description', content: description as string },
        { name: 'keywords', content: (keywords as string[]).join(', ') },
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
