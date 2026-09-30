import { createFileRoute, Outlet } from '@tanstack/react-router';
import { getIntlayerAsync, getLocalizedUrl } from 'intlayer';
import type { FC } from 'react';
import { useHotDataLoading } from '#hooks/useHotDataLoading.tsx';
import { useSessionRouterListener } from '#hooks/useSessionRouterListener.ts';
import { getOgImageUrl } from '#utils/ogImage';

const LocaleLayout: FC = () => {
  useHotDataLoading();
  useSessionRouterListener();

  return <Outlet />;
};

export const Route = createFileRoute('/{-$locale}')({
  component: LocaleLayout,
  loader: async ({ params }) => ({
    content: await getIntlayerAsync('locale-metadata', params.locale),
  }),
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    if (!loaderData) return {};

    const { title, description, keywords, openGraph } = loaderData.content;
    const ogImage = getOgImageUrl({
      title: openGraph.title,
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
          content: keywords.join(', '),
        },
        { property: 'og:title', content: openGraph.title },
        { property: 'og:description', content: description },
        {
          property: 'og:url',
          content: getLocalizedUrl(
            import.meta.env.VITE_SITE_URL,
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
