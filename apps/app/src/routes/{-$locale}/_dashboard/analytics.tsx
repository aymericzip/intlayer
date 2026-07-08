import {
  App_Dashboard,
  App_Dashboard_Analytics,
  App_Dashboard_Analytics_Path,
  Website_Domain,
} from '@intlayer/design-system/routes';
import { buildBreadcrumbsJsonLd } from '@intlayer/design-system/structured-data';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { useIntlayer, useLocale } from 'react-intlayer';
import { AuthenticationBarrier } from '#components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { DashboardContentLayout } from '#components/Dashboard/DashboardContentLayout';
import { DashboardAudience } from '#components/Dashboard/DashboardOverview/DashboardAudience';

export const Route = createFileRoute('/{-$locale}/_dashboard/analytics')({
  component: AnalyticsPage,
  head: ({ params }) => {
    const { locale } = params;
    const path = App_Dashboard_Analytics;
    const content = getIntlayer('analytics-dashboard-page', locale);
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
        { name: 'description', content: content.metadata.description },
        { name: 'keywords', content: content.metadata.keywords.join(', ') },
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            buildBreadcrumbsJsonLd({
              breadcrumbs: [
                {
                  name: 'Dashboard',
                  url: getLocalizedUrl(App_Dashboard, locale),
                },
                {
                  name: 'Analytics',
                  url: getLocalizedUrl(App_Dashboard_Analytics_Path, locale),
                },
              ],
              domain: Website_Domain,
            })
          ),
        },
      ],
    };
  },
});

function AnalyticsPage() {
  const { title } = useIntlayer('analytics-dashboard-page');
  const { locale } = useLocale();
  return (
    <AuthenticationBarrier accessRule="authenticated" locale={locale}>
      <DashboardContentLayout title={title}>
        <div className="flex min-h-0 flex-1 flex-col p-6">
          <DashboardAudience />
        </div>
      </DashboardContentLayout>
    </AuthenticationBarrier>
  );
}
