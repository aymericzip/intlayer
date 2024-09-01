import GithubLogo from '@assets/github.svg';
import GoogleLogo from '@assets/google.svg';
import { Button } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';

export const GitHubLoginButton: FC = () => {
  const { github } = useIntlayer('externals-login-button');

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
      label={github.label.value}
      Icon={GithubLogo}
      onClick={loginWithGitHub}
      color="text"
    >
      {github.label}
    </Button>
  );
};

export const GoogleLoginButton: FC = () => {
  const { google } = useIntlayer('externals-login-button');

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
    <Button
      label={google.label.value}
      Icon={GoogleLogo}
      onClick={loginWithGoogle}
      color="custom"
      className="bg-red-400 hover:bg-red-500 dark:hover:bg-red-300"
    >
      {google.label}
    </Button>
  );
};

export const ExternalsLoginButtons: FC = () => {
  const { span } = useIntlayer('externals-login-button');

  return (
    <div className="relative flex flex-col justify-center gap-y-3">
      <div className="mb-3 flex w-full items-center gap-3 text-center text-base">
        <span className="bg-neutral dark:bg-neutral-dark h-[1px] w-full"></span>
        <span className="text-neutral dark:text-neutral-dark">{span}</span>
        <span className="bg-neutral dark:bg-neutral-dark h-[1px] w-full"></span>
      </div>
      <GoogleLoginButton />
      <GitHubLoginButton />
    </div>
  );
};
