import { editor, internationalization } from '@intlayer/config/built';
import { Loader } from '@intlayer/design-system/loader';
import {
  Website_Demo_Path,
  Website_Playground,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayerAsync } from 'intlayer';
import { lazy, Suspense } from 'react';
import { useIntlayer } from 'react-intlayer';
import { BackgroundLayout } from '~/components/BackgroundLayout';
import { DashboardContentLayout } from '~/components/Dashboard/DashboardContentLayout';
import { DictionaryLoaderPlayground } from '~/components/Dashboard/Editor/DictionaryLoaderPlayground';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';
import {
  getSiteStructuredData,
  getSiteStructuredDataScripts,
  getSoftwareStructuredData,
} from '~/utils/structuredData';

const Editor = lazy(() =>
  import('~/components/Dashboard/Editor').then((mod) => ({
    default: mod.Editor,
  }))
);

export const Route = createFileRoute('/{-$locale}/_playground/playground')({
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    const [metadata, siteStructuredData, softwareStructuredData] =
      await Promise.all([
        getIntlayerAsync('playground-metadata', locale),
        getSiteStructuredData(locale),
        getSoftwareStructuredData(locale),
      ]);

    return { metadata, siteStructuredData, softwareStructuredData };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    if (!loaderData) return {};

    const { locale = defaultLocale } = params;
    const path = Website_Playground;
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
            : String(keywords || ''),
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
  component: PlaygroundPage,
});

function PlaygroundPage() {
  const { title, description } = useIntlayer('playground-page');

  const origin =
    typeof window !== 'undefined'
      ? window.location.origin
      : import.meta.env.VITE_PUBLIC_URL;
  const applicationURL = `${origin}${Website_Demo_Path}`;

  const configuration = {
    editor: {
      ...(editor ?? {}),
      applicationURL,
    },
    internationalization,
  };

  return (
    <DashboardContentLayout title={title}>
      <BackgroundLayout />
      <p className="m-auto my-3 max-w-3xl px-10 text-neutral text-sm">
        {description}
      </p>
      <div className="relative flex flex-1 flex-col items-center px-10 pb-5">
        <Suspense fallback={<Loader />}>
          <Editor
            configuration={configuration}
            DictionariesLoader={DictionaryLoaderPlayground}
          />
        </Suspense>
      </div>
    </DashboardContentLayout>
  );
}
