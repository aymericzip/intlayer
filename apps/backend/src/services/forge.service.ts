import type { ForgeRepository } from '@intlayer/backend-contract/gitProviders';
import { configurationFilesCandidates } from '@intlayer/config/node';
import { logger } from '@logger';
import { AccountModel } from '@schemas/account.schema';

export type { ForgeRepository };

/** Raw repository item returned by Gitea-compatible `/user/repos` endpoints. */
type RawForgeRepository = {
  id: number;
  name: string;
  /** URL slug (Gitee only, `name` being the display name there) */
  path?: string;
  full_name: string;
  owner: { login: string; avatar_url?: string };
  private: boolean;
  html_url: string;
  default_branch?: string;
  updated_at?: string | null;
};

type ForgeTreeItem = {
  path: string;
  type: 'blob' | 'tree' | 'commit';
};

type ForgeFileMetadata = {
  sha: string;
  content?: string;
};

/** A file written by {@link ForgeService.commitFiles}. */
export type ForgeFileChange = {
  path: string;
  content: string;
  /** The file does not exist on the branch yet */
  isNewFile?: boolean;
};

/**
 * Static description of a Gitea-compatible forge (Codeberg/Forgejo, Gitee).
 */
export type ForgeDefinition = {
  /** Display name used in errors and logs */
  name: string;
  /** better-auth provider id the user account is linked through */
  authProviderId: string;
  /** REST API root (ex: https://codeberg.org/api/v1) */
  apiUrl: string;
  /** Web root, used to build file URLs (ex: https://codeberg.org) */
  webUrl: string;
  /** Segment between the repository and the branch in file web URLs */
  fileUrlSegment: 'src/branch' | 'blob';
  /** Page size accepted by `/user/repos` */
  repositoriesPageSize: number;
  /**
   * Whether the forge can commit several files at once
   * (`POST /repos/{owner}/{repo}/contents`, Gitea ≥ 1.20 / Forgejo).
   */
  supportsMultiFileCommit: boolean;
  /** Adds the access token to the request (header or query parameter). */
  authorize: (url: URL, accessToken: string) => HeadersInit;
};

/** Raised by {@link ForgeService} requests answered with a non-2xx status. */
export class ForgeRequestError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
    this.name = 'ForgeRequestError';
  }
}

const MAX_REPOSITORY_PAGES = 5;

const encodePath = (path: string): string =>
  path.split('/').map(encodeURIComponent).join('/');

const toBase64 = (content: string): string =>
  Buffer.from(content, 'utf-8').toString('base64');

const mapRepository = (repository: RawForgeRepository): ForgeRepository => {
  // Gitee's `owner` is the user, the API path uses the namespace of `full_name`
  const [namespace] = repository.full_name.split('/');

  return {
    id: repository.id,
    name: repository.path ?? repository.name,
    displayName: repository.name,
    full_name: repository.full_name,
    owner: {
      login: namespace || repository.owner.login,
      avatar_url: repository.owner.avatar_url,
    },
    private: repository.private,
    html_url: repository.html_url,
    default_branch: repository.default_branch,
    updated_at: repository.updated_at,
  };
};

/**
 * Builds the repository operations of a Gitea-compatible forge. Codeberg
 * (Forgejo) and Gitee share the GitHub-like REST shape these calls rely on.
 */
