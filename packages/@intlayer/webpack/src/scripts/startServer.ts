import type { Compiler } from 'webpack';
import { default as WebpackDevServer } from 'webpack-dev-server';
import { devServerConfig } from '../webpack.config';

export const startServer = (compiler: Compiler) => {
  // Create a new instance of webpack-dev-server
  const devServer = new WebpackDevServer(devServerConfig, compiler);

  // Start the server
  devServer.startCallback(() => {
    console.info('Webpack Dev Server is running...');
  });
};
