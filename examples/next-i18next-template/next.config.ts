import { createNextI18nPlugin } from '@intlayer/next-i18next/plugin';
import type { NextConfig } from 'next';

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
