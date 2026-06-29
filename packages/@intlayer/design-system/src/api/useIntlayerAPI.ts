'use client';

import {
  type FetcherOptions,
  getIntlayerAPI,
  type IntlayerAPI,
} from '@intlayer/api';
import { getAiAPI } from '@intlayer/api/ai';
import { getAssetAPI } from '@intlayer/api/asset';
import { getAuditAPI } from '@intlayer/api/audit';
import { getBitbucketAPI } from '@intlayer/api/bitbucket';
import { getDictionaryAPI } from '@intlayer/api/dictionary';
import { getEditorAPI } from '@intlayer/api/editor';
import { getEnvironmentAPI } from '@intlayer/api/environment';
import { getGithubAPI } from '@intlayer/api/github';
import { getGitlabAPI } from '@intlayer/api/gitlab';
import { getNewsletterAPI } from '@intlayer/api/newsletter';
import { getOAuthAPI } from '@intlayer/api/oAuth';
import { getOrganizationAPI } from '@intlayer/api/organization';
import { getProjectAPI } from '@intlayer/api/project';
import { getReviewerAPI } from '@intlayer/api/reviewer';
import { getSearchAPI } from '@intlayer/api/search';
import { getShowcaseProjectAPI } from '@intlayer/api/showcaseProject';
import { getStripeAPI } from '@intlayer/api/stripe';
import { getTagAPI } from '@intlayer/api/tag';
import { getTranslateAPI } from '@intlayer/api/translate';
import { getUserAPI } from '@intlayer/api/user';
import { useConfiguration } from '@intlayer/editor-react';
import type { IntlayerConfig } from '@intlayer/types/config';
import { type AuthAPI, getAuthAPI } from '../libs/auth';
import { useAuth } from './useAuth';

export type UseIntlayerAuthProps = {
  options?: FetcherOptions;
  intlayerConfiguration?: IntlayerConfig;
};

export const useIntlayerOAuthOptions = (props?: UseIntlayerAuthProps) => {
  const configuration = useConfiguration();
  const { oAuth2AccessToken } = useAuth();

  const options = {
    ...(oAuth2AccessToken && {
      headers: {
        Authorization: `Bearer ${oAuth2AccessToken.accessToken}`,
      },
    }),
    ...(props?.options ?? {}),
  };

  const rawConfig = props?.intlayerConfiguration ?? configuration;
  // Only use the config if it's fully populated; an empty object (e.g. while
  // the session is still loading) has no `editor` key and would crash API
  // getters that do `intlayerConfig.editor.backendURL`.
  const resolvedConfig = rawConfig?.editor ? rawConfig : undefined;

  return { options, resolvedConfig };
};

export const useIntlayerOAuth = (props?: UseIntlayerAuthProps): IntlayerAPI => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getIntlayerAPI(options, resolvedConfig);
};

export const useIntlayerAuth = (props?: UseIntlayerAuthProps): AuthAPI => {
  const configuration = useConfiguration();

  return getAuthAPI(props?.intlayerConfiguration ?? configuration);
};

export const useOrganizationAPI = (
  props?: UseIntlayerAuthProps
): ReturnType<typeof getOrganizationAPI> => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getOrganizationAPI(options, resolvedConfig);
};

export const useProjectAPI = (
  props?: UseIntlayerAuthProps
): ReturnType<typeof getProjectAPI> => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getProjectAPI(options, resolvedConfig);
};

export const useUserAPI = (
  props?: UseIntlayerAuthProps
): ReturnType<typeof getUserAPI> => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getUserAPI(options, resolvedConfig);
};

export const useOAuthAPI = (
  props?: UseIntlayerAuthProps
): ReturnType<typeof getOAuthAPI> => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getOAuthAPI(options, resolvedConfig);
};

export const useDictionaryAPI = (
  props?: UseIntlayerAuthProps
): ReturnType<typeof getDictionaryAPI> => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getDictionaryAPI(options, resolvedConfig);
};

export const useStripeAPI = (
  props?: UseIntlayerAuthProps
): ReturnType<typeof getStripeAPI> => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getStripeAPI(options, resolvedConfig);
};

export const useAiAPI = (
  props?: UseIntlayerAuthProps
): ReturnType<typeof getAiAPI> => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getAiAPI(options, resolvedConfig);
};

export const useAuditAPI = (
  props?: UseIntlayerAuthProps
): ReturnType<typeof getAuditAPI> => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getAuditAPI(options, resolvedConfig);
};

export const useTagAPI = (
  props?: UseIntlayerAuthProps
): ReturnType<typeof getTagAPI> => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getTagAPI(options, resolvedConfig);
};

export const useSearchAPI = (
  props?: UseIntlayerAuthProps
): ReturnType<typeof getSearchAPI> => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getSearchAPI(options, resolvedConfig);
};

export const useEditorAPI = (
  props?: UseIntlayerAuthProps
): ReturnType<typeof getEditorAPI> => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getEditorAPI(options, resolvedConfig);
};

export const useNewsletterAPI = (
  props?: UseIntlayerAuthProps
): ReturnType<typeof getNewsletterAPI> => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getNewsletterAPI(options, resolvedConfig);
};

export const useGithubAPI = (
  props?: UseIntlayerAuthProps
): ReturnType<typeof getGithubAPI> => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getGithubAPI(options, resolvedConfig);
};

export const useGitlabAPI = (
  props?: UseIntlayerAuthProps
): ReturnType<typeof getGitlabAPI> => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getGitlabAPI(options, resolvedConfig);
};

export const useBitbucketAPI = (
  props?: UseIntlayerAuthProps
): ReturnType<typeof getBitbucketAPI> => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getBitbucketAPI(options, resolvedConfig);
};

export const useShowcaseProjectAPI = (
  props?: UseIntlayerAuthProps
): ReturnType<typeof getShowcaseProjectAPI> => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getShowcaseProjectAPI(options, resolvedConfig);
};

export const useTranslateAPI = (
  props?: UseIntlayerAuthProps
): ReturnType<typeof getTranslateAPI> => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getTranslateAPI(options, resolvedConfig);
};

export const useReviewerAPI = (
  props?: UseIntlayerAuthProps
): ReturnType<typeof getReviewerAPI> => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getReviewerAPI(options, resolvedConfig);
};

export const useEnvironmentAPI = (
  props?: UseIntlayerAuthProps
): ReturnType<typeof getEnvironmentAPI> => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getEnvironmentAPI(options, resolvedConfig);
};

export const useAssetAPI = (
  props?: UseIntlayerAuthProps
): ReturnType<typeof getAssetAPI> => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getAssetAPI(options, resolvedConfig);
};
