import {
  App_Dashboard,
  External_Github,
  Website_Home,
  Website_TMS_Path,
} from '@intlayer/design-system/routes';
import {
  getSoftwareApplicationHeader,
  getTMSProductHeader,
} from '@intlayer/design-system/structured-data';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayer } from 'intlayer';
import { TMSLandingPage } from '~/components/TMSLandingPage';
import { PageLayout } from '~/layouts/PageLayout';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';

export const Route = createFileRoute('/{-$locale}/tms')({
  head: ({ params }) => {
    const locale = params.locale ?? defaultLocale;
    const path = Website_TMS_Path;
    const { title, description, keywords } = getIntlayer(
      'tms-metadata',
      locale
    );

    return {
      meta: [
        { title },
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
          children: JSON.stringify(
            getTMSProductHeader({ pricings: null as any, locale })
          ),
        },
      ],
    };
  },
  component: TMSPage,
});

function TMSPage() {
  return (
    <PageLayout>
      <TMSLandingPage />
    </PageLayout>
  );
}
