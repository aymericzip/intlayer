/** @type {import('next').NextConfig} */

import { resolve } from 'path';
import { withIntlayer } from 'next-intlayer';

const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      '@swc/core': '@swc/core',
      vm: 'vm',
      intlayer: 'intlayer',
      'intlayer-react': 'intlayer-react',
      'intlayer-config': 'intlayer-config',
      'intlayer-webpack-app': 'intlayer-webpack-app',
    });

    // const relativeMainPath = relative(baseDirPath, mainDir);
    // const relativePath = join(relativeMainPath, 'dictionaries.cjs');
    const relativePath = './.intlayer/main/dictionaries.cjs';

    config.resolve.alias = {
      ...config.resolve.alias,
      // your aliases
      '@intlayer/dictionariesEntryPoint': relativePath,
    };

    console.log('config.resolve.alias', config.resolve.alias);

    // Important: return the modified config
    return config;
  },
};

export default nextConfig;
