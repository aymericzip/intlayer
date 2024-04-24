const intlayerPlugin = require('react-intlayer/craco-plugin');

/**
 * Here an example of how to use the intlayer plugin in a custom craco configuration file.
 *
 * File not needed if you are using the 'react-intlayer' script in the package.json file to start and build the application.
 */
module.exports = {
  plugins: [
    {
      plugin: intlayerPlugin,
    },
  ],
};
