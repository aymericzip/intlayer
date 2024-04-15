#!/usr/bin/env node

import { setAPI } from '@intlayer/cli';
import { webpackConfig, startServer, bundle, watch } from '@intlayer/webpack';
import { webpack } from 'webpack';

// Create a Webpack compiler instance with your configuration
const compiler = webpack(webpackConfig);

// Log the compiler options
setAPI({
  version: '1.0.0',
  transpile: () => bundle(compiler),
  watch: () => watch(compiler),
  serve: () => startServer(compiler),
});
