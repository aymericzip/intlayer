import { createFileRoute } from '@tanstack/react-router';
import { getIntlayer } from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { BackgroundLayout } from '#components/BackgroundLayout';
import { DashboardContentLayout } from '#components/Dashboard/DashboardContentLayout';
import { TagList } from '#components/Dashboard/TagForm/TagList';

export const Route = createFileRoute('/{-$locale}/_dashboard/_editor/tags/')({
  component: TagsPage,
  head: ({ params }) => {
    const { locale } = params;
    const content = getIntlayer('tags-dashboard-page', locale);

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

function TagsPage() {
  const { title } = useIntlayer('tags-dashboard-page');

  return (
    <DashboardContentLayout title={title}>
      <TagList />
      <BackgroundLayout />
    </DashboardContentLayout>
  );
}
