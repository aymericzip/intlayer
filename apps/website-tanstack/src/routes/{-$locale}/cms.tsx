import { Website_CMS } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { CMSLandingPage } from '~/components/CMSLandingPage';
import { PageLayout } from '~/layouts/PageLayout';
import { OrganizationHeader } from '~/structuredData/OrganizationHeader';
import { ProductHeader } from '~/structuredData/ProductHeader';
import { SoftwareApplicationHeader } from '~/structuredData/SoftwareApplication';
import { WebsiteHeader } from '~/structuredData/WebsiteHeader';
import { getPricing } from '~/utils/stripe';

export const Route = createFileRoute('/{-$locale}/cms')({
  loader: async () => {
    const pricings = await getPricing();

    return { pricings };
  },
  head: ({ params }) => {
    const locale = params.locale ?? defaultLocale;
    const path = Website_CMS;
    const { title, description, keywords } = getIntlayer(
      'cms-metadata',
      locale
    );

    return {
      title: title,
      meta: [
        { name: 'description', content: description },
        {
          name: 'keywords',
          content: Array.isArray(keywords)
            ? keywords.join(', ')
            : keywords || '',
        },
        { property: 'og:url', content: getLocalizedUrl(path, locale) },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
      ],
      links: [
        { rel: 'canonical', href: getLocalizedUrl(path, locale) },
        { rel: 'alternate', hrefLang: 'x-default', href: path },
        ...localeMap(({ locale: mapLocale }) => ({
          rel: 'alternate',
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),
      ],
    };
  },
  component: CMSPage,
});

function CMSPage() {
  const { pricings } = Route.useLoaderData();

  return (
    <PageLayout>
      <WebsiteHeader />
      <OrganizationHeader />
      <SoftwareApplicationHeader />
      <ProductHeader pricings={pricings} />
      <CMSLandingPage />
    </PageLayout>
  );
}
