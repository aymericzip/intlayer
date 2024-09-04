'use client';

import type { FC } from 'react';
import tw from 'twin.macro';
import { Button } from '../../Button';
import { GithubLogo } from './assets/GithubLogo';
import { GoogleLogo } from './assets/GoogleLogo';
import { getExternalsLoginButtonsContent } from './externalsLoginButtons.content';

export const GitHubLoginButton: FC = () => {
  const externalsLoginButtonsContent = getExternalsLoginButtonsContent();
  const loginWithGitHub = () => {
    const origin = window.location.href;
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!;

    const encodedOrigin = encodeURIComponent(origin);

    const redirectURI = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/callback/github?redirect_uri=${encodedOrigin}`;
    const encodedRedirectURI = encodeURIComponent(redirectURI);

    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodedRedirectURI}`;
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

const StyledGoogleButton = tw(
  Button
)`bg-red-400 hover:bg-red-500 dark:hover:bg-red-300`;

export const GoogleLoginButton: FC = () => {
  const externalsLoginButtonsContent = getExternalsLoginButtonsContent();

  const loginWithGoogle = () => {
    const origin = window.location.href;
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
    const responseType = 'code';
    const scope = [
      'https%3A//www.googleapis.com/auth/userinfo.email',
      'https%3A//www.googleapis.com/auth/userinfo.profile',
    ].join(' ');
    const includeGrantedScopes = 'false';

    const encodedOrigin = encodeURIComponent(origin);
    const state = JSON.stringify({ redirect_uri: encodedOrigin });

    const redirectURI = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/callback/google`;

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=${scope}&include_granted_scopes=${includeGrantedScopes}&state=${state}`;
  };

  return (
    <StyledGoogleButton
      label={externalsLoginButtonsContent.google.label}
      Icon={GoogleLogo}
      onClick={loginWithGoogle}
      color="custom"
    >
      {externalsLoginButtonsContent.google.label}
    </StyledGoogleButton>
  );
};

const StyledContainer = tw.div`relative flex flex-col justify-center gap-y-3`;
const StyledSeparatorContainer = tw.div`mb-3 flex w-full items-center gap-3 text-center text-base`;
const StyledSeparator = tw.div`bg-neutral dark:bg-neutral-dark h-[1px] w-full`;
const StyledSeparatorText = tw.span`text-neutral dark:text-neutral-dark`;

export const ExternalsLoginButtons: FC = () => {
  const externalsLoginButtonsContent = getExternalsLoginButtonsContent();

  return (
    <StyledContainer>
      <StyledSeparatorContainer>
        <StyledSeparator />
        <StyledSeparatorText>
          {externalsLoginButtonsContent.span}
        </StyledSeparatorText>
        <StyledSeparator />
      </StyledSeparatorContainer>
      <GoogleLoginButton />
      <GitHubLoginButton />
    </StyledContainer>
  );
};
