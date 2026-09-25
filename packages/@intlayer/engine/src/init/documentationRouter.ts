/**
 * Documentation URL Constants
 */
export const DocumentationRouter = {
  NextJS: 'https://intlayer.org/doc/environment/nextjs',
  NextJS_16: 'https://intlayer.org/doc/environment/nextjs',
  NextJS_15: 'https://intlayer.org/doc/environment/nextjs/15',
  NextJS_14: 'https://intlayer.org/doc/environment/nextjs/14',
  NextJS_PageRouter:
    'https://intlayer.org/doc/environment/nextjs/next-with-page-router',
  CRA: 'https://intlayer.org/doc/environment/create-react-app',
  Astro: 'https://intlayer.org/doc/environment/astro',
  Astro_Lit: 'https://intlayer.org/doc/environment/astro/lit',
  Astro_Preact: 'https://intlayer.org/doc/environment/astro/preact',
  Astro_React: 'https://intlayer.org/doc/environment/astro/react',
  Astro_Solid: 'https://intlayer.org/doc/environment/astro/solid',
  Astro_Svelte: 'https://intlayer.org/doc/environment/astro/svelte',
  Astro_Vue: 'https://intlayer.org/doc/environment/astro/vue',
  ViteAndReact: 'https://intlayer.org/doc/environment/vite-and-react',
  ViteAndReact_ReactRouterV7:
    'https://intlayer.org/doc/environment/vite-and-react/react-router-v7',
  ViteAndVue: 'https://intlayer.org/doc/environment/vite-and-vue',
  ViteAndSolid: 'https://intlayer.org/doc/environment/vite-and-solid',
  ViteAndSvelte: 'https://intlayer.org/doc/environment/vite-and-svelte',
  ViteAndPreact: 'https://intlayer.org/doc/environment/vite-and-preact',
  ViteAndLit: 'https://intlayer.org/doc/environment/vite-and-lit',
  ViteAndVanilla: 'https://intlayer.org/doc/environment/vite-and-vanilla',
  Vanilla: 'https://intlayer.org/doc/environment/vanilla',
  TanStackRouter: 'https://intlayer.org/doc/environment/tanstack-start',
  TanStackRouterAndSolid:
    'https://intlayer.org/doc/environment/tanstack-start/solid',
  SolidStart: 'https://intlayer.org/doc/environment/solid-start',
  Analog: 'https://intlayer.org/doc/environment/analog',
  Remix: 'https://intlayer.org/doc/environment/remix-3',
  NuxtAndVue: 'https://intlayer.org/doc/environment/nuxt-and-vue',
  Angular: 'https://intlayer.org/doc/environment/angular',
  Angular_19: 'https://intlayer.org/doc/environment/angular/19',
  SvelteKit: 'https://intlayer.org/doc/environment/sveltekit',
  ReactNativeAndExpo:
    'https://intlayer.org/doc/environment/react-native-and-expo',
  Lynx: 'https://intlayer.org/doc/environment/lynx-and-react',
  HTMX: 'https://intlayer.org/doc/environment/htmx',
  Storybook: 'https://intlayer.org/doc/storybook',
  Express: 'https://intlayer.org/doc/environment/express',
  NestJS: 'https://intlayer.org/doc/environment/nest',
  Fastify: 'https://intlayer.org/doc/environment/fastify',
  Hono: 'https://intlayer.org/doc/environment/hono',
  AdonisJS: 'https://intlayer.org/doc/environment/adonisjs',
  Elysia: 'https://intlayer.org/doc/environment/elysia',
  Default: 'https://intlayer.org/doc/get-started',

  // Intlayer Language Server (Go-to-Definition from getter keys to .content files)
  LSP: 'https://intlayer.org/doc/lsp',

  // Lint rules for hardcoded text and non-optimizable dynamic calls
  ESLint: 'https://intlayer.org/doc/eslint',

  // Competitor / Compat libs
  NextIntl: 'https://intlayer.org/doc/next-intl',
  NextI18Next: 'https://intlayer.org/doc/next-i18next',
  ReactI18Next: 'https://intlayer.org/doc/compatibility/react-i18next',
  ReactIntl: 'https://intlayer.org/doc/compatibility/react-intl',
  VueI18n: 'https://intlayer.org/doc/compatibility/vue-i18n',
  NuxtI18n: 'https://intlayer.org/doc/compatibility/nuxtjs-i18n',
  I18next: 'https://intlayer.org/doc/compatibility/i18next',
};

export type DocumentationRouterType = typeof DocumentationRouter;

/**
 * Helper: Detects the environment and returns the doc URL
 */
