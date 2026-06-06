import { editor, internationalization } from '@intlayer/config/built';
import { Loader } from '@intlayer/design-system/loader';
import {
  Website_Demo_Path,
  Website_Playground,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayer } from 'intlayer';
import { lazy, Suspense } from 'react';
import { useIntlayer } from 'react-intlayer';
import { BackgroundLayout } from '~/components/BackgroundLayout';
import { DashboardContentLayout } from '~/components/Dashboard/DashboardContentLayout';
import { DictionaryLoaderPlayground } from '~/components/Dashboard/Editor/DictionaryLoaderPlayground';
import { OrganizationHeader } from '~/structuredData/OrganizationHeader';
import { SoftwareApplicationHeader } from '~/structuredData/SoftwareApplication';
import { WebsiteHeader } from '~/structuredData/WebsiteHeader';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';

const Editor = lazy(() =>
  import('~/components/Dashboard/Editor').then((mod) => ({
    default: mod.Editor,
  }))
);

export const Route = createFileRoute('/{-$locale}/_playground/playground')({
  head: ({ params }) => {
    const locale = params.locale ?? defaultLocale;
    const path = Website_Playground;
    const { title, description, keywords } = getIntlayer(
      'playground-metadata',
      locale
    );

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
      <WebsiteHeader />
      <OrganizationHeader />
      <SoftwareApplicationHeader />
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
