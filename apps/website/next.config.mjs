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
      scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
      connectSrc: [
        "'self'",
        `*.${process.env.NEXT_PUBLIC_DOMAIN}`,
        '*.google-analytics.com',
        '*.googletagmanager.com',
        '*.openai.com',
      ],
      imgSrc: ["'self'", 'https:', 'http:', 'data:'],
      workerSrc: ['blob:'],
      mediaSrc: ["'self'"],
      formAction: ["'self'"],
      fontSrc: ["'self'"],
      scriptSrcElem: [
        "'self'",
        "'report-sample'",
        "'unsafe-inline'",
        `blob: *.${process.env.NEXT_PUBLIC_DOMAIN}`,
        '*.google-analytics.com',
        '*.googletagmanager.com',
      ],
      objectSrc: [
        "'self'",
        'data:',
        `blob: *.${process.env.NEXT_PUBLIC_DOMAIN}`,
      ],
      frameSrc: ["'self'", 'codesandbox.io'],
      frameAncestors: ["'self'", 'codesandbox.io'],

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
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.module.rules.push({
      test: /\.md$/,
      // This is the asset module.
      type: 'asset/source',
    });

    return config;
  },

  compiler: {
    removeConsole: true,
  },

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
};

const nextConfigPWA = withPWA({
  disable: !isProd,
  dest: 'public',
  register: true,
  skipWaiting: true,
})(nextConfig);

export default withIntlayer(nextConfigPWA);
