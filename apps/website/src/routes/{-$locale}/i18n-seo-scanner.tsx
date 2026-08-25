import {
  External_Github,
  Website_Home,
  Website_Scanner,
} from '@intlayer/design-system/routes';
import { buildSoftwareApplicationJsonLd } from '@intlayer/design-system/structured-data';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayerAsync } from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { BackgroundLayout } from '~/components/BackgroundLayout';
import { LocalizationAnalyzer } from '~/components/ScannerPage';
import { PageLayout } from '~/layouts/PageLayout';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';
import {
  getSiteStructuredData,
  getSiteStructuredDataScripts,
  getSoftwareStructuredData,
} from '~/utils/structuredData';
import packageJson from '../../../package_mock.json' with { type: 'json' };

export const Route = createFileRoute('/{-$locale}/i18n-seo-scanner')({
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    const [
      metadata,
      siteStructuredData,
      softwareStructuredData,
      scannerContent,
    ] = await Promise.all([
      getIntlayerAsync('i18n-SEO-scanner', locale),
      getSiteStructuredData(locale),
      getSoftwareStructuredData(locale),
      getIntlayerAsync('scanner-software-structured-data', locale),
    ]);

    return {
      metadata,
      siteStructuredData,
      softwareStructuredData,
      scannerContent,
    };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    if (!loaderData) return {};

    const { locale = defaultLocale } = params;
    const path = Website_Scanner;
    const {
      metadata,
      siteStructuredData,
      softwareStructuredData,
      scannerContent,
    } = loaderData;
    const { title, description, keywords } = metadata;

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
      scripts: [
        ...getSiteStructuredDataScripts(siteStructuredData),
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            buildSoftwareApplicationJsonLd({
              name: 'Intlayer I18n SEO Scanner',
              url: `${Website_Home}/i18n-seo-scanner`,
              description: String(scannerContent.description),
              softwareVersion: packageJson.version,
              keywords: softwareStructuredData.content.keywords,
              audienceType: softwareStructuredData.content.audienceType,
              authorUrl: Website_Home,
              logoUrl: `${Website_Home}/assets/logo.png`,
              githubUrl: External_Github,
              operatingSystem: 'Web',
              mainEntityUrl: `${Website_Home}/i18n-seo-scanner`,
            })
          ),
        },
      ],
    };
  },
  component: AuditPageRoute,
});

function AuditContent() {
  const { title, description } = useIntlayer('audit-page');

  return (
    <div className="relative flex size-full flex-1 flex-col">
      <BackgroundLayout />
      <main className="relative flex flex-1 flex-col items-center justify-center gap-16 px-4 pt-20 md:px-10">
        <h1 className="max-w-3xl text-center font-bold text-3xl text-text leading-tight sm:text-5xl md:text-5xl lg:text-5xl">
          {title}
        </h1>
        <p className="max-w-2xl text-neutral leading-relaxed">{description}</p>
        <LocalizationAnalyzer />
      </main>
    </div>
  );
}

function AuditPageRoute() {
  return (
    <PageLayout>
      <AuditContent />
    </PageLayout>
  );
}
