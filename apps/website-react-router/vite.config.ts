import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { localeFlatMap } from 'intlayer';
import { nitro } from 'nitro/vite';
import { defineConfig, loadEnv } from 'vite';
import { intlayer, intlayerProxy } from 'vite-intlayer';
import wasm from 'vite-plugin-wasm';
import { staticRoutes } from './src/app/routes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const localizedPages = localeFlatMap(({ urlPrefix }) =>
  staticRoutes.map((path) => ({
    path: `${urlPrefix}${path}`,
    prerender: {
      enabled: true,
    },
  }))
);

const rawMarkdownPlugin = {
  name: 'raw-markdown-plugin',
  transform(code: string, id: string) {
    if (id.split('?')[0].endsWith('.md')) {
      return `export default ${JSON.stringify(code)};`;
    }
  },
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  const domain = env.VITE_PUBLIC_DOMAIN;
  const backendUrl = env.VITE_BACKEND_URL;
  const scannerApiUrl = env.VITE_SCANNER_API_URL;
  const publicUrl = env.VITE_URL;

  const cspDirectives = {
    'default-src': ["'self'"],
    'style-src': [
      "'self'",
      "'unsafe-inline'",
      "'report-sample'",
      domain ? `*.${domain}` : '',
      'static.cloudflareinsights.com',
      'fonts.googleapis.com',
    ].filter(Boolean),
    'style-src-elem': [
      "'self'",
      "'report-sample'",
      domain ? `*.${domain}` : '',
      'static.cloudflareinsights.com',
      'fonts.googleapis.com',
      'cdn.jsdelivr.net',
      "'unsafe-inline'",
    ].filter(Boolean),
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
      domain ? `blob: *.${domain}` : '',
      'static.cloudflareinsights.com',
      '*.google-analytics.com',
      '*.googletagmanager.com',
      '*.posthog.com',
      'cdn.jsdelivr.net',
      '*.ahrefs.com',
      '*.youtube.com',
    ].filter(Boolean),
    'connect-src': [
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
    'img-src': [
      "'self'",
      'https:',
      'data:',
      'static.cloudflareinsights.com',
      '*.googleusercontent.com',
      '*.githubusercontent.com',
      backendUrl,
    ].filter(Boolean),
    'worker-src': [publicUrl, domain ? `blob: *.${domain}` : ''].filter(
      Boolean
    ),
    'media-src': ["'self'"],
    'form-action': ["'self'"],
    'font-src': [
      "'self'",
      'data:',
      'fonts.gstatic.com',
      'static.cloudflareinsights.com',
      'cdn.jsdelivr.net',
    ],
    'object-src': ["'self'", 'data:', domain ? `blob: *.${domain}` : ''].filter(
      Boolean
    ),
    'frame-src': [
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
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '0',
    'Permissions-Policy': 'fullscreen=(self)',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers':
      'X-Requested-With, Content-Type, Authorization',
    'Referrer-Policy': 'same-origin',
    'X-Content-Type-Options': 'nosniff',
    'Cross-Origin-Embedder-Policy': 'unsafe-none',
  } as const;

  return {
    server: {
      headers: mode === 'development' ? {} : headers,
    },
    preview: {
      headers,
    },
    resolve: {
      alias: {
        '~': resolve(__dirname, 'src'),
      },
      dedupe: [
        'react',
        'react-dom',
        '@tanstack/react-query',
        '@tanstack/react-router',
        '@tanstack/react-start',
      ],
    },
    optimizeDeps: {
      exclude: ['@tanstack/react-start'],
      include: [
        'react',
        'react-dom',
        '@tanstack/react-query',
        '@tanstack/react-router',
      ],
    },
    plugins: [
      rawMarkdownPlugin,
      intlayerProxy(),
      nitro({
        preset: 'bun',
        routeRules: {
          '/**': { headers },
          '/i18n-seo-scanner': {
            headers: {
              ...headers,
              'Content-Security-Policy': headers['Content-Security-Policy']
                .replace(/'self' https: data:.*?(?=;)/, "'self' https: data: *")
                .replace(/connect-src[^;]*/, 'connect-src *')
                .replace(/img-src[^;]*/, 'img-src *'),
            },
          },
        },
        rollupConfig: {
          onwarn(warning, warn) {
            if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
            warn(warning);
          },
        },
      }),
      intlayer(),
      tailwindcss(),
      tanstackStart({
        router: {
          routeFileIgnorePattern:
            '.content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$',
        },
        prerender: {
          enabled: true,
          crawlLinks: false,
          concurrency: 10,
        },
        pages: localizedPages,
      }),
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      wasm(),
    ],
    build: {
      minify: false,
      rolldownOptions: {
        external: ['wasi_snapshot_preview1', 'esbuild', 'env'],
      },
    },
  };
});
