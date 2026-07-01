import type { GetSetupStatusResult } from '@intlayer/backend';
import { editor } from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/types/config';
import { createEndpoint } from '../cms/createIntlayerCMS';
import { type FetcherOptions, fetcher } from '../fetcher';

/** Result of the demo-session bootstrap endpoint. */
export type GetDemoSessionResult = { ok: boolean };

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
  const backendURL = intlayerConfig?.editor?.backendURL ?? editor.backendURL;

  /**
   * Reports whether the instance still needs its initial setup (creation of
   * the first super-admin). Only ever `true` on a self-hosted deployment with
   * an empty users collection. Public endpoint — no authentication required.
   * @returns `{ isSetupRequired: boolean }`.
   */
  const getSetupStatus = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<GetSetupStatusResult>(
      `${backendURL}/api/user/setup`,
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
      `${backendURL}/api/demo/session`,
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
