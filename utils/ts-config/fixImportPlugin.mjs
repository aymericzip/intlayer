import { fixAliasPlugin } from './fixAliasPlugin.mjs';
import { fixExtensionsPlugin } from './fixExtensionsPlugin.mjs';
import { fixFolderImportsPlugin } from './fixFolderImportsPlugin.mjs';

/**
 * Combined plugin that runs fixAliasPlugin, fixFolderImportsPlugin, and fixExtensionsPlugin.
 *
 * @returns {Plugin} An ESBuild plugin.
 */
export const fixImportsPlugin = () => ({
  name: 'fixImportsPlugin',
  setup: (build) => {
    // Apply each plugin's setup function
    fixAliasPlugin().setup(build);
    fixFolderImportsPlugin().setup(build);
    fixExtensionsPlugin().setup(build);
  },
});

// Optionally export individual plugins
export { fixAliasPlugin, fixExtensionsPlugin, fixFolderImportsPlugin };
