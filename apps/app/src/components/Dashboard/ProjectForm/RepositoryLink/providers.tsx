import { TechLogos } from '@intlayer/design-system/tech-logo';
import { GitBranch } from 'lucide-react';
import type { FC, SVGProps } from 'react';
import type { RepositoryProvider } from './types';

/** Repository providers, in the order they are offered. */
export const REPOSITORY_PROVIDERS = [
  'github',
  'gitlab',
  'bitbucket',
  'codeberg',
  'gitee',
] as const satisfies readonly RepositoryProvider[];

/** Display name of each provider. */
export const PROVIDER_NAMES: Record<RepositoryProvider, string> = {
  github: 'GitHub',
  gitlab: 'GitLab',
  bitbucket: 'Bitbucket',
  codeberg: 'Codeberg',
  gitee: 'Gitee',
};

/** better-auth provider id each repository provider is linked through. */
export const AUTH_PROVIDER_IDS: Record<RepositoryProvider, string> = {
  github: 'github',
  gitlab: 'gitlab',
  bitbucket: 'atlassian',
  codeberg: 'codeberg',
  gitee: 'gitee',
};

/** OAuth scopes requested when linking the provider account. */
export const LINK_SCOPES: Record<RepositoryProvider, string[]> = {
  github: ['repo', 'workflow'],
  gitlab: ['api', 'read_repository'],
  bitbucket: ['repository', 'repository:write'],
  codeberg: ['read:user', 'write:repository'],
  gitee: ['user_info', 'projects', 'pull_requests', 'emails'],
};

const PROVIDER_LOGOS: Record<
  RepositoryProvider,
  FC<SVGProps<SVGSVGElement>>
> = {
  github: TechLogos.GITHUB,
  gitlab: TechLogos.GITLAB,
  bitbucket: TechLogos.BITBUCKET,
  codeberg: TechLogos.CODEBERG,
  gitee: TechLogos.GITEE,
};

/** Logo of a provider, a branch icon for an unknown one. */
export const ProviderLogo: FC<{
  provider: RepositoryProvider;
  className?: string;
}> = ({ provider, className }) => {
  const Logo = PROVIDER_LOGOS[provider] ?? GitBranch;

  return <Logo className={className} />;
};

/** Whether the provider is a Gitea-compatible forge (Codeberg, Gitee). */
export const isForgeProvider = (
  provider: RepositoryProvider
): provider is 'codeberg' | 'gitee' =>
  provider === 'codeberg' || provider === 'gitee';
