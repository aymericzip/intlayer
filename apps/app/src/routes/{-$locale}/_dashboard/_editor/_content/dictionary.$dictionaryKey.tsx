import { createFileRoute } from '@tanstack/react-router';
import { BackgroundLayout } from '#components/BackgroundLayout';
import { ContentDashboard } from '#components/Dashboard/ContentDashboard';

export const Route = createFileRoute('/{-$locale}/_dashboard/_editor/_content/dictionary/$dictionaryKey')({
  component: DictionaryDetailPage,
});

function DictionaryDetailPage() {
  const { dictionaryKey } = Route.useParams();

  return (
    <>
      <div className="flex min-h-0 w-full flex-1 flex-col items-stretch px-10">
        <ContentDashboard dictionaryKey={dictionaryKey} />
      </div>
      <BackgroundLayout />
    </>
  );
}
