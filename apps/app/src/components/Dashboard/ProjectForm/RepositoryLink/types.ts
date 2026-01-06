export type RepositoryProvider = 'github' | 'gitlab' | 'bitbucket';

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

// Provider info for UI
export type ProviderInfo = {
  id: RepositoryProvider;
  name: string;
  icon: string;
  supportsCustomDomain: boolean;
};

export const PROVIDERS: ProviderInfo[] = [
  {
    id: 'github',
    name: 'GitHub',
    icon: 'github',
    supportsCustomDomain: false,
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    icon: 'gitlab',
    supportsCustomDomain: true,
  },
  {
    id: 'bitbucket',
    name: 'Bitbucket',
    icon: 'bitbucket',
    supportsCustomDomain: false,
  },
];

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
