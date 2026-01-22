---
createdAt: 2024-08-13
updatedAt: 2026-01-22
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
    date: 2026-01-22
    changes: Implement custom URL rewrites and add integration guides for popular routers.
---

# Custom URL Rewrites Implementation

Intlayer now supports custom URL rewrites, allowing you to define locale-specific paths that differ from the standard `/locale/path` structure. This enables URLs like `/about` for English and `/a-propos` for French.

## Configuration

Custom rewrites are configured in the `routing` section of your `intlayer.config.ts` file:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default",
    rewrite: {
      "/about": {
        en: "/about",
        fr: "/a-propos",
      },
      "/products/[id]": {
        en: "/products/[id]",
        fr: "/produits/[id]",
      },
    },
  },
};

export default config;
```

## Router Integration

To make custom rewrites work with your favorite router, Intlayer provides utilities to resolve localized URLs to canonical paths and vice versa.

<Tabs>
  <Tab label="Next.js (App Router)">
    Next.js integration is handled automatically via the `intlayerProxy` middleware. The proxy detects custom routes and internally rewrites them to the canonical format expected by your `[locale]` folder structure.

    ```typescript fileName="middleware.ts"
    import { intlayerProxy } from "next-intlayer/middleware";
    import { NextRequest } from "next/server";

    export function middleware(request: NextRequest) {
      return intlayerProxy(request);
    }
    ```

  </Tab>
  <Tab label="TanStack Router">
    For TanStack Router, you can use the `getCanonicalPath` utility in your `beforeLoad` or a global middleware to ensure the router matches the internal canonical route.

    ```typescript
    import { getCanonicalPath } from "intlayer";
    import { Router } from "@tanstack/react-router";

    // In your router configuration or route matching logic
    const path = window.location.pathname;
    const canonicalPath = getCanonicalPath(path, currentLocale);
    // Use canonicalPath for route matching
    ```

  </Tab>
  <Tab label="React Router / Remix">
    In React Router, you can wrap your route matching or use a custom hook to resolve the canonical path before the router processes it.

    ```tsx
    import { useLocation } from "react-router-dom";
    import { getCanonicalPath } from "intlayer";

    const useCanonicalLocation = () => {
      const location = useLocation();
      const { locale } = useLocale();

      return {
        ...location,
        pathname: getCanonicalPath(location.pathname, locale),
      };
    };
    ```

  </Tab>
  <Tab label="Vue Router / Nuxt">
    For Vue-based applications, you can use a global navigation guard to handle the translation of localized paths.

    ```typescript
    import { getCanonicalPath } from "intlayer";

    router.beforeEach((to, from, next) => {
      const canonicalPath = getCanonicalPath(to.path, currentLocale);
      if (canonicalPath !== to.path) {
        // Handle internal navigation to canonical route
      }
      next();
    });
    ```

  </Tab>
  <Tab label="Svelte Router / SvelteKit">
    For SvelteKit, you can use a hook or a handle function to process the URL before it reaches the router.

    ```typescript fileName="src/hooks.server.ts"
    import { getCanonicalPath } from "intlayer";
    import type { Handle } from '@sveltejs/kit';

    export const handle: Handle = async ({ event, resolve }) => {
      const { pathname } = event.url;
      const canonicalPath = getCanonicalPath(pathname, currentLocale);

      if (canonicalPath !== pathname) {
        // Rewrite the internal path
        event.url.pathname = canonicalPath;
      }

      return resolve(event);
    };
    ```

  </Tab>
  <Tab label="Solid Router">
    In Solid Router, you can use the `getCanonicalPath` within a `useBeforeLeave` guard or a custom routing wrapper to handle localized URLs.

    ```typescript
    import { getCanonicalPath } from "intlayer";
    import { useLocation } from "@solidjs/router";

    const location = useLocation();
    const canonicalPath = () => getCanonicalPath(location.pathname, currentLocale);
    ```

  </Tab>
</Tabs>

## Key Features

### 1. Centralized Logic

The rewrite logic is centralized in `@intlayer/core`, ensuring that `getLocalizedUrl`, `getMultilingualUrls`, and the various framework proxies (Next.js, Vite) all behave consistently.

### 2. Dynamic Route Support

Rewrites support dynamic parameters using the Next.js-style bracket notation (e.g., `[id]`, `[slug]`). The system automatically extracts parameters from the incoming URL and re-injects them into the target path.

### 3. Transparent Proxying

The proxies for Next.js and Vite handle custom rewrites without forcing browser-side redirects unless necessary (e.g., when a locale cookie mismatch is detected). This ensures that the user stays on the URL they typed while the framework sees the internal canonical path.

## Core Functions

### `getLocalizedUrl(url, locale, options)`

Returns the localized version of a URL. If a rewrite rule matches the provided URL, it will return the custom path for the target locale.

### `getMultilingualUrls(url, options)`

Returns a map of all localized URLs for a given canonical path, respecting custom rewrite rules.

### `getCanonicalPath(path, locale)`

Resolves a localized URL back to its internal canonical path. This is essential for routers to match the correct component tree regardless of the URL language.
