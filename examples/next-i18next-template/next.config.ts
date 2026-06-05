import type { NextConfig } from 'next';
import { createNextIntlayerPlugin } from 'next-intlayer/plugin';

const withIntlayer = createNextIntlayerPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
