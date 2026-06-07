import {
  App_Dashboard,
  External_Github,
  Website_CMS,
  Website_Home,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayer } from 'intlayer';
import { CMSLandingPage } from '~/components/CMSLandingPage';
import { PageLayout } from '~/layouts/PageLayout';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';

import { getSoftwareApplicationHeader } from '@intlayer/design-system/structured-data';
import { getProductHeader } from '@intlayer/design-system/structured-data';

export const Route = createFileRoute('/{-$locale}/cms')({
  head: ({ params }) => {
    const locale = params.locale ?? defaultLocale;
    const path = Website_CMS;
    const { title, description, keywords } = getIntlayer(
      'cms-metadata',
      locale
    );



    return {
      meta: [
        { title: title },
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
  component: CMSPage,
});

function CMSPage() {
  return (
    <PageLayout>
      <CMSLandingPage />
    </PageLayout>
  );
}
