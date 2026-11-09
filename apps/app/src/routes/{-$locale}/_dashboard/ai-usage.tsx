import {
  App_Dashboard,
  App_Dashboard_AI_Usage,
  App_Dashboard_AI_Usage_Path,
  Website_Domain,
} from '@intlayer/design-system/routes';
import { buildBreadcrumbsJsonLd } from '@intlayer/design-system/structured-data';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { useIntlayer, useLocale } from 'react-intlayer';
import { AICreditUsage } from '#components/AICredits';
import { AuthenticationBarrier } from '#components/Auth/AuthenticationBarrier/AuthenticationBarrier';
import { DashboardContentLayout } from '#components/Dashboard/DashboardContentLayout';
import { redirectIfSelfHosted } from '#utils/selfHosted';

export const Route = createFileRoute('/{-$locale}/_dashboard/ai-usage')({
  // AI credits only exist on the cloud: self-hosted runs on own AI keys
  beforeLoad: async ({ params }) => redirectIfSelfHosted(params.locale),
  component: AIUsagePage,
  loader: async ({ params }) => {
    const { locale } = params;

    return {
      content: await getIntlayerAsync('ai-usage-dashboard-page', locale),
    };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    if (!loaderData) return {};

    const { locale } = params;
    const path = App_Dashboard_AI_Usage;
    const { content } = loaderData;
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
                  name: 'AI usage',
                  url: getLocalizedUrl(App_Dashboard_AI_Usage_Path, locale),
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

function AIUsagePage() {
  const { title } = useIntlayer('ai-usage-dashboard-page');
  const { locale } = useLocale();

  return (
    <AuthenticationBarrier
      accessRule={['authenticated', 'organization-required']}
      locale={locale}
    >
      <DashboardContentLayout title={title}>
        <div className="flex flex-1 flex-col p-6">
          <AICreditUsage />
        </div>
      </DashboardContentLayout>
    </AuthenticationBarrier>
  );
}
