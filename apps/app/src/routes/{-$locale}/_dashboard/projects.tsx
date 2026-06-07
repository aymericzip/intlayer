import {
  App_Dashboard,
  App_Dashboard_Organization_Path,
  App_Dashboard_Projects,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { useIntlayer, useLocale } from 'react-intlayer';
import { Website_Domain } from '@intlayer/design-system/routes';
import { AuthenticationBarrier } from '#components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { BackgroundLayout } from '#components/BackgroundLayout';
import { DashboardContentLayout } from '#components/Dashboard/DashboardContentLayout';
import { ProjectForm } from '#components/Dashboard/ProjectForm';

export const Route = createFileRoute('/{-$locale}/_dashboard/projects')({
  component: ProjectsPage,
  head: ({ params }) => {
    const { locale } = params;
    const path = App_Dashboard_Projects;
    const content = getIntlayer('projects-dashboard-page', locale);

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
                name: 'Projects',
                item: `https://${Website_Domain}${getLocalizedUrl(App_Dashboard_Projects, locale)}`,
              },
            ],
          }),
        },
      ],
    };
  },
});

function ProjectsPage() {
  const { title } = useIntlayer('projects-dashboard-page');
  const { locale } = useLocale();

  return (
    <AuthenticationBarrier
      accessRule={['authenticated', 'organization-required']}
      locale={locale}
      redirectionRoute={App_Dashboard_Organization_Path}
    >
      <DashboardContentLayout title={title}>
        <BackgroundLayout />
        <div className="flex w-full flex-1 flex-col items-center p-10">
          <ProjectForm />
        </div>
      </DashboardContentLayout>
    </AuthenticationBarrier>
  );
}
