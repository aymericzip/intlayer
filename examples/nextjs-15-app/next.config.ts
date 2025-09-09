import type { NextConfig } from 'next';
import { withIntlayer } from 'next-intlayer/server';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const RETURN_BUNDLE_ANALYZER = false;

const getConfig = async () => {
  const nextConfig: NextConfig = {
    webpack: (config, { isServer }) => {
      if (!isServer && RETURN_BUNDLE_ANALYZER) {
        config.plugins.push(new BundleAnalyzerPlugin());
      }

      return config;
    },
  };

  const config = await withIntlayer(nextConfig as any);

  return config;
};

export default getConfig;
