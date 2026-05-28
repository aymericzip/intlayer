import { TMSLandingPage } from '~/components/TMSLandingPage';
import { Website_TMS } from '@intlayer/design-system/routes';
import { PageLayout } from '~/layouts/PageLayout';
import { OrganizationHeader } from '~/structuredData/OrganizationHeader';
import { SoftwareApplicationHeader } from '~/structuredData/SoftwareApplication';
import { TMSProductHeader } from '~/structuredData/TMSProductHeader';
import { WebsiteHeader } from '~/structuredData/WebsiteHeader';
import { getPricing } from '~/utils/stripe';
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getMultilingualUrls,
} from 'intlayer';
import type { Route } from './+types/tms';

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [];
  const { locale } = data;
  const { title, description, keywords } = getIntlayer('tms-metadata', locale!);

  return [
    { title },
    { name: 'description', content: description },
    {
      name: 'keywords',
      content: Array.isArray(keywords) ? keywords.join(', ') : keywords || '',
    },
    { property: 'og:url', content: getLocalizedUrl(Website_TMS, locale!) },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    {
      tagName: 'link',
      rel: 'canonical',
      href: getLocalizedUrl(Website_TMS, locale!),
    },
    {
      tagName: 'link',
      rel: 'alternate',
      hrefLang: 'x-default',
      href: Website_TMS,
    },
    ...Object.entries(getMultilingualUrls(Website_TMS)).map(([lang, url]) => ({
      tagName: 'link',
      rel: 'alternate',
      hrefLang: lang,
      href: url,
    })),
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  const locale = getLocaleFromPath(request.url);
  const pricings = await getPricing();
  return { locale, pricings };
}

export default function TMSPage({ loaderData }: Route.ComponentProps) {
  const { locale, pricings } = loaderData;

  return (
    <PageLayout>
      <WebsiteHeader key={locale} />
      <OrganizationHeader />
      <SoftwareApplicationHeader />
      <TMSProductHeader pricings={pricings} />
      <TMSLandingPage />
    </PageLayout>
  );
}
