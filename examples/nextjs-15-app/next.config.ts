import type { NextConfig } from 'next';
import { withIntlayer } from 'next-intlayer/server';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const RETURN_BUNDLE_ANALYZER = false;

const nextConfig: NextConfig = {
  /* config options here */
  // Works for both Turbopack and Webpack server builds
  serverExternalPackages: ['fuse.js', 'markdown-to-jsx'],

  // Optional (no-op alias keeps the specifier stable under Turbopack)
  experimental: {
    turbo: {
      resolveAlias: {
        'fuse.js': 'fuse.js',
        'markdown-to-jsx': 'markdown-to-jsx',
      },
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(new BundleAnalyzerPlugin());
    }

    config.externals.push({
      'fuse.js': 'fuse.js',
      'markdown-to-jsx': 'markdown-to-jsx',
    });

    return config;
  },
};

const config = withIntlayer(RETURN_BUNDLE_ANALYZER ? (nextConfig as any) : {});

export default config;
