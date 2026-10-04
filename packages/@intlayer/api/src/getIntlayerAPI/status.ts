import type { RouteEndpoints } from '@intlayer/backend-contract/defineRoute';
import { buildRouteURL } from '@intlayer/backend-contract/defineRoute';
import type {
  DemoRoutes,
  demoContract,
  GetDemoSessionResult,
} from '@intlayer/backend-contract/demo';
import type {
  GetSetupStatusResult,
  UserRoutes,
  userContract,
} from '@intlayer/backend-contract/user';
import { editor } from '@intlayer/config/built';
import { BACKEND_URL } from '@intlayer/config/defaultValues';
import type { IntlayerConfig } from '@intlayer/types/config';
import { createEndpoint } from '../cms/createIntlayerCMS';
import { type FetcherOptions, fetcher } from '../fetcher';

/** Result of the demo-session bootstrap endpoint. */
export type { GetDemoSessionResult };

/** Routes used here, checked against the backend contract. */
const userGroup = {
  prefix: '/api/user',
} as const satisfies Pick<typeof userContract, 'prefix'>;
const setupStatusEndpoint = {
  method: 'GET',
  path: '/setup',
} as const satisfies Pick<UserRoutes['getSetupStatus'], 'method' | 'path'>;
const demoGroup = {
  prefix: '/api/demo',
} as const satisfies Pick<typeof demoContract, 'prefix'>;
const demoEndpoints = {
  getDemoSession: { method: 'GET', path: '/session' },
} as const satisfies RouteEndpoints<DemoRoutes>;

/**
 * Instance/entry status endpoints. These back the decisions made when an
 * unauthenticated visitor reaches the app root:
 * - `getSetupStatus` — on a self-hosted instance, whether the first
 *   super-admin still needs to be created.
 * - `getDemoSession` — on the hosted cloud, signs the visitor into the shared
 *   read-only demo account (the backend sets the session cookie on the
 *   response).
 */
export const getStatusAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? editor.backendURL ?? BACKEND_URL;

  /**
   * Reports whether the instance still needs its initial setup (creation of
   * the first super-admin). Only ever `true` on a self-hosted deployment with
   * an empty users collection. Public endpoint — no authentication required.
   * @returns `{ isSetupRequired: boolean }`.
   */
  const getSetupStatus = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<GetSetupStatusResult>(
      buildRouteURL(backendURL, userGroup, setupStatusEndpoint),
      authAPIOptions,
      otherOptions,
      {
        cache: 'no-store',
      }
    );

  /**
   * Signs the current browser into the shared demo account. The backend
   * responds with a `Set-Cookie` header establishing the demo session, so this
   * must run with credentials included (the default in the fetcher).
   * @returns `{ ok: boolean }`.
   */
  const getDemoSession = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<GetDemoSessionResult>(
      buildRouteURL(backendURL, demoGroup, demoEndpoints.getDemoSession),
      authAPIOptions,
      otherOptions,
      {
        cache: 'no-store',
      }
    );

  return {
    getSetupStatus,
    getDemoSession,
  };
};

/**
 * Instance status endpoints bound to an Intlayer CMS authenticator.
 *
 * Pass an authenticator created with `createIntlayerCMS`, or omit it to use
 * the build-time configuration (`@intlayer/config/built`).
 */
export const statusEndpoint = createEndpoint(getStatusAPI);
