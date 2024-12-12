import { withIntlayer } from 'next-intlayer/server';
import withPWA from 'next-pwa';
import { createSecureHeaders } from 'next-secure-headers';

const isProd = process.env.NODE_ENV === 'production';

const secureHeaders = createSecureHeaders({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: "'self'",
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "'report-sample'",
        `*.${process.env.NEXT_PUBLIC_DOMAIN}`,
        'fonts.googleapis.com',
      ],
      styleSrcElem: [
        "'self'",
        "'unsafe-inline'",
        "'report-sample'",
        `*.${process.env.NEXT_PUBLIC_DOMAIN}`,
        'fonts.googleapis.com',
      ],
      scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
      connectSrc: [
        "'self'",
        'data:',
        `*.${process.env.NEXT_PUBLIC_DOMAIN}`,
        `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        'fonts.googleapis.com',
        '*.google-analytics.com',
        '*.googletagmanager.com',
        'github.com',
        'raw.githubusercontent.com',
        '*.openai.com',
        '*.stripe.com',
      ],
      imgSrc: ["'self'", 'https:', 'data:'],
      workerSrc: [`${process.env.NEXT_PUBLIC_URL}`],
      mediaSrc: ["'self'"],
      formAction: ["'self'"],
      fontSrc: ["'self'"],
      scriptSrcElem: [
        "'self'",
        'data:',
        "'report-sample'",
        "'unsafe-inline'",
        `blob: *.${process.env.NEXT_PUBLIC_DOMAIN}`,
        '*.google-analytics.com',
        '*.googletagmanager.com',
        '*.stripe.com',
      ],
      objectSrc: [
        "'self'",
        'data:',
        `blob: *.${process.env.NEXT_PUBLIC_DOMAIN}`,
      ],
      frameSrc: [
        "'self'",
        '*.codesandbox.io',
        'codesandbox.io',
        '*.youtube.com',
        '*.stripe.com',
      ],
      frameAncestors: [
        "'self'",
        '*.codesandbox.io',
        'codesandbox.io',
        '*.youtube.com',
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
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.module.rules.push({
      test: /\.md$/,
      // This is the asset module.
      type: 'asset/source',
    });

    config.externals.push({
      '@intlayer/backend': '@intlayer/backend',
      '@intlayer/docs': '@intlayer/docs',
    });

    return config;
  },

  // compiler: {
  //   removeConsole: isProd,
  // },

  headers: async () => [
    {
      // All page routes, not the api ones
      source: '/:path((?!api).*)*',
      headers: [
        ...secureHeaders,
        { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        { key: 'Cross-Origin-Embedder-Policy', value: 'same-origin' },
      ],
    },
  ],

  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
};

const nextConfigPWA = withPWA({
  disable: process.env.ENABLE_SERVICE_WORKER !== 'true',
  dest: 'public',
  register: true,
  skipWaiting: true,
})(nextConfig);

export default withIntlayer(nextConfigPWA);
