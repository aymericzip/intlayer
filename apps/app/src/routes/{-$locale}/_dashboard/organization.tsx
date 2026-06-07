import {
  App_Dashboard,
  App_Dashboard_Organization,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { Website_Domain } from '@intlayer/design-system/routes';
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
                name: 'Organization',
                item: `https://${Website_Domain}${getLocalizedUrl(App_Dashboard_Organization, locale)}`,
              },
            ],
          }),
        },
      ],
    };
  },
});

function OrganizationPage() {
  const { title } = useIntlayer('organization-dashboard-page');


  return (
    <DashboardContentLayout title={title}>
      <div className="flex w-full flex-1 flex-col items-center justify-center p-10">
        <OrganizationForm />
      </div>
    </DashboardContentLayout>
  );
}
