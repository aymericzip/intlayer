import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { getIntlayerAsync, getLocalizedUrl } from 'intlayer';

function getRedirectUrl(_pathname: string): string | null {
  return null;
}

export const Route = createFileRoute('/{-$locale}')({
  beforeLoad: ({ location }) => {
    const pathname = location.pathname;

    if (pathname.includes('/assets/') && !pathname.startsWith('/assets/')) {
      const newPathname = pathname.substring(pathname.indexOf('/assets/'));
      throw redirect({ to: newPathname + location.searchStr, statusCode: 301 });
    }

    const redirectUrl = getRedirectUrl(pathname);
    if (redirectUrl) {
      throw redirect({ to: redirectUrl, statusCode: 301 });
    }
  },
  head: async ({ params }) => {
    const { title, description, keywords, openGraph } = await getIntlayerAsync(
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
          content: getLocalizedUrl(import.meta.env.VITE_URL, params.locale),
        },
        { property: 'og:image', content: '/github-social-preview.png' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: '/github-social-preview.png' },
      ],
    };
  },
  component: () => <Outlet />,
});
