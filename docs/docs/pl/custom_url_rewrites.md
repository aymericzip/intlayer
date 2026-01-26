---
createdAt: 2024-08-13
updatedAt: 2026-01-26
title: Niestandardowe przepisywanie adresów URL
description: Dowiedz się, jak skonfigurować i używać niestandardowego przepisywania adresów URL w Intlayer, aby definiować ścieżki specyficzne dla lokalizacji.
keywords:
  - Niestandardowe przepisywanie URL
  - Routing
  - Internacjonalizacja
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

# Implementacja niestandardowego przepisywania URL

Intlayer obsługuje niestandardowe przepisywanie adresów URL, pozwalając zdefiniować ścieżki specyficzne dla danej lokalizacji, które różnią się od standardowej struktury `/locale/path`. Umożliwia to używanie adresów URL takich jak `/about` dla angielskiego i `/a-propos` dla francuskiego, przy zachowaniu kanonicznej logiki wewnętrznej aplikacji.

## Konfiguracja

Niestandardowe rewrites konfigurujesz w sekcji `routing` w pliku `intlayer.config.ts`, używając formaterów specyficznych dla danego frameworka. Te formatery dostarczają poprawnej składni dla wybranego routera.

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
      // ... (inne ustawienia)
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

### Dostępne formattery

Intlayer udostępnia formattery dla wszystkich popularnych frameworków:

- `nextjsRewrite`: Dla Next.js App Router. Obsługuje `[slug]`, `[...slug]` (1+), oraz `[[...slug]]` (0+).
- `svelteKitRewrite`: Dla SvelteKit. Obsługuje `[slug]`, `[...path]` (0+), oraz `[[optional]]` (0-1).
- `reactRouterRewrite`: Dla React Router. Obsługuje `:slug` i `*` (0+).
- `vueRouterRewrite`: Dla Vue Router 4. Obsługuje `:slug`, `:slug?` (0-1), `:slug*` (0+), oraz `:slug+` (1+).
- `solidRouterRewrite`: Dla Solid Router. Obsługuje `:slug` i `*slug` (0+).
- `tanstackRouterRewrite`: Dla TanStack Router. Obsługuje `$slug` i `*` (0+).
- `nuxtRewrite`: Dla Nuxt 3. Obsługuje `[slug]` i `[...slug]` (0+).
- `viteRewrite`: Ogólny formatter dla projektów opartych na Vite. Normalizuje składnię dla proxy Vite.

### Zaawansowane wzorce

Intlayer wewnętrznie normalizuje te wzorce do zunifikowanej składni, co pozwala na zaawansowane dopasowywanie i generowanie ścieżek:

- **Opcjonalne segmenty**: `[[optional]]` (SvelteKit) lub `:slug?` (Vue/React) są obsługiwane.
- **Catch-all (zero lub więcej)**: `[[...slug]]` (Next.js), `[...path]` (SvelteKit/Nuxt) lub `*` (React/TanStack) pozwalają na dopasowanie wielu segmentów.
- **Mandatory Catch-all (jeden lub więcej)**: `[...slug]` (Next.js) lub `:slug+` (Vue) zapewniają obecność przynajmniej jednego segmentu.

## Korekta URL po stronie klienta: `useRewriteURL`

Aby zapewnić, że pasek adresu przeglądarki zawsze odzwierciedla „ładny” zlokalizowany URL, Intlayer udostępnia hook `useRewriteURL`. Hook ten dyskretnie aktualizuje URL za pomocą `window.history.replaceState`, gdy użytkownik trafia na kanoniczną ścieżkę.

### Użycie w frameworkach

<Tabs group='framework'>
  <Tab label="Next.js" value="nextjs">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "next-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // Automatycznie koryguje '/fr/about' na '/fr/a-propos'
      return <>{children}</>;
    };
    ```

  </Tab>

  <Tab label="React Router" value="reactrouter">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "react-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // Automatycznie koryguje /fr/about na /fr/a-propos

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

## Integracja routera i proxy

Proxy serwerowe Intlayer (Vite i Next.js) automatycznie obsługują niestandardowe przepisywania (rewrites), aby zapewnić spójność SEO.

1. **Wewnętrzne przepisywania**: Gdy użytkownik odwiedza `/fr/a-propos`, proxy wewnętrznie mapuje to na `/fr/about`, aby Twój framework dopasował właściwą trasę.
2. **Autorytatywne przekierowania**: Jeśli użytkownik ręcznie wpisze `/fr/about`, proxy zwraca przekierowanie 301/302 do `/fr/a-propos`, zapewniając, że wyszukiwarki indeksują tylko jedną wersję strony.

### Integracja z Next.js

Integracja z Next.js jest w pełni obsługiwana przez middleware `intlayerProxy`.

```typescript fileName="middleware.ts"
import { intlayerProxy } from "next-intlayer/middleware";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return intlayerProxy(request);
}
```

### Integracja z Vite

Dla SolidJS, Vue i Svelte wtyczka Vite `intlayerProxy` zarządza przepisywaniami (rewrites) podczas developmentu.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

## Kluczowe funkcje

### 1. Przepisywania w wielu kontekstach

Każdy formatter generuje `RewriteObject` zawierający wyspecjalizowane reguły dla różnych odbiorców:

- `url`: Optymalizowany pod generowanie URL po stronie klienta (usuwa segmenty lokalizacji).
- `nextjs`: Zachowuje `[locale]` dla middleware Next.js.
- `vite`: Zachowuje `:locale` dla proxy Vite.

### 2. Automatyczna normalizacja wzorców

Intlayer wewnętrznie normalizuje wszystkie składnie wzorców (np. konwertując `[param]` na `:param`), dzięki czemu dopasowywanie pozostaje spójne niezależnie od frameworka źródłowego.

### 3. Autorytatywne adresy URL (SEO)

Wymuszając przekierowania ze ścieżek kanonicznych do przyjaznych aliasów, Intlayer zapobiega problemom z duplikacją treści i poprawia wykrywalność serwisu.

## Podstawowe narzędzia

- `getLocalizedUrl(url, locale)`: Generuje zlokalizowany URL z uwzględnieniem rewrite rules.
- `getCanonicalPath(path, locale)`: Rozwiązuje zlokalizowany URL z powrotem do wewnętrznej ścieżki kanonicznej.
- `getRewritePath(pathname, locale)`: Wykrywa, czy `pathname` wymaga poprawy do bardziej przyjaznego zlokalizowanego aliasu.
