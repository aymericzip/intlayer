import { App_ReviewerMarketplace_Path } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayer, getLocalizedUrl, localeMap } from 'intlayer';
import { ReviewerMarketplacePage } from '#components/ReviewerMarketplacePage';

export const Route = createFileRoute(
  '/{-$locale}/_other/find-reviewer/'
)({
  component: MarketplacePage,
  head: ({ params }) => {
    const { locale } = params;
    const path = App_ReviewerMarketplace_Path;
    const content = getIntlayer('find-reviewer-page', locale);

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
