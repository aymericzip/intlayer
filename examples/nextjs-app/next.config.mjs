/** @type {import('next').NextConfig} */
// import { webPackConfig } from 'intlayer-plugin';

const nextConfig = {
  webpack: (config) => {
    return config;
  },
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
