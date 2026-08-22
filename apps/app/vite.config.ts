import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  App_Admin_Affiliate_Path,
  App_Admin_Dashboard_Path,
  App_Admin_Discussions_Path,
  App_Admin_Management_Path,
  App_Admin_Organizations_Path,
  App_Admin_Path,
  App_Admin_Projects_Path,
  App_Admin_PromoCodes_Path,
  App_Admin_Reviewers_Path,
  App_Admin_Users_Path,
  App_Affiliation_Path,
  App_Auth_AskResetPassword_Path,
  App_Auth_ChangePassword_Path,
  App_Auth_Demo_Path,
  App_Auth_ResetPassword_Path,
  App_Auth_SignIn_Path,
  App_Auth_SignUp_Path,
  App_Auth_TwoFactor_Path,
  App_Dashboard_Assets_Path,
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Editor_Path,
  App_Dashboard_IDE_Path,
  App_Dashboard_Organization_Path,
  App_Dashboard_Profile_Path,
  App_Dashboard_Projects_Path,
  App_Dashboard_Scanner_Path,
  App_Dashboard_Tags_Path,
  App_Dashboard_Translate_Path,
  App_Demo_Path,
  App_Home_Path,
  App_Onboarding_Path,
  App_Pricing_Path,
  App_ReviewerMarketplace_Dashboard_Path,
  App_ReviewerMarketplace_Path,
} from '@intlayer/design-system/routes';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { localeFlatMap } from 'intlayer';
import { nitro } from 'nitro/vite';
import { defineConfig, loadEnv } from 'vite';
import { intlayer, intlayerProxy } from 'vite-intlayer';
import wasm from 'vite-plugin-wasm';

