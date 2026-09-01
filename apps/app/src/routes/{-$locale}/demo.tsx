import { getStatusAPI } from '@intlayer/api/status';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { LanguageBackground } from '@intlayer/design-system/language-background';
import {
  App_Auth_SignIn_Path,
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Organization_Path,
  App_Dashboard_Projects_Path,
} from '@intlayer/design-system/routes';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { useCallback, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { BackgroundLayout } from '#components/BackgroundLayout';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';
import { sessionQueryOptions } from '#utils/auth';
import { redirectIfSelfHosted } from '#utils/selfHosted';

export const Route = createFileRoute('/{-$locale}/demo')({
  beforeLoad: async ({ context, params }) => {
    redirectIfSelfHosted(params.locale);

    // An authenticated visitor has nothing to choose here: the demo account
    // would replace their own session. Send them to the dashboard root instead.
    const session = await context.queryClient.query(sessionQueryOptions);

    if (session?.user) {
      throw redirect({ to: '/{-$locale}', params: { locale: params.locale } });
    }
  },
  component: DemoPage,
});

function DemoPage() {
  const content = useIntlayer('route');
  const navigate = useLocalizedNavigate();
  const queryClient = useQueryClient();
  const [isLoadingDemoSession, setIsLoadingDemoSession] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const goToLogIn = useCallback(
    () => navigate({ to: App_Auth_SignIn_Path }),
    [navigate]
  );

  const loadDemoSession = useCallback(async () => {
    setIsLoadingDemoSession(true);
    setErrorMessage(null);

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
      await queryClient.invalidateQueries({ queryKey: ['deviceSessions'] });

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
      setErrorMessage(content.failedToCreateDemoSession.value);
      setIsLoadingDemoSession(false);
    }
  }, [navigate, queryClient, content]);

  return (
    <BackgroundLayout>
      <LanguageBackground>
        <div className="flex flex-1 flex-col items-center justify-center gap-5 p-5 md:p-10">
          <Container
            className="w-full max-w-md justify-center gap-10 p-10"
            padding="xl"
            roundedSize="3xl"
            transparency="xs"
            border
            borderColor="neutral"
          >
            <div className="flex flex-col gap-3 text-center">
              <h1 className="font-extrabold text-2xl">{content.title}</h1>
              <span className="text-neutral text-xs">
                {content.description}
              </span>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <Button
                className="flex-1"
                color="text"
                disabled={isLoadingDemoSession}
                label={content.logIn.value}
                onClick={goToLogIn}
                variant="outline"
              >
                {content.logIn}
              </Button>
              <Button
                className="flex-1"
                color="text"
                isLoading={isLoadingDemoSession}
                label={content.loadDemoSession.value}
                onClick={loadDemoSession}
                variant="default"
              >
                {content.loadDemoSession}
              </Button>
            </div>

            {errorMessage && (
              <span className="text-center text-error text-xs">
                {errorMessage}
              </span>
            )}
          </Container>
        </div>
      </LanguageBackground>
    </BackgroundLayout>
  );
}
