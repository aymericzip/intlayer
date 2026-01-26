---
createdAt: 2024-08-13
updatedAt: 2026-01-26
title: Riscritture URL personalizzate
description: Scopri come configurare e utilizzare le riscritture URL personalizzate in Intlayer per definire percorsi specifici per lingua.
keywords:
  - Riscritture URL personalizzate
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
    changes: Implementazione di riscritture URL centralizzate con formatter specifici per framework e l'hook useRewriteURL.
---

# Implementazione delle riscritture URL personalizzate

Intlayer supporta riscritture URL personalizzate, permettendoti di definire percorsi specifici per ciascuna lingua che differiscono dalla struttura standard `/locale/path`. In questo modo è possibile avere URL come `/about` per l'inglese e `/a-propos` per il francese, mantenendo però la logica interna dell'applicazione canonica.

## Configurazione

Le riscritture personalizzate vengono configurate nella sezione `routing` del file `intlayer.config.ts`, utilizzando i formatter specifici per framework. Questi formatter forniscono la sintassi corretta per il router che preferisci.

<Tabs group='routers'>
  <Tab label="Next.js" value="nextjs">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { nextjsRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ... (altre impostazioni)
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

### Formattatori disponibili

Intlayer fornisce formatter per tutti i framework più diffusi:

- `nextjsRewrite`: Per Next.js App Router. Supporta `[slug]`, `[...slug]` (1+), e `[[...slug]]` (0+).
- `svelteKitRewrite`: Per SvelteKit. Supporta `[slug]`, `[...path]` (0+), e `[[optional]]` (0-1).
- `reactRouterRewrite`: Per React Router. Supporta `:slug` e `*` (0+).
- `vueRouterRewrite`: Per Vue Router 4. Supporta `:slug`, `:slug?` (0-1), `:slug*` (0+), e `:slug+` (1+).
- `solidRouterRewrite`: Per Solid Router. Supporta `:slug` e `*slug` (0+).
- `tanstackRouterRewrite`: Per TanStack Router. Supporta `$slug` e `*` (0+).
- `nuxtRewrite`: Per Nuxt 3. Supporta `[slug]` e `[...slug]` (0+).
- `viteRewrite`: Formatter generico per qualsiasi progetto basato su Vite. Normalizza la sintassi per il proxy di Vite.

### Pattern avanzati

Intlayer normalizza internamente questi pattern in una sintassi unificata, consentendo la corrispondenza e la generazione sofisticata dei percorsi:

- **Segmenti opzionali**: `[[optional]]` (SvelteKit) o `:slug?` (Vue/React) sono supportati.
- **Catch-all (zero o più)**: `[[...slug]]` (Next.js), `[...path]` (SvelteKit/Nuxt) o `*` (React/TanStack) consentono di corrispondere a più segmenti.
- **Catch-all obbligatorio (uno o più)**: `[...slug]` (Next.js) o `:slug+` (Vue) garantiscono che sia presente almeno un segmento.

## Correzione dell'URL lato client: `useRewriteURL`

Per garantire che la barra degli indirizzi del browser rifletta sempre l'URL localizzato "pulito", Intlayer fornisce l'hook `useRewriteURL`. Questo hook aggiorna silenziosamente l'URL usando `window.history.replaceState` quando un utente arriva su un percorso canonico.

### Utilizzo nei framework

<Tabs group='framework'>
  <Tab label="Next.js" value="nextjs">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "next-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // Corregge automaticamente /fr/about in /fr/a-propos
      return <>{children}</>;
    };
    ```

  </Tab>

  <Tab label="React Router" value="reactrouter">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "react-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // Corregge automaticamente /fr/about in /fr/a-propos

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

## Integrazione del router e proxy

I proxy server-side di Intlayer (Vite e Next.js) gestiscono automaticamente le riscritture personalizzate per garantire la coerenza SEO.

1. **Riscritture interne**: quando un utente visita `/fr/a-propos`, il proxy lo mappa internamente a `/fr/about` in modo che il tuo framework corrisponda alla route corretta.
2. **Reindirizzamenti autorevoli**: se un utente digita manualmente `/fr/about`, il proxy emette un redirect 301/302 verso `/fr/a-propos`, assicurando che i motori di ricerca indicizzino solo una versione della pagina.

### Integrazione Next.js

L'integrazione con Next.js è gestita interamente tramite il middleware `intlayerProxy`.

```typescript fileName="middleware.ts"
import { intlayerProxy } from "next-intlayer/middleware";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return intlayerProxy(request);
}
```

### Integrazione con Vite

Per SolidJS, Vue e Svelte, il plugin Vite `intlayerProxy` gestisce le riscritture durante lo sviluppo.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

## Caratteristiche principali

### 1. Riscritture multi-contesto

Ogni formatter genera un `RewriteObject` che contiene regole specializzate per diversi consumer:

- `url`: Ottimizzato per la generazione di URL lato client (rimuove i segmenti di locale).
- `nextjs`: Conserva `[locale]` per il middleware di Next.js.
- `vite`: Conserva `:locale` per i proxy Vite.

### 2. Normalizzazione automatica dei pattern

Intlayer normalizza internamente tutte le sintassi dei pattern (ad es., convertendo `[param]` in `:param`) in modo che il matching rimanga coerente indipendentemente dal framework di origine.

### 3. URL autorevoli per la SEO

Forzando i redirect dai percorsi canonici verso alias più "puliti" (pretty aliases), Intlayer previene problemi di contenuto duplicato e migliora la visibilità del sito.

## Utilità principali

- `getLocalizedUrl(url, locale)`: Genera un URL localizzato rispettando le regole di rewrite.
- `getCanonicalPath(path, locale)`: Risolve un URL localizzato tornando al suo percorso canonico interno.
- `getRewritePath(pathname, locale)`: Rileva se un pathname deve essere corretto nel suo alias localizzato più "pulito".
