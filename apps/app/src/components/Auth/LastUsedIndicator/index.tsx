import type { UserAPI } from '@intlayer/backend-contract/user';
import { useIsMounted } from '@intlayer/design-system/hooks';
import { getAuthAPI } from '@intlayer/design-system/libs';
import { Tag } from '@intlayer/design-system/tag';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';

type LastUsedIndicatorProps = {
  method: NonNullable<UserAPI['lastLoginMethod']>;
};

/**
 * Small "Last used" tag pinned to the end of a login button.
 * The parent button must be `relative`.
 */
export const LastUsedIndicator: FC<LastUsedIndicatorProps> = ({ method }) => {
  const { label } = useIntlayer('last-used-indicator');
  const isMounted = useIsMounted();

  if (!isMounted || !getAuthAPI().getAuthClient().isLastUsedLoginMethod(method))
    return null;

  return (
    <Tag
      color="neutral"
      size="sm"
      roundedSize="full"
      className="pointer-events-none absolute end-2 top-1/2 -translate-y-1/2"
    >
      {label}
    </Tag>
  );
};
