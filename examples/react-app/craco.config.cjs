const { intlayerCracoPlugin } = require('react-scripts-intlayer');

/**
 * Here an example of how to use the intlayer plugin in a custom craco configuration file.
 *
 * File not needed if you are using the 'react-intlayer' script in the package.json file to start and build the application.
 */
module.exports = {
  plugins: [
    {
      plugin: intlayerCracoPlugin,
    },
  ],
  style: {
    postcss: {
      plugins: [
        require('postcss-preset-env')({ stage: 0 }),
        require('autoprefixer'),
      ],
    },
  },
};
