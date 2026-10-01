import { createFileRoute } from '@tanstack/react-router';
import { getIntlayerAsync } from 'intlayer';
import { NotFoundComponent } from '#components/NotFoundComponent';

export const Route = createFileRoute('/{-$locale}/404')({
  component: NotFoundComponent,
  loader: async ({ params }) => {
    const { locale } = params;
    const content = await getIntlayerAsync('404', locale);

    return {
      title: String(content.metadata.title),
      description: String(content.metadata.description),
    };
  },
  staleTime: Infinity,
  head: ({ loaderData }) => {
    if (!loaderData) return {};

    const { title, description } = loaderData;

    return {
      title,
      meta: [
        {
          name: 'description',
          content: description,
        },
        { name: 'robots', content: 'noindex, nofollow' },
      ],
    };
  },
});
