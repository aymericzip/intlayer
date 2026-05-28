/**
 * Security headers for the React Router website.
 * Mirrors the configuration previously defined in next.config.ts.
 *
 * In React Router v7, HTTP headers are set via the `headers` export on route
 * modules rather than a centralised config file.  This module exposes helpers
 * that each route can consume.
 */

const domain =
  import.meta.env.VITE_PUBLIC_DOMAIN ?? import.meta.env.VITE_DOMAIN ?? '';
const backendUrl =
  import.meta.env.VITE_PUBLIC_BACKEND_URL ??
  import.meta.env.VITE_BACKEND_URL ??
  '';
const scannerApiUrl =
  import.meta.env.VITE_PUBLIC_SCANNER_API_URL ??
  import.meta.env.VITE_SCANNER_API_URL ??
  '';
const publicUrl =
  import.meta.env.VITE_PUBLIC_URL ?? import.meta.env.VITE_URL ?? '';

const isProd = import.meta.env.NODE_ENV === 'production';

// ---------------------------------------------------------------------------
// CSP builder
// ---------------------------------------------------------------------------

type CspDirectives = Record<string, string[]>;

function buildCsp(directives: CspDirectives): string {
  return Object.entries(directives)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ');
}

/** Convert camelCase directive names to kebab-case (e.g. defaultSrc → default-src). */
function camelToKebab(str: string): string {
  return str.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`);
}

type CspConfig = Record<string, string | string[]>;

function buildCspFromConfig(config: CspConfig): string {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(config)) {
    const directive = camelToKebab(key);
    const values = Array.isArray(value) ? value : [value];
    parts.push(`${directive} ${values.join(' ')}`);
  }
  return parts.join('; ');
}

// ---------------------------------------------------------------------------
// Base CSP directives (mirrors next.config.ts)
// ---------------------------------------------------------------------------

const baseDirectives: CspConfig = {
  defaultSrc: ["'self'"],
  styleSrc: [
    "'self'",
    "'unsafe-inline'",
    "'report-sample'",
    domain ? `*.${domain}` : '',
    'static.cloudflareinsights.com',
    'fonts.googleapis.com',
  ].filter(Boolean),
  styleSrcElem: [
    "'self'",
    "'report-sample'",
    domain ? `*.${domain}` : '',
    'static.cloudflareinsights.com',
    'fonts.googleapis.com',
    'cdn.jsdelivr.net',
    "'unsafe-inline'",
  ].filter(Boolean),
  scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'", '*.youtube.com'],
  scriptSrcElem: [
    "'self'",
    'data:',
    "'report-sample'",
    "'unsafe-inline'",
    domain ? `blob: *.${domain}` : '',
    'static.cloudflareinsights.com',
    '*.google-analytics.com',
    '*.googletagmanager.com',
    '*.posthog.com',
    'cdn.jsdelivr.net',
    '*.ahrefs.com',
    '*.youtube.com',
  ].filter(Boolean),
  connectSrc: [
    "'self'",
    'data:',
    domain ? `*.${domain}` : '',
    backendUrl,
    scannerApiUrl,
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
  ].filter(Boolean),
  imgSrc: [
    "'self'",
    'https:',
    'data:',
    'static.cloudflareinsights.com',
    '*.googleusercontent.com',
    '*.githubusercontent.com',
    backendUrl,
  ].filter(Boolean),
  workerSrc: [publicUrl, domain ? `blob: *.${domain}` : ''].filter(Boolean),
  mediaSrc: ["'self'"],
  formAction: ["'self'"],
  fontSrc: [
    "'self'",
    'data:',
    'static.cloudflareinsights.com',
    'cdn.jsdelivr.net',
  ],
  objectSrc: ["'self'", 'data:', domain ? `blob: *.${domain}` : ''].filter(
    Boolean
  ),
  frameSrc: [
    "'self'",
    '*.youtube.com',
    '*.intlayer.org',
    'github.dev',
    'htmlpreview.github.io',
    'github.com',
    '*.github.com',
    '*.vercel.app',
    domain ? `*.${domain}` : '',
  ].filter(Boolean),
  frameAncestors: ["'self'", 'intlayer.org', 'app.intlayer.org', 'localhost:*'],
  manifestSrc: ["'self'"],
  childSrc: ["'self'", '*.googletagmanager.com'],
};

// ---------------------------------------------------------------------------
// Global headers (non-CSP)
// ---------------------------------------------------------------------------

const globalHeaders: Record<string, string> = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'same-origin',
  'Strict-Transport-Security': isProd
    ? 'max-age=31536000; includeSubDomains; preload'
    : 'max-age=0',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '0',
  'Permissions-Policy': 'fullscreen=(self)',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  'Access-Control-Allow-Headers':
    'X-Requested-With, Content-Type, Authorization',
  'Referrer-Policy': 'same-origin',
  'X-Content-Type-Options': 'nosniff',
};

// ---------------------------------------------------------------------------
// Assembled header sets
// ---------------------------------------------------------------------------

/** Default headers applied to all page routes. */
export function getDefaultHeaders(): Record<string, string> {
  return {
    'Content-Security-Policy': buildCspFromConfig(baseDirectives),
    ...globalHeaders,
  };
}

/** Scanner page overrides: open connectSrc and frameSrc. */
export function getScannerHeaders(): Record<string, string> {
  const scannerDirectives: CspConfig = {
    ...baseDirectives,
    imgSrc: ['*'],
    connectSrc: ['*'],
  };
  return {
    'Content-Security-Policy': buildCspFromConfig(scannerDirectives),
    ...globalHeaders,
  };
}

/** Dashboard overrides: fully open connectSrc, frameSrc, frameAncestors. */
export function getDashboardHeaders(): Record<string, string> {
  const dashboardDirectives: CspConfig = {
    ...baseDirectives,
    connectSrc: ['*'],
    frameSrc: ['*'],
    frameAncestors: ['*'],
  };
  return {
    'Content-Security-Policy': buildCspFromConfig(dashboardDirectives),
    ...globalHeaders,
  };
}

/** Long-lived cache headers for static assets. */
export const staticAssetHeaders: Record<string, string> = {
  'Cache-Control': 'public, max-age=31536000, immutable',
};
