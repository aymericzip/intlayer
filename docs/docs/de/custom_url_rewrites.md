---
createdAt: 2024-08-13
updatedAt: 2026-01-26
title: Benutzerdefinierte URL Rewrites
description: Erfahren Sie, wie Sie in Intlayer benutzerdefinierte URL Rewrites konfigurieren und verwenden, um locale-spezifische Pfade zu definieren.
keywords:
  - Benutzerdefinierte URL Rewrites
  - Routing
  - Internationalisierung
  - i18n
slugs:
  - doc
  - concept
  - custom_url_rewrites
history:
  - version: 8.0.0
    date: 2026-01-25
    changes: Zentrale URL-Rewrites mit framework-spezifischen Formatierern und dem useRewriteURL-Hook implementieren.
---

# Implementierung benutzerdefinierter URL Rewrites

Intlayer unterstützt benutzerdefinierte URL Rewrites, mit denen Sie locale-spezifische Pfade definieren können, die von der Standardstruktur `/locale/path` abweichen. Dadurch sind URLs wie `/about` für Englisch und `/a-propos` für Französisch möglich, während die interne Anwendungslogik kanonisch bleibt.

## Konfiguration

Benutzerdefinierte Rewrites werden im Abschnitt `routing` Ihrer Datei `intlayer.config.ts` konfiguriert und verwenden frameworkspezifische Formatter. Diese Formatter liefern die korrekte Syntax für den von Ihnen bevorzugten Router.

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
  <Tab label="TanStack-Router" value="tanstackrouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { tanstackRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ... (weitere Konfiguration)
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
  <Tab label="Vue-Router" value="vuerouter">

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
      // ... (weitere Einstellungen)
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
      // ... (weitere Einstellungen)
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

### Verfügbare Formatierer

Intlayer stellt Formatierer für alle gängigen Frameworks bereit:

- `nextjsRewrite`: Für Next.js App Router. Unterstützt `[slug]`, `[...slug]` (1+), und `[[...slug]]` (0+).
- `svelteKitRewrite`: Für SvelteKit. Unterstützt `[slug]`, `[...path]` (0+), und `[[optional]]` (0-1).
- `reactRouterRewrite`: Für React Router. Unterstützt `:slug` und `*` (0+).
- `vueRouterRewrite`: Für Vue Router 4. Unterstützt `:slug`, `:slug?` (0-1), `:slug*` (0+), und `:slug+` (1+).
- `solidRouterRewrite`: Für Solid Router. Unterstützt `:slug` und `*slug` (0+).
- `tanstackRouterRewrite`: Für TanStack Router. Unterstützt `$slug` und `*` (0+).
- `nuxtRewrite`: Für Nuxt 3. Unterstützt `[slug]` und `[...slug]` (0+).
- `viteRewrite`: Generischer Formatter für jedes Vite-basierte Projekt. Normalisiert die Syntax für den Vite-Proxy.

### Erweiterte Muster

Intlayer normalisiert diese Muster intern in eine einheitliche Syntax, die ausgefeilte Pfadabgleiche und -generierung ermöglicht:

- **Optionale Segmente**: `[[optional]]` (SvelteKit) oder `:slug?` (Vue/React) werden unterstützt.
- **Catch-all (null oder mehr)**: `[[...slug]]` (Next.js), `[...path]` (SvelteKit/Nuxt) oder `*` (React/TanStack) erlauben das Abgleichen mehrerer Segmente.
- **Verpflichtendes Catch-all (eins oder mehr)**: `[...slug]` (Next.js) oder `:slug+` (Vue) stellen sicher, dass mindestens ein Segment vorhanden ist.

## Client-seitige URL-Korrektur: `useRewriteURL`

Um sicherzustellen, dass die Adressleiste des Browsers stets die "schöne" lokalisierte URL anzeigt, stellt Intlayer den Hook `useRewriteURL` zur Verfügung. Dieser Hook aktualisiert die URL im Hintergrund mit `window.history.replaceState`, wenn ein Benutzer auf einen kanonischen Pfad gelangt.

### Verwendung in Frameworks

<Tabs group='framework'>
  <Tab label="Next.js" value="nextjs">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "next-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // Korrigiert automatisch /fr/about in /fr/a-propos
      return <>{children}</>;
    };
    ```

  </Tab>

  <Tab label="React Router" value="reactrouter">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "react-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // Korrigiert automatisch /fr/about zu /fr/a-propos

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

## Router-Integration & Proxys

Die serverseitigen Proxies von Intlayer (Vite & Next.js) behandeln benutzerdefinierte Umschreibungen automatisch, um die SEO-Konsistenz sicherzustellen.

1. **Interne Umschreibungen**: Wenn ein Benutzer `/fr/a-propos` besucht, leitet der Proxy ihn intern auf `/fr/about` um, sodass Ihr Framework die korrekte Route findet.
2. **Verbindliche Weiterleitungen**: Wenn ein Benutzer manuell `/fr/about` eingibt, sendet der Proxy eine 301/302-Weiterleitung zu `/fr/a-propos`, sodass Suchmaschinen nur eine Version der Seite indexieren.

### Next.js-Integration

Die Next.js-Integration wird vollständig über die `intlayerProxy`-Middleware gehandhabt.

```typescript fileName="middleware.ts"
import { intlayerProxy } from "next-intlayer/middleware";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return intlayerProxy(request);
}
```

### Vite-Integration

Für SolidJS, Vue und Svelte verwaltet das `intlayerProxy`-Vite-Plugin die Rewrites während der Entwicklung.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

## Hauptmerkmale

### 1. Rewrites für mehrere Kontexte

Jeder Formatter erzeugt ein `RewriteObject`, das spezialisierte Regeln für verschiedene Konsumenten enthält:

- `url`: Optimiert für clientseitige URL-Erzeugung (entfernt Locale-Segmente).
- `nextjs`: Bewahrt `[locale]` für Next.js-Middleware.
- `vite`: Bewahrt `:locale` für Vite-Proxies.

### 2. Automatische Pattern-Normalisierung

Intlayer normalisiert intern alle Muster-Syntaxen (z. B. die Umwandlung von `[param]` in `:param`), sodass das Matching unabhängig vom Quellframework konsistent bleibt.

### 3. SEO: Kanonische URLs

Durch das Erzwingen von Weiterleitungen von kanonischen Pfaden zu sprechenden Aliasen verhindert Intlayer Probleme mit doppelten Inhalten und verbessert die Auffindbarkeit der Seite.

## Kernwerkzeuge

- `getLocalizedUrl(url, locale)`: Generiert eine lokalisierte URL unter Berücksichtigung der Rewrite-Regeln.
- `getCanonicalPath(path, locale)`: Wandelt eine lokalisierte URL zurück in ihren internen kanonischen Pfad.
- `getRewritePath(pathname, locale)`: Erkennt, ob ein Pfadname auf seinen schöneren lokalisierten Alias korrigiert werden muss.
