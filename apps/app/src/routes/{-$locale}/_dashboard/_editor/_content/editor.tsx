import { createFileRoute } from '@tanstack/react-router';
import { getIntlayer } from 'intlayer';
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
  return (
    <div className="flex size-full flex-1 flex-col items-center justify-center p-2">
      <Editor DictionariesLoader={DictionaryLoaderDashboard} />
    </div>
  );
}
