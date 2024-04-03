#!/usr/bin/env node

import { setAPI } from 'intlayer-cli';
import { webpack } from 'webpack';
import * as packageJson from '../package.json';
import { startServer, bundle, watch } from '../src/scripts';
import { webpackConfig } from '../webpack.config';

// Create a Webpack compiler instance with your configuration
const compiler = webpack(webpackConfig);

// Log the compiler options
setAPI({
  version: packageJson.version,
  transpile: () => bundle(compiler),
  watch: () => watch(compiler),
  serve: () => startServer(compiler),
});
