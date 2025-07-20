import type { IntlayerConfig } from '@intlayer/config/client';
import type { FetcherOptions } from '../fetcher';
import { getAiAPI } from './ai';
import { getAuthAPI } from './auth';
import { getDictionaryAPI } from './dictionary';
import { getEditorAPI } from './editor';
import { getNewsletterAPI } from './newsletter';
import { getOrganizationAPI } from './organization';
import { getProjectAPI } from './project';
import { getSearchAPI } from './search';
import { getStripeAPI } from './stripe';
import { getTagAPI } from './tag';
import { getUserAPI } from './user';

export const getIntlayerAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => ({
  organization: getOrganizationAPI(authAPIOptions, intlayerConfig),
  project: getProjectAPI(authAPIOptions, intlayerConfig),
  user: getUserAPI(authAPIOptions, intlayerConfig),
  auth: getAuthAPI(intlayerConfig),
  dictionary: getDictionaryAPI(authAPIOptions, intlayerConfig),
  stripe: getStripeAPI(authAPIOptions, intlayerConfig),
  ai: getAiAPI(authAPIOptions, intlayerConfig),
  tag: getTagAPI(authAPIOptions, intlayerConfig),
  search: getSearchAPI(authAPIOptions, intlayerConfig),
  editor: getEditorAPI(authAPIOptions, intlayerConfig),
  newsletter: getNewsletterAPI(authAPIOptions, intlayerConfig),
});

export type IntlayerAPI = ReturnType<typeof getIntlayerAPI>;
