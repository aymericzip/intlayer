import {
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Organization_Path,
  App_Dashboard_Projects_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { getIntlayer } from 'intlayer';
import { NotFoundComponent } from '#components/NotFoundComponent';
import { sessionQueryOptions } from '#utils/auth.tsx';

export const Route = createFileRoute('/{-$locale}/404')({
  beforeLoad: async ({ params, context }) => {
    const { locale } = params;
    const session =
      await context.queryClient.ensureQueryData(sessionQueryOptions);

    if (session) {
      if (session.organization && session.project) {
        throw redirect({
          to: `/{-$locale}${App_Dashboard_Dictionaries_Path}`,
          params: {
            locale,
          },
        });
      } else if (session.organization) {
        throw redirect({
          to: `/{-$locale}${App_Dashboard_Projects_Path}`,
          params: {
            locale,
          },
        });
      } else {
        throw redirect({
          to: `/{-$locale}${App_Dashboard_Organization_Path}`,
          params: {
            locale,
          },
        });
      }
    }
  },
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
