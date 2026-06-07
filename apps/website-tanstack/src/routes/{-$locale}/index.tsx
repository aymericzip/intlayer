import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayer } from 'intlayer';
import { LandingPage as LandingPageContent } from '~/components/LandingPage';
import { PageLayout } from '~/layouts/PageLayout';
import monacoCss from '~/monaco.css?url';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';
import { Website_Home, App_Dashboard, External_Github } from '@intlayer/design-system/routes';

import { getSoftwareApplicationHeader } from '@intlayer/design-system/structured-data';
import { getProductHeader } from '@intlayer/design-system/structured-data';

export const Route = createFileRoute('/{-$locale}/')({
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
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(getSoftwareApplicationHeader({ locale })),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify(getProductHeader({ pricings: null as any, locale })),
        },
      ],
    };
  },
  component: LandingPage,
});

function LandingPage() {
  return (
    <PageLayout>
      <LandingPageContent />
    </PageLayout>
  );
}
