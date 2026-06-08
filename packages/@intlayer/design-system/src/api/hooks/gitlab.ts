'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useGitlabAPI } from '../useIntlayerAPI';

export const useGitlabAuth = () => {
  const gitlabAPI = useGitlabAPI();

  return useMutation({
    mutationKey: ['gitlab', 'auth'],
    mutationFn: (args: {
      code: string;
      redirectUri: string;
      instanceUrl?: string;
    }) => gitlabAPI.authenticate(args.code, args.redirectUri, args.instanceUrl),
  });
};

export const useGitlabProjects = (
  enabled: boolean = true,
  instanceUrl?: string
) => {
  const gitlabAPI = useGitlabAPI();

  return useQuery({
    queryKey: ['gitlab', 'projects', instanceUrl],
    queryFn: () => gitlabAPI.getProjects(undefined, instanceUrl),
    enabled,
  });
};

export const useGitlabCheckConfig = () => {
  const gitlabAPI = useGitlabAPI();

  return useMutation({
    mutationKey: ['gitlab', 'check-config'],
    mutationFn: (args: {
      projectId: number;
      branch?: string;
      instanceUrl?: string;
    }) =>
      gitlabAPI.checkIntlayerConfig(
        undefined,
        args.projectId,
        args.branch,
        args.instanceUrl
      ),
  });
};

export const useGitlabGetConfigFile = () => {
  const gitlabAPI = useGitlabAPI();

  return useMutation({
    mutationKey: ['gitlab', 'get-config-file'],
    mutationFn: (args: {
      projectId: number;
      branch?: string;
      path?: string;
      instanceUrl?: string;
    }) =>
      gitlabAPI.getConfigFile(
        undefined,
        args.projectId,
        args.branch,
        args.path,
        args.instanceUrl
      ),
  });
};
