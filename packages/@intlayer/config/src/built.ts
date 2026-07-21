/**
 * @intlayer/config/built is a package that only returns the configuration file as a JSON object.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 */

import type { IntlayerConfig } from '@intlayer/types/config';
import { getConfiguration } from './configFile/getConfiguration';
import type { BuiltConfigKey } from './utils/builtConfigKeys';

const configuration: IntlayerConfig = getConfiguration();

const parsedJSONConfig = JSON.parse(JSON.stringify(configuration));

export const internationalization = parsedJSONConfig.internationalization;
export const dictionary = parsedJSONConfig.dictionary;
export const routing = parsedJSONConfig.routing;
export const content = parsedJSONConfig.content;
export const system = parsedJSONConfig.system;
export const editor = parsedJSONConfig.editor;
export const analytics = parsedJSONConfig.analytics;
export const log = parsedJSONConfig.log;
export const ai = parsedJSONConfig.ai;
export const build = parsedJSONConfig.build;
export const compiler = parsedJSONConfig.compiler;
export const schemas = parsedJSONConfig.schemas;
export const plugins = parsedJSONConfig.plugins;

/**
 * Compile-time guard: the named exports above must cover exactly the canonical
 * {@link BuiltConfigKey} list that `generateConfigurationContent` emits into the
 * aliased `configuration.mjs`. Adding a key to `BUILT_CONFIG_KEYS` without
 * exporting it here (or vice versa) is a type error, keeping the runtime and
 * aliased build targets in lockstep.
 */
({
  internationalization,
  dictionary,
  routing,
  content,
  system,
  editor,
  analytics,
  log,
  ai,
  build,
  compiler,
  schemas,
  plugins,
}) satisfies Record<BuiltConfigKey, unknown>;
