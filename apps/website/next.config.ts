import type { NextConfig } from 'next';
import { withIntlayer } from 'next-intlayer/server';
import withPWA from 'next-pwa';
import { createSecureHeaders } from 'next-secure-headers';

const isProd = process.env.NODE_ENV === 'production';

const secureHeaders = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: "'self'",
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "'report-sample'",
        `*.${process.env.NEXT_PUBLIC_DOMAIN}`,
        'fonts.googleapis.com',
        "'unsafe-inline'",
      ],
      styleSrcElem: [
        "'self'",
        "'report-sample'",
        `*.${process.env.NEXT_PUBLIC_DOMAIN}`,
        'fonts.googleapis.com',
        'cdn.jsdelivr.net',
        "'unsafe-inline'",
      ],
      scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
      scriptSrcElem: [
        "'self'",
        'data:',
        "'report-sample'",
        "'unsafe-inline'",
        `blob: *.${process.env.NEXT_PUBLIC_DOMAIN}`,
        '*.facebook.net',
        '*.google-analytics.com',
        '*.googletagmanager.com',
        '*.stripe.com',
        'cdn.jsdelivr.net',
        '*.ahrefs.com',
      ],
      connectSrc: [
        "'self'",
        'data:',
        `*.${process.env.NEXT_PUBLIC_DOMAIN}`,
        `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        'fonts.googleapis.com',
        '*.facebook.net',
        '*.facebook.com',
        '*.google-analytics.com',
        '*.googletagmanager.com',
        'github.com',
        'api.github.com',
        'raw.githubusercontent.com',
        '*.openai.com',
        '*.stripe.com',
        '*.producthunt.com',
        'cdn.jsdelivr.net',
        '*.ahrefs.com',
        '*.star-history.com',
        '*.vercel.app',
        'img.shields.io',
        '*.googleusercontent.com',
      ],
      imgSrc: [
        "'self'",
        'https:',
        'data:',
        'raw.githubusercontent.com',
        'avatars.githubusercontent.com',
        '*.googleusercontent.com',
      ],
      workerSrc: [
        `${process.env.NEXT_PUBLIC_URL}`,
        `blob: *.${process.env.NEXT_PUBLIC_DOMAIN}`,
      ],
      mediaSrc: ["'self'"],
      formAction: ["'self'"],
      fontSrc: ["'self'", 'cdn.jsdelivr.net'],
      objectSrc: [
        "'self'",
        'data:',
        `blob: *.${process.env.NEXT_PUBLIC_DOMAIN}`,
      ],
      frameSrc: [
        "'self'",
        '*.youtube.com',
        'github.dev',
        'github.com',
        '*.github.com',
        '*.stripe.com',
        'stackblitz.com',
      ],
      frameAncestors: ["'self'", 'intlayer.org', 'localhost:*'],
      manifestSrc: ["'self'"],
      childSrc: ["'self'", '*.googletagmanager.com'],
    },
  },
  ...(isProd
    ? {
        forceHTTPSRedirect: [
          true,
          { maxAge: 60 * 60 * 24 * 4, includeSubDomains: true },
        ],
      }
    : {}),
  referrerPolicy: 'same-origin',
};

const headersList = [
  {
    key: 'Cache-Control',
    value: 'public, max-age=60, stale-while-revalidate=30',
  },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Embedder-Policy', value: 'same-origin' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-XSS-Protection',
    value: '0', // Disables legacy XSS protection
  },
  {
    key: 'Permissions-Policy',
    value: 'fullscreen=(self)',
  },
];

const defaultHeaders = [...createSecureHeaders(secureHeaders), ...headersList];

const dashboardHeaders = [
  ...createSecureHeaders({
    ...secureHeaders,
    contentSecurityPolicy: {
      ...secureHeaders.contentSecurityPolicy,
      directives: {
        ...secureHeaders.contentSecurityPolicy.directives,
        connectSrc: ['*'],
        frameSrc: ['*'],
        frameAncestors: ['*'],
      },
    },
  }),
  ...headersList,
];

const nextConfig: NextConfig = {
  // Ensure the full @intlayer/docs package (including markdown assets) is shipped with the server bundle
  serverExternalPackages: ['@intlayer/backend', '@intlayer/docs'],
  transpilePackages: ['@intlayer/design-system', 'shiki'],
  reactCompiler: true,
  productionBrowserSourceMaps: true,
  // cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      // This is the asset module.
      type: 'asset/source',
    });

    config.externals.push({
      '@intlayer/backend': '@intlayer/backend',
    });

    return config;
  },
  turbopack: {
    rules: {
      '*.md': {
        as: '*.ts',
        loaders: ['raw-loader'],
      },
    },
  },

  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },

  compiler: {
    removeConsole: isProd,
  },

  headers: () => [
    {
      source: '/dashboard/:path*',
      headers: dashboardHeaders,
    },
    {
      source: '/:locale/dashboard/:path*',
      headers: dashboardHeaders,
    },
    {
      // All page routes, not the api ones
      source: '/:path((?!api).*)*',
      headers: defaultHeaders,
    },
  ],
  async redirects() {
    return [
      {
        source: '/doc/environment/vite-and-react/tanstack-start',
        destination: '/doc/environment/tanstack-start',
        permanent: true,
      },
      {
        source: '/:locale/doc/environment/vite-and-react/tanstack-start',
        destination: '/:locale/doc/environment/tanstack-start',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Map localized markdown doc URLs to the raw route, force plain text for broad client compatibility
        {
          source: '/:locale/doc/:path*.md',
          destination: '/:locale/doc/raw/:path*?format=txt',
        },
        // Map default (no-locale) markdown doc URLs to English by default, force plain text
        {
          source: '/doc/:path*.md',
          destination: '/en/doc/raw/:path*?format=txt',
        },
        // Map localized markdown blog URLs to the raw route, force plain text
        {
          source: '/:locale/blog/:path*.md',
          destination: '/:locale/blog/raw/:path*?format=txt',
        },
        // Map default (no-locale) markdown blog URLs to English by default, force plain text
        {
          source: '/blog/:path*.md',
          destination: '/en/blog/raw/:path*?format=txt',
        },
        {
          source: '/environment/nextjs/next-with-Page-Router',
          destination: '/environment/nextjs/next-with-page-router',
        },
        {
          source: '/:locale/environment/nextjs/next-with-Page-Router',
          destination: '/:locale/environment/nextjs/next-with-page-router',
        },
      ],
    };
  },
};

const nextConfigPWA: NextConfig = withPWA({
  disable: process.env.ENABLE_SERVICE_WORKER !== 'true',
  dest: 'public',
  register: true,
  skipWaiting: true,
})(nextConfig);

const config: Promise<NextConfig> = withIntlayer(nextConfigPWA);

export default config;
