import { Octokit } from '@octokit/rest';
import * as bitbucketService from '@services/bitbucket.service';
import * as githubService from '@services/github.service';
import * as gitlabService from '@services/gitlab.service';
import type {
  BitbucketRepository,
  GitHubRepository,
  GitLabRepository,
  RepositoryConnection,
} from '@/types/project.types';

const GITHUB_API_VERSION = '2026-03-10';
const GITLAB_DEFAULT_URL = 'https://gitlab.com';
const BITBUCKET_API_URL = 'https://api.bitbucket.org/2.0';

export type RepositoryFile = {
  /** Path relative to the repository root */
  path: string;
  content: string;
  /** The file does not exist on the branch yet */
  isNewFile?: boolean;
};

export type CommitFilesOptions = {
  files: RepositoryFile[];
  message: string;
  /** Branch to commit to */
  branch: string;
  /**
   * Branch to start from when `branch` does not exist yet. The new branch is
   * created from its head.
   */
  startBranch?: string;
};

export type CommitResult = {
  sha: string;
  url: string;
};

export type PullRequestResult = {
  url: string;
};

/**
 * Raised when the provider refuses to move the branch (protected branch,
 * missing push rights). Committing to a new branch + pull request is the way
 * out.
 */
export class BranchUpdateRejectedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BranchUpdateRejectedError';
  }
}

/**
 * Raised when the branch moved between reading it and committing on it.
 * Retrying from the new head is safe.
 */
export class BranchMovedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BranchMovedError';
  }
}

/**
 * Git operations needed to commit CMS edits back to a connected repository.
 */
export type GitRepositoryClient = {
  /** Returns `null` when the file does not exist on the branch */
  readFile: (path: string, branch: string) => Promise<string | null>;
  /** Subject lines of the latest commits of the branch, newest first */
  listRecentCommitMessages: (
    branch: string,
    limit: number
  ) => Promise<string[]>;
  /** Commits every file in a single commit */
  commitFiles: (options: CommitFilesOptions) => Promise<CommitResult>;
  createPullRequest: (options: {
    sourceBranch: string;
    targetBranch: string;
    title: string;
    description: string;
  }) => Promise<PullRequestResult>;
};

const getSubjectLine = (message: string): string =>
  message.split('\n')[0]?.trim() ?? '';

const assertResponseOk = async (
  response: Response,
  action: string
): Promise<void> => {
  if (response.ok) return;

  const errorText = await response.text();
  const message = `${action} failed: ${response.status} - ${errorText}`;

  if (response.status === 401 || response.status === 403) {
    throw new BranchUpdateRejectedError(message);
  }

  throw new Error(message);
};

const createGitHubClient = (
  repository: GitHubRepository,
  accessToken: string
): GitRepositoryClient => {
  const { owner, repository: repo } = repository;
  const octokit = new Octokit({
    auth: accessToken,
    headers: { 'X-GitHub-Api-Version': GITHUB_API_VERSION },
  });

  const getBranchHeadSha = async (branch: string): Promise<string | null> => {
    try {
      const { data } = await octokit.rest.git.getRef({
        owner,
        repo,
        ref: `heads/${branch}`,
      });
      return data.object.sha;
    } catch (error) {
      if ((error as { status?: number }).status === 404) return null;
      throw error;
    }
  };

  return {
    readFile: (path, branch) =>
      githubService.getRepositoryFileContents(
        accessToken,
        owner,
        repo,
        path,
        branch
      ),

    listRecentCommitMessages: async (branch, limit) => {
      const { data } = await octokit.rest.repos.listCommits({
        owner,
        repo,
        sha: branch,
        per_page: limit,
      });

      return data.map((commit) => getSubjectLine(commit.commit.message));
    },

    commitFiles: async ({ files, message, branch, startBranch }) => {
      const branchHeadSha = await getBranchHeadSha(branch);
      const parentSha =
        branchHeadSha ??
        (startBranch ? await getBranchHeadSha(startBranch) : null);

      if (!parentSha) {
        throw new Error(`Branch "${branch}" does not exist`);
      }

      const { data: parentCommit } = await octokit.rest.git.getCommit({
        owner,
        repo,
        commit_sha: parentSha,
      });

      const { data: tree } = await octokit.rest.git.createTree({
        owner,
        repo,
        base_tree: parentCommit.tree.sha,
        tree: files.map((file) => ({
          path: file.path,
          mode: '100644',
          type: 'blob',
          content: file.content,
        })),
      });

      const { data: commit } = await octokit.rest.git.createCommit({
        owner,
        repo,
        message,
        tree: tree.sha,
        parents: [parentSha],
      });

      try {
        if (branchHeadSha) {
          await octokit.rest.git.updateRef({
            owner,
            repo,
            ref: `heads/${branch}`,
            sha: commit.sha,
            force: false,
          });
        } else {
          await octokit.rest.git.createRef({
            owner,
            repo,
            ref: `refs/heads/${branch}`,
            sha: commit.sha,
          });
        }
      } catch (error) {
        const currentHeadSha = await getBranchHeadSha(branch);

        if (branchHeadSha && currentHeadSha !== branchHeadSha) {
          throw new BranchMovedError(
            `Branch "${branch}" moved while committing`
          );
        }

        throw new BranchUpdateRejectedError(
          `GitHub refused to update "${branch}": ${(error as Error).message}`
        );
      }

      return { sha: commit.sha, url: commit.html_url };
    },

    createPullRequest: async ({
      sourceBranch,
      targetBranch,
      title,
      description,
    }) => {
      const { data } = await octokit.rest.pulls.create({
        owner,
        repo,
        head: sourceBranch,
        base: targetBranch,
        title,
        body: description,
      });

      return { url: data.html_url };
    },
  };
};

