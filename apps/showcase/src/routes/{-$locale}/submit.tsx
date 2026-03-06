import { createFileRoute } from '@tanstack/react-router';
import { getIntlayer } from 'intlayer';
import { SubmitProjectForm } from '@/components/SubmitProjectForm/SubmitProjectForm';

export const Route = createFileRoute('/{-$locale}/submit')({
  component: SubmitProjectForm,
  head: ({ params }) => {
    const { locale } = params as { locale?: string };
    const content = getIntlayer('app', locale);

    return {
      meta: [
        { title: `Submit Project - ${content.metadata.title}` },
        {
          name: 'description',
          content: content.metadata.description,
        },
      ],
    };
  },
});
