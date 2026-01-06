'use client';

import { AppleLogo } from '@components/logos/AppleLogo';
import { BitbucketLogo } from '@components/logos/BitbucketLogo';
import { GithubLogo } from '@components/logos/GithubLogo';
import { GitLabLogo } from '@components/logos/GitLabLogo';
import { GoogleLogo } from '@components/logos/GoogleLogo';
import { LinkedInLogo } from '@components/logos/LinkedInLogo';
import { Button } from '@intlayer/design-system';
import { useUser } from '@intlayer/design-system/hooks';
import { getAuthAPI } from '@intlayer/design-system/libs';
import { useIntlayer } from 'next-intlayer';
import { type FC, useEffect } from 'react';

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
      className="bg-red-400 text-white ring-red-400/20 hover:bg-red-500"
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

export const AppleLoginButton: FC<ExternalsLoginButtonsProps> = ({
  onLogin,
}) => {
  const { user } = useUser();
  const externalsLoginButtons = useIntlayer('externals-login-buttons');

  const loginWithApple = async () => {
    const origin = window.location.href;

    await getAuthAPI().signInSocial({
      provider: 'apple',
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
      className="bg-black text-white ring-gray-600/20 hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100"
      label={externalsLoginButtons.apple.label.value}
      Icon={AppleLogo}
      onClick={loginWithApple}
      color="custom"
    >
      {externalsLoginButtons.apple.label}
    </Button>
  );
};

export const BitbucketLoginButton: FC<ExternalsLoginButtonsProps> = ({
  onLogin,
}) => {
  const { user } = useUser();
  const externalsLoginButtons = useIntlayer('externals-login-buttons');

  const loginWithBitbucket = async () => {
    const origin = window.location.href;

    await getAuthAPI().signInSocial({
      provider: 'bitbucket',
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
      className="bg-blue-800/80! text-white ring-blue-600/20 hover:bg-blue-800! dark:bg-blue-400/80! [&_path]:fill-white/60!"
      label={externalsLoginButtons.bitbucket.label.value}
      Icon={BitbucketLogo}
      onClick={loginWithBitbucket}
      color="custom"
    >
      {externalsLoginButtons.bitbucket.label}
    </Button>
  );
};

export const GitLabLoginButton: FC<ExternalsLoginButtonsProps> = ({
  onLogin,
}) => {
  const { user } = useUser();
  const externalsLoginButtons = useIntlayer('externals-login-buttons');

  const loginWithGitLab = async () => {
    const origin = window.location.href;

    await getAuthAPI().signInSocial({
      provider: 'gitlab',
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
      className="bg-orange-600/80! text-white ring-orange-600/20 hover:bg-orange-700! dark:bg-orange-400/80! dark:hover:bg-orange-500/80! [&_path]:fill-white/80!"
      label={externalsLoginButtons.gitlab.label.value}
      Icon={GitLabLogo}
      onClick={loginWithGitLab}
      color="custom"
    >
      {externalsLoginButtons.gitlab.label}
    </Button>
  );
};

type ExternalsLoginButtonsProps = {
  onLogin?: () => void;
  showAll?: boolean;
};

export const ExternalsLoginButtons: FC<ExternalsLoginButtonsProps> = ({
  showAll = false,
  ...props
}) => {
  // const { isIOS, isMac } = useDevice();

  return (
    <div className="relative flex flex-col justify-center gap-y-3">
      <GitHubLoginButton {...props} />
      <GoogleLoginButton {...props} />
      <LinkedInLoginButton {...props} />
      {showAll && (
        <>
          <BitbucketLoginButton {...props} />
          <GitLabLoginButton {...props} />
          {/* {(isIOS || isMac) && <AppleLoginButton {...props} />} */}
        </>
      )}
    </div>
  );
};
