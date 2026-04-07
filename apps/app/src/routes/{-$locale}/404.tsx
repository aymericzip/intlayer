import { createFileRoute } from '@tanstack/react-router';
import { getIntlayer } from 'intlayer';
import { NotFoundComponent } from '#components/NotFoundComponent';

export const Route = createFileRoute('/{-$locale}/404')({
  component: NotFoundComponent,
  head: ({ params }) => {
    const { locale } = params;
    const content = getIntlayer('404', locale);

    return {
      title: content.metadata.title,
      meta: [
        {
          name: 'description',
          content: content.metadata.description,
        },
        { name: 'robots', content: 'noindex, nofollow' },
      ],
    };
  },
});