export const createForgeService = (definition: ForgeDefinition) => {
  const request = async <Result>(
    accessToken: string,
    path: string,
    {
      method = 'GET',
      query = {},
      body,
      responseType = 'json',
    }: {
      method?: 'GET' | 'POST' | 'PUT';
      query?: Record<string, string | number | undefined>;
      body?: unknown;
      responseType?: 'json' | 'text';
    } = {}
  ): Promise<Result> => {
    const url = new URL(`${definition.apiUrl}${path}`);

    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }

    // May add the token to the query, so it runs before the request is sent
    const authorizationHeaders = definition.authorize(url, accessToken);

    const response = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        ...(body !== undefined && { 'Content-Type': 'application/json' }),
        ...authorizationHeaders,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    if (!response.ok) {
      throw new ForgeRequestError(
        `${definition.name} ${method} ${path} failed: ${response.status} - ${await response.text()}`,
        response.status
      );
    }

    return (
      responseType === 'text' ? await response.text() : await response.json()
    ) as Result;
  };

  const isNotFound = (error: unknown): boolean =>
    error instanceof ForgeRequestError && error.status === 404;

  const repositoryPath = (owner: string, repository: string): string =>
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}`;

  /** Repositories the user can access, most recently updated first. */
  const getUserRepositories = async (
    accessToken: string
  ): Promise<ForgeRepository[]> => {
    const repositories: RawForgeRepository[] = [];

    for (let page = 1; page <= MAX_REPOSITORY_PAGES; page++) {
      const pageRepositories = await request<RawForgeRepository[]>(
        accessToken,
        '/user/repos',
        {
          query: {
            page,
            // Gitea reads `limit`, Gitee reads `per_page`
            limit: definition.repositoriesPageSize,
            per_page: definition.repositoriesPageSize,
            sort: 'updated',
          },
        }
      );

      repositories.push(...pageRepositories);

      if (pageRepositories.length < definition.repositoriesPageSize) break;
    }

    return repositories.map(mapRepository);
  };

  /** Paths of the Intlayer configuration files of the branch. */
  const checkIntlayerConfig = async (
    accessToken: string,
    owner: string,
    repository: string,
    branch: string = 'main'
  ): Promise<string[]> => {
    try {
      // Both forges resolve a branch name in place of a tree sha
      const { tree = [] } = await request<{ tree?: ForgeTreeItem[] }>(
        accessToken,
        `${repositoryPath(owner, repository)}/git/trees/${encodeURIComponent(branch)}`,
        { query: { recursive: 'true', per_page: 10000 } }
      );

      return tree
        .filter(
          (item) =>
            item.type === 'blob' &&
            (configurationFilesCandidates as readonly string[]).some(
              (candidate) => item.path.endsWith(candidate)
            )
        )
        .map((item) => item.path);
    } catch (error) {
      if (!isNotFound(error)) {
        logger.error(
          `Error checking intlayer configuration on ${definition.name}:`,
          error
        );
      }
      return [];
    }
  };

  /** Raw content of a file, `null` when it does not exist on the branch. */
  const getRepositoryFileContents = async (
    accessToken: string,
    owner: string,
    repository: string,
    path: string,
    branch: string = 'main'
  ): Promise<string | null> => {
    try {
      return await request<string>(
        accessToken,
        `${repositoryPath(owner, repository)}/raw/${encodePath(path)}`,
        { query: { ref: branch }, responseType: 'text' }
      );
    } catch (error) {
      if (isNotFound(error)) return null;
      throw error;
    }
  };

  /** Blob sha of a file, `null` when it does not exist on the branch. */
  const getFileSha = async (
    accessToken: string,
    owner: string,
    repository: string,
    path: string,
    branch: string
  ): Promise<string | null> => {
    try {
      const metadata = await request<ForgeFileMetadata | unknown[]>(
        accessToken,
        `${repositoryPath(owner, repository)}/contents/${encodePath(path)}`,
        { query: { ref: branch } }
      );

      // Gitee answers `[]` instead of a 404 for a missing path
      return Array.isArray(metadata) ? null : metadata.sha;
    } catch (error) {
      if (isNotFound(error)) return null;
      throw error;
    }
  };

  const fileExists = async (
    accessToken: string,
    owner: string,
    repository: string,
    path: string,
    branch: string = 'main'
  ): Promise<boolean> =>
    (await getFileSha(accessToken, owner, repository, path, branch)) !== null;

  /** Head commit sha of a branch, `null` when the branch does not exist. */
  const getBranchHeadSha = async (
    accessToken: string,
    owner: string,
    repository: string,
    branch: string
  ): Promise<string | null> => {
    try {
      const { commit } = await request<{
        commit: { id?: string; sha?: string };
      }>(
        accessToken,
        `${repositoryPath(owner, repository)}/branches/${encodeURIComponent(branch)}`
      );

      return commit.id ?? commit.sha ?? null;
    } catch (error) {
      if (isNotFound(error)) return null;
      throw error;
    }
  };

  /** Creates the file, or updates it when it already exists. */
  const createOrUpdateFile = async (
    accessToken: string,
    owner: string,
    repository: string,
    path: string,
    content: string,
    branch: string = 'main',
    message: string = 'Update file'
  ): Promise<void> => {
    const sha = await getFileSha(accessToken, owner, repository, path, branch);

    await request(
      accessToken,
      `${repositoryPath(owner, repository)}/contents/${encodePath(path)}`,
      {
        method: sha ? 'PUT' : 'POST',
        body: { content: toBase64(content), message, branch, sha },
      }
    );
  };

  /** Subject lines of the latest commits of the branch, newest first. */
  const listRecentCommitMessages = async (
    accessToken: string,
    owner: string,
    repository: string,
    branch: string,
    limit: number
  ): Promise<string[]> => {
    const commits = await request<{ commit: { message: string } }[]>(
      accessToken,
      `${repositoryPath(owner, repository)}/commits`,
      { query: { sha: branch, limit, per_page: limit } }
    );

    return commits
      .slice(0, limit)
      .map(({ commit }) => commit.message.split('\n')[0]?.trim() ?? '');
  };

  /**
   * Commits the files on `branch`, created from `startBranch` when missing.
   * Forges without a multi-file endpoint (Gitee) get one commit per file.
   * Returns the sha of the last commit.
   */
  const commitFiles = async (
    accessToken: string,
    owner: string,
    repository: string,
    {
      files,
      message,
      branch,
      startBranch,
    }: {
      files: ForgeFileChange[];
      message: string;
      branch: string;
      startBranch?: string;
    }
  ): Promise<string> => {
    const branchHeadSha = await getBranchHeadSha(
      accessToken,
      owner,
      repository,
      branch
    );

    if (!branchHeadSha && !startBranch) {
      throw new Error(`Branch "${branch}" does not exist`);
    }

    // Files are read on the branch they are committed from
    const sourceBranch = branchHeadSha ? branch : (startBranch as string);
    const fileShas = await Promise.all(
      files.map((file) =>
        file.isNewFile
          ? null
          : getFileSha(accessToken, owner, repository, file.path, sourceBranch)
      )
    );

    if (definition.supportsMultiFileCommit) {
      const { commit } = await request<{ commit: { sha: string } }>(
        accessToken,
        `${repositoryPath(owner, repository)}/contents`,
        {
          method: 'POST',
          body: {
            message,
            branch: sourceBranch,
            ...(!branchHeadSha && { new_branch: branch }),
            files: files.map((file, index) => ({
              operation: fileShas[index] ? 'update' : 'create',
              path: file.path,
              content: toBase64(file.content),
              sha: fileShas[index] ?? undefined,
            })),
          },
        }
      );

      return commit.sha;
    }

    if (!branchHeadSha) {
      await request(
        accessToken,
        `${repositoryPath(owner, repository)}/branches`,
        {
          method: 'POST',
          body: { refs: startBranch, branch_name: branch },
        }
      );
    }

    let lastCommitSha = '';

    for (const [index, file] of files.entries()) {
      const { commit } = await request<{ commit: { sha: string } }>(
        accessToken,
        `${repositoryPath(owner, repository)}/contents/${encodePath(file.path)}`,
        {
          method: fileShas[index] ? 'PUT' : 'POST',
          body: {
            content: toBase64(file.content),
            message,
            branch,
            sha: fileShas[index] ?? undefined,
          },
        }
      );

      lastCommitSha = commit.sha;
    }

    return lastCommitSha;
  };

  /** Opens a pull request and returns its web URL. */
  const createPullRequest = async (
    accessToken: string,
    owner: string,
    repository: string,
    {
      sourceBranch,
      targetBranch,
      title,
      description,
    }: {
      sourceBranch: string;
      targetBranch: string;
      title: string;
      description: string;
    }
  ): Promise<string> => {
    const pullRequest = await request<{ html_url: string }>(
      accessToken,
      `${repositoryPath(owner, repository)}/pulls`,
      {
        method: 'POST',
        body: {
          head: sourceBranch,
          base: targetBranch,
          title,
          body: description,
        },
      }
    );

    return pullRequest.html_url;
  };

  /** Web URL of a file on a branch. */
  const getFileUrl = (
    owner: string,
    repository: string,
    branch: string,
    path: string
  ): string =>
    `${definition.webUrl}/${owner}/${repository}/${definition.fileUrlSegment}/${branch}/${path}`;

  /** Web URL of a commit. */
  const getCommitUrl = (
    owner: string,
    repository: string,
    sha: string
  ): string => `${definition.webUrl}/${owner}/${repository}/commit/${sha}`;

  /** Access token of the account the user linked through better-auth. */
  const getTokenFromUser = async (userId: string): Promise<string | null> => {
    try {
      const account = await AccountModel.findOne({
        userId,
        providerId: definition.authProviderId,
      });

      return account?.accessToken || account?.access_token || null;
    } catch (error) {
      logger.error(`Error retrieving ${definition.name} token from DB:`, error);
      return null;
    }
  };

  return {
    definition,
    request,
    getUserRepositories,
    checkIntlayerConfig,
    getRepositoryFileContents,
    fileExists,
    createOrUpdateFile,
    getBranchHeadSha,
    listRecentCommitMessages,
    commitFiles,
    createPullRequest,
    getFileUrl,
    getCommitUrl,
    getTokenFromUser,
  };
};

export type ForgeService = ReturnType<typeof createForgeService>;
