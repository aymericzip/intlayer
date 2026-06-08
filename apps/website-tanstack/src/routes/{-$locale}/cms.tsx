import { Website_CMS } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayer } from 'intlayer';
import { CMSLandingPage } from '~/components/CMSLandingPage';
import { PageLayout } from '~/layouts/PageLayout';
import { OrganizationHeader } from '~/structuredData/OrganizationHeader';
import { ProductHeader } from '~/structuredData/ProductHeader';
import { SoftwareApplicationHeader } from '~/structuredData/SoftwareApplication';
import { WebsiteHeader } from '~/structuredData/WebsiteHeader';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';
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
        { property: 'og:url', content: getAbsoluteUrl(path, locale) },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
      ],
      links: [
        { rel: 'canonical', href: getAbsoluteUrl(path, locale) },
        ...getHreflangLinks(path),
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
