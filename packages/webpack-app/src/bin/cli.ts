import { setAPI } from 'intlayer-cli';
import { webpack } from 'webpack';
import * as packageJson from '../../package.json';
import { bundle, startServer } from '../scripts';
import webpackConfig from '../webpack.config';

// Create a Webpack compiler instance with your configuration
const compiler = webpack(webpackConfig);

setAPI({
  version: packageJson.version,
  serve: () => startServer(compiler),
  build: () => bundle(compiler),
});
