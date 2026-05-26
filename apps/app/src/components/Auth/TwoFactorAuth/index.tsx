import { useSession } from '@intlayer/design-system/api';
import { Tag } from '@intlayer/design-system/tag';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { DisableTwoFactor } from './DisableTwoFactor';
import { EnableTwoFactor } from './EnableTwoFactor';

export const TwoFactorAuth: FC = () => {
  const { state } = useIntlayer('two-factor-auth');
  const { session } = useSession();
  const { user } = session ?? {};

  // @ts-ignore - twoFactorEnabled is added by better-auth plugin but not in types
  const isEnabled = Boolean(user?.twoFactorEnabled);

  return (
    <div className="flex flex-col gap-10">
      <Tag
        className="absolute top-4 right-5"
        size="sm"
        color={isEnabled ? 'success' : 'text'}
      >
        {state(isEnabled)}
      </Tag>

      {isEnabled ? <DisableTwoFactor /> : <EnableTwoFactor />}
    </div>
  );
};
