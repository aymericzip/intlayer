import {
  App_Dashboard,
  App_Dashboard_Organization,
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
import { useIntlayer } from 'react-intlayer';
import { DashboardContentLayout } from '#components/Dashboard/DashboardContentLayout';
import { OrganizationForm } from '#components/Dashboard/OrganizationForm';

export const Route = createFileRoute('/{-$locale}/_dashboard/organization')({
  component: OrganizationPage,
  head: ({ params }) => {
    const { locale } = params;
    const path = App_Dashboard_Organization;
    const content = getIntlayer('organization-dashboard-page', locale);

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
          children: JSON.stringify(
            buildBreadcrumbsJsonLd({
              breadcrumbs: [
                {
                  name: 'Dashboard',
                  url: getLocalizedUrl(App_Dashboard, locale),
                },
                {
                  name: 'Organization',
                  url: getLocalizedUrl(App_Dashboard_Organization, locale),
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

function OrganizationPage() {
  const { title } = useIntlayer('organization-dashboard-page');
  const { locale } = Route.useParams();

  return (
    <DashboardContentLayout title={title}>
      <div className="flex w-full flex-1 flex-col items-center justify-center p-10">
        <OrganizationForm />
      </div>
    </DashboardContentLayout>
  );
}
