import { getStatusAPI } from '@intlayer/api/status';
import { IS_SELF_HOSTED } from '#utils/selfHosted';

/**
 * Fetches whether the instance still needs its initial setup, i.e. whether the
 * first super-admin account must be created.
 *
 * On the hosted cloud (non self-hosted) this always resolves to `false` without
 * hitting the network. On a self-hosted deployment it asks the backend, which
 * returns `true` only while the users collection is still empty. Any network
 * failure degrades to `false` so a broken backend never traps the user on the
 * init page.
 *
 * @returns `true` when the init (first super-admin) flow must be shown.
 */
const safeGetSetupStatus = async (): Promise<boolean> => {
  if (!IS_SELF_HOSTED) return false;

  try {
    const statusAPI = getStatusAPI();
    const result = await statusAPI.getSetupStatus();
    return Boolean(result.data?.isSetupRequired);
  } catch (error) {
    console.warn(
      '[setup] getSetupStatus failed, treating as not required:',
      error
    );
    return false;
  }
};

/**
 * TanStack Query options for the instance setup status. Shared between route
 * `beforeLoad` guards (via `ensureQueryData`) so they agree on whether the init
 * flow is required.
 */
export const setupStatusQueryOptions = {
  queryKey: ['setupStatus'],
  queryFn: () => safeGetSetupStatus(),
  staleTime: 5 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
} as const;
