import { createFileRoute } from '@tanstack/react-router';
import { getIntlayer } from 'intlayer';
import { DictionaryLoaderDashboard } from '#components/Dashboard/Editor/DictionaryLoaderDashboard';
import { TranslateDashboard } from '#components/Dashboard/TranslateDashboard';

export const Route = createFileRoute(
  '/{-$locale}/_dashboard/_editor/_content/translate'
)({
  component: TranslatePage,
  head: ({ params }) => {
    const { locale } = params;
    const content = getIntlayer('translate-dashboard-page', locale);

    return {
      title: content.metadata.title,
      meta: [
        {
          name: 'description',
          content: content.metadata.description,
        },
      ],
    };
  },
});

function TranslatePage() {
  return (
    <div className="relative flex flex-1 flex-col items-center">
      <DictionaryLoaderDashboard />
      <TranslateDashboard />
    </div>
  );
}
