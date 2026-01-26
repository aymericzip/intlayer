---
createdAt: 2024-08-13
updatedAt: 2026-01-26
title: Custom URL Rewrites
description: Learn how to configure and use custom URL rewrites in Intlayer to define locale-specific paths.
keywords:
  - Custom URL Rewrites
  - Routing
  - Internationalization
  - i18n
slugs:
  - doc
  - concept
  - custom_url_rewrites
history:
  - version: 8.0.0
    date: 2026-01-25
    changes: Implement centralized URL rewrites with framework-specific formatters and the useRewriteURL hook.
---

# Custom URL Rewrites Implementation

Intlayer supports custom URL rewrites, allowing you to define locale-specific paths that differ from the standard `/locale/path` structure. This enables URLs like `/about` for English and `/a-propos` for French while keeping the internal application logic canonical.

## Configuration

Custom rewrites are configured in the `routing` section of your `intlayer.config.ts` file using framework-specific formatters. These formatters provide the correct syntax for your preferred router.

<Tabs group='routers'>
  <Tab label="Next.js" value="nextjs">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { nextjsRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-no-default",
        rewrite: nextjsRewrite({
          "/[locale]/about": {
            fr: "/[locale]/a-propos",
            es: "/[locale]/acerca-de",
          },
          "/[locale]/products/[id]": {
            fr: "/[locale]/produits/[id]",
            es: "/[locale]/productos/[id]",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="React Router" value="reactrouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { reactRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: reactRouterRewrite({
          "/:locale/about": {
            fr: "/:locale/a-propos",
            es: "/:locale/acerca-de",
          },
          "/:locale/products/:id": {
            fr: "/:locale/produits/:id",
            es: "/:locale/productos/:id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="TanStack Router" value="tanstackrouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { tanstackRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: tanstackRouterRewrite({
          "/$locale/about": {
            fr: "/$locale/a-propos",
            es: "/$locale/acerca-de",
          },
          "/$locale/products/$id": {
            fr: "/$locale/produits/$id",
            es: "/$locale/productos/$id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="Vue Router" value="vuerouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { vueRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: vueRouterRewrite({
          "/:locale/about": {
            fr: "/:locale/a-propos",
            es: "/:locale/acerca-de",
          },
          "/:locale/products/:id": {
            fr: "/:locale/produits/:id",
            es: "/:locale/productos/:id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="SvelteKit" value="sveltekit">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { svelteKitRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: svelteKitRewrite({
          "/[locale]/about": {
            fr: "/[locale]/a-propos",
            es: "/[locale]/acerca-de",
          },
          "/[locale]/products/[id]": {
            fr: "/[locale]/produits/[id]",
            es: "/[locale]/productos/[id]",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="Solid Router" value="solidrouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { solidRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: solidRouterRewrite({
          "/:locale/about": {
            fr: "/:locale/a-propos",
            es: "/:locale/acerca-de",
          },
          "/:locale/products/:id": {
            fr: "/:locale/produits/:id",
            es: "/:locale/productos/:id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="Nuxt" value="nuxt">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { nuxtRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: nuxtRewrite({
          "/[locale]/about": {
            fr: "/[locale]/a-propos",
            es: "/[locale]/acerca-de",
          },
          "/[locale]/products/[id]": {
            fr: "/[locale]/produits/[id]",
            es: "/[locale]/productos/[id]",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
</Tabs>

### Available Formatters

Intlayer provides formatters for all popular frameworks:

- `nextjsRewrite`: For Next.js App Router. Supports `[slug]`, `[...slug]` (1+), and `[[...slug]]` (0+).
- `svelteKitRewrite`: For SvelteKit. Supports `[slug]`, `[...path]` (0+), and `[[optional]]` (0-1).
- `reactRouterRewrite`: For React Router. Supports `:slug` and `*` (0+).
- `vueRouterRewrite`: For Vue Router 4. Supports `:slug`, `:slug?` (0-1), `:slug*` (0+), and `:slug+` (1+).
- `solidRouterRewrite`: For Solid Router. Supports `:slug` and `*slug` (0+).
- `tanstackRouterRewrite`: For TanStack Router. Supports `$slug` and `*` (0+).
- `nuxtRewrite`: For Nuxt 3. Supports `[slug]` and `[...slug]` (0+).
- `viteRewrite`: Generic formatter for any Vite-based project. Normalizes syntax for the Vite proxy.

### Advanced Patterns

Intlayer internally normalizes these patterns to a unified syntax, allowing sophisticated path matching and generation:

- **Optional Segments**: `[[optional]]` (SvelteKit) or `:slug?` (Vue/React) are supported.
- **Catch-all (Zero or more)**: `[[...slug]]` (Next.js), `[...path]` (SvelteKit/Nuxt), or `*` (React/TanStack) allow matching multiple segments.
- **Mandatory Catch-all (One or more)**: `[...slug]` (Next.js) or `:slug+` (Vue) ensure at least one segment is present.

## Client-Side URL Correction: `useRewriteURL`

To ensure that the browser's address bar always reflects the "pretty" localized URL, Intlayer provides the `useRewriteURL` hook. This hook silently updates the URL using `window.history.replaceState` when a user lands on a canonical path.

### Usage in Frameworks

<Tabs group='framework'>
  <Tab label="Next.js" value="nextjs">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "next-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // Automatically corrects /fr/about to /fr/a-propos
      return <>{children}</>;
    };
    ```

  </Tab>

  <Tab label="React Router" value="reactrouter">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "react-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // Automatically corrects /fr/about to /fr/a-propos

      return <>{children}</>;
    };
    ```

  </Tab>

  <Tab label="Vue" value="vue">
  
    ```vue
    <script setup>
    import { useRewriteURL } from "vue-intlayer";

    useRewriteURL();
    </script>

    ```

  </Tab>
  <Tab label="Solid" value="solid">
  
    ```tsx
    import { useRewriteURL } from "solid-intlayer";

    const Layout = (props) => {
      useRewriteURL();
      return <>{props.children}</>;
    };
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
  
    ```svelte
    <script>
    import { useRewriteURL } from "svelte-intlayer";

    useRewriteURL();
    </script>

    ```

  </Tab>
</Tabs>

## Router Integration & Proxies

Intlayer's server-side proxies (Vite & Next.js) automatically handle custom rewrites to ensure SEO consistency.

1. **Internal Rewrites**: When a user visits `/fr/a-propos`, the proxy internally maps it to `/fr/about` so your framework matches the correct route.
2. **Authoritative Redirects**: If a user manually types `/fr/about`, the proxy issues a 301/302 redirect to `/fr/a-propos`, ensuring search engines only index one version of the page.

### Next.js Integration

Next.js integration is fully handled via the `intlayerProxy` middleware.

```typescript fileName="middleware.ts"
import { intlayerProxy } from "next-intlayer/middleware";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return intlayerProxy(request);
}
```

### Vite Integration

For SolidJS, Vue, and Svelte, the `intlayerProxy` Vite plugin manages the rewrites during development.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

## Key Features

### 1. Multi-Context Rewrites

Each formatter generates a `RewriteObject` containing specialized rules for different consumers:

- `url`: Optimized for client-side URL generation (strips locale segments).
- `nextjs`: Preserves `[locale]` for Next.js middleware.
- `vite`: Preserves `:locale` for Vite proxies.

### 2. Automatic Pattern Normalization

Intlayer internally normalizes all pattern syntaxes (e.g., converting `[param]` to `:param`) so that matching remains consistent regardless of the source framework.

### 3. SEO Authoritative URLs

By enforcing redirects from canonical paths to pretty aliases, Intlayer prevents duplicate content issues and improves site discoverability.

## Core Utilities

- `getLocalizedUrl(url, locale)`: Generates a localized URL respecting rewrite rules.
- `getCanonicalPath(path, locale)`: Resolves a localized URL back to its internal canonical path.
- `getRewritePath(pathname, locale)`: Detects if a pathname needs to be corrected to its prettier localized alias.
