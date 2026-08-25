import { Website_Demo } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayerAsync } from 'intlayer';
import { BackgroundLayout } from '~/components/BackgroundLayout';
import { DemoPage } from '~/components/DemoPage';
import { PageLayout } from '~/layouts/PageLayout';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';
import {
  getSiteStructuredData,
  getSiteStructuredDataScripts,
  getSoftwareStructuredData,
} from '~/utils/structuredData';

export const Route = createFileRoute('/{-$locale}/demo')({
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    const [metadata, siteStructuredData, softwareStructuredData] =
      await Promise.all([
        getIntlayerAsync('demo-metadata', locale),
        getSiteStructuredData(locale),
        getSoftwareStructuredData(locale),
      ]);

    return { metadata, siteStructuredData, softwareStructuredData };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    if (!loaderData) return {};

    const { locale = defaultLocale } = params;
    const path = Website_Demo;
    const { metadata, siteStructuredData, softwareStructuredData } = loaderData;
    const { title, description, keywords } = metadata;

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
        ...getSiteStructuredDataScripts(siteStructuredData),
        {
          type: 'application/ld+json',
          children: softwareStructuredData.application,
        },
      ],
    };
  },
  component: DemoPageRoute,
});

function DemoPageRoute() {
  return (
    <PageLayout>
      <BackgroundLayout>
        <DemoPage />
      </BackgroundLayout>
    </PageLayout>
  );
}