const createGitLabClient = (
  repository: GitLabRepository,
  accessToken: string
): GitRepositoryClient => {
  const { projectId, instanceUrl } = repository;

  if (!projectId) {
    throw new Error('GitLab project ID is required.');
  }

  const projectUrl = `${instanceUrl || GITLAB_DEFAULT_URL}/api/v4/projects/${projectId}`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  return {
    readFile: (path, branch) =>
      gitlabService.getRepositoryFileContents(
        accessToken,
        projectId,
        path,
        branch,
        instanceUrl
      ),

    listRecentCommitMessages: async (branch, limit) => {
      const response = await fetch(
        `${projectUrl}/repository/commits?ref_name=${encodeURIComponent(branch)}&per_page=${limit}`,
        { headers }
      );
      await assertResponseOk(response, 'Listing GitLab commits');

      const commits = (await response.json()) as { title: string }[];

      return commits.map((commit) => getSubjectLine(commit.title));
    },

    commitFiles: async ({ files, message, branch, startBranch }) => {
      const response = await fetch(`${projectUrl}/repository/commits`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          branch,
          ...(startBranch && { start_branch: startBranch }),
          commit_message: message,
          actions: files.map((file) => ({
            action: file.isNewFile ? 'create' : 'update',
            file_path: file.path,
            content: file.content,
          })),
        }),
      });
      await assertResponseOk(response, 'GitLab commit');

      const commit = (await response.json()) as {
        id: string;
        web_url: string;
      };

      return { sha: commit.id, url: commit.web_url };
    },

    createPullRequest: async ({
      sourceBranch,
      targetBranch,
      title,
      description,
    }) => {
      const response = await fetch(`${projectUrl}/merge_requests`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          source_branch: sourceBranch,
          target_branch: targetBranch,
          title,
          description,
          remove_source_branch: true,
        }),
      });
      await assertResponseOk(response, 'GitLab merge request');

      const mergeRequest = (await response.json()) as { web_url: string };

      return { url: mergeRequest.web_url };
    },
  };
};

const createBitbucketClient = (
  repository: BitbucketRepository,
  accessToken: string
): GitRepositoryClient => {
  const { workspace, repository: repoSlug } = repository;
  const repositoryUrl = `${BITBUCKET_API_URL}/repositories/${workspace}/${repoSlug}`;
  const authorizationHeader = { Authorization: `Bearer ${accessToken}` };

  const getBranchHeadSha = async (branch: string): Promise<string> => {
    const response = await fetch(
      `${repositoryUrl}/refs/branches/${encodeURIComponent(branch)}`,
      { headers: authorizationHeader }
    );
    await assertResponseOk(response, 'Reading Bitbucket branch');

    const branchData = (await response.json()) as {
      target: { hash: string };
    };

    return branchData.target.hash;
  };

  return {
    readFile: (path, branch) =>
      bitbucketService.getRepositoryFileContents(
        accessToken,
        workspace,
        repoSlug,
        path,
        branch
      ),

    listRecentCommitMessages: async (branch, limit) => {
      const response = await fetch(
        `${repositoryUrl}/commits/${encodeURIComponent(branch)}?pagelen=${limit}`,
        { headers: authorizationHeader }
      );
      await assertResponseOk(response, 'Listing Bitbucket commits');

      const { values } = (await response.json()) as {
        values: { message: string }[];
      };

      return values
        .slice(0, limit)
        .map(({ message }) => getSubjectLine(message));
    },

    commitFiles: async ({ files, message, branch, startBranch }) => {
      const formData = new URLSearchParams();
      formData.set('message', message);
      formData.set('branch', branch);

      if (startBranch) {
        formData.set('parents', await getBranchHeadSha(startBranch));
      }

      for (const file of files) {
        formData.set(file.path, file.content);
      }

      const response = await fetch(`${repositoryUrl}/src`, {
        method: 'POST',
        headers: authorizationHeader,
        body: formData,
      });
      await assertResponseOk(response, 'Bitbucket commit');

      // The created commit is only exposed through the `Location` header
      const sha =
        response.headers.get('location')?.split('/').pop() ??
        (await getBranchHeadSha(branch));

      return {
        sha,
        url: `https://bitbucket.org/${workspace}/${repoSlug}/commits/${sha}`,
      };
    },

    createPullRequest: async ({
      sourceBranch,
      targetBranch,
      title,
      description,
    }) => {
      const response = await fetch(`${repositoryUrl}/pullrequests`, {
        method: 'POST',
        headers: {
          ...authorizationHeader,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          source: { branch: { name: sourceBranch } },
          destination: { branch: { name: targetBranch } },
          close_source_branch: true,
        }),
      });
      await assertResponseOk(response, 'Bitbucket pull request');

      const pullRequest = (await response.json()) as {
        links: { html: { href: string } };
      };

      return { url: pullRequest.links.html.href };
    },
  };
};

/**
 * Returns the git operations of the provider the repository is hosted on.
 */
export const getGitRepositoryClient = (
  repository: RepositoryConnection,
  accessToken: string
): GitRepositoryClient => {
  switch (repository.provider) {
    case 'github':
      return createGitHubClient(repository, accessToken);
    case 'gitlab':
      return createGitLabClient(repository, accessToken);
    case 'bitbucket':
      return createBitbucketClient(repository, accessToken);
    default:
      throw new Error(
        `Unsupported repository provider: ${(repository as RepositoryConnection).provider}`
      );
  }
};
