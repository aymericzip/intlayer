#!/usr/bin/env node

import { setAPI } from '@intlayer/cli';
import { webpackConfig, startServer, bundle, watch } from '@intlayer/webpack';
import { webpack } from 'webpack';
import * as packageJson from '../package.json';

// Create a Webpack compiler instance with your configuration
const compiler = webpack(webpackConfig);

// Log the compiler options
setAPI({
  version: packageJson.version,
  transpile: () => bundle(compiler),
  watch: () => watch(compiler),
  serve: () => startServer(compiler),
});
