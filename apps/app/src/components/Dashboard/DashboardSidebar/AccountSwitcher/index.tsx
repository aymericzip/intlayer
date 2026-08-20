'use client';

import { useUser } from '@intlayer/design-system/api';
import { Avatar } from '@intlayer/design-system/avatar';
import { Button } from '@intlayer/design-system/button';
import { getAuthAPI } from '@intlayer/design-system/libs';
import { Loader } from '@intlayer/design-system/loader';
import { App_Auth_SignIn_Path } from '@intlayer/design-system/routes';
import { cn } from '@intlayer/design-system/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Check, LogOut, Plus } from 'lucide-react';
import type { FC, KeyboardEvent } from 'react';
import { useCallback } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#components/Link/Link';
import { deviceSessionsQueryOptions, refetchFreshSession } from '#utils/auth';

/**
 * Represents one signed-in session on this device.
 * Mirrors the shape returned by better-auth's `multiSession.listDeviceSessions`.
 */
export type DeviceSession = {
  /** The session's token identifier */
  token: string;
  /** User associated with this session */
  user: {
    id: string;
    name?: string | null;
    email: string;
    image?: string | null;
  };
};

/**
 * Props for the AccountSwitcher component
 */
export type AccountSwitcherProps = {
  /** Additional CSS classes for the outer container */
  className?: string;
};

/**
 * AccountSwitcher — displays a list of signed-in sessions on this device and
 * lets the user switch between them, sign out individually, or add another
 * account. Designed to be embedded inside a dropdown, sidebar, or modal.
 */
export const AccountSwitcher: FC<AccountSwitcherProps> = ({ className }) => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { data: fetchedDeviceSessions } = useQuery(deviceSessionsQueryOptions);

  const switchAccountMutation = useMutation({
    mutationFn: async (sessionToken: string) => {
      const intlayerAPI = getAuthAPI();
      await intlayerAPI.setActiveSession({ sessionToken });
      await refetchFreshSession(queryClient);
      await queryClient.invalidateQueries({
        queryKey: deviceSessionsQueryOptions.queryKey,
      });
    },
  });

  const signOutAccountMutation = useMutation({
    mutationFn: async (sessionToken: string) => {
      const authAPI = getAuthAPI();
      await authAPI.revokeDeviceSession({ sessionToken });
      await refetchFreshSession(queryClient);
      await queryClient.invalidateQueries({
        queryKey: deviceSessionsQueryOptions.queryKey,
      });
    },
  });

  const {
    accountSwitcherAriaLabel,
    activeAccountAriaLabel,
    switchingAccountAriaLabel,
    addAccountTitle,
    switchToAriaLabel,
    signOutAriaLabel,
  } = useIntlayer('account-switcher');

  const sessions: DeviceSession[] = (fetchedDeviceSessions ?? []).map(
    (session: any) =>
      ({
        token: session.session?.token ?? session.token,
        user: {
          id: session.user?.id ?? '',
          name: session.user?.name ?? null,
          email: session.user?.email ?? '',
          image: session.user?.image ?? null,
        },
      }) satisfies DeviceSession
  );

  const activeSessionToken = sessions.find(
    (session) => session.user.id === user?.id
  )?.token;

  const isSwitching =
    switchAccountMutation.isPending || signOutAccountMutation.isPending;

  const handleSwitch = useCallback(
    (token: string) => {
      switchAccountMutation.mutate(token);
    },
    [switchAccountMutation]
  );

  const handleSignOut = useCallback(
    (token: string) => {
      signOutAccountMutation.mutate(token);
    },
    [signOutAccountMutation]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, token: string) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSwitch(token);
      }
    },
    [handleSwitch]
  );

  const hasMultipleSessions = sessions.length > 1;

  if (sessions.length === 0) {
    return null;
  }

  return (
    <div
      role="listbox"
      aria-label={accountSwitcherAriaLabel.value}
      className={cn(
        'flex flex-col gap-1',
        isSwitching && 'pointer-events-none opacity-50',
        className
      )}
    >
      {hasMultipleSessions &&
        sessions.map((session) => {
          const isActive = session.token === activeSessionToken;
          const displayName =
            session.user.name ?? session.user.email.split('@')[0];

          return (
            <Button
              key={session.token}
              type="button"
              role="option"
              isActive={isActive}
              label={switchToAriaLabel({ name: displayName }).value}
              variant="hoverable"
              color="text"
              size="sm"
              onClick={() => handleSwitch(session.token)}
              onKeyDown={(e) => handleKeyDown(e, session.token)}
            >
              <div className="my-1 flex flex-row items-center justify-evenly gap-5">
                <Avatar
                  fullname={displayName}
                  src={session.user.image ?? undefined}
                  size="sm"
                  isLoggedIn
                />

                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate font-semibold text-sm text-text leading-tight">
                    {displayName}
                  </span>
                  <span className="truncate text-neutral text-xs leading-snug">
                    {session.user.email}
                  </span>
                </div>

                <div className="flex shrink-0 items-center">
                  <Loader
                    className="size-4"
                    aria-label={switchingAccountAriaLabel.value}
                    isLoading={isSwitching}
                  >
                    {isActive && (
                      <Check
                        size={16}
                        className="text-neutral"
                        aria-label={activeAccountAriaLabel.value}
                      />
                    )}
                  </Loader>

                  <LogOut
                    aria-label={signOutAriaLabel({ name: displayName }).value}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSignOut(session.token);
                    }}
                    size={16}
                    className={cn(
                      'ml-1 rounded-xl p-1 text-neutral transition-colors duration-200',
                      'hover:bg-error/10 hover:text-error'
                    )}
                  />
                </div>
              </div>
            </Button>
          );
        })}

      {hasMultipleSessions && <hr className="my-1 border-text/10" />}

      <Link
        to={App_Auth_SignIn_Path}
        label={addAccountTitle.value}
        variant="hoverable"
        color="neutral"
        size="sm"
        className="flex w-full flex-row items-center justify-center gap-2 px-2 py-1.5"
      >
        <Plus size={16} />
        <span className="m-auto">{addAccountTitle}</span>
      </Link>

      <hr className="my-1 border-text/10" />
    </div>
  );
};
