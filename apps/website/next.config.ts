import { join } from 'node:path';
import {
  App_Admin,
  App_Auth_ChangePassword,
  App_Auth_ResetPassword,
  App_Auth_SignIn,
  App_Auth_SignUp,
  App_Dashboard,
  App_Onboarding,
  App_Pricing,
} from '@intlayer/design-system/routes';
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
        'static.cloudflareinsights.com',
        'fonts.googleapis.com',
        "'unsafe-inline'",
      ],
      styleSrcElem: [
        "'self'",
        "'report-sample'",
        `*.${process.env.NEXT_PUBLIC_DOMAIN}`,
        'static.cloudflareinsights.com',
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
        'static.cloudflareinsights.com',
        '*.google-analytics.com',
        '*.googletagmanager.com',
        '*.posthog.com',
        'cdn.jsdelivr.net',
        '*.ahrefs.com',
        '*.youtube.com',
        'zz.bdstatic.com',
        'push.zhanzhang.baidu.com',
      ],
      connectSrc: [
        "'self'",
        'data:',
        `*.${process.env.NEXT_PUBLIC_DOMAIN}`,
        `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        `${process.env.NEXT_PUBLIC_SCANNER_API_URL}`,
        'fonts.googleapis.com',
        'static.cloudflareinsights.com',
        '*.google-analytics.com',
        '*.googletagmanager.com',
        '*.posthog.com',
        'github.com',
        'api.github.com',
        '*.producthunt.com',
        'cdn.jsdelivr.net',
        '*.ahrefs.com',
        '*.star-history.com',
        'img.shields.io',
        '*.googleusercontent.com',
        '*.githubusercontent.com',
        'zz.bdstatic.com',
        'push.zhanzhang.baidu.com',
      ],
      imgSrc: [
        "'self'",
        'https:',
        'data:',
        'static.cloudflareinsights.com',
        '*.googleusercontent.com',
        '*.githubusercontent.com',
        'zz.bdstatic.com',
        'push.zhanzhang.baidu.com',
        process.env.NEXT_PUBLIC_BACKEND_URL!,
      ],
      workerSrc: [
        `${process.env.NEXT_PUBLIC_URL}`,
        `blob: *.${process.env.NEXT_PUBLIC_DOMAIN}`,
      ],
      mediaSrc: ["'self'"],
      formAction: ["'self'"],
      fontSrc: [
        "'self'",
        'data:',
        'static.cloudflareinsights.com',
        'cdn.jsdelivr.net',
      ],
      objectSrc: [
        "'self'",
        'data:',
        `blob: *.${process.env.NEXT_PUBLIC_DOMAIN}`,
      ],
      frameSrc: [
        "'self'",
        '*.youtube.com',
        'github.dev',
        'htmlpreview.github.io',
        'github.com',
        '*.github.com',
        'stackblitz.com',
      ],
      frameAncestors: [
        "'self'",
        'intlayer.org',
        'app.intlayer.org',
        'localhost:*',
      ],
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
  {
    key: 'Access-Control-Allow-Origin',
    value: '*', // Allows fetch from app.intlayer.org (and others)
  },
  {
    key: 'Access-Control-Allow-Methods',
    value: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  },
  {
    key: 'Access-Control-Allow-Headers',
    value: 'X-Requested-With, Content-Type, Authorization',
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
  experimental: {
    optimizePackageImports: ['@intlayer/design-system'],
  },
  outputFileTracingRoot: join(process.cwd(), '../../'),
  reactCompiler: true,
  productionBrowserSourceMaps: true,
  images: {
    // Ensure long-lived caching for optimized remote images (e.g. YouTube thumbnails)
    // This is a minimum TTL; upstream headers may be higher.
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  output: 'standalone',
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
      source:
        '/:path*\\.(mp4|webm|ogg|webp|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|otf|eot|css|js)',
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
      // Removed blog pages
      {
        source:
          '/blog/i18n-technologies/:path(CMS/wix|CMS/wordpress|CMS/drupal|frameworks/flutter)',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/:locale/blog/i18n-technologies/:path(CMS/wix|CMS/wordpress|CMS/drupal|frameworks/flutter)',
        destination: '/:locale/blog',
        permanent: true,
      },
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
      // AppRoutes redirects
      {
        source: '/pricing',
        destination: App_Pricing,
        permanent: true,
      },
      {
        source: '/:locale/pricing',
        destination: App_Pricing,
        permanent: true,
      },
      {
        source: '/onboarding',
        destination: App_Onboarding,
        permanent: true,
      },
      {
        source: '/:locale/onboarding',
        destination: App_Onboarding,
        permanent: true,
      },
      {
        source: '/dashboard',
        destination: App_Dashboard,
        permanent: true,
      },
      {
        source: '/:locale/dashboard',
        destination: App_Dashboard,
        permanent: true,
      },
      {
        source: '/dashboard/:path*',
        destination: `${App_Dashboard}/:path*`,
        permanent: true,
      },
      {
        source: '/:locale/dashboard/:path*',
        destination: `${App_Dashboard}/:path*`,
        permanent: true,
      },
      {
        source: '/admin',
        destination: App_Admin,
        permanent: true,
      },
      {
        source: '/:locale/admin',
        destination: App_Admin,
        permanent: true,
      },
      {
        source: '/admin/:path*',
        destination: `${App_Admin}/:path*`,
        permanent: true,
      },
      {
        source: '/:locale/admin/:path*',
        destination: `${App_Admin}/:path*`,
        permanent: true,
      },
      {
        source: '/auth/login',
        destination: App_Auth_SignIn,
        permanent: true,
      },
      {
        source: '/:locale/auth/login',
        destination: App_Auth_SignIn,
        permanent: true,
      },
      {
        source: '/auth/register',
        destination: App_Auth_SignUp,
        permanent: true,
      },
      {
        source: '/:locale/auth/register',
        destination: App_Auth_SignUp,
        permanent: true,
      },
      {
        source: '/auth/password/reset',
        destination: App_Auth_ResetPassword,
        permanent: true,
      },
      {
        source: '/:locale/auth/password/reset',
        destination: App_Auth_ResetPassword,
        permanent: true,
      },
      {
        source: '/auth/password/change',
        destination: App_Auth_ChangePassword,
        permanent: true,
      },
      {
        source: '/:locale/auth/password/change',
        destination: App_Auth_ChangePassword,
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
