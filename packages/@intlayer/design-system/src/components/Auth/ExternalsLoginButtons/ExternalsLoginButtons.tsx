'use client';

import { getConfiguration } from '@intlayer/config/client';
import type { FC } from 'react';
import { Button } from '../../Button';
import { GithubLogo } from './assets/GithubLogo';
import { GoogleLogo } from './assets/GoogleLogo';
import { getExternalsLoginButtonsContent } from './externalsLoginButtons.content';

export const GitHubLoginButton: FC = () => {
  const {
    editor: { backendURL, githubClientId },
  } = getConfiguration();

  const externalsLoginButtonsContent = getExternalsLoginButtonsContent();
  const loginWithGitHub = () => {
    const origin = window.location.href;

    const encodedOrigin = encodeURIComponent(origin);

    const redirectURI = `${backendURL}/api/auth/callback/github?redirect_uri=${encodedOrigin}`;
    const encodedRedirectURI = encodeURIComponent(redirectURI);

    window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${encodedRedirectURI}`;
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
  const {
    editor: { backendURL, googleClientId },
  } = getConfiguration();

  const externalsLoginButtonsContent = getExternalsLoginButtonsContent();

  const loginWithGoogle = () => {
    const origin = window.location.href;
    const responseType = 'code';
    const scope = [
      'https%3A//www.googleapis.com/auth/userinfo.email',
      'https%3A//www.googleapis.com/auth/userinfo.profile',
    ].join(' ');
    const includeGrantedScopes = 'false';

    const encodedOrigin = encodeURIComponent(origin);
    const state = JSON.stringify({ redirect_uri: encodedOrigin });

    const redirectURI = `${backendURL}/api/auth/callback/google`;

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=${scope}&include_granted_scopes=${includeGrantedScopes}&state=${state}`;
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
