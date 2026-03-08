import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { defineConfig, loadEnv } from 'vite';
import { intlayer, intlayerProxy } from 'vite-intlayer';
import wasm from 'vite-plugin-wasm';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const domain = env.VITE_SITE_URL
    ? new URL(env.VITE_SITE_URL).hostname
    : 'localhost';
  const appUrl = env.VITE_APP_URL || 'http://localhost:3000';
  const backendUrl = env.VITE_BACKEND_URL || 'http://localhost:3100';

  const cspDirectives = {
    'default-src': ["'self'"],
    'style-src': [
      "'self'",
      "'unsafe-inline'",
      "'report-sample'",
      '*.intlayer.org',
      'static.cloudflareinsights.com',
      'fonts.googleapis.com',
      `*.${domain}`,
    ],
    'style-src-elem': [
      "'self'",
      "'report-sample'",
      '*.intlayer.org',
      'static.cloudflareinsights.com',
      'fonts.googleapis.com',
      'cdn.jsdelivr.net',
      "'unsafe-inline'",
      `*.${domain}`,
    ],
    'script-src': [
      "'self'",
      "'unsafe-eval'",
      "'unsafe-inline'",
      '*.youtube.com',
    ],
    'script-src-elem': [
      "'self'",
      'data:',
      "'report-sample'",
      "'unsafe-inline'",
      'blob:',
      '*.intlayer.org',
      '*.facebook.net',
      'static.cloudflareinsights.com',
      '*.google-analytics.com',
      '*.googletagmanager.com',
      '*.posthog.com',
      '*.stripe.com',
      'cdn.jsdelivr.net',
      '*.ahrefs.com',
      '*.youtube.com',
      `blob: *.${domain}`,
    ],
    'connect-src': [
      "'self'",
      'data:',
      '*.intlayer.org',
      backendUrl,
      'fonts.googleapis.com',
      'static.cloudflareinsights.com',
      '*.facebook.net',
      '*.facebook.com',
      '*.google-analytics.com',
      '*.googletagmanager.com',
      '*.posthog.com',
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
      `*.${domain}`,
    ],
    'img-src': [
      "'self'",
      'https:',
      'data:',
      'static.cloudflareinsights.com',
      'raw.githubusercontent.com',
      'avatars.githubusercontent.com',
      '*.googleusercontent.com',
      '*.githubusercontent.com',
      backendUrl,
    ],
    'worker-src': [
      "'self'",
      appUrl,
      'blob:',
      `blob: *.${domain}`,
      '*.intlayer.org',
    ],
    'media-src': ["'self'"],
    'form-action': ["'self'"],
    'font-src': [
      "'self'",
      'data:',
      'static.cloudflareinsights.com',
      'cdn.jsdelivr.net',
    ],
    'object-src': [
      "'self'",
      'data:',
      'blob:',
      '*.intlayer.org',
      `blob: *.${domain}`,
    ],
    'frame-src': [
      "'self'",
      '*.youtube.com',
      'github.dev',
      'github.com',
      '*.github.com',
      '*.stripe.com',
      'stackblitz.com',
    ],
    'frame-ancestors': [
      "'self'",
      'intlayer.org',
      'app.intlayer.org',
      'localhost:*',
    ],
    'manifest-src': ["'self'"],
    'child-src': ["'self'", '*.googletagmanager.com'],
  };

  const cspString = Object.entries(cspDirectives)
    .map(([key, values]) => `${key} ${[...new Set(values)].join(' ')}`)
    .join('; ');

  const headers = {
    'Content-Security-Policy': cspString,
    'Cache-Control':
      'public, max-age=86400, s-maxage=86400, stale-while-revalidate=172800',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'same-origin',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '0',
    'Permissions-Policy': 'fullscreen=(self)',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers':
      'X-Requested-With, Content-Type, Authorization',
    'Referrer-Policy': 'same-origin',
  };

  return {
    server: {
      headers,
    },
    preview: {
      headers,
    },
    plugins: [
      devtools(),
      intlayerProxy(),
      nitro({
        routeRules: {
          '/**': { headers },
        },
        rollupConfig: { external: [/^@sentry\//] },
      }),
      tsconfigPaths({ projects: ['./tsconfig.json'] }),
      intlayer(),
      tailwindcss(),
      tanstackStart({
        router: {
          routeFileIgnorePattern:
            '.content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$',
        },
        sitemap: {
          enabled: true,
          host: 'https://showcase.intlayer.org',
        },
        prerender: {
          enabled: true,
          crawlLinks: true,
        },
      }),
      viteReact(),
      wasm(),
    ],
    build: {
      rollupOptions: {
        external: ['wasi_snapshot_preview1', 'esbuild', 'env'],
      },
    },
  };
});
