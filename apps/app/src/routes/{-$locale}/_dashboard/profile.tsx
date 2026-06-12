import {
  App_Dashboard,
  App_Dashboard_Profile,
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
import { ProfileForm } from '#components/Dashboard/ProfileForm';

export const Route = createFileRoute('/{-$locale}/_dashboard/profile')({
  component: ProfilePage,
  head: ({ params }) => {
    const { locale } = params;
    const content = getIntlayer('profile-dashboard-page', locale);

    return {
      links: [
        {
          rel: 'canonical',
          href: getLocalizedUrl(App_Dashboard_Profile, locale),
        },
        ...localeMap(({ locale: mapLocale }) => ({
          rel: 'alternate',
          hrefLang: mapLocale,
          href: getLocalizedUrl(App_Dashboard_Profile, mapLocale),
        })),
        {
          rel: 'alternate',
          hrefLang: 'x-default',
          href: getLocalizedUrl(App_Dashboard_Profile, defaultLocale),
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
                  name: 'Profile',
                  url: getLocalizedUrl(App_Dashboard_Profile, locale),
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

function ProfilePage() {
  const { title } = useIntlayer('profile-dashboard-page');
  const { locale } = Route.useParams();

  return (
    <DashboardContentLayout title={title}>
      <div className="flex w-full flex-1 flex-col items-center p-10">
        <ProfileForm />
      </div>
    </DashboardContentLayout>
  );
}
