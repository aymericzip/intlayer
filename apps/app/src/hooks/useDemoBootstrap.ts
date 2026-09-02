import { getStatusAPI } from '@intlayer/api/status';
import {
  App_Auth_SignIn_Path,
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Organization_Path,
  App_Dashboard_Projects_Path,
} from '@intlayer/design-system/routes';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate';
import { refetchFreshSession } from '#utils/auth';

export const useDemoBootstrap = () => {
  const content = useIntlayer('demo-route');
  const navigate = useLocalizedNavigate();
  const queryClient = useQueryClient();
  const [isBootstrapping, setIsBootstrapping] = useState(false);

  const switchToDemoSession = useCallback(async () => {
    setIsBootstrapping(true);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL ?? '';
      const { ok } = await getStatusAPI({}, {
        editor: { backendURL: backendUrl },
      } as any).getDemoSession();

      if (!ok) {
        throw new Error(content.failedToCreateDemoSession.value);
      }

      const freshSession = await refetchFreshSession(queryClient);

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
    } catch (err) {
      console.log(err);
      navigate({ to: App_Auth_SignIn_Path });
      setIsBootstrapping(false);
    }
  }, [navigate, queryClient, content]);

  return {
    switchToDemoSession,
    isBootstrapping,
  };
};
