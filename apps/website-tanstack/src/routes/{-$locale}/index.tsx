import { Await, createFileRoute, defer } from '@tanstack/react-router';
import { defaultLocale, getIntlayer } from 'intlayer';
import { LandingPage as LandingPageContent } from '~/components/LandingPage';
import { PageLayout } from '~/layouts/PageLayout';
import monacoCss from '~/monaco.css?url';
import { OrganizationHeader } from '~/structuredData/OrganizationHeader';
import { ProductHeader } from '~/structuredData/ProductHeader';
import { SoftwareApplicationHeader } from '~/structuredData/SoftwareApplication';
import { WebsiteHeader } from '~/structuredData/WebsiteHeader';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';
import { getPricing } from '~/utils/stripe';

export const Route = createFileRoute('/{-$locale}/')({
  loader: async ({ params }) => {
    const locale = params.locale ?? defaultLocale;
    return { pricings: defer(getPricing()), locale };
  },
  head: ({ params }) => {
    const locale = params.locale ?? defaultLocale;
    const path = '/';
    const { title, description, keywords } = getIntlayer(
      'landing-metadata',
      locale
    );

    return {
      meta: [
        { title: String(title) },
        { name: 'description', content: String(description) },
        {
          name: 'keywords',
          content: Array.isArray(keywords)
            ? keywords.join(', ')
            : String(keywords || ''),
        },
        { property: 'og:url', content: getAbsoluteUrl(path, locale) },
        { property: 'og:title', content: String(title) },
        { property: 'og:description', content: String(description) },
      ],
      links: [
        { rel: 'canonical', href: getAbsoluteUrl(path, locale) },
        { rel: 'stylesheet', href: monacoCss },
        ...getHreflangLinks(path),
      ],
    };
  },
  component: LandingPage,
});

function LandingPage() {
  const { pricings } = Route.useLoaderData();

  return (
    <PageLayout>
      <WebsiteHeader />
      <OrganizationHeader />
      <SoftwareApplicationHeader />
      <Await promise={pricings} fallback={null}>
        {(resolvedPricings) => <ProductHeader pricings={resolvedPricings} />}
      </Await>
      <LandingPageContent />
    </PageLayout>
  );
}
