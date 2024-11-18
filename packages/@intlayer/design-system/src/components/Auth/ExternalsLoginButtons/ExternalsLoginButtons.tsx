'use client';

import type { FC } from 'react';
import { intlayerAPI } from '../../../libs/intlayer-api';
import { Button } from '../../Button';
import { GithubLogo } from './assets/GithubLogo';
import { GoogleLogo } from './assets/GoogleLogo';
import { getExternalsLoginButtonsContent } from './externalsLoginButtons.content';

export const GitHubLoginButton: FC = () => {
  const externalsLoginButtonsContent = getExternalsLoginButtonsContent();
  const loginWithGitHub = () => {
    const origin = window.location.href;

    const authURL = intlayerAPI.auth.getLoginWithGitHubURL({ origin });

    window.location.href = authURL;
  };

  return (
    <Button
      label={externalsLoginButtonsContent.github.label}
      Icon={GithubLogo}
      onClick={loginWithGitHub}
      color="text"
    >
      {externalsLoginButtonsContent.github.label}
    </Button>
  );
};

export const GoogleLoginButton: FC = () => {
  const externalsLoginButtonsContent = getExternalsLoginButtonsContent();

  const loginWithGoogle = () => {
    const origin = window.location.href;

    const authURL = intlayerAPI.auth.getLoginWithGoogleURL({ origin });

    window.location.href = authURL;
  };

  return (
    <Button
      className="bg-red-400 hover:bg-red-500 dark:hover:bg-red-300"
      label={externalsLoginButtonsContent.google.label}
      Icon={GoogleLogo}
      onClick={loginWithGoogle}
      color="custom"
    >
      {externalsLoginButtonsContent.google.label}
    </Button>
  );
};

export const ExternalsLoginButtons: FC = () => {
  const externalsLoginButtonsContent = getExternalsLoginButtonsContent();

  return (
    <div className="relative flex flex-col justify-center gap-y-3">
      <div className="mb-3 flex w-full items-center gap-3 text-center text-base">
        <div className="bg-neutral dark:bg-neutral-dark h-[1px] w-full" />
        <div className="text-neutral dark:text-neutral-dark">
          {externalsLoginButtonsContent.span}
        </div>
        <div className="bg-neutral dark:bg-neutral-dark h-[1px] w-full" />
      </div>
      <GoogleLoginButton />
      <GitHubLoginButton />
    </div>
  );
};
