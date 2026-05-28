import { BackgroundLayout } from '@components/BackgroundLayout';
import { DashboardContentLayout } from '@components/Dashboard/DashboardContentLayout';
import { DictionaryLoaderPlayground } from '@components/Dashboard/Editor/DictionaryLoaderPlayground';
import * as baseConfiguration from '@intlayer/config/built';
import { Loader } from '@intlayer/design-system/loader';
import {
  Website_Demo_Path,
  Website_Playground,
} from '@intlayer/design-system/routes';
import { ConfigurationProvider } from '@intlayer/editor-react';
import { OrganizationHeader } from '@structuredData/OrganizationHeader';
import { SoftwareApplicationHeader } from '@structuredData/SoftwareApplication';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import dynamic from '@utils/dynamic';
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getMultilingualUrls,
} from 'intlayer';
import { useIntlayer } from 'react-intlayer';

import type { Route } from './+types/playground-page';

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [];
  const { locale } = data;
  const { title, description, keywords } = getIntlayer(
    'playground-metadata',
    locale!
  );

  return [
    { title },
    { name: 'description', content: description },
    {
      name: 'keywords',
      content: Array.isArray(keywords) ? keywords.join(', ') : keywords || '',
    },
    {
      property: 'og:url',
      content: getLocalizedUrl(Website_Playground, locale!),
    },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    {
      tagName: 'link',
      rel: 'canonical',
      href: getLocalizedUrl(Website_Playground, locale!),
    },
    {
      tagName: 'link',
      rel: 'alternate',
      hrefLang: 'x-default',
      href: Website_Playground,
    },
    ...Object.entries(getMultilingualUrls(Website_Playground)).map(
      ([lang, url]) => ({
        tagName: 'link',
        rel: 'alternate',
        hrefLang: lang,
        href: url,
      })
    ),
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  const locale = getLocaleFromPath(request.url);
  return { locale };
}

const Editor = dynamic(
  () => import('@components/Dashboard/Editor').then((mod) => mod.Editor),
  {
    loading: () => <Loader />,
  }
);

export default function PlaygroundPage({ loaderData }: Route.ComponentProps) {
  const { locale } = loaderData;
  const { title, description } = useIntlayer('playground-page');

  const origin =
    typeof window !== 'undefined'
      ? window.location.origin
      : (import.meta.env.VITE_URL ??
        import.meta.env?.VITE_PUBLIC_URL ??
        'http://localhost:5174');
  const applicationURL = `${origin}${Website_Demo_Path}`;

  const configuration = {
    ...baseConfiguration,
    ...{
      editor: {
        ...(baseConfiguration.editor ?? {}),
        applicationURL,
      },
    },
  };

  return (
    <>
      <WebsiteHeader key={locale} />
      <OrganizationHeader />
      <SoftwareApplicationHeader />
      <DashboardContentLayout title={title}>
        <BackgroundLayout />
        <p className="m-auto my-3 max-w-3xl px-10 text-neutral text-sm">
          {description}
        </p>
        <div className="relative flex flex-1 flex-col items-center px-10 pb-5">
          <ConfigurationProvider configuration={configuration}>
            <Editor
              configuration={configuration}
              DictionariesLoader={DictionaryLoaderPlayground}
            />
          </ConfigurationProvider>
        </div>
      </DashboardContentLayout>
    </>
  );
}
