import type { Compiler } from 'webpack';
const WebpackDevServer = require('webpack-dev-server');

export const startServer = (compiler: Compiler) => {
  // Define options for webpack-dev-server
  const serverOptions = {
    // Specify the webpack-dev-server options here
    hot: true, // Enable Hot Module Replacement
    historyApiFallback: true, // For SPAs handling routing via client side code
    static: {
      directory: './dist', // Folder to serve files from
    },
    // Add more options based on your requirement
  };

  // Create a new instance of webpack-dev-server
  const devServer = new WebpackDevServer(serverOptions, compiler);

  // Start the server
  devServer.startCallback(() => {
    console.info('Webpack Dev Server is running...');
  });
};
