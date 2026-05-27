export const buildCSP = (directives: Record<string, string[]>) => {
  return Object.entries(directives)
    .map(([key, values]) => {
      const kebabKey = key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
      return `${kebabKey} ${values.join(' ')}`;
    })
    .join('; ');
};

const domain = process.env.PUBLIC_DOMAIN || process.env.NEXT_PUBLIC_DOMAIN;
const backendUrl =
  process.env.PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
const scannerApiUrl =
  process.env.PUBLIC_SCANNER_API_URL || process.env.NEXT_PUBLIC_SCANNER_API_URL;
const url = process.env.PUBLIC_URL || process.env.NEXT_PUBLIC_URL;

export const baseCspDirectives = {
  defaultSrc: ["'self'"],
  styleSrc: [
    "'self'",
    "'unsafe-inline'",
    "'report-sample'",
    `*.${domain}`,
    'static.cloudflareinsights.com',
    'fonts.googleapis.com',
  ],
  styleSrcElem: [
    "'self'",
    "'report-sample'",
    `*.${domain}`,
    'static.cloudflareinsights.com',
    'fonts.googleapis.com',
    'cdn.jsdelivr.net',
    "'unsafe-inline'",
  ],
  scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'", '*.youtube.com'],
  scriptSrcElem: [
    "'self'",
    'data:',
    "'report-sample'",
    "'unsafe-inline'",
    `blob: *.${domain}`,
    'static.cloudflareinsights.com',
    '*.google-analytics.com',
    '*.googletagmanager.com',
    '*.posthog.com',
    'cdn.jsdelivr.net',
    '*.ahrefs.com',
    '*.youtube.com',
  ],
  connectSrc: [
    "'self'",
    'data:',
    `*.${domain}`,
    `${backendUrl}`,
    `${scannerApiUrl}`,
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
  ],
  imgSrc: [
    "'self'",
    'https:',
    'data:',
    'static.cloudflareinsights.com',
    '*.googleusercontent.com',
    '*.githubusercontent.com',
    backendUrl || '',
  ],
  workerSrc: [`${url}`, `blob: *.${domain}`],
  mediaSrc: ["'self'"],
  formAction: ["'self'"],
  fontSrc: [
    "'self'",
    'data:',
    'static.cloudflareinsights.com',
    'cdn.jsdelivr.net',
  ],
  objectSrc: ["'self'", 'data:', `blob: *.${domain}`],
  frameSrc: [
    "'self'",
    '*.youtube.com',
    '*.intlayer.org',
    'github.dev',
    'htmlpreview.github.io',
    'github.com',
    '*.github.com',
    '*.vercel.app',
    `*.${domain}`,
  ],
  frameAncestors: ["'self'", 'intlayer.org', 'app.intlayer.org', 'localhost:*'],
  manifestSrc: ["'self'"],
  childSrc: ["'self'", '*.googletagmanager.com'],
};

export const globalHeaders = [
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Embedder-Policy', value: 'same-origin' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-XSS-Protection', value: '0' },
  { key: 'Permissions-Policy', value: 'fullscreen=(self)' },
  { key: 'Access-Control-Allow-Origin', value: '*' },
  {
    key: 'Access-Control-Allow-Methods',
    value: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  },
  {
    key: 'Access-Control-Allow-Headers',
    value: 'X-Requested-With, Content-Type, Authorization',
  },
  { key: 'Referrer-Policy', value: 'same-origin' },
];

export const getDefaultHeaders = () => {
  const headers = new Headers();
  globalHeaders.forEach(({ key, value }) => {
    headers.set(key, value);
  });
  headers.set('Content-Security-Policy', buildCSP(baseCspDirectives));
  return headers;
};

export const getDashboardHeaders = () => {
  const headers = new Headers();
  globalHeaders.forEach(({ key, value }) => {
    headers.set(key, value);
  });
  headers.set(
    'Content-Security-Policy',
    buildCSP({
      ...baseCspDirectives,
      connectSrc: ['*'],
      frameSrc: ['*'],
      frameAncestors: ['*'],
    })
  );
  return headers;
};

export const getScannerHeaders = () => {
  const headers = new Headers();
  globalHeaders.forEach(({ key, value }) => {
    headers.set(key, value);
  });
  headers.set(
    'Content-Security-Policy',
    buildCSP({
      ...baseCspDirectives,
      imgSrc: ['*'],
      connectSrc: ['*'],
    })
  );
  return headers;
};
