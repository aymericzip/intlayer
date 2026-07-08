import type { IntlayerConfig } from '@intlayer/types/config';

/**
 * Converts a camelCase node-type string to SCREAMING_SNAKE_CASE so that
 * the generated env-var name matches what the plugin source files check.
 *
 * @example
 * toScreamingSnakeCase('reactNode')  // 'REACT_NODE'
 * toScreamingSnakeCase('markdown')   // 'MARKDOWN'
 */
const toScreamingSnakeCase = (str: string): string =>
  str
    .replace(/([A-Z])/g, '_$1')
    .toUpperCase()
    .replace(/^_/, ''); // strip any leading underscore

/**
 * Converts a list of unused NodeType keys into env-var definitions.
 * Set to `"false"` so bundlers can eliminate the corresponding plugin code.
 *
 * @example
 * formatNodeTypeToEnvVar(['enumeration'])
 * // { 'INTLAYER_NODE_TYPE_ENUMERATION': '"false"' }
 *
 * formatNodeTypeToEnvVar(['reactNode'], (k) => `process.env.${k}`, (v) => `"${v}"`)
 * // { 'process.env.INTLAYER_NODE_TYPE_REACT_NODE': '"false"' }
 */
export const formatNodeTypeToEnvVar = (
  nodeTypes: string[],
  wrapKey = (key: string) => key,
  wrapValue = (value: string) => value
): Record<string, string> =>
  nodeTypes.reduce(
    (acc, nodeType) => {
      acc[wrapKey(`INTLAYER_NODE_TYPE_${toScreamingSnakeCase(nodeType)}`)] =
        wrapValue('false');
      return acc;
    },
    {} as Record<string, string>
  );

/**
 * Returns the env-var definition disabling the dictionary-selector resolution
 * path (collections, variants) when no built dictionary declares
 * a qualifier. Set to `"false"` so bundlers can dead-code-eliminate the
 * selector branch in `getIntlayer` / `useIntlayer`.
 *
 * Emits nothing when selectors are used, leaving the runtime default in place.
 *
 * @example
 * formatDictionarySelectorEnvVar(false)
 * // { INTLAYER_DICTIONARY_SELECTOR: '"false"' }
 *
 * formatDictionarySelectorEnvVar(true)
 * // {}
 *
 * formatDictionarySelectorEnvVar(false, (k) => `process.env.${k}`, (v) => `"${v}"`)
 * // { 'process.env.INTLAYER_DICTIONARY_SELECTOR': '"false"' }
 */
export const formatDictionarySelectorEnvVar = (
  hasDictionarySelector: boolean,
  wrapKey = (key: string) => key,
  wrapValue = (value: string) => value
): Record<string, string> =>
  hasDictionarySelector
    ? {}
    : { [wrapKey('INTLAYER_DICTIONARY_SELECTOR')]: wrapValue('false') };

/**
 * Returns env-var definitions for the full Intlayer config to be injected at
 * build time. Allows bundlers to dead-code-eliminate unused routing modes,
 * rewrite logic, storage mechanisms, and editor code.
 *
 * @example
 * getConfigEnvVars(config)
 * // { INTLAYER_ROUTING_MODE: '"prefix-no-default"', INTLAYER_ROUTING_REWRITE_RULES: '"false"', ... }
 *
 * getConfigEnvVars(config, true)
 * // { 'process.env.INTLAYER_ROUTING_MODE': '"prefix-no-default"', ... }
 */
export const getConfigEnvVars = (
  config: IntlayerConfig,
  wrapKey = (key: string) => key,
  wrapValue = (value: string) => value
): Record<string, string> => {
  const { routing, editor } = config;

  const envVars: Record<string, string> = {
    [wrapKey('INTLAYER_ROUTING_MODE')]: wrapValue(routing.mode),
  };

  if (routing.enableProxy === false) {
    envVars[wrapKey('INTLAYER_ROUTING_ENABLE_PROXY')] = wrapValue('false');
  }

  if (!routing.rewrite) {
    envVars[wrapKey('INTLAYER_ROUTING_REWRITE_RULES')] = wrapValue('false');
  }

  if (!routing.domains || Object.keys(routing.domains).length === 0) {
    envVars[wrapKey('INTLAYER_ROUTING_DOMAINS')] = wrapValue('false');
  }

  if (!routing.storage.cookies || routing.storage.cookies.length === 0) {
    envVars[wrapKey('INTLAYER_ROUTING_STORAGE_COOKIES')] = wrapValue('false');
  }

  if (
    !routing.storage.localStorage ||
    routing.storage.localStorage.length === 0
  ) {
    envVars[wrapKey('INTLAYER_ROUTING_STORAGE_LOCALSTORAGE')] =
      wrapValue('false');
  }

  if (
    !routing.storage.sessionStorage ||
    routing.storage.sessionStorage.length === 0
  ) {
    envVars[wrapKey('INTLAYER_ROUTING_STORAGE_SESSIONSTORAGE')] =
      wrapValue('false');
  }

  if (!routing.storage.headers || routing.storage.headers.length === 0) {
    envVars[wrapKey('INTLAYER_ROUTING_STORAGE_HEADERS')] = wrapValue('false');
  }

  if (editor?.enabled === false) {
    envVars[wrapKey('INTLAYER_EDITOR_ENABLED')] = wrapValue('false');
  }

  // Analytics reuses the editor config (no dedicated schema): it can only
  // attribute events when a project key is configured. Without an
  // `editor.clientId`, disable it so bundlers dead-code-eliminate the whole
  // `@intlayer/analytics` integration (providers + node plugins).
  if (!editor?.clientId) {
    envVars[wrapKey('INTLAYER_ANALYTICS_ENABLED')] = wrapValue('false');
  }

  return envVars;
};