export const getDocumentationUrl = (packageJson: any): string => {
  const deps = {
    ...packageJson?.dependencies,
    ...packageJson?.devDependencies,
  };

  /**
   * Helper to check if a version string matches a specific major version
   * Matches: "15", "^15.0.0", "~15.2", "15.0.0-beta"
   */
  const isVersion = (versionString: string, major: number): boolean => {
    if (!versionString || typeof versionString !== 'string') return false;
    const regex = new RegExp(`^[\\^~]?${major}(?:\\.|$)`);
    return regex.test(versionString);
  };

  // Mobile / Cross-platform
  if (deps['@lynx-js/react'] || deps['@lynx-js/core']) {
    return DocumentationRouter.Lynx;
  }
  if (deps['react-native'] || deps.expo) {
    return DocumentationRouter.ReactNativeAndExpo;
  }

  // Meta-frameworks (Next, Nuxt, Astro, SvelteKit)
  if (deps.next) {
    const version = deps.next;

    if (isVersion(version, 14)) {
      return DocumentationRouter.NextJS_14;
    }

    if (isVersion(version, 15)) {
      return DocumentationRouter.NextJS_15;
    }

    return DocumentationRouter.NextJS;
  }

  if (deps.nuxt) return DocumentationRouter.NuxtAndVue;

  if (deps.astro) {
    if (deps['@astrojs/react'] || deps.react)
      return DocumentationRouter.Astro_React;
    if (deps['@astrojs/vue'] || deps.vue) return DocumentationRouter.Astro_Vue;
    if (deps['@astrojs/svelte'] || deps.svelte)
      return DocumentationRouter.Astro_Svelte;
    if (deps['@astrojs/solid-js'] || deps['solid-js'])
      return DocumentationRouter.Astro_Solid;
    if (deps['@astrojs/preact'] || deps.preact)
      return DocumentationRouter.Astro_Preact;
    if (deps['@astrojs/lit'] || deps.lit) return DocumentationRouter.Astro_Lit;

    return DocumentationRouter.Astro;
  }

  if (deps['@sveltejs/kit']) return DocumentationRouter.SvelteKit;
  if (deps['@analogjs/platform']) return DocumentationRouter.Analog;
  if (deps['@solidjs/start']) return DocumentationRouter.SolidStart;
  if (deps.remix || deps['remix-intlayer']) return DocumentationRouter.Remix;

  // Routers (TanStack & React Router v7)
  if (deps['@tanstack/react-router']) {
    return DocumentationRouter.TanStackRouter;
  }
  if (deps['@tanstack/solid-router']) {
    return DocumentationRouter.TanStackRouterAndSolid;
  }
  if (deps['@tanstack/start']) {
    if (deps['solid-js'] || deps['@tanstack/solid-router']) {
      return DocumentationRouter.TanStackRouterAndSolid;
    }
    return DocumentationRouter.TanStackRouter;
  }

  // Check for React Router v7 (the guide covers both config and FS routes)
  const reactRouterVersion = deps['react-router'];
  if (
    typeof reactRouterVersion === 'string' &&
    (deps['@react-router/fs-routes'] || isVersion(reactRouterVersion, 7))
  ) {
    return DocumentationRouter.ViteAndReact_ReactRouterV7;
  }

  // Vite Ecosystem (General)
  if (deps.vite) {
    if (deps.vue) return DocumentationRouter.ViteAndVue;
    if (deps['solid-js']) return DocumentationRouter.ViteAndSolid;
    if (deps.svelte) return DocumentationRouter.ViteAndSvelte;
    if (deps.preact) return DocumentationRouter.ViteAndPreact;
    if (deps.lit) return DocumentationRouter.ViteAndLit;
    if (deps['vanilla-intlayer']) return DocumentationRouter.ViteAndVanilla;

    // Default to React if Vite is present but specific other frameworks aren't found
    return DocumentationRouter.ViteAndReact;
  }

  // Other Web Frameworks
  if (deps['react-scripts']) return DocumentationRouter.CRA;
  if (deps['@angular/core']) {
    const version = deps['@angular/core'];
    if (isVersion(version, 19)) {
      return DocumentationRouter.Angular_19;
    }
    return DocumentationRouter.Angular;
  }
  if (deps.lit) return DocumentationRouter.ViteAndLit;
  if (deps['vanilla-intlayer']) return DocumentationRouter.Vanilla;
  if (deps.htmx || deps['htmx.org']) return DocumentationRouter.HTMX;
  if (deps.storybook || deps['@storybook/react'] || deps['@storybook/vue3'])
    return DocumentationRouter.Storybook;

  // Backend
  // NestJS first: it runs on top of Express (or Fastify), so both dependencies
  // are present and the more specific one has to win.
  if (deps['@nestjs/core']) return DocumentationRouter.NestJS;
  if (deps['@adonisjs/core']) return DocumentationRouter.AdonisJS;
  if (deps.elysia) return DocumentationRouter.Elysia;
  if (deps.hono) return DocumentationRouter.Hono;
  if (deps.express) return DocumentationRouter.Express;
  if (deps.fastify) return DocumentationRouter.Fastify;

  // Competitor Libs (Migration Guides)
  // We check these last as specific environment setup is usually higher priority,
  // but if no specific framework logic matched (or as a fallback), we guide to migration.
  if (deps['next-intl']) return DocumentationRouter.NextIntl;
  if (deps['react-i18next'] || deps.i18next)
    return DocumentationRouter.ReactI18Next;
  if (deps['react-intl']) return DocumentationRouter.ReactIntl;
  if (deps['next-i18next']) return DocumentationRouter.NextI18Next;
  if (deps['vue-i18n']) return DocumentationRouter.VueI18n;

  return DocumentationRouter.Default;
};
