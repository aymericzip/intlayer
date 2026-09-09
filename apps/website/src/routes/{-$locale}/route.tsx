import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { defaultLocale, getIntlayerAsync, getLocalizedUrl } from 'intlayer';
import { getOgImageUrl, getOgLocale, toAbsoluteUrl } from '~/utils/seo';

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
  loader: async ({ params }) => {
    return {
      content: await getIntlayerAsync('locale-metadata', params.locale),
    };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    if (!loaderData) return {};

    const { title, description, keywords, openGraph } = loaderData.content;
    const ogImage = getOgImageUrl(openGraph?.title || title);

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
        {
          property: 'og:locale',
          content: getOgLocale(params.locale || defaultLocale),
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: openGraph.title },
        { property: 'og:description', content: description },
        {
          property: 'og:url',
          content: getLocalizedUrl(import.meta.env.VITE_URL, params.locale),
        },
        { property: 'og:logo', content: toAbsoluteUrl('/logo.png') },
        { property: 'og:image', content: ogImage },
        { property: 'og:image:secure_url', content: ogImage },
        { property: 'og:image:type', content: 'image/png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: openGraph?.title || title },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: ogImage },
      ],
    };
  },
  component: () => <Outlet />,
});
