/** @type {import('next').NextConfig} */
// import { webPackConfig } from 'intlayer-plugin';

const nextConfig = {
  webpack: (config, options) => {
    // An example of excluding specific module(s)
    config.externals.push({
      '@swc/core': '@swc/core',
      vm: 'vm',
      'intlayer-react': 'intlayer-react', // TODO: Remove this line for hot reload
    });

    // This allows webpack to watch for changes in custom directories or files
    // if (options.dev) {
    //   config.watchOptions = {
    //     ...config.watchOptions,
    //     // Paths to watch, can be a string or an array of strings
    //     ignored: [
    //       '**/!(.intlayer)/**/*',
    //       '**/node_modules/!(.intlayer)/**/*',
    //       // '**/node_modules/**',
    //       // '**/.git/**',
    //       // '**/.next/**',
    //       // '!**/.intlayer/**',
    //     ],
    //   };
    // }

    console.log('watchOptions', config.watchOptions);

    // Important: return the modified config
    return config;
  },

  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
