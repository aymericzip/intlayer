import {
  App_Dashboard,
  App_Dashboard_Organization,
  App_Dashboard_Organization_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { BreadcrumbsHeader } from '#/structuredData/BreadcrumbsHeader';
import { DashboardContentLayout } from '#components/Dashboard/DashboardContentLayout';
import { OrganizationForm } from '#components/Dashboard/OrganizationForm';

export const Route = createFileRoute('/{-$locale}/_dashboard/organization')({
  component: OrganizationPage,
  head: ({ params }) => {
    const { locale } = params;
    const path = App_Dashboard_Organization_Path;
    const content = getIntlayer('organization-dashboard-page', locale);

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
    };
  },
});

function OrganizationPage() {
  const { title } = useIntlayer('organization-dashboard-page');
  const { locale } = Route.useParams();

  return (
    <DashboardContentLayout title={title}>
      <BreadcrumbsHeader
        breadcrumbs={[
          {
            name: 'Dashboard',
            url: getLocalizedUrl(App_Dashboard, locale),
          },
          {
            name: 'Organization',
            url: getLocalizedUrl(App_Dashboard_Organization, locale),
          },
        ]}
      />
      <div className="flex w-full flex-1 flex-col items-center justify-center p-10">
        <OrganizationForm />
      </div>
    </DashboardContentLayout>
  );
}
