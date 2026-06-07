import { editor, internationalization } from '@intlayer/config/built';
import { Loader } from '@intlayer/design-system/loader';
import {
  External_Github,
  Website_Demo_Path,
  Website_Home,
  Website_Playground_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayer } from 'intlayer';
import { lazy, Suspense } from 'react';
import { useIntlayer } from 'react-intlayer';
import { BackgroundLayout } from '~/components/BackgroundLayout';
import { DashboardContentLayout } from '~/components/Dashboard/DashboardContentLayout';
import { DictionaryLoaderPlayground } from '~/components/Dashboard/Editor/DictionaryLoaderPlayground';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';
import packageJson from '../../../../package_mock.json' with { type: 'json' };

const Editor = lazy(() =>
  import('~/components/Dashboard/Editor').then((mod) => ({
    default: mod.Editor,
  }))
);

export const Route = createFileRoute('/{-$locale}/_playground/playground')({
  head: ({ params }) => {
    const locale = params.locale ?? defaultLocale;
    const path = Website_Playground_Path;
    const { title, description, keywords } = getIntlayer(
      'playground-metadata',
      locale
    );

    const softwareData = getIntlayer(
      'software-application-structured-data',
      locale
    );

    const softwareApplication = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Intlayer',
      url: Website_Home,
      description: softwareData.description,
      softwareVersion: packageJson.version,
      license:
        'https://raw.githubusercontent.com/aymericzip/intlayer/refs/heads/main/LICENSE',
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
        ...getHreflangLinks(path),
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(softwareApplication),
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
    <>
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
    </>
  );
}
