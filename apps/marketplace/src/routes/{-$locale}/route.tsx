import { Marketplace_Origin } from '@intlayer/design-system/routes';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { getIntlayerAsync, getLocalizedUrl } from 'intlayer';
import type { FC } from 'react';
import { Footer } from '#components/Footer';
import { Navbar } from '#components/Navbar';
import { useSessionRouterListener } from '#hooks/useSessionRouterListener.ts';
import { getOgImageUrl } from '#utils/ogImage';

const LocaleLayout: FC = () => {
  useSessionRouterListener();

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="relative flex w-full flex-1 flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export const Route = createFileRoute('/{-$locale}')({
  component: LocaleLayout,
  loader: async ({ params }) => {
    const content = await getIntlayerAsync('locale-metadata', params.locale);
    return {
      title: String(content.title),
      description: String(content.description),
      keywords: Array.isArray(content.keywords)
        ? content.keywords.map(String)
        : [],
      openGraphTitle: content.openGraph?.title
        ? String(content.openGraph.title)
        : undefined,
    };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    if (!loaderData) return {};

    const { title, description, keywords, openGraphTitle } = loaderData;
    const ogImage = getOgImageUrl({
      title: openGraphTitle ?? title,
      locale: params.locale,
    });

    return {
      meta: [
        { title },
        {
          name: 'description',
          content: description,
        },
        {
          name: 'keywords',
          content: Array.isArray(keywords) ? keywords.join(', ') : '',
        },
        { property: 'og:title', content: openGraphTitle ?? title },
        { property: 'og:description', content: description },
        {
          property: 'og:url',
          content: getLocalizedUrl(
            import.meta.env.VITE_SITE_URL || Marketplace_Origin,
            params.locale
          ),
        },
        { property: 'og:image', content: ogImage },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: ogImage },
      ],
    };
  },
});
