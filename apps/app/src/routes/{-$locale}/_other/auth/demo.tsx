import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { Loader } from '@intlayer/design-system/loader';
import {
  App_Auth_SignIn_Path,
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Organization_Path,
  App_Dashboard_Projects_Path,
  App_Home_Path,
} from '@intlayer/design-system/routes';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useCallback, useEffect, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useLocalizedNavigate } from '#/hooks/useLocalizedNavigate';
import { sessionQueryOptions } from '#utils/auth';

export const Route = createFileRoute('/{-$locale}/_other/auth/demo')({
  component: DemoPage,
});

function DemoPage() {
  const content = useIntlayer('route1');

  const navigate = useLocalizedNavigate();
  const queryClient = useQueryClient();
  const [isPrompting, setIsPrompting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const switchToDemoSession = useCallback(async () => {
    setIsLoading(true);
    const backendUrl = import.meta.env.VITE_BACKEND_URL ?? '';

    try {
      const res = await fetch(`${backendUrl}/api/demo/session`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error(content.failedToCreateDemoSession.value);
      }

      // Force a fresh session fetch so the cookie set by the demo endpoint
      // is picked up before we navigate — bypasses the 5-min staleTime.
      const freshSession = await queryClient.fetchQuery({
        ...sessionQueryOptions,
        staleTime: 0,
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
    const session = queryClient.getQueryData<{ user?: unknown }>(
      sessionQueryOptions.queryKey
    );

    if (session?.user) {
      setIsPrompting(true);
      setIsLoading(false);
      return;
    }

    switchToDemoSession();
  }, [switchToDemoSession, queryClient]);

  if (isLoading && !isPrompting) {
    return <Loader />;
  }

  if (isPrompting) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center p-5 md:p-10">
        <Container
          className="w-full max-w-md justify-center gap-10 p-10"
          padding="xl"
          roundedSize="3xl"
          transparency="xs"
        >
          <div className="flex flex-col gap-3 py-3 text-center">
            <h2 className="font-extrabold text-2xl">{content.demoSession}</h2>
            <span className="text-neutral text-sm">
              {content.youAreCurrentlyLoggedIn}
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <Button
              onClick={switchToDemoSession}
              color="text"
              variant="outline"
              label={content.switchToDemoSession.value}
            >
              {content.switchToDemoSession}
            </Button>
            <Button
              onClick={() => navigate({ to: App_Home_Path })}
              color="text"
              label={content.returnToHomepage.value}
            >
              {content.returnToHomepage}
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return <></>;
}
