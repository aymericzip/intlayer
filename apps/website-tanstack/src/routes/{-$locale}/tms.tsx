import { Website_TMS } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayer } from 'intlayer';
import { TMSLandingPage } from '~/components/TMSLandingPage';
import { PageLayout } from '~/layouts/PageLayout';
import { OrganizationHeader } from '~/structuredData/OrganizationHeader';
import { SoftwareApplicationHeader } from '~/structuredData/SoftwareApplication';
import { TMSProductHeader } from '~/structuredData/TMSProductHeader';
import { WebsiteHeader } from '~/structuredData/WebsiteHeader';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';
import { getPricing } from '~/utils/stripe';

export const Route = createFileRoute('/{-$locale}/tms')({
  loader: async () => {
    const pricings = await getPricing();
    return { pricings };
  },
  head: ({ params }) => {
    const locale = params.locale ?? defaultLocale;
    const path = Website_TMS;
    const { title, description, keywords } = getIntlayer(
      'tms-metadata',
      locale
    );

    return {
      title,
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
  component: TMSPage,
});

function TMSPage() {
  const { pricings } = Route.useLoaderData();

  return (
    <PageLayout>
      <WebsiteHeader />
      <OrganizationHeader />
      <SoftwareApplicationHeader />
      <TMSProductHeader pricings={pricings} />
      <TMSLandingPage />
    </PageLayout>
  );
}
