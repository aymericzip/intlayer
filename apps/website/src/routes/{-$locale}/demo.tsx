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
  head: async ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = Website_Demo;
    const [
      { title, description, keywords },
      siteStructuredData,
      softwareStructuredData,
    ] = await Promise.all([
      getIntlayerAsync('demo-metadata', locale),
      getSiteStructuredData(locale),
      getSoftwareStructuredData(locale),
    ]);

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
