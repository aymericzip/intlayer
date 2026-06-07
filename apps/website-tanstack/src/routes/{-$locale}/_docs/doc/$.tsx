import {
  Website_Doc_Path,
  Website_Home,
  Website_Home_Path,
  Website_Domain,
  External_Github,
} from '@intlayer/design-system/routes';
import { CompositeComponent } from '@tanstack/react-start/rsc';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { defaultLocale, getLocalizedUrl, getIntlayer } from 'intlayer';
import { Suspense, lazy, type FC } from 'react';
import { DocHeader } from '~/components/DocPage/DocHeader/DocHeader';
import { DocPageLayout } from '~/components/DocPage/DocPageLayout';
import {
  DocPageNavigation,
  type DocPageNavigationProps,
} from '~/components/DocPage/DocPageNavigation/DocPageNavigation';
import { SectionScroller } from '~/components/DocPage/SectionScroller';
import { loadDocPage, loadNavData } from '~/serverFunctions/docs';

const I18nBenchmarkLazy = lazy(() =>
  import('~/components/I18nBenchmark').then((mod) => ({
    default: mod.I18nBenchmark,
  }))
);

type FrameworkKey = Parameters<typeof I18nBenchmarkLazy>[0]['initialFramework'];

const I18nBenchmarkSlot: FC<{ framework?: FrameworkKey }> = ({ framework }) => (
  <Suspense>
    <I18nBenchmarkLazy initialFramework={framework} />
  </Suspense>
);
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';
import packageJson from '../../../../../package_mock.json' with { type: 'json' };

export const Route = createFileRoute('/{-$locale}/_docs/doc/$')({
  ssr: false,
  loader: async ({ params }) => {
    const locale = (params.locale as string) ?? defaultLocale;
    const slugsStr = (params as any)['*'] || '';
    const slugs = slugsStr ? slugsStr.split('/') : [];

    const [result, navData] = await Promise.all([
      loadDocPage({ data: { locale, slugs } }),
      loadNavData({ data: { locale } }),
    ]);

    const { exactMatch, docsData, content } = result;

    if (!exactMatch) {
      if (docsData.length > 0) {
        throw redirect({ to: docsData[0].relativeUrl as any });
      }
      throw redirect({ to: Website_Home_Path as any });
    }

    const { defaultDocData, docContent, docContentSrc, prevDocData, nextDocData } =
      content!;

    const nextDoc: DocPageNavigationProps['nextDoc'] = nextDocData?.docs
      ? {
          title: nextDocData.title,
          url: getLocalizedUrl(nextDocData.docs.relativeUrl, locale),
        }
      : undefined;
    const prevDoc: DocPageNavigationProps['prevDoc'] = prevDocData?.docs
      ? {
          title: prevDocData.title,
          url: getLocalizedUrl(prevDocData.docs.relativeUrl, locale),
        }
      : undefined;

    return {
      locale,
      slugs,
      docData: exactMatch,
      defaultDocData,
      docContent,
      docContentSrc,
      nextDoc,
      prevDoc,
      navData,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.docData) return {};
    const { docData, docContent, locale } = loaderData;
    const absoluteUrl = docData.url;

    const breadcrumbs = [
      { name: 'Home', url: Website_Home },
      { name: 'Docs', url: Website_Doc_Path },
      { name: docData.title, url: docData.url },
    ];

    const breadcrumbsJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url.startsWith('http')
          ? item.url
          : `https://${Website_Domain}${item.url}`,
      })),
    };

    const creativeWorkData = getIntlayer('creative-work-structured-data', locale);
    const softwareData = getIntlayer('software-application-structured-data', locale);

    const softwareApplication = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Intlayer',
      url: Website_Home,
      description: softwareData.description,
      softwareVersion: packageJson.version,
      license: 'https://raw.githubusercontent.com/aymericzip/intlayer/refs/heads/main/LICENSE',
      author: {
        '@type': 'Organization',
        name: 'Intlayer',
        url: Website_Home,
        logo: `${Website_Home}/assets/logo.png`,
        sameAs: [External_Github],
      },
      publisher: {
        '@type': 'Organization',
        name: 'Intlayer',
        url: Website_Home,
        logo: `${Website_Home}/assets/logo.png`,
      },
      keywords: softwareData.keywords,
      creator: {
        '@type': 'Person',
        name: 'Aymeric PINEAU',
        url: 'https://github.com/aymericzip',
      },
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'Developer Tools',
      image: `${Website_Home}/cover.png`,
      operatingSystem: 'Web, iOS, Android',
      datePublished: '2024-08-26',
      audience: {
        '@type': 'Audience',
        audienceType: softwareData.audienceType,
      },
      mainEntityOfPage: Website_Home,
    };

    const formatDate = (date: Date): string => {
      if (!(date instanceof Date)) return '';
      return date.toISOString().split('T')[0];
    };

    const creativeWork = {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      creator: {
        '@type': 'Person',
        name: 'Aymeric Pineau',
      },
      name: docData.title,
      text: docContent,
      description: docData.description,
      url: docData.url,
      datePublished: formatDate(new Date(docData.createdAt)),
      dateModified: formatDate(new Date(docData.updatedAt)),
      keywords: Array.isArray(docData.keywords)
        ? docData.keywords.join(', ')
        : docData.keywords || '',
      license: 'https://raw.githubusercontent.com/aymericzip/intlayer/refs/heads/main/LICENSE',
      audience: {
        '@type': 'Audience',
        audienceType: creativeWorkData.audienceType,
      },
    };

    return {
      meta: [
        { title: `${docData.title} | Intlayer` },
        { name: 'description', content: docData.description },
        {
          name: 'keywords',
          content: Array.isArray(docData.keywords)
            ? docData.keywords.join(', ')
            : docData.keywords || '',
        },
        { property: 'og:url', content: getAbsoluteUrl(absoluteUrl) },
        { property: 'og:title', content: `${docData.title} | Intlayer` },
        { property: 'og:description', content: docData.description },
      ],
      links: [
        { rel: 'canonical', href: getAbsoluteUrl(absoluteUrl) },
        ...getHreflangLinks(absoluteUrl),
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(breadcrumbsJsonLd),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify(softwareApplication),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify(creativeWork).replace(/</g, '\\u003c'),
        },
      ],
    };
  },
  component: DocumentationPage,
});

function DocumentationPage() {
  const loaderData = Route.useLoaderData();

  if (
    !loaderData ||
    typeof loaderData !== 'object' ||
    !('docData' in loaderData)
  ) {
    return null;
  }

  const {
    locale,
    slugs,
    docData,
    defaultDocData,
    docContent,
    docContentSrc,
    nextDoc,
    prevDoc,
    navData,
  } = loaderData;

  if (!docData || !defaultDocData) return null;

  return (
    <DocPageLayout docData={navData} activeSlugs={slugs} locale={locale}>
      <DocHeader
        {...docData}
        markdownContent={docContent}
        baseUpdatedAt={defaultDocData.updatedAt}
        history={docData.history ?? []}
      />
      <Suspense>
        <SectionScroller />
      </Suspense>
      <CompositeComponent
        src={docContentSrc}
        I18nBenchmarkComponent={I18nBenchmarkSlot}
      />
      <DocPageNavigation nextDoc={nextDoc} prevDoc={prevDoc} />
    </DocPageLayout>
  );
}
