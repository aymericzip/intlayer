'use client';

import { getAuthAPI } from '@intlayer/api';
import { useEffect, type FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { Button } from '../../Button';
import { useUser } from '../useUser';
import { GithubLogo } from './assets/GithubLogo';
import { GoogleLogo } from './assets/GoogleLogo';
import { externalsLoginButtonsContent } from './externalsLoginButtons.content';

export const GitHubLoginButton: FC<ExternalsLoginButtonsProps> = ({
  onLogin,
}) => {
  const { user } = useUser();
  const externalsLoginButtons = useDictionary(externalsLoginButtonsContent);
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
  const externalsLoginButtons = useDictionary(externalsLoginButtonsContent);
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
      className="bg-red-400 hover:bg-red-500 dark:hover:bg-red-300"
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
  const externalsLoginButtons = useDictionary(externalsLoginButtonsContent);

  return (
    <div className="relative flex flex-col justify-center gap-y-3">
      <div className="mb-3 flex w-full items-center gap-3 text-center text-base">
        <div className="bg-neutral h-px w-full" />
        <div className="text-neutral">{externalsLoginButtons.span}</div>
        <div className="bg-neutral h-px w-full" />
      </div>
      <GoogleLoginButton {...props} />
      <GitHubLoginButton {...props} />
    </div>
  );
};
