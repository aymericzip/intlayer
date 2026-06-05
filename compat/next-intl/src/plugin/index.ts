import type { NextConfig } from 'next';
import { withIntlayer } from 'next-intlayer/server';

/**
 * A Next.js plugin for next-intl compat that wraps next-intlayer's plugin
 * and configures resolve aliases for next-intl.
 */
export const createNextIntlPlugin = (_i18nPath?: string) => {
  return async (nextConfig: NextConfig = {}): Promise<NextConfig> => {
    const customWebpack = nextConfig.webpack;

    const aliasConfig = {
      webpack: (config: any, options: any) => {
        config.resolve.alias = {
          ...config.resolve.alias,
          'next-intl/server': require.resolve('@intlayer/next-intl/server'),
          'next-intl/routing': require.resolve('@intlayer/next-intl/routing'),
          'next-intl': require.resolve('@intlayer/next-intl'),
        };

        if (typeof customWebpack === 'function') {
          return customWebpack(config, options);
        }
        return config;
      },
    };

    // For turbopack / experimental.turbo aliases
    const turboAlias = {
      'next-intl/server': '@intlayer/next-intl/server',
      'next-intl/routing': '@intlayer/next-intl/routing',
      'next-intl': '@intlayer/next-intl',
    };

    // `experimental.turbo` is the legacy (Next < 15.3) location for Turbopack
    // options. Newer Next moved it to the top-level `turbopack` key (set below)
    // and dropped it from the `experimental` type, so it is built separately and
    // cast to retain backwards compatibility without tripping excess-property
    // checks.
    const previousExperimental = nextConfig.experimental as
      | { turbo?: { resolveAlias?: Record<string, string> } }
      | undefined;

    const experimental = {
      ...(nextConfig.experimental ?? {}),
      turbo: {
        ...(previousExperimental?.turbo ?? {}),
        resolveAlias: {
          ...(previousExperimental?.turbo?.resolveAlias ?? {}),
          ...turboAlias,
        },
      },
    } as NextConfig['experimental'];

    const mergedConfig: NextConfig = {
      ...nextConfig,
      ...aliasConfig,
      turbopack: {
        ...(nextConfig.turbopack ?? {}),
        resolveAlias: {
          ...(nextConfig.turbopack?.resolveAlias ?? {}),
          ...turboAlias,
        },
      },
      experimental,
    };

    return withIntlayer(mergedConfig);
  };
};

export default createNextIntlPlugin;
