import { editor } from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { FetcherOptions } from '../fetcher';
import {
  type AuthManager,
  type AuthManagerOptions,
  type BindSectionOptions,
  createAuthManager,
} from './createAuthManager';

/**
 * Options accepted when creating the Intlayer CMS authenticator.
 */
export type IntlayerCMSOptions = AuthManagerOptions;

/**
 * The Intlayer CMS authenticator returned by {@link createIntlayerCMS}.
 *
 * It is a lightweight object that holds the credentials and the managed token,
 * but knows nothing about individual domains. Pair it with a domain endpoint
 * (e.g. `dictionaryEndpoint`) to issue authenticated requests.
 */
export type IntlayerCMS = AuthManager;

/**
 * Creates an Intlayer CMS authenticator handling authentication automatically
 * (OAuth2 `client_credentials`, or a CLI session token).
 *
 * This factory is intentionally lightweight: it does **not** bundle any domain
 * client. Combine it with the per-domain endpoint binders — imported separately
 * so only the domains you use are included in your bundle.
 *
 * The configuration is optional: when omitted, the credentials are read from the
 * build-time configuration (`@intlayer/config/built`), which resolves the
 * `INTLAYER_CLIENT_ID` / `INTLAYER_CLIENT_SECRET` environment variables.
 *
 * > Security: the CMS credentials grant write access to your content. Only ever
 * > create the authenticator on the server side — never ship `clientId` /
 * > `clientSecret` to the browser.
 *
 * @param intlayerConfig - Intlayer configuration carrying the `editor`
 * credentials. Defaults to the build-time configuration.
 * @param options - Optional CLI session token and base fetcher options.
 *
 * @example
 * ```ts
 * import { createIntlayerCMS } from '@intlayer/api';
 * import { dictionaryEndpoint } from '@intlayer/api/dictionary';
 *
 * // Optional: reads INTLAYER_CLIENT_ID / INTLAYER_CLIENT_SECRET when omitted
 * const cms = createIntlayerCMS();
 *
 * // Read
 * const { data: dictionaries } = await dictionaryEndpoint(cms).getDictionaries();
 *
 * // Write
 * await dictionaryEndpoint(cms).pushDictionaries([myDictionary]);
 * ```
 */
export const createIntlayerCMS = (
  intlayerConfig: Pick<IntlayerConfig, 'editor'> = { editor },
  options: IntlayerCMSOptions = {}
): IntlayerCMS => createAuthManager(intlayerConfig, options);

/**
 * A domain endpoint binder: given an authenticator (or none, in which case a
 * default one is created from the build-time configuration), returns the
 * authenticated domain section.
 */
export type CMSEndpoint<Section extends Record<string, unknown>> = (
  cms?: IntlayerCMS
) => Section;

/**
 * Turns a domain factory into a tree-shakeable endpoint binder.
 *
 * Each endpoint pulls in only its own domain client plus the auth machinery, so
 * importing `dictionaryEndpoint` never bundles the project, AI, or any other
 * domain.
 *
 * @param factory - The domain factory (e.g. `getDictionaryAPI`).
 * @param options - Binding options, e.g. `{ skipAuth: true }` for the token
 * endpoint itself.
 *
 * @example
 * ```ts
 * // inside @intlayer/api/dictionary
 * export const dictionaryEndpoint = createEndpoint(getDictionaryAPI);
 * ```
 */
export const createEndpoint =
  <Section extends Record<string, unknown>>(
    factory: (
      fetcherOptions: FetcherOptions,
      intlayerConfig: IntlayerConfig
    ) => Section,
    options?: BindSectionOptions
  ): CMSEndpoint<Section> =>
  (cms: IntlayerCMS = createIntlayerCMS()): Section =>
    cms.bindSection(factory, options);
