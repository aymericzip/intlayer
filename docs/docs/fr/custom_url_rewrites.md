---
createdAt: 2024-08-13
updatedAt: 2026-01-26
title: Réécritures d'URL personnalisées
description: Découvrez comment configurer et utiliser des réécritures d'URL personnalisées dans Intlayer pour définir des chemins spécifiques à une locale.
keywords:
  - Réécritures d'URL personnalisées
  - Routage
  - Internationalisation
  - i18n
slugs:
  - doc
  - concept
  - custom_url_rewrites
history:
  - version: 8.0.0
    date: 2026-01-25
    changes: Mise en œuvre de réécritures d'URL centralisées avec des formateurs spécifiques au framework et le hook useRewriteURL.
---

# Mise en œuvre des réécritures d'URL personnalisées

Intlayer prend en charge les réécritures d'URL personnalisées, vous permettant de définir des chemins spécifiques à chaque locale qui diffèrent de la structure standard `/locale/path`. Cela permet d'avoir des URL telles que `/about` pour l'anglais et `/a-propos` pour le français tout en maintenant la logique interne de l'application canonique.

## Configuration

Les réécritures personnalisées sont configurées dans la section `routing` de votre fichier `intlayer.config.ts` en utilisant des formateurs spécifiques au framework. Ces formateurs fournissent la syntaxe correcte pour votre routeur préféré.

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

### Formatters disponibles

Intlayer fournit des formatters pour tous les frameworks populaires :

- `nextjsRewrite`: Pour Next.js App Router. Prend en charge `[slug]`, `[...slug]` (1+), et `[[...slug]]` (0+).
- `svelteKitRewrite`: Pour SvelteKit. Prend en charge `[slug]`, `[...path]` (0+), et `[[optional]]` (0-1).
- `reactRouterRewrite`: Pour React Router. Prend en charge `:slug` et `*` (0+).
- `vueRouterRewrite`: Pour Vue Router 4. Prend en charge `:slug`, `:slug?` (0-1), `:slug*` (0+), et `:slug+` (1+).
- `solidRouterRewrite`: Pour Solid Router. Prend en charge `:slug` et `*slug` (0+).
  /// `tanstackRouterRewrite` : Pour TanStack Router. Prend en charge `$slug` et `*` (0+).
  /// `nuxtRewrite` : Pour Nuxt 3. Prend en charge `[slug]` et `[...slug]` (0+).
  /// `viteRewrite` : Formateur générique pour tout projet basé sur Vite. Normalise la syntaxe pour le proxy Vite.
  ///
  /// ### Modèles avancés
  ///
  /// Intlayer normalise en interne ces modèles vers une syntaxe unifiée, permettant des correspondances et une génération de chemins sophistiquées :
  ///
  /// - **Segments optionnels** : `[[optional]]` (SvelteKit) ou `:slug?` (Vue/React) sont pris en charge.
  /// - **Catch-all (zéro ou plusieurs)** : `[[...slug]]` (Next.js), `[...path]` (SvelteKit/Nuxt), ou `*` (React/TanStack) permettent de matcher plusieurs segments.
  /// - **Catch-all obligatoire (un ou plusieurs)** : `[...slug]` (Next.js) ou `:slug+` (Vue) garantissent qu'au moins un segment est présent.
  ///
  /// ## Correction d'URL côté client : `useRewriteURL`

Pour faire en sorte que la barre d'adresse du navigateur reflète toujours l'URL localisée "propre", Intlayer fournit le hook `useRewriteURL`. Ce hook met à jour silencieusement l'URL en utilisant `window.history.replaceState` lorsqu'un utilisateur arrive sur un chemin canonique.

### Utilisation dans les frameworks

<Tabs group='framework'>
  <Tab label="Next.js" value="nextjs">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "next-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // Corrige automatiquement /fr/about vers /fr/a-propos
      return <>{children}</>;
    };
    ```

  </Tab>

  <Tab label="React Router" value="reactrouter">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "react-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // Corrige automatiquement /fr/about en /fr/a-propos

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

## Intégration du Router et des Proxies

Les proxies côté serveur d'Intlayer (Vite et Next.js) gèrent automatiquement les réécritures personnalisées pour garantir la cohérence SEO.

1. **Réécritures internes** : Lorsqu'un utilisateur visite `/fr/a-propos`, le proxy le mappe en interne vers `/fr/about` afin que votre framework corresponde à la bonne route.
2. **Redirections faisant autorité** : Si un utilisateur saisit manuellement `/fr/about`, le proxy émet une redirection 301/302 vers `/fr/a-propos`, garantissant que les moteurs de recherche n'indexent qu'une seule version de la page.

### Intégration avec Next.js

L'intégration avec Next.js est entièrement gérée via le middleware `intlayerProxy`.

```typescript fileName="middleware.ts"
import { intlayerProxy } from "next-intlayer/middleware";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return intlayerProxy(request);
}
```

### Intégration Vite

Pour SolidJS, Vue et Svelte, le plugin Vite `intlayerProxy` gère les réécritures pendant le développement.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

## Fonctionnalités clés

### 1. Réécritures multi-contexte

Chaque formatter génère un `RewriteObject` contenant des règles spécialisées pour différents consommateurs :

- `url` : Optimisé pour la génération d'URL côté client (supprime les segments de locale).
- `nextjs` : Préserve `[locale]` pour le middleware Next.js.
- `vite` : Préserve `:locale` pour les proxies Vite.

### 2. Normalisation automatique des patterns

Intlayer normalise en interne toutes les syntaxes de pattern (par ex. en convertissant `[param]` en `:param`) afin que la correspondance reste cohérente quel que soit le framework source.

### 3. URL canoniques pour le SEO

En imposant des redirections des chemins canoniques vers des alias plus lisibles, Intlayer évite les problèmes de contenu dupliqué et améliore la découvrabilité du site.

## Utilitaires principaux

- `getLocalizedUrl(url, locale)`: Génère une URL localisée en respectant les règles de réécriture.
- `getCanonicalPath(path, locale)`: Retourne le chemin canonique interne correspondant à une URL localisée.
- `getRewritePath(pathname, locale)`: Détecte si un pathname doit être corrigé vers son alias localisé plus lisible.
