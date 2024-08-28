import GithubLogo from '@assets/github.svg';
import GoogleLogo from '@assets/google.svg';
import { Button } from '@intlayer/design-system';
import { signIn } from 'next-auth/react';
import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';

export const GitHubLoginButton: FC = () => {
  const { github } = useIntlayer('ext-login-button');
  const onClick = async () => {
    await signIn('github');
  };

  return (
    <Button
      className="w-full"
      label={github.label.value}
      Icon={GithubLogo}
      onClick={onClick}
      color="text"
    >
      {github.label}
    </Button>
  );
};

export const GoogleLoginButton: FC = () => {
  const { google } = useIntlayer('ext-login-button');
  const onClick = async () => {
    await signIn('google');
  };

  return (
    <Button
      className="bg-error-500! w-full rounded-full"
      label={google.label.value}
      Icon={GoogleLogo}
      onClick={onClick}
      color="text"
    >
      {google.label}
    </Button>
  );
};

export const ExtLoginButtons: FC = () => {
  const { span } = useIntlayer('ext-login-button');

  return (
    <div className="flex flex-col justify-center gap-y-3">
      <span className="text-center text-base">{span}</span>
      <GoogleLoginButton />
      <GitHubLoginButton />
    </div>
  );
};
