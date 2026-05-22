import { createFileRoute } from '@tanstack/react-router';
import { TranslatorProfilePage } from '#components/TranslatorProfilePage';

export const Route = createFileRoute(
  '/{-$locale}/_other/translator-marketplace/$translatorId'
)({
  component: TranslatorPage,
  head: () => ({
    meta: [
      { title: 'Translator Profile — Intlayer' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
});

function TranslatorPage() {
  const { translatorId } = Route.useParams();
  return <TranslatorProfilePage translatorId={translatorId} />;
}
