'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useBitbucketAPI } from '../useIntlayerAPI';

export const useBitbucketAuth = () => {
  const bitbucketAPI = useBitbucketAPI();

  return useMutation({
    mutationKey: ['bitbucket', 'auth'],
    mutationFn: (code: string) => bitbucketAPI.authenticate(code),
  });
};

export const useBitbucketRepos = (enabled: boolean = true) => {
  const bitbucketAPI = useBitbucketAPI();

  return useQuery({
    queryKey: ['bitbucket', 'repos'],
    queryFn: () => bitbucketAPI.getRepositories(),
    enabled,
  });
};

export const useBitbucketCheckConfig = () => {
  const bitbucketAPI = useBitbucketAPI();

  return useMutation({
    mutationKey: ['bitbucket', 'check-config'],
    mutationFn: (args: {
      workspace: string;
      repoSlug: string;
      branch?: string;
    }) =>
      bitbucketAPI.checkIntlayerConfig(
        undefined,
        args.workspace,
        args.repoSlug,
        args.branch
      ),
  });
};

export const useBitbucketGetConfigFile = () => {
  const bitbucketAPI = useBitbucketAPI();

  return useMutation({
    mutationKey: ['bitbucket', 'get-config-file'],
    mutationFn: (args: {
      workspace: string;
      repoSlug: string;
      branch?: string;
      path?: string;
    }) =>
      bitbucketAPI.getConfigFile(
        undefined,
        args.workspace,
        args.repoSlug,
        args.branch,
        args.path
      ),
  });
};
