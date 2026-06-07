import {
  App_Dashboard,
  App_Dashboard_Scanner,
  App_Dashboard_Scanner_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { Suspense } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
import { Website_Domain } from '@intlayer/design-system/routes';
import { AuthenticationBarrier } from '#components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { DashboardContentLayout } from '#components/Dashboard/DashboardContentLayout';
import { DashboardLocalizationScanner } from '#components/ScannerPage';

export const Route = createFileRoute('/{-$locale}/_dashboard/scanner')({
  component: ScannerPage,
  head: ({ params }) => {
    const { locale } = params;
    const path = App_Dashboard_Scanner;
    const content = getIntlayer('scanner-dashboard-page', locale);

    return {
      links: [
        { rel: 'canonical', href: getLocalizedUrl(path, locale) },
        ...localeMap(({ locale: mapLocale }) => ({
          rel: 'alternate',
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),
        {
          rel: 'alternate',
          hrefLang: 'x-default',
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: content.metadata.title },
        {
          name: 'description',
          content: content.metadata.description,
        },
        {
          name: 'keywords',
          content: content.metadata.keywords.join(', '),
        },
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Dashboard',
                item: `https://${Website_Domain}${getLocalizedUrl(App_Dashboard, locale)}`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Scanner',
                item: `https://${Website_Domain}${getLocalizedUrl(App_Dashboard_Scanner_Path, locale)}`,
              },
            ],
          }),
        },
      ],
    };
  },
});

function ScannerPage() {
  const { title } = useIntlayer('scanner-dashboard-page');
  const { locale } = useLocale();

  return (
    <AuthenticationBarrier accessRule="authenticated" locale={locale}>
      <DashboardContentLayout title={title}>
        <Suspense>
          <DashboardLocalizationScanner />
        </Suspense>
      </DashboardContentLayout>
    </AuthenticationBarrier>
  );
}
