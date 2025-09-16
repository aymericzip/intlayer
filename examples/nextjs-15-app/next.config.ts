import { withIntlayer } from 'next-intlayer/server';

const RETURN_BUNDLE_ANALYZER = false;

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: RETURN_BUNDLE_ANALYZER,
});

const getConfig = async () => {
  const config = await withIntlayer(withBundleAnalyzer());

  return config;
};

export default getConfig;
