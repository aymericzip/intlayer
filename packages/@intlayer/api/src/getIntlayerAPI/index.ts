import { default as defaultConfiguration } from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/types/config';
import { defu } from 'defu';
import type { FetcherOptions } from '../fetcher';
import { getAiAPI } from './ai';
import { getAuditAPI } from './audit';
import { getBitbucketAPI } from './bitbucket';
import { getDictionaryAPI } from './dictionary';
import { getEditorAPI } from './editor';
import { getGithubAPI } from './github';
import { getGitlabAPI } from './gitlab';
import { getNewsletterAPI } from './newsletter';
import { getOAuthAPI } from './oAuth';
import { getOrganizationAPI } from './organization';
import { getProjectAPI } from './project';
import { getSearchAPI } from './search';
import { getShowcaseProjectAPI } from './showcaseProject';
import { getStripeAPI } from './stripe';
import { getTagAPI } from './tag';
import { getUserAPI } from './user';

interface IntlayerAPIReturn {
  organization: ReturnType<typeof getOrganizationAPI>;
  project: ReturnType<typeof getProjectAPI>;
  user: ReturnType<typeof getUserAPI>;
  oAuth: ReturnType<typeof getOAuthAPI>;
  dictionary: ReturnType<typeof getDictionaryAPI>;
  stripe: ReturnType<typeof getStripeAPI>;
  ai: ReturnType<typeof getAiAPI>;
  audit: ReturnType<typeof getAuditAPI>;
  tag: ReturnType<typeof getTagAPI>;
  search: ReturnType<typeof getSearchAPI>;
  editor: ReturnType<typeof getEditorAPI>;
  newsletter: ReturnType<typeof getNewsletterAPI>;
  github: ReturnType<typeof getGithubAPI>;
  gitlab: ReturnType<typeof getGitlabAPI>;
  bitbucket: ReturnType<typeof getBitbucketAPI>;
  showcaseProject: ReturnType<typeof getShowcaseProjectAPI>;
}

export const getIntlayerAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
): IntlayerAPIReturn => {
  const resolvedConfig = defu(
    intlayerConfig ?? {},
    defaultConfiguration
  ) as IntlayerConfig;

  return {
    organization: getOrganizationAPI(authAPIOptions, resolvedConfig),
    project: getProjectAPI(authAPIOptions, resolvedConfig),
    user: getUserAPI(authAPIOptions, resolvedConfig),
    oAuth: getOAuthAPI(resolvedConfig),
    dictionary: getDictionaryAPI(authAPIOptions, resolvedConfig),
    stripe: getStripeAPI(authAPIOptions, resolvedConfig),
    ai: getAiAPI(authAPIOptions, resolvedConfig),
    audit: getAuditAPI(authAPIOptions, resolvedConfig),
    tag: getTagAPI(authAPIOptions, resolvedConfig),
    search: getSearchAPI(authAPIOptions, resolvedConfig),
    editor: getEditorAPI(authAPIOptions, resolvedConfig),
    newsletter: getNewsletterAPI(authAPIOptions, resolvedConfig),
    github: getGithubAPI(authAPIOptions, resolvedConfig),
    gitlab: getGitlabAPI(authAPIOptions, resolvedConfig),
    bitbucket: getBitbucketAPI(authAPIOptions, resolvedConfig),
    showcaseProject: getShowcaseProjectAPI(authAPIOptions, resolvedConfig),
  };
};

export type IntlayerAPI = ReturnType<typeof getIntlayerAPI>;
