import type { NextConfig } from 'next';
import { withIntlayer } from 'next-intlayer/server';
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
      scriptSrc: [
        "'self'",
        "'unsafe-eval'",
        "'unsafe-inline'",
        '*.youtube.com',
      ],
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
        '*.youtube.com',
      ],
      connectSrc: [
        "'self'",
        'data:',
        `*.${process.env.NEXT_PUBLIC_DOMAIN}`,
        `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        `${process.env.NEXT_PUBLIC_SCANNER_API_URL}`,
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
        '*.githubusercontent.com',
      ],
      imgSrc: [
        "'self'",
        'https:',
        'data:',
        'raw.githubusercontent.com',
        'avatars.githubusercontent.com',
        '*.googleusercontent.com',
        '*.githubusercontent.com',
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
} satisfies Parameters<typeof createSecureHeaders>[0];

const globalHeaders = [
  {
    key: 'Cache-Control',
    value: 'public, max-age=31536000, stale-while-revalidate=30',
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

const defaultHeaders = [
  ...createSecureHeaders(secureHeaders),
  ...globalHeaders,
];

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
  ...globalHeaders,
];

const scannerHeaders = [
  ...createSecureHeaders({
    ...secureHeaders,
    contentSecurityPolicy: {
      ...secureHeaders.contentSecurityPolicy,
      directives: {
        ...secureHeaders.contentSecurityPolicy.directives,
        imgSrc: ['*'],
        connectSrc: ['*'],
      },
    },
  }),
  ...globalHeaders,
];

const nextConfig: NextConfig = {
  // Ensure the full @intlayer/docs package (including markdown assets) is shipped with the server bundle
  serverExternalPackages: ['@intlayer/backend', '@intlayer/docs'],
  transpilePackages: ['@intlayer/design-system', 'shiki'],
  reactCompiler: true,
  productionBrowserSourceMaps: true,
  // cacheComponents: true,
  images: {
    // Ensure long-lived caching for optimized remote images (e.g. YouTube thumbnails)
    // This is a minimum TTL; upstream headers may be higher.
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'yt3.ggpht.com',
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
    // Catch-all FIRST
    {
      // All page routes, not the api ones
      source: '/:path((?!api).*)*',
      headers: defaultHeaders,
    },
    // Scanner overrides catch-all
    {
      source: '/:locale/i18n-seo-scanner',
      headers: scannerHeaders,
    },
    // Dashboard overrides both
    {
      source: '/:locale/dashboard/:path*',
      headers: dashboardHeaders,
    },
    // Static asset caching (more specific, so placed after general routes)
    {
      source: '/assets/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/:path*(.mp4|.webp|.png|.jpg)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
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
        {
          source: '/:locale/doc/:path*.md',
          destination: '/:locale/doc/raw/:path*?format=txt',
        },
        {
          source: '/doc/:path*.md',
          destination: '/en/doc/raw/:path*?format=txt',
        },
        {
          source: '/:locale/blog/:path*.md',
          destination: '/:locale/blog/raw/:path*?format=txt',
        },
        {
          source: '/blog/:path*.md',
          destination: '/en/blog/raw/:path*?format=txt',
        },
        {
          source: '/:locale/frequent-questions/:path*.md',
          destination: '/:locale/frequent-questions/raw/:path*?format=txt',
        },
        {
          source: '/frequent-questions/:path*.md',
          destination: '/en/frequent-questions/raw/:path*?format=txt',
        },
      ],
    };
  },
};

export default withIntlayer(nextConfig);
