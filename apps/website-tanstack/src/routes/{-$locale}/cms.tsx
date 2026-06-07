import {
  App_Dashboard,
  External_Github,
  Website_CMS_Path,
  Website_Home,
} from '@intlayer/design-system/routes';
import {
  getProductHeader,
  getSoftwareApplicationHeader,
} from '@intlayer/design-system/structured-data';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayer } from 'intlayer';
import { CMSLandingPage } from '~/components/CMSLandingPage';
import { PageLayout } from '~/layouts/PageLayout';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';

export const Route = createFileRoute('/{-$locale}/cms')({
  head: ({ params }) => {
    const locale = params.locale ?? defaultLocale;
    const path = Website_CMS_Path;
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
          children: JSON.stringify(
            getProductHeader({ pricings: null as any, locale })
          ),
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
