import type { RepositoryProvider } from '@intlayer/backend-contract/project';

export type { RepositoryProvider };

export type ConfigPreviewState = {
  repo: RepoData;
  configPath: string;
  content: string;
} | null;

// Unified repository data structure
export type RepoData = {
  // Common fields
  id: string | number;
  name: string;
  fullName: string;
  url: string;
  defaultBranch: string;
  updatedAt: string;
  provider: RepositoryProvider;
  isPrivate?: boolean;

  // GitHub specific
  owner?: {
    login: string;
    avatarUrl?: string;
  };

  // GitLab specific
  projectId?: number;
  namespace?: {
    name: string;
    path: string;
  };
  instanceUrl?: string;

  // Bitbucket specific
  workspace?: {
    slug: string;
    name: string;
  };
  slug?: string;
};

/**
 * Repository detected outside the dashboard (ex: the `origin` remote read by
 * `intlayer init`), used to pre-fill the repository link.
 */
export type DetectedRepository = {
  provider: RepositoryProvider;
  owner: string;
  repository: string;
  branch?: string;
  /** Intlayer configuration file, relative to the repository root */
  configFilePath?: string;
  /** Self-managed GitLab instance */
  instanceUrl?: string;
};

// Connected repository state (stored in project)
export type ConnectedRepository = {
  provider: RepositoryProvider;
  owner: string;
  repository: string;
  branch: string;
  url: string;
  configFilePath: string;
  // Provider-specific fields
  installationId?: number; // GitHub
  projectId?: number; // GitLab
  instanceUrl?: string; // GitLab self-hosted
  workspace?: string; // Bitbucket
};
