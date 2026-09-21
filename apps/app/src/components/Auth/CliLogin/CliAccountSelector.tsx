import { useSession } from '@intlayer/design-system/api';
import { Avatar } from '@intlayer/design-system/avatar';
import { Button } from '@intlayer/design-system/button';
import { H2 } from '@intlayer/design-system/headers';
import { Loader } from '@intlayer/design-system/loader';
import { cn } from '@intlayer/design-system/utils';
import { Check, UserPlus } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import {
  type DeviceSession,
  useDeviceSessions,
  useSwitchDeviceSession,
} from '#hooks/useDeviceSessions';

type CliAccountSelectorProps = {
  /** Called once the user confirmed the active account for the CLI login */
  onConfirm: () => void;
  /** Called when the user wants to sign in with an account not yet on this device */
  onUseAnotherAccount: () => void;
};

const getDisplayName = (user: DeviceSession['user']): string =>
  user.name ?? user.email.split('@')[0];

/**
 * Lets a user who already holds one or more sessions on this device pick the
 * account the CLI should be authenticated with, or sign in with another one.
 */
export const CliAccountSelector: FC<CliAccountSelectorProps> = ({
  onConfirm,
  onUseAnotherAccount,
}) => {
  const { session } = useSession();
  const activeUser = session?.user;

  const { data: deviceSessions = [] } = useDeviceSessions({
    enabled: Boolean(activeUser),
  });
  const {
    mutate: switchDeviceSession,
    isPending: isSwitching,
    variables: switchingSessionToken,
  } = useSwitchDeviceSession();

  const { accountSelector } = useIntlayer('cli-login-flow');

  const activeDeviceSession: DeviceSession | undefined =
    deviceSessions.find((deviceSession) =>
      activeUser ? deviceSession.user.id === String(activeUser.id) : false
    ) ??
    (activeUser
      ? {
          token: '',
          user: {
            id: String(activeUser.id),
            name: activeUser.name,
            email: activeUser.email,
            image: activeUser.image,
          },
        }
      : undefined);

  const sessions: DeviceSession[] =
    activeDeviceSession &&
    !deviceSessions.some(
      (deviceSession) => deviceSession.user.id === activeDeviceSession.user.id
    )
      ? [activeDeviceSession, ...deviceSessions]
      : deviceSessions;

  const activeDisplayName = activeDeviceSession
    ? getDisplayName(activeDeviceSession.user)
    : '';

  return (
    <div className="flex flex-col gap-5">
      <H2>{accountSelector.title}</H2>
      <span className="text-neutral text-sm">
        {accountSelector.description}
      </span>

      <div
        role="listbox"
        aria-label={accountSelector.listAriaLabel.value}
        className={cn(
          'flex flex-col gap-2 py-4',
          isSwitching && 'pointer-events-none'
        )}
      >
        {sessions.map((deviceSession, i) => {
          const isActive =
            deviceSession.user.id === activeDeviceSession?.user.id;
          const isSwitchingToThisSession =
            isSwitching && switchingSessionToken === deviceSession.token;
          const displayName = getDisplayName(deviceSession.user);

          return (
            <div key={deviceSession.user.id} className="w-full">
              <Button
                type="button"
                role="option"
                aria-selected={isActive}
                isActive={isActive}
                label={
                  isActive
                    ? accountSelector.activeAccountAriaLabel.value
                    : accountSelector.switchToAriaLabel({ name: displayName })
                        .value
                }
                variant="hoverable"
                color="text"
                size="md"
                roundedSize="xl"
                className="w-full border border-neutral py-2"
                onClick={() => {
                  if (!isActive) {
                    switchDeviceSession(deviceSession.token);
                  }
                }}
              >
                <div className="flex w-full flex-row items-center gap-4 py-1">
                  <Avatar
                    fullname={displayName}
                    src={deviceSession.user.image ?? undefined}
                    size="md"
                    isLoggedIn
                  />
                  <div className="flex min-w-0 flex-1 flex-col text-left">
                    <span className="truncate font-semibold text-sm text-text leading-tight">
                      {displayName}
                    </span>
                    <span className="truncate text-neutral text-xs leading-snug">
                      {deviceSession.user.email}
                    </span>
                  </div>
                  <Loader
                    className="size-4 h-full max-w-5 shrink-0 justify-end"
                    isLoading={isSwitchingToThisSession}
                  >
                    {isActive && (
                      <Check size={16} className="shrink-0 text-neutral" />
                    )}
                  </Loader>
                </div>
              </Button>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-3">
        <Button
          className="w-full"
          color="text"
          variant="outline"
          Icon={UserPlus}
          label={accountSelector.useAnotherAccount.value}
          onClick={onUseAnotherAccount}
          disabled={isSwitching}
        >
          {accountSelector.useAnotherAccount}
        </Button>

        <Button
          className="w-full"
          color="text"
          Icon={Check}
          label={accountSelector.continueAs({ name: activeDisplayName }).value}
          onClick={onConfirm}
          disabled={!activeDeviceSession || isSwitching}
        >
          {accountSelector.continueAs({ name: activeDisplayName })}
        </Button>
      </div>
    </div>
  );
};
