import { Loader } from '@intlayer/design-system/loader';
import {
  App_Auth_SignIn_Path,
  App_Home_Path,
} from '@intlayer/design-system/routes';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';
import { sessionQueryOptions } from '#utils/auth';

export const Route = createFileRoute('/demo')({
  component: DemoPage,
});

function DemoPage() {
  const navigate = useLocalizedNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const session = queryClient.getQueryData<{ user?: unknown }>(
      sessionQueryOptions.queryKey
    );

    if (session?.user) {
      navigate({ to: '/' });
      return;
    }

    const backendUrl = import.meta.env.VITE_BACKEND_URL ?? '';

    fetch(`${backendUrl}/api/demo/session`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(async () => {
        await queryClient.invalidateQueries({
          queryKey: sessionQueryOptions.queryKey,
        });

        navigate({ to: App_Home_Path });
      })
      .catch(() => {
        navigate({ to: App_Auth_SignIn_Path });
      });
  }, [navigate, queryClient]);

  return <Loader />;
}
