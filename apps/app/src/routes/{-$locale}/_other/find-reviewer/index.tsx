import { App_ReviewerMarketplace } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { ReviewerMarketplacePage } from '#components/ReviewerMarketplacePage';
import { redirectIfSelfHosted } from '#utils/selfHosted';

export const Route = createFileRoute('/{-$locale}/_other/find-reviewer/')({
  beforeLoad: ({ params }) => redirectIfSelfHosted(params.locale),
  component: MarketplacePage,
  loader: async ({ params }) => {
    const { locale } = params;

    return { content: await getIntlayerAsync('find-reviewer-page', locale) };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    if (!loaderData) return {};

    const { locale } = params;
    const path = App_ReviewerMarketplace;
    const { content } = loaderData;

    return {
      links: [
        { rel: 'canonical', href: getLocalizedUrl(path, locale) },
        ...localeMap(({ locale: mapLocale }) => ({
          rel: 'alternate',
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),
        {
          rel: 'alternate',
          hrefLang: 'x-default',
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: content.title },
        { name: 'description', content: content.description },
      ],
    };
  },
});

function MarketplacePage() {
  return <ReviewerMarketplacePage />;
}
