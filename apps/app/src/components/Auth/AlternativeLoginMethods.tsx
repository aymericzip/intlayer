'use client';

import { Button } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { ExternalsLoginButtons } from './ExternalsLoginButtons';
import { MagicLinkButton } from './MagicLinkButton';
import { PasskeyButton } from './PassKeyButton';
import { SSOButton } from './SSOButton';

type AlternativeLoginMethodsProps = {
  showAll: boolean;
  setShowAll: (showAll: boolean) => void;
  email?: string;
  onLogin?: () => void;
};

export const AlternativeLoginMethods: FC<AlternativeLoginMethodsProps> = ({
  showAll,
  setShowAll,
  email,
  onLogin,
}) => {
  const externalsLoginButtons = useIntlayer('externals-login-buttons');

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex flex-col justify-center gap-y-3">
        <PasskeyButton />
        {showAll && (
          <>
            <SSOButton domain={email?.split('@')[1]} />
            <MagicLinkButton email={email} />
          </>
        )}
      </div>

      <ExternalsLoginButtons showAll={showAll} onLogin={onLogin} />

      <Button
        variant="link"
        label={externalsLoginButtons.showMore(!showAll).value}
        color="text"
        size="sm"
        onClick={() => setShowAll(!showAll)}
        className="mx-auto"
        isFullWidth
      >
        {externalsLoginButtons.showMore(!showAll)}
      </Button>
    </div>
  );
};
