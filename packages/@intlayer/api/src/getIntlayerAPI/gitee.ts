import type { giteeContract } from '@intlayer/backend-contract/gitProviders';
import { createEndpoint } from '../cms/createIntlayerCMS';
import { createForgeAPI } from './forge';

/** Prefix of the routes, checked against the backend contract. */
const giteeGroup = {
  prefix: '/api/gitee',
} as const satisfies Pick<typeof giteeContract, 'prefix'>;

/** Gitee repositories of the linked account. */
export const getGiteeAPI = createForgeAPI(giteeGroup);

/**
 * Authenticated `gitee` endpoint bound to an Intlayer CMS authenticator.
 *
 * Pass an authenticator created with `createIntlayerCMS`, or omit it to use
 * the build-time configuration (`@intlayer/config/built`).
 */
export const giteeEndpoint = createEndpoint(getGiteeAPI);
