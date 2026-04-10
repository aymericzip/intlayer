import {
  App_Dashboard,
  App_Dashboard_Editor,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { getIntlayer, getLocalizedUrl } from 'intlayer';
import { BreadcrumbsHeader } from '#/structuredData/BreadcrumbsHeader';
import { Editor } from '#components/Dashboard/Editor';
import { DictionaryLoaderDashboard } from '#components/Dashboard/Editor/DictionaryLoaderDashboard';

export const Route = createFileRoute(
  '/{-$locale}/_dashboard/_editor/_content/editor'
)({
  component: EditorPage,
  head: ({ params }) => {
    const { locale } = params;
    const content = getIntlayer('editor-dashboard-page', locale);

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

function EditorPage() {
  const { locale } = Route.useParams();

  return (
    <div className="flex size-full flex-1 flex-col items-center justify-center p-2">
      <BreadcrumbsHeader
        breadcrumbs={[
          {
            name: 'Dashboard',
            url: getLocalizedUrl(App_Dashboard, locale),
          },
          {
            name: 'Editor',
            url: getLocalizedUrl(App_Dashboard_Editor, locale),
          },
        ]}
      />
      <Editor DictionariesLoader={DictionaryLoaderDashboard} />
    </div>
  );
}
