export type ConfigPreviewState = {
  repo: RepoData;
  configPath: string;
  content: string;
} | null;

export type RepoData = {
  id: number;
  name: string;
  full_name: string;
  owner: { login: string; avatar_url: string };
  html_url: string;
  default_branch: string;
  updated_at: string;
};
