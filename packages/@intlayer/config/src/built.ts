/**
 * @intlayer/config/built is a package that only returns the configuration file as a JSON object.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 */

import { getConfiguration } from './configFile/getConfiguration';

const configuration = getConfiguration();

export default configuration;
