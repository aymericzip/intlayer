import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  LlmsTxt_Path,
  Website_Doc_Root_Path,
  WellKnown_AgentSkillsIndex_Path,
  WellKnown_ApiCatalog_Path,
  WellKnown_McpServerCard_Path,
  WellKnown_OAuthProtectedResource_Path,
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
import {
  buildDynamicPrerenderPaths,
  staticPrerenderPaths,
} from './src/siteRoutes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Web-linking (RFC 8288) entry points advertised on every page response, so an
 * agent that fetches a single URL discovers the machine-readable resources
 * without having to guess well-known paths or parse HTML.
 *
 * Every relation used here is IANA-registered: `api-catalog` (RFC 9727),
 * `service-doc` (RFC 8631), `describedby` (W3C) and `oauth-protected-resource`
 * (RFC 9728).
 */
const agentDiscoveryLinkHeader = [
  {
    url: WellKnown_ApiCatalog_Path,
    rel: 'api-catalog',
    type: 'application/linkset+json',
  },
  { url: Website_Doc_Root_Path, rel: 'service-doc', type: 'text/html' },
  { url: LlmsTxt_Path, rel: 'describedby', type: 'text/plain' },
  {
    url: WellKnown_AgentSkillsIndex_Path,
    rel: 'describedby',
    type: 'application/json',
  },
  {
    url: WellKnown_McpServerCard_Path,
    rel: 'describedby',
    type: 'application/json',
  },
  {
    url: WellKnown_OAuthProtectedResource_Path,
    rel: 'oauth-protected-resource',
    type: 'application/json',
  },
]
  .map(({ url, rel, type }) => `<${url}>; rel="${rel}"; type="${type}"`)
  .join(', ');

const rawMarkdownPlugin = {
  name: 'raw-markdown-plugin',
  transform(code: string, id: string) {
    if (id.split('?')[0].endsWith('.md')) {
      return `export default ${JSON.stringify(code)};`;
    }
  },
};

/**
 * Rewrites /[locale]/doc|blog|frequent-questions/slug.md → /[locale]/section/raw/slug
 * BEFORE the intlayerProxy middleware runs, so the locale is preserved and the
 * existing server.handlers on /raw/ routes serve the raw content with no redirect.
 */
const MD_REWRITE_PATTERN =
  /^(\/[a-z]{2}(?:-[A-Z]{2})?)?\/(doc|blog|frequent-questions)\/(.+?)\.md(\?.*)?$/;

/**
 * Registers `server/staticPages.ts` as a Nitro middleware.
 *
 * `nitro/vite` collects the `.nitro` property of every Vite plugin, in plugin
 * order, and runs each as a Nitro module. Placing this plugin *after*
 * `intlayerProxy()` in the plugin list therefore appends the handler after the
 * locale proxy's own, which is what keeps locale redirects ahead of static
 * serving. Files under `server/middleware/` cannot express that ordering —
 * Nitro scans them into `options.handlers` before any module runs.
 */
/**
 * Vite's command for the current run, captured so `closeBundle` can tell a real
 * production build from a dev server or a Vitest run — both of which also close
 * bundles, against directories that hold no shippable output.
 */
let viteCommand: 'build' | 'serve' | undefined;

