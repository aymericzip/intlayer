import { editor } from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/types/config';
import { createIntlayerCMS, type IntlayerCMS } from './cms/createIntlayerCMS';
import type { FetcherOptions } from './fetcher';
import { getAiAPI } from './getIntlayerAPI/ai';
import { getAnalyticsAPI } from './getIntlayerAPI/analytics';
import { getAssetAPI } from './getIntlayerAPI/asset';
import { getAuditAPI } from './getIntlayerAPI/audit';
import { getBitbucketAPI } from './getIntlayerAPI/bitbucket';
import { getDictionaryAPI } from './getIntlayerAPI/dictionary';
import { getEditorAPI } from './getIntlayerAPI/editor';
import { getEnvironmentAPI } from './getIntlayerAPI/environment';
import { getGithubAPI } from './getIntlayerAPI/github';
import { getGitlabAPI } from './getIntlayerAPI/gitlab';
import type { IntlayerAPI } from './getIntlayerAPI/index';
import { getNewsletterAPI } from './getIntlayerAPI/newsletter';
import { getOAuthAPI } from './getIntlayerAPI/oAuth';
import { getOrganizationAPI } from './getIntlayerAPI/organization';
import { getProjectAPI } from './getIntlayerAPI/project';
import { getReviewerAPI } from './getIntlayerAPI/reviewer';
import { getSearchAPI } from './getIntlayerAPI/search';
import { getShowcaseProjectAPI } from './getIntlayerAPI/showcaseProject';
import { getStatusAPI } from './getIntlayerAPI/status';
import { getStripeAPI } from './getIntlayerAPI/stripe';
import { getTagAPI } from './getIntlayerAPI/tag';
import { getTranslateAPI } from './getIntlayerAPI/translate';
import { getUserAPI } from './getIntlayerAPI/user';

type SectionKey = keyof IntlayerAPI;

/**
 * Homogeneous factory map: every domain factory normalized to the same
 * `(fetcherOptions, config) => section` signature, keyed by section name.
 * Declaring it as a single mapped type lets a generic lookup stay callable
 * (a union of factory signatures would not be).
 */
type SectionFactories = {
  [Key in SectionKey]: (
    fetcherOptions: FetcherOptions,
    intlayerConfig: IntlayerConfig
  ) => IntlayerAPI[Key];
};

const sectionFactories: SectionFactories = {
  asset: getAssetAPI,
  organization: getOrganizationAPI,
  project: getProjectAPI,
  environment: getEnvironmentAPI,
  user: getUserAPI,
  oAuth: getOAuthAPI,
  dictionary: getDictionaryAPI,
  stripe: getStripeAPI,
  ai: getAiAPI,
  analytics: getAnalyticsAPI,
  audit: getAuditAPI,
  tag: getTagAPI,
  search: getSearchAPI,
  editor: getEditorAPI,
  newsletter: getNewsletterAPI,
  github: getGithubAPI,
  gitlab: getGitlabAPI,
  bitbucket: getBitbucketAPI,
  showcaseProject: getShowcaseProjectAPI,
  translate: getTranslateAPI,
  reviewer: getReviewerAPI,
  status: getStatusAPI,
};

// The OAuth2 token endpoint must never receive an injected Bearer token —
// it is the call that issues one.
const AUTH_FREE_SECTIONS: ReadonlySet<SectionKey> = new Set<SectionKey>([
  'oAuth',
]);

/**
 * Builds the **complete** auto-authenticated Intlayer API as a single lazy
 * object. Every domain is reachable through it, so it pulls every domain client
 * into the bundle.
 *
 * Prefer {@link createIntlayerCMS} together with the per-domain endpoint binders
 * (e.g. `dictionaryEndpoint`) in bundle-sensitive code — they include only the
 * domains you use. This helper is a convenience for Node tools (such as the CLI)
 * where bundle size is not a concern.
 */
export const getIntlayerAPIProxy = (
  baseAuthOptions: FetcherOptions = {},
  intlayerConfig: Pick<IntlayerConfig, 'editor'> = { editor },
  sessionToken?: string
): IntlayerAPI => {
  const cms: IntlayerCMS = createIntlayerCMS(intlayerConfig, {
    baseFetcherOptions: baseAuthOptions,
    sessionToken,
  });

  const sectionCache = new Map<SectionKey, unknown>();

  // Generic over `Key` so `sectionFactories[key]` resolves to a single
  // `(opts, config) => IntlayerAPI[Key]` signature rather than the union of all
  // factory signatures (which would not be callable).
  const buildSection = <Key extends SectionKey>(key: Key): IntlayerAPI[Key] => {
    const factory = sectionFactories[key] as (
      fetcherOptions: FetcherOptions,
      intlayerConfig: IntlayerConfig
    ) => Record<string, unknown>;

    return cms.bindSection(factory, {
      skipAuth: AUTH_FREE_SECTIONS.has(key) ? true : undefined,
    }) as IntlayerAPI[Key];
  };

  return new Proxy({} as IntlayerAPI, {
    get(_target, property) {
      const key = property as SectionKey;
      if (!(key in sectionFactories)) return undefined;

      if (!sectionCache.has(key)) {
        sectionCache.set(key, buildSection(key));
      }

      return sectionCache.get(key);
    },
    has(_target, property) {
      return (property as SectionKey) in sectionFactories;
    },
    ownKeys() {
      return Reflect.ownKeys(sectionFactories);
    },
    getOwnPropertyDescriptor() {
      return { enumerable: true, configurable: true };
    },
  });
};

/**
 * The complete auto-authenticated Intlayer API returned by
 * {@link getIntlayerAPIProxy}. Equivalent in shape to `IntlayerAPI`.
 */
export type IntlayerAPIProxy = ReturnType<typeof getIntlayerAPIProxy>;
