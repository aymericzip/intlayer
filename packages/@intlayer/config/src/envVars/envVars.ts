import type { IntlayerConfig } from '@intlayer/types/config';

// ── Tree-shake constants ──────────────────────────────────────────────────────
// When these env vars are injected at build time, bundlers eliminate the
// branches guarded by these constants.

/**
 * True when the build-time routing mode is known and is NOT 'no-prefix'.
 * Use to guard no-prefix-specific code paths so bundlers can eliminate them.
 *
 * @example
 * if (!TREE_SHAKE_NO_PREFIX && mode === 'no-prefix') { ... }
 */
export const TREE_SHAKE_NO_PREFIX =
  process.env['INTLAYER_ROUTING_MODE'] &&
  process.env['INTLAYER_ROUTING_MODE'] !== 'no-prefix';

/**
 * True when the build-time routing mode is known and is NOT 'search-params'.
 *
 * @example
 * if (!TREE_SHAKE_SEARCH_PARAMS && mode === 'search-params') { ... }
 */
export const TREE_SHAKE_SEARCH_PARAMS =
  process.env['INTLAYER_ROUTING_MODE'] &&
  process.env['INTLAYER_ROUTING_MODE'] !== 'search-params';

/**
 * True when the build-time routing mode is known and is not a prefix-based
 * mode (neither 'prefix-all' nor 'prefix-no-default').
 *
 * @example
 * if (!TREE_SHAKE_PREFIX_MODES && (mode === 'prefix-all' || mode === 'prefix-no-default')) { ... }
 */
export const TREE_SHAKE_PREFIX_MODES =
  process.env['INTLAYER_ROUTING_MODE'] &&
  process.env['INTLAYER_ROUTING_MODE'] !== 'prefix-all' &&
  process.env['INTLAYER_ROUTING_MODE'] !== 'prefix-no-default';

/**
 * True when rewrite rules are explicitly disabled at build time
 * (INTLAYER_ROUTING_REWRITE_RULES === 'false').
 *
 * @example
 * if (!TREE_SHAKE_REWRITE && rewrite) { ... }
 */
export const TREE_SHAKE_REWRITE =
  process.env['INTLAYER_ROUTING_REWRITE_RULES'] === 'false';

// ── Storage tree-shake constants ──────────────────────────────────────────────

/**
 * True when cookie storage is explicitly disabled at build time.
 *
 * @example
 * if (!TREE_SHAKE_STORAGE_COOKIES) { // cookie logic }
 */
export const TREE_SHAKE_STORAGE_COOKIES =
  process.env['INTLAYER_ROUTING_STORAGE_COOKIES'] === 'false';

/**
 * True when localStorage is explicitly disabled at build time.
 *
 * @example
 * if (!TREE_SHAKE_STORAGE_LOCAL_STORAGE) { // localStorage logic }
 */
export const TREE_SHAKE_STORAGE_LOCAL_STORAGE =
  process.env['INTLAYER_ROUTING_STORAGE_LOCALSTORAGE'] === 'false';

/**
 * True when sessionStorage is explicitly disabled at build time.
 *
 * @example
 * if (!TREE_SHAKE_STORAGE_SESSION_STORAGE) { // sessionStorage logic }
 */
export const TREE_SHAKE_STORAGE_SESSION_STORAGE =
  process.env['INTLAYER_ROUTING_STORAGE_SESSIONSTORAGE'] === 'false';

/**
 * True when header storage is explicitly disabled at build time.
 *
 * @example
 * if (!TREE_SHAKE_STORAGE_HEADERS) { // header logic }
 */
export const TREE_SHAKE_STORAGE_HEADERS =
  process.env['INTLAYER_ROUTING_STORAGE_HEADERS'] === 'false';

/**
 * True when the editor is explicitly disabled at build time.
 *
 * @example
 * if (!TREE_SHAKE_EDITOR) { // editor logic }
 */
export const TREE_SHAKE_EDITOR =
  process.env['INTLAYER_EDITOR_ENABLED'] === 'false';

// ── Build-time env-var helpers ────────────────────────────────────────────────

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
