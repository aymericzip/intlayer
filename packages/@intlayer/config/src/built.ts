/**
 * @intlayer/config/built is a package that only returns the configuration file as a JSON object.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 */

import { existsSync } from 'fs';
import { join } from 'path';
import {
  getConfiguration,
  ESMxCJSRequire,
  type IntlayerConfig,
} from '@intlayer/config';
import { buildConfigurationFields } from './configFile/buildConfigurationFields';

let configuration: IntlayerConfig;

const { content } = getConfiguration();
const configFilePath = join(content.configDir, 'configuration.json');

// Test if the dictionaries file exists
if (existsSync(configFilePath)) {
  ESMxCJSRequire(configFilePath);
  configuration = ESMxCJSRequire(configFilePath);
} else {
  configuration = buildConfigurationFields();
}

export default configuration;
