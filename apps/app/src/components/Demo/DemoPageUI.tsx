import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { Loader } from '@intlayer/design-system/loader';
import {
  App_Auth_SignIn_Path,
  App_Home_Path,
} from '@intlayer/design-system/routes';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useDemoBootstrap } from '#hooks/useDemoBootstrap';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate';
import { sessionQueryOptions } from '#utils/auth';

type DemoPageUIProps = {
  autoBootstrap: boolean;
};

export const DemoPageUI = ({ autoBootstrap }: DemoPageUIProps) => {
  const content = useIntlayer('demo-route');
  const navigate = useLocalizedNavigate();
  const { switchToDemoSession, isBootstrapping } = useDemoBootstrap();

  const { data: session, isFetching: isSessionLoading } = useQuery({
    ...sessionQueryOptions,
    staleTime: 0,
  });
  const hasAttemptedBootstrap = useRef(false);

  const isAuthenticated = !!session?.user;

  useEffect(() => {
    if (
      !isSessionLoading &&
      !isAuthenticated &&
      autoBootstrap &&
      !hasAttemptedBootstrap.current
    ) {
      hasAttemptedBootstrap.current = true;
      switchToDemoSession();
    }
  }, [isSessionLoading, isAuthenticated, autoBootstrap, switchToDemoSession]);

  if (
    isSessionLoading ||
    isBootstrapping ||
    (autoBootstrap && !isAuthenticated)
  ) {
    return <Loader />;
  }

  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center p-5 md:p-10">
      <Container
        className="w-full max-w-md justify-center gap-10 p-10"
        padding="xl"
        roundedSize="3xl"
        transparency="xs"
      >
        {isAuthenticated ? (
          <>
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
          </>
        ) : (
          <>
            <div className="flex flex-col gap-3 py-3 text-center">
              <h2 className="font-extrabold text-2xl">
                {content.welcomeToIntlayer}
              </h2>
              <span className="text-neutral text-sm">
                {content.notSignedInPrompt}
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => navigate({ to: App_Auth_SignIn_Path })}
                color="text"
                label={content.signInOrSignUp.value}
              >
                {content.signInOrSignUp}
              </Button>
              <Button
                onClick={switchToDemoSession}
                color="text"
                variant="outline"
                label={content.exploreDemo.value}
              >
                {content.exploreDemo}
              </Button>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};
