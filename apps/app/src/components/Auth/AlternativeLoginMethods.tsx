import { Button } from '@intlayer/design-system/button';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { IS_SELF_HOSTED } from '#utils/selfHosted.ts';
import { ExternalsLoginButtons } from './ExternalsLoginButtons';
import { MagicLinkButton } from './MagicLinkButton';
import { PasskeyButton } from './PassKeyButton';
import { SSOButton } from './SSOButton';

type AlternativeLoginMethodsProps = {
  showAll: boolean;
  setShowAll: (showAll: boolean) => void;
  email?: string;
  callbackUrl?: string;
};

export const AlternativeLoginMethods: FC<AlternativeLoginMethodsProps> = ({
  showAll,
  setShowAll,
  email,
  callbackUrl,
}) => {
  const externalsLoginButtons = useIntlayer('externals-login-buttons');

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex flex-col justify-center gap-y-3">
        <PasskeyButton callbackUrl={callbackUrl} />

        <SSOButton
          domain={email?.split('@')[1]}
          className={showAll ? '' : 'hidden!'}
        />
        <MagicLinkButton email={email} className={showAll ? '' : 'hidden!'} />
      </div>

      {!IS_SELF_HOSTED && (
        <ExternalsLoginButtons showAll={showAll} callbackUrl={callbackUrl} />
      )}

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
