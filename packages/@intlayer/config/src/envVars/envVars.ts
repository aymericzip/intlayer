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
  addProcessEnv: boolean = false
): Record<string, string> =>
  nodeTypes.reduce(
    (acc, nodeType) => {
      acc[
        addProcessEnv
          ? `process.env.INTLAYER_NODE_TYPE_${nodeType.toUpperCase()}`
          : `INTLAYER_NODE_TYPE_${nodeType.toUpperCase()}`
      ] = '"false"';
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
  addProcessEnv: boolean = false
): Record<string, string> => {
  const prefix = addProcessEnv ? 'process.env.' : '';
  const { routing, editor } = config;

  const envVars: Record<string, string> = {
    [`${prefix}INTLAYER_ROUTING_MODE`]: JSON.stringify(routing.mode),
  };

  if (!routing.rewrite) {
    envVars[`${prefix}INTLAYER_ROUTING_REWRITE_RULES`] = '"false"';
  }

  if (routing.storage.cookies.length === 0) {
    envVars[`${prefix}INTLAYER_ROUTING_STORAGE_COOKIES`] = '"false"';
  }

  if (routing.storage.localStorage.length === 0) {
    envVars[`${prefix}INTLAYER_ROUTING_STORAGE_LOCALSTORAGE`] = '"false"';
  }

  if (routing.storage.sessionStorage.length === 0) {
    envVars[`${prefix}INTLAYER_ROUTING_STORAGE_SESSIONSTORAGE`] = '"false"';
  }

  if (routing.storage.headers.length === 0) {
    envVars[`${prefix}INTLAYER_ROUTING_STORAGE_HEADERS`] = '"false"';
  }

  if (editor?.enabled === false) {
    envVars[`${prefix}INTLAYER_EDITOR_ENABLED`] = '"false"';
  }

  return envVars;
};
