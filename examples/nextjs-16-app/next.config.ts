import type { NextConfig } from 'next';
import { withIntlayer } from 'next-intlayer/server';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Type error due to nextjs version mismatch with next-intlayer because of monorepo
  },
  transpilePackages: ['intlayer', '@intlayer/types'],
  experimental: {
    // Tells Turbopack to aggressively analyze and tree-shake these specific packages
    optimizePackageImports: ['intlayer', '@intlayer/types'],
  },
};

export default withIntlayer(nextConfig);
