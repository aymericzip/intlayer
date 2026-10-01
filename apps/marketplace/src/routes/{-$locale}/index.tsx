import { Marketplace_Root } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { ReviewerMarketplacePage } from '#components/ReviewerMarketplacePage';

export const Route = createFileRoute('/{-$locale}/')({
  component: MarketplacePage,
  loader: async ({ params }) => {
    const { locale } = params;
    const content = await getIntlayerAsync('find-reviewer-page', locale);

    return {
      title: String(content.title),
      description: String(content.description),
    };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    if (!loaderData) return {};

    const { locale } = params;
    const path = Marketplace_Root;
    const { title, description } = loaderData;

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
      meta: [{ title }, { name: 'description', content: description }],
    };
  },
});

function MarketplacePage() {
  return <ReviewerMarketplacePage />;
}
