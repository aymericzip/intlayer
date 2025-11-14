'use client';

import { Button } from '@intlayer/design-system';
import { useUser } from '@intlayer/design-system/hooks';
import { getAuthAPI } from '@intlayer/design-system/libs';
import { useIntlayer } from 'next-intlayer';
import { type FC, useEffect } from 'react';
import { GithubLogo } from './assets/GithubLogo';
import { GoogleLogo } from './assets/GoogleLogo';

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

type ExternalsLoginButtonsProps = {
  onLogin?: () => void;
};

export const ExternalsLoginButtons: FC<ExternalsLoginButtonsProps> = (
  props
) => {
  const externalsLoginButtons = useIntlayer('externals-login-buttons');

  return (
    <div className="relative flex flex-col justify-center gap-y-3">
      <div className="mb-3 flex w-full items-center gap-3 text-center text-base">
        <div className="h-px w-full bg-neutral" />
        <div className="text-neutral">{externalsLoginButtons.span}</div>
        <div className="h-px w-full bg-neutral" />
      </div>
      <GoogleLoginButton {...props} />
      <GitHubLoginButton {...props} />
    </div>
  );
};
