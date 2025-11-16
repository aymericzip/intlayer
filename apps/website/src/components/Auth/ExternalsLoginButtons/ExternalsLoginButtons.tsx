'use client';

import { Button } from '@intlayer/design-system';
import { useUser } from '@intlayer/design-system/hooks';
import { getAuthAPI } from '@intlayer/design-system/libs';
import { useIntlayer } from 'next-intlayer';
import { type FC, useEffect } from 'react';
import { GithubLogo } from './assets/GithubLogo';
import { GoogleLogo } from './assets/GoogleLogo';
import { LinkedInLogo } from './assets/LinkedInLogo';

export const GitHubLoginButton: FC<ExternalsLoginButtonsProps> = ({
  onLogin,
}) => {
  const { user } = useUser();
  const externalsLoginButtons = useIntlayer('externals-login-buttons');
  const loginWithGitHub = async () => {
    const origin = window.location.href;

    await getAuthAPI().signInSocial({
      provider: 'github',
      callbackURL: origin,
    });
  };

  useEffect(() => {
    if (user?.email) {
      onLogin?.();
    }
  }, [user]);
  return (
    <Button
      label={externalsLoginButtons.github.label.value}
      Icon={GithubLogo}
      onClick={loginWithGitHub}
      color="text"
    >
      {externalsLoginButtons.github.label}
    </Button>
  );
};

export const GoogleLoginButton: FC<ExternalsLoginButtonsProps> = ({
  onLogin,
}) => {
  const { user } = useUser();
  const externalsLoginButtons = useIntlayer('externals-login-buttons');
  const loginWithGoogle = async () => {
    const origin = window.location.href;

    await getAuthAPI().signInSocial({
      provider: 'google',
      callbackURL: origin,
    });
  };

  useEffect(() => {
    if (user?.email) {
      onLogin?.();
    }
  }, [user]);

  return (
    <Button
      className="bg-red-400 ring-red-400/20 hover:bg-red-500"
      label={externalsLoginButtons.google.label.value}
      Icon={GoogleLogo}
      onClick={loginWithGoogle}
      color="custom"
    >
      {externalsLoginButtons.google.label}
    </Button>
  );
};

export const LinkedInLoginButton: FC<ExternalsLoginButtonsProps> = ({
  onLogin,
}) => {
  const { user } = useUser();
  const externalsLoginButtons = useIntlayer('externals-login-buttons');
  const loginWithLinkedIn = async () => {
    const origin = window.location.href;

    await getAuthAPI().signInSocial({
      provider: 'linkedin',
      callbackURL: origin,
    });
  };

  useEffect(() => {
    if (user?.email) {
      onLogin?.();
    }
  }, [user]);

  return (
    <Button
      className="bg-blue-800/80! text-white ring-blue-600/20 hover:bg-blue-800! dark:bg-blue-400/80!"
      label={externalsLoginButtons.linkedin.label.value}
      Icon={LinkedInLogo}
      onClick={loginWithLinkedIn}
      color="custom"
    >
      {externalsLoginButtons.linkedin.label}
    </Button>
  );
};

type ExternalsLoginButtonsProps = {
  onLogin?: () => void;
};

export const ExternalsLoginButtons: FC<ExternalsLoginButtonsProps> = (
  props
) => (
  <div className="relative flex flex-col justify-center gap-y-3">
    <GitHubLoginButton {...props} />
    <GoogleLoginButton {...props} />
    <LinkedInLoginButton {...props} />
  </div>
);
