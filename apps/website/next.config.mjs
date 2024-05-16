import { withIntlayer } from 'next-intlayer/server';
import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.module.rules.push({
      test: /\.md$/,
      // This is the asset module.
      type: 'asset/source',
    });

    return config;
  },
};

const nextConfigPWA = withPWA({
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
  register: true,
  skipWaiting: true,
})(nextConfig);

export default withIntlayer(nextConfigPWA);
