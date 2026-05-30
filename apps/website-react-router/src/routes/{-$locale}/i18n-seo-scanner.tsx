import { Website_Scanner } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { Suspense } from 'react';
import { useIntlayer } from 'react-intlayer';
import { BackgroundLayout } from '~/components/BackgroundLayout';
import { LocalizationAnalyzer } from '~/components/ScannerPage';
import { PageLayout } from '~/layouts/PageLayout';
import { OrganizationHeader } from '~/structuredData/OrganizationHeader';
import { ScannerSoftwareApplicationHeader } from '~/structuredData/ScannerSoftwareApplicationHeader';
import { WebsiteHeader } from '~/structuredData/WebsiteHeader';

export const Route = createFileRoute('/{-$locale}/i18n-seo-scanner')({
  loader: ({ params }) => {
    const locale = params.locale ?? defaultLocale;
    return { locale };
  },
  head: ({ params }) => {
    const locale = params.locale ?? defaultLocale;
    const path = Website_Scanner;
    const { title, description, keywords } = getIntlayer(
      'i18n-SEO-scanner',
      locale
    );

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
  component: AuditPageRoute,
});

function AuditContent() {
  const { title, description } = useIntlayer('audit-page');

  return (
    <div className="relative flex size-full flex-1 flex-col">
      <BackgroundLayout />
      <main className="relative flex flex-1 flex-col items-center justify-center gap-16 px-4 pt-20 md:px-10">
        <h1 className="max-w-3xl text-center font-bold text-3xl text-text leading-tight sm:text-5xl md:text-5xl lg:text-5xl">
          {title}
        </h1>
        <p className="max-w-2xl text-neutral leading-relaxed">{description}</p>
        <Suspense>
          <LocalizationAnalyzer />
        </Suspense>
      </main>
    </div>
  );
}

function AuditPageRoute() {
  const { locale } = Route.useLoaderData();

  return (
    <PageLayout>
      <WebsiteHeader key={locale} />
      <OrganizationHeader />
      <ScannerSoftwareApplicationHeader />
      <AuditContent />
    </PageLayout>
  );
}
