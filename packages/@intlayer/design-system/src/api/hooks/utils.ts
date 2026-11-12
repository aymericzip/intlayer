'use client';

import { useConfiguration } from '@intlayer/editor-react';
import {
  type DefaultError,
  type QueryKey,
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { useAuth, useBearerAuth } from '../useAuth';

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

  const bearerAuth = useBearerAuth();

  const user = session
    ? session.user
    : (oAuth2AccessToken?.user ?? bearerAuth?.user);

  const organization = session
    ? session.organization
    : (oAuth2AccessToken?.organization ?? bearerAuth?.organization);

  const project = session
    ? session.project
    : (oAuth2AccessToken?.project ?? bearerAuth?.project);

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

/**
 * Query options a hook caller may override. Kept independent of the query
 * data so spreading them never widens the inferred result type.
 */
export type AppQueryOptions = {
  enabled?: boolean;
  staleTime?: number;
  gcTime?: number;
  refetchInterval?: number | false;
  refetchOnMount?: boolean;
  refetchOnWindowFocus?: boolean;
  retry?: boolean | number;
};

/** `useQuery` gated on the session (user / organization / project). */
export const useAppQuery = <
  QueryFnData = unknown,
  Error = DefaultError,
  Data = QueryFnData,
  Key extends QueryKey = QueryKey,
>(
  options: UseQueryOptions<QueryFnData, Error, Data, Key> & AuthEnableOptions
): UseQueryResult<Data, Error> => {
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
