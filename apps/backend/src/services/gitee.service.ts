import { createForgeService } from './forge.service';

/** Gitee Go pipeline installed by the CI setup. */
export const GITEE_PIPELINE_FILENAME = '.workflow/intlayer-cms.yml';

/**
 * Gitee (API v5). Authenticates with the `access_token` query parameter;
 * tokens come from the `gitee` generic OAuth provider of better-auth.
 */
export const giteeService = createForgeService({
  name: 'Gitee',
  authProviderId: 'gitee',
  apiUrl: 'https://gitee.com/api/v5',
  webUrl: 'https://gitee.com',
  fileUrlSegment: 'blob',
  repositoriesPageSize: 100,
  supportsMultiFileCommit: false,
  authorize: (url, accessToken) => {
    url.searchParams.set('access_token', accessToken);
    return {};
  },
});
