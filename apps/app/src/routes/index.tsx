import {
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Organization_Path,
  App_Dashboard_Projects_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { defaultLocale } from 'intlayer';
import { sessionQueryOptions } from '#utils/auth.tsx';

export const Route = createFileRoute('/')({
  beforeLoad: async ({ context }) => {
    const session =
      await context.queryClient.ensureQueryData(sessionQueryOptions);
    if (session) {
      if (session.organization && session.project) {
        throw redirect({
          to: `/{-$locale}${App_Dashboard_Dictionaries_Path}`,
          params: {
            locale: defaultLocale,
          },
        });
      } else if (session.organization) {
        throw redirect({
          to: `/{-$locale}${App_Dashboard_Projects_Path}`,
          params: {
            locale: defaultLocale,
          },
        });
      } else {
        throw redirect({
          to: `/{-$locale}${App_Dashboard_Organization_Path}`,
          params: {
            locale: defaultLocale,
          },
        });
      }
    }
    throw redirect({
      to: `/{-$locale}${App_Dashboard_Organization_Path}`,
      params: {
        locale: defaultLocale,
      },
    });
  },
});
