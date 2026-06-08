import { createNextIntlPlugin } from '@intlayer/next-intl/plugin';
import type { NextConfig } from 'next';

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
