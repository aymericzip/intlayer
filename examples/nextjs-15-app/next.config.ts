import type { NextConfig } from 'next';
import { withIntlayer } from 'next-intlayer/server';

const nextConfig: NextConfig = {
  /* config options here */
};

export default withIntlayer(nextConfig as any);
