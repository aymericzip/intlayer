import { editor, internationalization } from '@intlayer/config/built';
import { Loader } from '@intlayer/design-system/loader';
import {
  External_Github,
  Website_Demo_Path,
  Website_Doc_Search,
  Website_Home,
  Website_Playground,
} from '@intlayer/design-system/routes';
import {
  buildOrganizationJsonLd,
  buildSoftwareApplicationJsonLd,
  buildWebsiteJsonLd,
} from '@intlayer/design-system/structured-data';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayer, locales } from 'intlayer';
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
    const { locale = defaultLocale } = params;
    const path = Website_Playground;
    const { title, description, keywords } = getIntlayer(
      'playground-metadata',
      locale
    );

    const websiteContent = getIntlayer('website-structured-data', locale);
    const orgContent = getIntlayer('organization-structured-data', locale);
    const softwareContent = getIntlayer(
      'software-application-structured-data',
      locale
    );

    return {
      title: String(title),
      meta: [
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
          children: JSON.stringify(
            buildWebsiteJsonLd({
              url: Website_Home,
              searchUrl: Website_Doc_Search,
              locales: locales as string[],
              keywords: websiteContent.keywords as string[],
              rssUrl: `${Website_Home}/feed.xml`,
            })
          ),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            buildOrganizationJsonLd({
              url: Website_Home,
              logoUrl: `${Website_Home}/assets/logo.png`,
              slogan: String(orgContent.slogan),
              knowsAbout: orgContent.knowsAbout as string[],
              sameAs: [External_Github, 'https://twitter.com/intlayer'],
              availableLanguages: locales as string[],
            })
          ),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            buildSoftwareApplicationJsonLd({
              name: 'Intlayer',
              url: Website_Home,
              description: String(softwareContent.description),
              softwareVersion: packageJson.version,
              keywords: softwareContent.keywords as string[],
              audienceType: String(softwareContent.audienceType),
              authorUrl: Website_Home,
              logoUrl: `${Website_Home}/assets/logo.png`,
              githubUrl: External_Github,
              operatingSystem: 'Web, iOS, Android',
              mainEntityUrl: Website_Home,
            })
          ),
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
