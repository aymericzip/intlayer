'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useCodebergAPI, useGiteeAPI } from '../useIntlayerAPI';

/** Gitea-compatible forges sharing the same repository routes. */
export type ForgeProvider = 'codeberg' | 'gitee';

/** Client of the given forge. Both clients are built: hooks are unconditional. */
const useForgeAPI = (provider: ForgeProvider) => {
  const codebergAPI = useCodebergAPI();
  const giteeAPI = useGiteeAPI();

  return provider === 'codeberg' ? codebergAPI : giteeAPI;
};

/** Repositories of the account linked for `provider`. */
export const useForgeRepos = (
  provider: ForgeProvider,
  enabled: boolean = true
) => {
  const forgeAPI = useForgeAPI(provider);

  return useQuery({
    queryKey: [provider, 'repos'],
    queryFn: () => forgeAPI.getRepositories(),
    enabled,
  });
};

/** Finds the Intlayer configuration files of a repository branch. */
export const useForgeCheckConfig = (provider: ForgeProvider) => {
  const forgeAPI = useForgeAPI(provider);

  return useMutation({
    mutationKey: [provider, 'check-config'],
    mutationFn: (args: {
      owner: string;
      repository: string;
      branch?: string;
    }) =>
      forgeAPI.checkIntlayerConfig(
        undefined,
        args.owner,
        args.repository,
        args.branch
      ),
  });
};

/** Reads an Intlayer configuration file of a repository. */
export const useForgeGetConfigFile = (provider: ForgeProvider) => {
  const forgeAPI = useForgeAPI(provider);

  return useMutation({
    mutationKey: [provider, 'get-config-file'],
    mutationFn: (args: {
      owner: string;
      repository: string;
      branch?: string;
      path?: string;
    }) =>
      forgeAPI.getConfigFile(
        undefined,
        args.owner,
        args.repository,
        args.branch,
        args.path
      ),
  });
};
