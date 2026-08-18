'use client';

import { cn } from '@utils/cn';
import { Check, LogOut, Plus } from 'lucide-react';
import type { FC, KeyboardEvent } from 'react';
import { useCallback } from 'react';
import { Avatar } from '../Avatar';
import { Loader } from '../Loader';

/**
 * Represents one signed-in session on this device.
 * Mirrors the shape returned by better-auth's `multiSession.listDeviceSessions`.
 */
export interface DeviceSession {
  /** The session's token identifier */
  token: string;
  /** User associated with this session */
  user: {
    id: string;
    name?: string | null;
    email: string;
    image?: string | null;
  };
}

/**
 * Props for the AccountSwitcher component
 */
export interface AccountSwitcherProps {
  /** All sessions currently signed in on this device */
  sessions: DeviceSession[];
  /** The token of the currently active session */
  activeSessionToken?: string;
  /** Called when the user picks a different session */
  onSwitch?: (sessionToken: string) => void;
  /** Called when the user clicks "Add another account" */
  onAddAccount?: () => void;
  /** Called when the user signs out of a specific session */
  onSignOut?: (sessionToken: string) => void;
  /** Whether a switch is currently in progress */
  isSwitching?: boolean;
  /** Additional CSS classes for the outer container */
  className?: string;
}

/**
 * AccountSwitcher — displays a list of signed-in sessions on this device and
 * lets the user switch between them, sign out individually, or add another
 * account. Designed to be embedded inside a dropdown, sidebar, or modal.
 *
 * The component is **data-agnostic**: it does not fetch sessions itself. Pass
 * in `sessions` from whatever data layer the host app uses (React Query,
 * better-auth client, etc.) so the same component works in the main app, the
 * visual editor, Storybook, and tests.
 *
 * @example
 * ```tsx
 * <AccountSwitcher
 *   sessions={deviceSessions}
 *   activeSessionToken={currentToken}
 *   onSwitch={(token) => switchAccount(token)}
 *   onAddAccount={() => navigate('/auth/login')}
 *   onSignOut={(token) => revokeSession(token)}
 * />
 * ```
 */
export const AccountSwitcher: FC<AccountSwitcherProps> = ({
  sessions,
  activeSessionToken,
  onSwitch,
  onAddAccount,
  onSignOut,
  isSwitching = false,
  className,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, token: string) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSwitch?.(token);
      }
    },
    [onSwitch]
  );

  return (
    <div
      role="listbox"
      aria-label="Account switcher"
      className={cn(
        'flex flex-col',
        isSwitching && 'pointer-events-none opacity-50',
        className
      )}
    >
      {sessions.map((session) => {
        const isActive = session.token === activeSessionToken;
        const displayName =
          session.user.name ?? session.user.email.split('@')[0];

        return (
          <button
            key={session.token}
            type="button"
            role="option"
            aria-selected={isActive}
            aria-label={`Switch to ${displayName}`}
            onClick={() => onSwitch?.(session.token)}
            onKeyDown={(e) => handleKeyDown(e, session.token)}
            className={cn(
              'group/account flex w-full items-center gap-3 rounded-lg px-3 py-2.5',
              'text-left transition-colors duration-150',
              'hover:bg-text/5 focus-visible:bg-text/5 focus-visible:outline-none',
              isActive && 'bg-text/3'
            )}
          >
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
              {isActive && (
                <Check
                  size={16}
                  className="text-success"
                  aria-label="Active account"
                />
              )}

              {onSignOut && (
                <button
                  type="button"
                  aria-label={`Sign out ${displayName}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSignOut(session.token);
                  }}
                  className={cn(
                    'ml-1 rounded-md p-1 transition-colors duration-150',
                    'text-neutral hover:bg-error/10 hover:text-error',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error/40',
                    'opacity-0 group-focus-within/account:opacity-100 group-hover/account:opacity-100'
                  )}
                >
                  <LogOut size={14} />
                </button>
              )}
            </div>
          </button>
        );
      })}

      {isSwitching && (
        <div className="flex items-center justify-center py-2">
          <Loader className="size-4" aria-label="Switching account…" />
        </div>
      )}

      {onAddAccount && (
        <>
          <hr className="my-1 border-text/10" />
          <button
            type="button"
            onClick={onAddAccount}
            aria-label="Add another account"
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2.5',
              'text-left text-neutral text-sm transition-colors duration-150',
              'hover:bg-text/5 hover:text-text',
              'focus-visible:bg-text/5 focus-visible:text-text focus-visible:outline-none'
            )}
          >
            <div className="flex size-7 items-center justify-center rounded-full border border-neutral/40 border-dashed">
              <Plus size={14} />
            </div>
            <span>Add another account</span>
          </button>
        </>
      )}
    </div>
  );
};
