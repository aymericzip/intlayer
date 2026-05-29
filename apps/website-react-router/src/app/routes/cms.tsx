import { Website_CMS } from '@intlayer/design-system/routes';
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getMultilingualUrls,
} from 'intlayer';
import { CMSLandingPage } from '~/components/CMSLandingPage';
import { PageLayout } from '~/layouts/PageLayout';
import { OrganizationHeader } from '~/structuredData/OrganizationHeader';
import { ProductHeader } from '~/structuredData/ProductHeader';
import { SoftwareApplicationHeader } from '~/structuredData/SoftwareApplication';
import { WebsiteHeader } from '~/structuredData/WebsiteHeader';
import { getPricing } from '~/utils/stripe';
import type { Route } from './+types/cms';

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [];
  const { locale } = data;
  const { title, description, keywords } = getIntlayer('cms-metadata', locale!);

  return [
    { title },
    { name: 'description', content: description },
    {
      name: 'keywords',
      content: Array.isArray(keywords) ? keywords.join(', ') : keywords || '',
    },
    { property: 'og:url', content: getLocalizedUrl(Website_CMS, locale!) },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    {
      tagName: 'link',
      rel: 'canonical',
      href: getLocalizedUrl(Website_CMS, locale!),
    },
    {
      tagName: 'link',
      rel: 'alternate',
      hrefLang: 'x-default',
      href: Website_CMS,
    },
    ...Object.entries(getMultilingualUrls(Website_CMS)).map(([lang, url]) => ({
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

export default function CMSPage({ loaderData }: Route.ComponentProps) {
  const { locale, pricings } = loaderData;

  return (
    <PageLayout>
      <WebsiteHeader key={locale} />
      <OrganizationHeader />
      <SoftwareApplicationHeader />
      <ProductHeader pricings={pricings} />
      <CMSLandingPage />
    </PageLayout>
  );
}
