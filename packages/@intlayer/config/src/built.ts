/**
 * @intlayer/config/built is a package that only returns the configuration file as a JSON object.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 */

import type { IntlayerConfig } from '@intlayer/types/config';
import { getConfiguration } from './configFile/getConfiguration';

const configuration: IntlayerConfig = getConfiguration();

export const internationalization = configuration.internationalization;
export const dictionary = configuration.dictionary;
export const routing = configuration.routing;
export const content = configuration.content;
export const system = configuration.system;
export const editor = configuration.editor;
export const log = configuration.log;
export const ai = configuration.ai;
export const build = configuration.build;
export const compiler = configuration.compiler;
export const schemas = configuration.schemas;
export const plugins = configuration.plugins;

export default configuration;
