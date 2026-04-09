import { createFileRoute } from '@tanstack/react-router';
import { getIntlayer } from 'intlayer';
import { DictionaryListDashboard } from '#components/Dashboard/DictionaryListDashboard';

export const Route = createFileRoute(
  '/{-$locale}/_dashboard/_editor/_content/dictionary/'
)({
  component: DictionaryPage,
  head: ({ params }) => {
    const { locale } = params;
    const content = getIntlayer('dictionary-dashboard-page', locale);

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

function DictionaryPage() {
  return <DictionaryListDashboard />;
}
