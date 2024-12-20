import { type IntlayerConfig } from '@intlayer/config/client';
import { getAiAPI } from './ai';
import { getAuthAPI } from './auth';
import { getDictionaryAPI } from './dictionary';
import type { FetcherOptions } from './fetcher';
import { getOrganizationAPI } from './organization';
import { getProjectAPI } from './project';
import { getStripeAPI } from './stripe';
import { getUserAPI } from './user';

export const getIntlayerAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => ({
  organization: getOrganizationAPI(authAPIOptions, intlayerConfig),
  project: getProjectAPI(authAPIOptions, intlayerConfig),
  user: getUserAPI(authAPIOptions, intlayerConfig),
  auth: getAuthAPI(authAPIOptions, intlayerConfig),
  dictionary: getDictionaryAPI(authAPIOptions, intlayerConfig),
  stripe: getStripeAPI(authAPIOptions, intlayerConfig),
  ai: getAiAPI(authAPIOptions, intlayerConfig),
});

export const intlayerAPI = getIntlayerAPI();
