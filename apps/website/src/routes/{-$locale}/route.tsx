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
          // A dictionary missing from the client registry resolves to the
          // fallback proxy, whose nodes are not arrays. Calling `join` on one
          // throws, and a rejected `head` drops the meta of *every* route in
          // the chain — so the array shape is checked, as in every other route.
          content: Array.isArray(keywords)
            ? keywords.join(', ')
            : String(keywords || ''),
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
