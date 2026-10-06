import { createForgeService } from './forge.service';

/** Workflow installed by the CI setup and dispatched on CMS updates. */
export const CODEBERG_WORKFLOW_FILENAME = '.forgejo/workflows/intlayer-cms.yml';

/**
 * Codeberg (Forgejo). The API is Gitea-compatible; tokens come from the
 * `codeberg` generic OAuth provider of better-auth.
 */
export const codebergService = createForgeService({
  name: 'Codeberg',
  authProviderId: 'codeberg',
  apiUrl: 'https://codeberg.org/api/v1',
  webUrl: 'https://codeberg.org',
  fileUrlSegment: 'src/branch',
  repositoriesPageSize: 50,
  supportsMultiFileCommit: true,
  authorize: (_url, accessToken) => ({ Authorization: `token ${accessToken}` }),
});

/** Runs the Intlayer workflow on `branch` (Forgejo Actions `workflow_dispatch`). */
export const dispatchCodebergWorkflow = async (
  accessToken: string,
  owner: string,
  repository: string,
  branch: string
): Promise<void> => {
  const workflowFileName = CODEBERG_WORKFLOW_FILENAME.split('/').pop() ?? '';

  await codebergService.request(
    accessToken,
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/actions/workflows/${encodeURIComponent(workflowFileName)}/dispatches`,
    { method: 'POST', body: { ref: branch }, responseType: 'text' }
  );
};
