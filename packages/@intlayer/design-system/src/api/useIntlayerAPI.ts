'use client';

import {
  type FetcherOptions,
  getIntlayerAPI,
  type IntlayerAPI,
} from '@intlayer/api';
import { getAiAPI } from '@intlayer/api/ai';
import { getAuditAPI } from '@intlayer/api/audit';
import { getBitbucketAPI } from '@intlayer/api/bitbucket';
import { getDictionaryAPI } from '@intlayer/api/dictionary';
import { getEditorAPI } from '@intlayer/api/editor';
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

export const useOrganizationAPI = (props?: UseIntlayerAuthProps) => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getOrganizationAPI(options, resolvedConfig);
};

export const useProjectAPI = (props?: UseIntlayerAuthProps) => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getProjectAPI(options, resolvedConfig);
};

export const useUserAPI = (props?: UseIntlayerAuthProps) => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getUserAPI(options, resolvedConfig);
};

export const useOAuthAPI = (props?: UseIntlayerAuthProps) => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getOAuthAPI(options, resolvedConfig);
};

export const useDictionaryAPI = (props?: UseIntlayerAuthProps) => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getDictionaryAPI(options, resolvedConfig);
};

export const useStripeAPI = (props?: UseIntlayerAuthProps) => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getStripeAPI(options, resolvedConfig);
};

export const useAiAPI = (props?: UseIntlayerAuthProps) => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getAiAPI(options, resolvedConfig);
};

export const useAuditAPI = (props?: UseIntlayerAuthProps) => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getAuditAPI(options, resolvedConfig);
};

export const useTagAPI = (props?: UseIntlayerAuthProps) => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getTagAPI(options, resolvedConfig);
};

export const useSearchAPI = (props?: UseIntlayerAuthProps) => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getSearchAPI(options, resolvedConfig);
};

export const useEditorAPI = (props?: UseIntlayerAuthProps) => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getEditorAPI(options, resolvedConfig);
};

export const useNewsletterAPI = (props?: UseIntlayerAuthProps) => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getNewsletterAPI(options, resolvedConfig);
};

export const useGithubAPI = (props?: UseIntlayerAuthProps) => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getGithubAPI(options, resolvedConfig);
};

export const useGitlabAPI = (props?: UseIntlayerAuthProps) => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getGitlabAPI(options, resolvedConfig);
};

export const useBitbucketAPI = (props?: UseIntlayerAuthProps) => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getBitbucketAPI(options, resolvedConfig);
};

export const useShowcaseProjectAPI = (props?: UseIntlayerAuthProps) => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getShowcaseProjectAPI(options, resolvedConfig);
};

export const useTranslateAPI = (props?: UseIntlayerAuthProps) => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getTranslateAPI(options, resolvedConfig);
};

export const useReviewerAPI = (props?: UseIntlayerAuthProps) => {
  const { options, resolvedConfig } = useIntlayerOAuthOptions(props);
  return getReviewerAPI(options, resolvedConfig);
};
