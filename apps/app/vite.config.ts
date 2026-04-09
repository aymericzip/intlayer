import {
  App_Admin_Dashboard_Path,
  App_Admin_Discussions_Path,
  App_Admin_Management_Path,
  App_Admin_Organizations_Path,
  App_Admin_Path,
  App_Admin_Projects_Path,
  App_Admin_Users_Path,
  App_Auth_AskResetPassword_Path,
  App_Auth_ChangePassword_Path,
  App_Auth_ResetPassword_Path,
  App_Auth_SignIn_Path,
  App_Auth_SignUp_Path,
  App_Auth_TwoFactor_Path,
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Editor_Path,
  App_Dashboard_Organization_Path,
  App_Dashboard_Profile_Path,
  App_Dashboard_Projects_Path,
  App_Dashboard_Tags_Path,
  App_Dashboard_Translate_Path,
  App_Home_Path,
  App_Onboarding_Path,
  App_Pricing_Path,
} from '@intlayer/design-system/routes';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { localeFlatMap } from 'intlayer';
import { nitro } from 'nitro/vite';
import { defineConfig, loadEnv } from 'vite';
import { intlayer } from 'vite-intlayer';
import wasm from 'vite-plugin-wasm';

export const pathList = [
  App_Home_Path,
  App_Dashboard_Editor_Path,
  App_Dashboard_Translate_Path,
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Projects_Path,
  App_Dashboard_Tags_Path,
  App_Dashboard_Organization_Path,
  App_Dashboard_Profile_Path,
  App_Pricing_Path,
  App_Auth_SignIn_Path,
  App_Auth_SignUp_Path,
  App_Auth_TwoFactor_Path,
  App_Auth_AskResetPassword_Path,
  App_Auth_ResetPassword_Path,
  App_Auth_ChangePassword_Path,
  App_Admin_Path,
  App_Admin_Users_Path,
  App_Admin_Organizations_Path,
  App_Admin_Projects_Path,
  App_Admin_Dashboard_Path,
  App_Admin_Management_Path,
  App_Admin_Discussions_Path,
  App_Onboarding_Path,
];

const localizedPages = localeFlatMap(({ urlPrefix }) =>
  pathList.map((path) => ({
    path: `${urlPrefix}${path}`,
    prerender: {
      enabled: true,
    },
  }))
);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const domain = new URL(env.VITE_SITE_URL).hostname;
  const appUrl = env.VITE_APP_URL;
  const backendUrl = env.VITE_BACKEND_URL;

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
      'zz.bdstatic.com',
      'push.zhanzhang.baidu.com',
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
      'zz.bdstatic.com',
      'push.zhanzhang.baidu.com',
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
      'zz.bdstatic.com',
      'push.zhanzhang.baidu.com',
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

  const editorCspDirectives = {
    ...cspDirectives,
    // Allow the editor to connect to and frame any origin (or define a broader list here)
    'connect-src': ['*'],
    'frame-src': ['*'],
    'script-src': ["'self'", "'unsafe-eval'", "'unsafe-inline'", '*'],
  } as const;

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
  } as const;

  const editorCspString = Object.entries(editorCspDirectives)
    .map(([key, values]) => `${key} ${[...new Set(values)].join(' ')}`)
    .join('; ');

  const editorHeaders = {
    ...headers,
    'Content-Security-Policy': editorCspString,
    // COEP must be unsafe-none to allow embedding cross-origin iframes
    'Cross-Origin-Embedder-Policy': 'unsafe-none',
  };

  return {
    server: {
      headers: mode === 'development' ? editorHeaders : headers,
    },
    preview: {
      headers,
    },
    plugins: [
      // devtools(),
      // intlayerProxy(),
      nitro({
        preset: 'bun',
        routeRules: {
          '/**': { headers },
          '/editor/**': { headers: editorHeaders },
          '/*/editor/**': { headers: editorHeaders },
          '/translate/**': { headers: editorHeaders },
          '/*/translate/**': { headers: editorHeaders },
          '/dictionary/**': { headers: editorHeaders },
          '/*/dictionary/**': { headers: editorHeaders },
        },
        rollupConfig: {
          // Add onwarn to Nitro's Rollup config to catch server-build warnings
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
        sitemap: {
          enabled: true,
          host: 'https://app.intlayer.org',
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
      // visualizer({
      //   emitFile: true,
      //   filename: 'stats.html',
      // }),
    ],
    build: {
      rolldownOptions: {
        external: ['wasi_snapshot_preview1', 'esbuild', 'env'],
      },
    },
    resolve: {
      // Forces Vite to resolve these dependencies from the root node_modules
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      // Ensures Vite pre-bundles them together
      include: ['react', 'react-dom'],
    },
  };
});
