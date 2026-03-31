import type { IntlayerConfig } from '@intlayer/types/config';

/**
 * Converts a list of unused NodeType keys into env-var definitions.
 * Set to `"false"` so bundlers can eliminate the corresponding plugin code.
 *
 * @example
 * formatNodeTypeToEnvVar(['enumeration'])
 * // { 'INTLAYER_NODE_TYPE_ENUMERATION': '"false"' }
 *
 * formatNodeTypeToEnvVar(['enumeration'], true)
 * // { 'process.env.INTLAYER_NODE_TYPE_ENUMERATION': '"false"' }
 */
export const formatNodeTypeToEnvVar = (
  nodeTypes: string[],
  wrapKey = (key: string) => key,
  wrapValue = (value: string) => value
): Record<string, string> =>
  nodeTypes.reduce(
    (acc, nodeType) => {
      acc[wrapKey(`INTLAYER_NODE_TYPE_${nodeType.toUpperCase()}`)] =
        wrapValue('false');
      return acc;
    },
    {} as Record<string, string>
  );

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

  if (!routing.rewrite) {
    envVars[wrapKey('INTLAYER_ROUTING_REWRITE_RULES')] = wrapValue('false');
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

  return envVars;
};
