import { createFileRoute } from '@tanstack/react-router';
import { useIntlayer } from 'react-intlayer';
import { BackgroundLayout } from '#components/BackgroundLayout';
import { DashboardContentLayout } from '#components/Dashboard/DashboardContentLayout';
import { TagDetails } from '#components/Dashboard/TagForm/TagDetails';

export const Route = createFileRoute(
  '/{-$locale}/_dashboard/_editor/tags/$tagKey'
)({
  component: TagDetailPage,
});

function TagDetailPage() {
  const { tagKey } = Route.useParams();
  const { title } = useIntlayer('tag-dashboard-page');

  return (
    <DashboardContentLayout title={title}>
      <div className="flex w-full flex-1 flex-col items-center p-10">
        <TagDetails tagKey={tagKey} />
      </div>
      <BackgroundLayout />
    </DashboardContentLayout>
  );
}
