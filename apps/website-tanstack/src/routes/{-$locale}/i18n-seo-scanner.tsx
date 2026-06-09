import { Website_Scanner } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayer } from 'intlayer';
import { Suspense } from 'react';
import { useIntlayer } from 'react-intlayer';
import { BackgroundLayout } from '~/components/BackgroundLayout';
import { LocalizationAnalyzer } from '~/components/ScannerPage';
import { PageLayout } from '~/layouts/PageLayout';
import { OrganizationHeader } from '~/structuredData/OrganizationHeader';
import { ScannerSoftwareApplicationHeader } from '~/structuredData/ScannerSoftwareApplicationHeader';
import { WebsiteHeader } from '~/structuredData/WebsiteHeader';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';

export const Route = createFileRoute('/{-$locale}/i18n-seo-scanner')({
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = Website_Scanner;
    const { title, description, keywords } = getIntlayer(
      'i18n-SEO-scanner',
      locale
    );

    return {
      title,
      meta: [
        { name: 'description', content: description },
        {
          name: 'keywords',
          content: Array.isArray(keywords)
            ? keywords.join(', ')
            : keywords || '',
        },
        { property: 'og:url', content: getAbsoluteUrl(path, locale) },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
      ],
      links: [
        { rel: 'canonical', href: getAbsoluteUrl(path, locale) },
        ...getHreflangLinks(path),
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
  return (
    <PageLayout>
      <WebsiteHeader />
      <OrganizationHeader />
      <ScannerSoftwareApplicationHeader />
      <AuditContent />
    </PageLayout>
  );
}