export const pathList = [
  App_Home_Path,
  App_Demo_Path,
  App_Dashboard_Editor_Path,
  App_Dashboard_Translate_Path,
  App_Dashboard_IDE_Path,
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Projects_Path,
  App_Dashboard_Tags_Path,
  App_Dashboard_Organization_Path,
  App_Dashboard_Profile_Path,
  App_Dashboard_Scanner_Path,
  App_Dashboard_Assets_Path,
  App_Pricing_Path,
  App_Affiliation_Path,
  App_ReviewerMarketplace_Path,
  App_ReviewerMarketplace_Dashboard_Path,
  App_Auth_SignIn_Path,
  App_Auth_SignUp_Path,
  App_Auth_TwoFactor_Path,
  App_Auth_Demo_Path,
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
  App_Admin_Affiliate_Path,
  App_Admin_PromoCodes_Path,
  App_Admin_Reviewers_Path,
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Port the Vite preview server binds while TanStack Start's prerender crawls
 * this app.
 *
 * The prerender asks Vite for an ephemeral port, but `nitro/vite`'s preview
 * plugin rewrites that with `config.preview?.port || 3000` — and `0` is falsy,
 * so the request for "any free port" always resolves to 3000. Whatever else
 * already holds 3000 (another app's dev server) then answers the crawl, and
 * every "prerendered" page is written from *that* server's HTML: dev-mode
 * markup pointing at `/@id/virtual:tanstack-start-dev-client-entry`, which
 * never hydrates once deployed.
 */
const PRERENDER_PREVIEW_PORT = 4000;

/**
 * Vite's command for the current run, captured so `closeBundle` can tell a real
 * production build from a dev server or a Vitest run — both of which also close
 * bundles, against directories that hold no shippable output.
 */
let viteCommand: 'build' | 'serve' | undefined;

/**
 * Serves TanStack Start's prerendered output straight from disk, and
 * pre-compresses the client bundle so those reads ship Brotli or gzip bytes.
 *
 * Both halves have to live in one plugin because both depend on Vite build
 * hooks — see `server/staticPages.ts` and `scripts/compress-static.ts` for why
 * neither can be done by Nitro's own static handler or by a `postbuild` step
 * alone.
 */
const staticPagesPlugin = {
  name: 'static-prerendered-pages',
  /**
   * Claims the prerender's preview port back from `nitro/vite`. This plugin is
   * registered after `nitro()`, so its `config` result is merged last and wins.
   * `strictPort` then fails the build loudly on a collision, rather than
   * letting the crawl silently record another server's pages.
   */
  config: () => ({
    preview: { port: PRERENDER_PREVIEW_PORT, strictPort: true },
  }),
  configResolved(config: { command: 'build' | 'serve' }) {
    viteCommand = config.command;
  },
  /**
   * Compresses the client bundle as its environment closes.
   *
   * Nitro copies this output into `.output/public` and then globs that
   * directory to bake the asset manifest into the server bundle. Its static
   * handler can only encoding-negotiate variants present in that manifest, so
   * the `.br` / `.gz` files have to exist *before* the Nitro build — which is
   * exactly here. Compressing later (in `postbuild`) produces files the server
   * never learns about, and JS and CSS ship uncompressed.
   */
  closeBundle: {
    order: 'post' as const,
    async handler(this: {
      environment?: { name?: string; config?: { build?: { outDir?: string } } };
    }) {
      if (viteCommand !== 'build') return;

      const environment = this.environment;
      if (environment?.name !== 'client') return;

      const outDir = environment.config?.build?.outDir;
      if (!outDir) return;

      const { compressDirectory } = await import(
        './scripts/compress-static.ts'
      );
      await compressDirectory(resolve(__dirname, outDir), 'client bundle');
    },
  },
  nitro: {
    name: 'static-prerendered-pages',
    setup(nitro: {
      options: {
        dev: boolean;
        handlers: { route: string; handler: string; middleware: boolean }[];
      };
    }) {
      // In dev there is no prerender output to serve, and Vite owns the
      // request pipeline anyway.
      if (nitro.options.dev) return;

      nitro.options.handlers.push({
        route: '/**',
        handler: resolve(__dirname, 'server/staticPages.ts'),
        middleware: true,
      });
    },
  },
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  const domain = new URL(env.VITE_SITE_URL).hostname;
  const appUrl = env.VITE_SITE_URL;
  const backendUrl = env.VITE_BACKEND_URL;

  const cspDirectives = {
    'default-src': ["'self'"],
    'style-src': [
      "'self'",
      "'unsafe-inline'",
      "'report-sample'",
      'intlayer.org',
      '*.intlayer.org',
      'static.cloudflareinsights.com',
      'fonts.googleapis.com',
      `*.${domain}`,
    ],
    'style-src-elem': [
      "'self'",
      "'report-sample'",
      'intlayer.org',
      '*.intlayer.org',
      'static.cloudflareinsights.com',
      'fonts.googleapis.com',
      'cdn.jsdelivr.net',
      "'unsafe-inline'",
      `*.${domain}`,
    ],
    'script-src': ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
    'script-src-elem': [
      "'self'",
      'data:',
      "'report-sample'",
      "'unsafe-inline'",
      'blob:',
      'intlayer.org',
      '*.intlayer.org',
      'static.cloudflareinsights.com',
      '*.googletagmanager.com',
      '*.posthog.com',
      '*.stripe.com',
      'cdn.jsdelivr.net',
      '*.ahrefs.com',
      `blob: *.${domain}`,
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
      'intlayer.org',
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
      'intlayer.org',
      '*.intlayer.org',
      `blob: *.${domain}`,
    ],

    'frame-ancestors': [
      "'self'",
      'intlayer.org',
      'app.intlayer.org',
      'localhost:*',
    ],
    'manifest-src': ["'self'"],
    'child-src': ["'self'"],
    'connect-src': [
      '*',
      'data:',
      'blob:',
      '*.google-analytics.com',
      '*.analytics.google.com',
      '*.google.com',
    ],
    'frame-src': ['*', 'data:', 'blob:'],
  };

  const cspString = Object.entries(cspDirectives)
    .map(([key, values]) => `${key} ${[...new Set(values)].join(' ')}`)
    .join('; ');

  const headers = {
    'Content-Security-Policy': cspString,
    'Cache-Control':
      'public, max-age=86400, s-maxage=86400, stale-while-revalidate=172800',
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
    'Cross-Origin-Embedder-Policy': 'unsafe-none',
  } as const;

  /**
   * Content-hashed bundle output and the handful of never-changing public
   * assets can be cached for a year. The global rule above only grants a day,
   * which sends the browser back to revalidate assets whose name already
   * guarantees their content.
   */
  const immutableAssetHeaders = {
    ...headers,
    'Cache-Control': 'public, max-age=31536000, immutable',
  } as const;

  return {
    server: {
      headers: mode === 'development' ? {} : headers,
    },
    // Note: If you test using `vite preview`, it applies these globally.
    // It will not use Nitro's routeRules dynamically in simple preview mode.
    preview: {
      headers,
    },
    plugins: [
      intlayerProxy(
        {},
        {
          ignore: (req) => req.url?.startsWith('/api'),
        }
      ),
      nitro({
        preset: 'bun',
        routeRules: {
          '/**': { headers },
          '/assets/**': { headers: immutableAssetHeaders },

          '/Geist-VariableFont_wght.woff2': { headers: immutableAssetHeaders },
          '/Geist-VariableFont_wght.ttf': { headers: immutableAssetHeaders },
          '/logo.svg': { headers: immutableAssetHeaders },
          '/cover.png': { headers: immutableAssetHeaders },
          '/github-social-preview.png': { headers: immutableAssetHeaders },
        },
        rollupConfig: {
          onwarn(warning, warn) {
            if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
            warn(warning);
          },
        },
      }),
      intlayer(),
      staticPagesPlugin,
      tailwindcss(),
      tanstackStart({
        router: {
          routeFileIgnorePattern:
            '.content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$',
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
    ],
    build: {
      rolldownOptions: {
        external: ['wasi_snapshot_preview1', 'env'],
      },
    },
  };
});
