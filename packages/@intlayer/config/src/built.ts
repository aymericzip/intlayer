/**
 * @intlayer/config/built is a package that only returns the configuration file as a JSON object.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 */

import type { IntlayerConfig } from '@intlayer/types/config';
import { getConfiguration } from './configFile/getConfiguration';

const configuration: IntlayerConfig = getConfiguration();

const parsedJSONConfig = JSON.parse(JSON.stringify(configuration));

export const internationalization = parsedJSONConfig.internationalization;
export const dictionary = parsedJSONConfig.dictionary;
export const routing = parsedJSONConfig.routing;
export const content = parsedJSONConfig.content;
export const system = parsedJSONConfig.system;
export const editor = parsedJSONConfig.editor;
export const log = parsedJSONConfig.log;
export const ai = parsedJSONConfig.ai;
export const build = parsedJSONConfig.build;
export const compiler = parsedJSONConfig.compiler;
export const schemas = parsedJSONConfig.schemas;
export const plugins = parsedJSONConfig.plugins;
