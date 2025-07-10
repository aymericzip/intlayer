import type { NextConfig } from 'next';
import { withIntlayer } from 'next-intlayer/server';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const RETURN_BUNDLE_ANALYZER = true;

const nextConfig: NextConfig = {
  /* config options here */

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(new BundleAnalyzerPlugin());
    }
    return config;
  },
};

const config = withIntlayer(RETURN_BUNDLE_ANALYZER ? (nextConfig as any) : {});

export default config;
