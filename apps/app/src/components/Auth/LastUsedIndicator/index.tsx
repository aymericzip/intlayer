import type { UserAPI } from '@intlayer/backend';
import { useIsMounted } from '@intlayer/design-system/hooks';
import { getAuthAPI } from '@intlayer/design-system/libs';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';

type LastUsedIndicatorProps = {
  method: NonNullable<UserAPI['lastLoginMethod']>;
};

export const LastUsedIndicator: FC<LastUsedIndicatorProps> = ({ method }) => {
  const { label } = useIntlayer('last-used-indicator');
  const isMounted = useIsMounted();

  if (!isMounted || !getAuthAPI().getAuthClient().isLastUsedLoginMethod(method))
    return null;

  return (
    <span className="pointer-events-none block text-right text-neutral text-xs">
      {label}
    </span>
  );
};