const staticPagesPlugin = {
  name: 'static-prerendered-pages',
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

      const { compressDirectory } = await import('./scripts/compress-static');
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

/**
 * Same rewrite, driven by content negotiation instead of a `.md` suffix, so a
 * documentation URL answers with markdown when an agent asks for it while the
 * address stays unchanged. Mirrors `server/middleware/0.mdAcceptRewrite.ts`,
 * which performs the production-side rewrite.
 */
const MD_ACCEPT_PATTERN =
  /^(\/[a-z]{2}(?:-[A-Z]{2})?)?\/(doc|blog|frequent-questions)\/([^?]+)(\?.*)?$/;

const NON_DOCUMENT_PATHS = new Set(['doc/search', 'doc/chat']);

/** Compares Accept quality values so a browser is never served markdown. */
const prefersMarkdown = (acceptHeader: string | undefined): boolean => {
  if (!acceptHeader) return false;

  let markdownQuality = 0;
  let htmlQuality = 0;

  for (const entry of acceptHeader.split(',')) {
    const trimmed = entry.trim();
    const mediaType = trimmed.split(';')[0]?.trim().toLowerCase();
    const rawQuality = trimmed.match(/;\s*q=([0-9.]+)/)?.[1];
    const parsedQuality =
      rawQuality === undefined ? 1 : Number.parseFloat(rawQuality);
    const quality = Number.isNaN(parsedQuality) ? 1 : parsedQuality;

    if (mediaType === 'text/markdown') {
      markdownQuality = Math.max(markdownQuality, quality);
    } else if (mediaType === 'text/html') {
      htmlQuality = Math.max(htmlQuality, quality);
    }
  }

  return markdownQuality > 0 && markdownQuality >= htmlQuality;
};

const mdRawRewritePlugin = {
  name: 'md-raw-rewrite',
  configureServer(server: {
    middlewares: {
      use: (
        fn: (
          req: { url?: string; headers?: Record<string, unknown> },
          _: unknown,
          next: () => void
        ) => void
      ) => void;
    };
  }) {
    server.middlewares.use((req, _, next) => {
      const url = req.url ?? '';
      const match = url.match(MD_REWRITE_PATTERN);
      if (match) {
        const locale = match[1] ?? '';
        const section = match[2];
        const slug = match[3];
        const query = match[4] ?? '';
        req.url = `${locale}/${section}/raw/${slug}${query}`;
        next();
        return;
      }

      const accept = req.headers?.accept;
      if (prefersMarkdown(typeof accept === 'string' ? accept : undefined)) {
        const acceptMatch = url.match(MD_ACCEPT_PATTERN);
        if (acceptMatch) {
          const locale = acceptMatch[1] ?? '';
          const section = acceptMatch[2];
          const slug = acceptMatch[3];
          const query = acceptMatch[4] ?? '';

          if (
            !slug.startsWith('raw/') &&
            !NON_DOCUMENT_PATHS.has(`${section}/${slug}`)
          ) {
            req.url = `${locale}/${section}/raw/${slug}${query}`;
          }
        }
      }
      next();
    });
  },
};

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  const dynamicPaths = await buildDynamicPrerenderPaths();
  const allPrerenderPaths = [...staticPrerenderPaths, ...dynamicPaths];
  const localizedPages = localeFlatMap(({ urlPrefix }) =>
    allPrerenderPaths.map((path) => ({
      path: `${urlPrefix}${path}`,
      prerender: { enabled: true },
    }))
  );

  const domain = env.VITE_PUBLIC_DOMAIN;
  const backendUrl = env.VITE_BACKEND_URL;
  const publicUrl = env.VITE_URL;

  const cspDirectives = {
    'default-src': ["'self'"],
    'style-src': [
      "'self'",
      "'unsafe-inline'",
      "'report-sample'",
      domain ? `*.${domain}` : '',
      'static.cloudflareinsights.com',
    ].filter(Boolean),
    'style-src-elem': [
      "'self'",
      "'report-sample'",
      domain ? `*.${domain}` : '',
      'static.cloudflareinsights.com',
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
      '*.googletagmanager.com',
      '*.posthog.com',
      'cdn.jsdelivr.net',
      '*.youtube.com',
    ].filter(Boolean),
    'connect-src': [
      "'self'",
      'data:',
      domain ? `*.${domain}` : '',
      backendUrl,
      'static.cloudflareinsights.com',
      '*.google-analytics.com',
      '*.analytics.google.com',
      '*.google.com',
      '*.googletagmanager.com',
      '*.doubleclick.net',
      '*.posthog.com',
      'github.com',
      'api.github.com',
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
    Link: agentDiscoveryLinkHeader,
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

  const immutableAssetHeaders = {
    ...headers,
    'Cache-Control': 'public, max-age=31536000, immutable',
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
      mdRawRewritePlugin,
      intlayerProxy(),
      nitro({
        preset: 'bun',
        serverDir: resolve(__dirname, 'server'),
        routeRules: {
          '/**': { headers },
          '/assets/**': { headers: immutableAssetHeaders },
          /**
           * Static files served from `public/` miss the hashed `/assets/**`
           * rule above and fall back to a short TTL, so every repeat visitor
           * re-downloaded them — 168 KB of typeface among them. Their contents
           * are stable, so they cache like hashed assets; replacing one means
           * shipping it under a new filename (the font is referenced from the
           * `@font-face` rule in `@intlayer/design-system`'s `tailwind.css`).
           */
          '/Geist-VariableFont_wght.ttf': { headers: immutableAssetHeaders },
          '/logo.svg': { headers: immutableAssetHeaders },
          '/cover.png': { headers: immutableAssetHeaders },
          '/github-social-preview.png': { headers: immutableAssetHeaders },
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
      staticPagesPlugin,
      tailwindcss(),
      tanstackStart({
        router: {
          routeFileIgnorePattern:
            '.content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$',
        },
        prerender: {
          enabled: true,
          crawlLinks: false,
          concurrency: 20,
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
        output: {
          /**
           * Groups modules that are always needed together into single chunks.
           *
           * Left to itself the bundler emitted a chunk per module: a cold load
           * of `/` cost 304 JS requests, 247 of them under 5 KB, arriving in a
           * six-deep waterfall because each level had to execute before the
           * next was discovered. Grouping trades a little duplication for far
           * fewer round trips.
           *
           * `minShareCount: 2` stops single-consumer modules from being split
           * out on their own; `minSize` merges anything smaller into its
           * parent chunk.
           */
          advancedChunks: {
            minSize: 20_000,
            // Caps any single group so one chunk cannot become a payload every
            // page must download in full. An explicit `design-system` group
            // produced a 617 KB chunk that pushed the documentation pages'
            // head preload from 633 KB to 1.15 MB — consolidation has to stay
            // bounded to be worth it.
            maxSize: 160_000,
            minShareCount: 2,
            groups: [
              // 36 `React.lazy` logo components that render together on the
              // landing page — one dynamic chunk instead of 36 requests.
              {
                name: 'tech-logos',
                test: /TechLogo[\\/]logos[\\/]/,
                priority: 40,
              },
              {
                name: 'vendor-react',
                test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
                priority: 30,
              },
              {
                name: 'vendor-tanstack',
                test: /node_modules[\\/]@tanstack[\\/]/,
                priority: 30,
              },
            ],
          },
        },
      },
    },
  };
});
