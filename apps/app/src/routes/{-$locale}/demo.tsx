import { getStatusAPI } from '@intlayer/api/status';
import { Loader } from '@intlayer/design-system/loader';
import {
  App_Auth_SignIn_Path,
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Organization_Path,
  App_Dashboard_Projects_Path,
} from '@intlayer/design-system/routes';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useCallback, useEffect } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';
import { sessionQueryOptions } from '#utils/auth';
import { redirectIfSelfHosted } from '#utils/selfHosted';

export const Route = createFileRoute('/{-$locale}/demo')({
  beforeLoad: ({ params }) => redirectIfSelfHosted(params.locale),
  component: DemoPage,
});

function DemoPage() {
  const content = useIntlayer('route');
  const navigate = useLocalizedNavigate();
  const queryClient = useQueryClient();

  const switchToDemoSession = useCallback(async () => {
    try {
      const { ok } = await getStatusAPI().getDemoSession();

      if (!ok) {
        throw new Error(content.failedToCreateDemoSession.value);
      }

      // Force a fresh session fetch so the cookie set by the demo endpoint
      // is picked up before we navigate — bypasses the 5-min staleTime.
      const freshSession = await queryClient.query({
        ...sessionQueryOptions,
        staleTime: 0,
      });

      // Invalidate device sessions so the new demo account appears in the switcher
      await queryClient.invalidateQueries({
        queryKey: ['deviceSessions'],
      });

      if (!freshSession?.user) {
        throw new Error(content.failedToCreateDemoSession.value);
      }

      if (freshSession.organization && freshSession.project) {
        navigate({ to: App_Dashboard_Dictionaries_Path });
      } else if (freshSession.organization) {
        navigate({ to: App_Dashboard_Projects_Path });
      } else {
        navigate({ to: App_Dashboard_Organization_Path });
      }
    } catch {
      navigate({ to: App_Auth_SignIn_Path });
    }
  }, [navigate, queryClient, content]);

  useEffect(() => {
    switchToDemoSession();
  }, [switchToDemoSession]);

  return <Loader />;
}
