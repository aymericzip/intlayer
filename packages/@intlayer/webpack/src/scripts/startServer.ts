import type { Compiler } from 'webpack';
import { devServerConfig } from '../webpack.config';

const WebpackDevServer = require('webpack-dev-server');

export const startServer = (compiler: Compiler) => {
  // Create a new instance of webpack-dev-server
  const devServer = new WebpackDevServer(devServerConfig, compiler);

  // Start the server
  devServer.startCallback(() => {
    console.info('Webpack Dev Server is running...');
  });
};
