import type { codebergContract } from '@intlayer/backend-contract/gitProviders';
import { createEndpoint } from '../cms/createIntlayerCMS';
import { createForgeAPI } from './forge';

/** Prefix of the routes, checked against the backend contract. */
const codebergGroup = {
  prefix: '/api/codeberg',
} as const satisfies Pick<typeof codebergContract, 'prefix'>;

/** Codeberg (Forgejo) repositories of the linked account. */
export const getCodebergAPI = createForgeAPI(codebergGroup);

/**
 * Authenticated `codeberg` endpoint bound to an Intlayer CMS authenticator.
 *
 * Pass an authenticator created with `createIntlayerCMS`, or omit it to use
 * the build-time configuration (`@intlayer/config/built`).
 */
export const codebergEndpoint = createEndpoint(getCodebergAPI);
