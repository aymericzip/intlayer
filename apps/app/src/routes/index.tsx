import {
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Organization_Path,
  App_Dashboard_Projects_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { defaultLocale, getLocalizedUrl } from 'intlayer';
import { sessionQueryOptions } from '#utils/auth.tsx';

export const Route = createFileRoute('/')({
  beforeLoad: async ({ context }) => {
    const session =
      await context.queryClient.ensureQueryData(sessionQueryOptions);

    if (session) {
      if (session.organization && session.project) {
        throw redirect({
          to: getLocalizedUrl(
            App_Dashboard_Dictionaries_Path,
            defaultLocale
          ) as any,
        });
      } else if (session.organization) {
        throw redirect({
          to: getLocalizedUrl(
            App_Dashboard_Projects_Path,
            defaultLocale
          ) as any,
        });
      } else {
        throw redirect({
          to: getLocalizedUrl(
            App_Dashboard_Organization_Path,
            defaultLocale
          ) as any,
        });
      }
    }

    throw redirect({
      to: '/{-$locale}',
      params: { locale: defaultLocale },
    });
  },
});
