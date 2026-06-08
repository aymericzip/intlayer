import { withIntlayer } from 'next-intlayer/server';

const RETURN_BUNDLE_ANALYZER = true;

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: RETURN_BUNDLE_ANALYZER,
});

const getConfig = async () => {
  const config = await withIntlayer({
    typescript: {
      ignoreBuildErrors: true, // Type error due to nextjs version mismatch with next-intlayer because of monorepo
    },
  });

  return config;
};

export default getConfig;
