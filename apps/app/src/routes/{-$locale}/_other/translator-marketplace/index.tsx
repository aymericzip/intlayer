import { createFileRoute } from '@tanstack/react-router';
import { TranslatorMarketplacePage } from '#components/TranslatorMarketplacePage';

export const Route = createFileRoute(
  '/{-$locale}/_other/translator-marketplace/'
)({
  component: MarketplacePage,
  head: () => ({
    meta: [
      { title: 'Translator Marketplace — Intlayer' },
      {
        name: 'description',
        content:
          'Find professional human translators to review and refine your AI-generated translations.',
      },
    ],
  }),
});

function MarketplacePage() {
  return <TranslatorMarketplacePage />;
}
