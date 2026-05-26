'use client';

import { useConfiguration } from '@intlayer/editor-react';
import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import { useAuth } from '../useAuth';

type AuthEnableOptions = {
  requireUser?: boolean;
  requireProject?: boolean;
  requireOrganization?: boolean;
};

export const useAuthEnable = ({
  requireUser,
  requireProject,
  requireOrganization,
}: AuthEnableOptions) => {
  const configuration = useConfiguration();
  const { oAuth2AccessToken, session } = useAuth({
    intlayerConfiguration: configuration,
  });

  const user = session ? session.user : oAuth2AccessToken?.user;

  const organization = session
    ? session.organization
    : oAuth2AccessToken?.organization;

  const project = session ? session.project : oAuth2AccessToken?.project;

  const isUserEnabled = requireUser ? Boolean(user) : true;

  const isProjectEnabled = requireProject ? Boolean(project) : true;

  const isOrganizationEnabled = requireOrganization
    ? Boolean(organization)
    : true;

  const isEnabled = isUserEnabled && isProjectEnabled && isOrganizationEnabled;

  return {
    enable: isEnabled,
  };
};

export const useAppQuery = (
  options: UseQueryOptions & {
    requireUser?: boolean;
    requireProject?: boolean;
    requireOrganization?: boolean;
  }
) => {
  const { requireUser, requireProject, requireOrganization, ...rest } = options;
  const { enable } = useAuthEnable({
    requireUser,
    requireProject,
    requireOrganization,
  });

  const result = useQuery({
    enabled: rest?.enabled === false ? false : enable,
    ...rest,
  });

  return result;
};
