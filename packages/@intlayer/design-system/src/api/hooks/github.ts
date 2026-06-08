'use client';

import {
  type UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { useGithubAPI } from '../useIntlayerAPI';

export const useGithubGetAuthUrl = () => {
  const githubAPI = useGithubAPI();

  return useMutation({
    mutationKey: ['github', 'auth-url'],
    mutationFn: (redirectUri: string) => githubAPI.getAuthUrl(redirectUri),
  });
};

export const useGithubAuth = () => {
  const githubAPI = useGithubAPI();

  return useMutation({
    mutationKey: ['github', 'auth'],
    mutationFn: (code: string) => githubAPI.authenticate(code),
  });
};

export const useGithubRepos = (enabled: boolean = true) => {
  const githubAPI = useGithubAPI();

  return useQuery({
    queryKey: ['github', 'repos'],
    queryFn: () => githubAPI.getRepositories(),
    enabled,
  });
};

export const useGithubCheckConfig = () => {
  const githubAPI = useGithubAPI();

  return useMutation({
    mutationKey: ['github', 'check-config'],
    mutationFn: (args: {
      owner: string;
      repository: string;
      branch?: string;
    }) =>
      githubAPI.checkIntlayerConfig(
        undefined,
        args.owner,
        args.repository,
        args.branch
      ),
  });
};

export const useGithubGetConfigFile = () => {
  const githubAPI = useGithubAPI();

  return useMutation({
    mutationKey: ['github', 'get-config-file'],
    mutationFn: (args: {
      owner: string;
      repository: string;
      branch?: string;
      path?: string;
    }) =>
      githubAPI.getConfigFile(
        undefined,
        args.owner,
        args.repository,
        args.branch,
        args.path
      ),
  });
};

export const useGithubToken = (options?: Partial<UseQueryOptions>) => {
  const githubAPI = useGithubAPI();

  return useQuery({
    queryKey: ['github', 'token'],
    queryFn: () => githubAPI.getToken(),
    ...options,
  });
};
