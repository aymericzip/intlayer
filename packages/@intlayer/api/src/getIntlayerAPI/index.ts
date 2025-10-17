import type { IntlayerConfig } from '@intlayer/types';
import type { FetcherOptions } from '../fetcher';
import { getAiAPI } from './ai';
import { getDictionaryAPI } from './dictionary';
import { getEditorAPI } from './editor';
import { getNewsletterAPI } from './newsletter';
import { getOAuthAPI } from './oAuth';
import { getOrganizationAPI } from './organization';
import { getProjectAPI } from './project';
import { getSearchAPI } from './search';
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
  tag: ReturnType<typeof getTagAPI>;
  search: ReturnType<typeof getSearchAPI>;
  editor: ReturnType<typeof getEditorAPI>;
  newsletter: ReturnType<typeof getNewsletterAPI>;
}

export const getIntlayerAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
): IntlayerAPIReturn => ({
  organization: getOrganizationAPI(authAPIOptions, intlayerConfig),
  project: getProjectAPI(authAPIOptions, intlayerConfig),
  user: getUserAPI(authAPIOptions, intlayerConfig),
  oAuth: getOAuthAPI(intlayerConfig),
  dictionary: getDictionaryAPI(authAPIOptions, intlayerConfig),
  stripe: getStripeAPI(authAPIOptions, intlayerConfig),
  ai: getAiAPI(authAPIOptions, intlayerConfig),
  tag: getTagAPI(authAPIOptions, intlayerConfig),
  search: getSearchAPI(authAPIOptions, intlayerConfig),
  editor: getEditorAPI(authAPIOptions, intlayerConfig),
  newsletter: getNewsletterAPI(authAPIOptions, intlayerConfig),
});

export type IntlayerAPI = ReturnType<typeof getIntlayerAPI>;
