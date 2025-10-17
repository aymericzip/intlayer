/**
 * @intlayer/config/built is a package that only returns the configuration file as a JSON object.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 */

import type { IntlayerConfig } from '@intlayer/types';

let configuration: IntlayerConfig | undefined;

(() => {
  import('./configFile/getConfiguration').then(({ getConfiguration }) => {
    configuration = getConfiguration();
  });
})();

export default configuration;
