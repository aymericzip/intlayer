import { getAuthAPI } from '@intlayer/design-system/libs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deviceSessionsQueryOptions, refetchFreshSession } from '#utils/auth';

/**
 * One signed-in session on this device.
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

type RawDeviceSession = {
  token?: string;
  session?: { token?: string };
  user?: {
    id?: string;
    name?: string | null;
    email?: string;
    image?: string | null;
  };
};

const toDeviceSession = (rawSession: RawDeviceSession): DeviceSession => ({
  token: rawSession.session?.token ?? rawSession.token ?? '',
  user: {
    id: rawSession.user?.id ?? '',
    name: rawSession.user?.name ?? null,
    email: rawSession.user?.email ?? '',
    image: rawSession.user?.image ?? null,
  },
});

/** Lists every account signed in on this device (better-auth multi-session). */
export const useDeviceSessions = (options: { enabled?: boolean } = {}) =>
  useQuery({
    ...deviceSessionsQueryOptions,
    enabled: options.enabled ?? true,
    select: (rawSessions: RawDeviceSession[]): DeviceSession[] =>
      rawSessions.map(toDeviceSession),
  });

const useDeviceSessionMutation = (
  mutate: (sessionToken: string) => Promise<unknown>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sessionToken: string) => {
      await mutate(sessionToken);
      await refetchFreshSession(queryClient);
      await queryClient.invalidateQueries({
        queryKey: deviceSessionsQueryOptions.queryKey,
      });
    },
  });
};

/** Makes the given device session the active one and refreshes the session cache. */
export const useSwitchDeviceSession = () =>
  useDeviceSessionMutation((sessionToken) =>
    getAuthAPI().setActiveSession({ sessionToken })
  );

/** Signs the given device session out and refreshes the session cache. */
export const useRevokeDeviceSession = () =>
  useDeviceSessionMutation((sessionToken) =>
    getAuthAPI().revokeDeviceSession({ sessionToken })
  );
