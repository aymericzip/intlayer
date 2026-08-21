import { createFileRoute, Outlet } from '@tanstack/react-router';
import { getIntlayer, getLocalizedUrl } from 'intlayer';
import type { FC } from 'react';
import { useHotDataLoading } from '#hooks/useHotDataLoading.tsx';
import { useSessionRouterListener } from '#hooks/useSessionRouterListener.ts';

const LocaleLayout: FC = () => {
  useHotDataLoading();
  useSessionRouterListener();

  return <Outlet />;
};

export const Route = createFileRoute('/{-$locale}')({
  component: LocaleLayout,
  head: ({ params }) => {
    const { title, description, keywords, openGraph } = getIntlayer(
      'locale-metadata',
      params.locale
    );

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
        { property: 'og:image', content: '/github-social-preview.png' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: '/github-social-preview.png' },
      ],
    };
  },
});
