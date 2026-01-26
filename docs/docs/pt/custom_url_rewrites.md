---
createdAt: 2024-08-13
updatedAt: 2026-01-26
title: Reescritas de URL Personalizadas
description: Saiba como configurar e usar reescritas de URL personalizadas no Intlayer para definir caminhos específicos por locale.
keywords:
  - Reescritas de URL Personalizadas
  - Roteamento
  - Internacionalização
  - i18n
slugs:
  - doc
  - concept
  - custom_url_rewrites
history:
  - version: 8.0.0
    date: 2026-01-25
    changes: Implementar reescritas de URL centralizadas com formatadores específicos de framework e o hook useRewriteURL.
---

# Implementação de Reescritas de URL Personalizadas

O Intlayer suporta reescritas de URL personalizadas, permitindo que você defina caminhos específicos por locale que diferem da estrutura padrão `/locale/path`. Isso possibilita URLs como `/about` para inglês e `/a-propos` para francês, mantendo a lógica interna da aplicação canônica.

## Configuração

Regras de reescrita personalizadas são configuradas na seção `routing` do seu arquivo `intlayer.config.ts` usando formatadores específicos do framework. Esses formatadores fornecem a sintaxe correta para o router que você prefere.

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

### Formatadores Disponíveis

Intlayer fornece formatadores para todos os frameworks populares:

- `nextjsRewrite`: Para Next.js App Router. Suporta `[slug]`, `[...slug]` (1+), e `[[...slug]]` (0+).
- `svelteKitRewrite`: Para SvelteKit. Suporta `[slug]`, `[...path]` (0+), e `[[optional]]` (0-1).
- `reactRouterRewrite`: Para React Router. Suporta `:slug` e `*` (0+).
- `vueRouterRewrite`: Para Vue Router 4. Suporta `:slug`, `:slug?` (0-1), `:slug*` (0+), e `:slug+` (1+).
- `solidRouterRewrite`: Para Solid Router. Suporta `:slug` e `*slug` (0+).
- `tanstackRouterRewrite`: Para TanStack Router. Suporta `$slug` e `*` (0+).
- `nuxtRewrite`: Para Nuxt 3. Suporta `[slug]` e `[...slug]` (0+).
- `viteRewrite`: Formatador genérico para qualquer projeto baseado em Vite. Normaliza a sintaxe para o proxy do Vite.

### Padrões Avançados

O Intlayer normaliza internamente esses padrões para uma sintaxe unificada, permitindo correspondência de caminhos e geração mais sofisticadas:

- **Segmentos Opcionais**: `[[optional]]` (SvelteKit) ou `:slug?` (Vue/React) são suportados.
- **Catch-all (Zero ou mais)**: `[[...slug]]` (Next.js), `[...path]` (SvelteKit/Nuxt) ou `*` (React/TanStack) permitem corresponder múltiplos segmentos.
- **Catch-all Obrigatório (Um ou mais)**: `[...slug]` (Next.js) ou `:slug+` (Vue) garantem que pelo menos um segmento esteja presente.

## Correção de URL no Lado do Cliente: `useRewriteURL`

Para garantir que a barra de endereço do navegador reflita sempre a URL localizada "bonita", o Intlayer fornece o hook `useRewriteURL`. Este hook atualiza silenciosamente a URL usando `window.history.replaceState` quando um usuário acessa um caminho canônico.

### Uso em Frameworks

<Tabs group='framework'>
  <Tab label="Next.js" value="nextjs">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "next-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // Corrige automaticamente /fr/about para /fr/a-propos
      return <>{children}</>;
    };
    ```

  </Tab>

  <Tab label="React Router" value="reactrouter">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "react-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // Corrige automaticamente /fr/about para /fr/a-propos

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

## Integração com o Router & Proxies

Os proxies server-side do Intlayer (Vite & Next.js) tratam automaticamente reescritas personalizadas para garantir consistência de SEO.

1. **Reescritas Internas**: Quando um utilizador visita `/fr/a-propos`, o proxy mapeia internamente para `/fr/about` para que o seu framework corresponda à rota correta.
2. **Redirecionamentos Autoritativos**: Se um utilizador digitar manualmente `/fr/about`, o proxy emite um redirecionamento 301/302 para `/fr/a-propos`, garantindo que os motores de busca indexem apenas uma versão da página.

### Integração com Next.js

A integração com Next.js é totalmente gerida através do middleware `intlayerProxy`.

```typescript fileName="middleware.ts"
import { intlayerProxy } from "next-intlayer/middleware";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return intlayerProxy(request);
}
```

### Integração com Vite

Para SolidJS, Vue e Svelte, o plugin Vite `intlayerProxy` gerencia as reescritas durante o desenvolvimento.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

## Principais Funcionalidades

### 1. Reescritas Multi-Contexto

Cada formatter gera um `RewriteObject` contendo regras especializadas para diferentes consumidores:

- `url`: Otimizado para geração de URLs do lado do cliente (remove segmentos de locale).
- `nextjs`: Preserva `[locale]` para o middleware do Next.js.
- `vite`: Preserva `:locale` para os proxies do Vite.

### 2. Normalização Automática de Padrões

O Intlayer normaliza internamente todas as sintaxes de padrão (por exemplo, convertendo `[param]` para `:param`) para que o matching permaneça consistente independentemente do framework de origem.

### 3. URLs canônicas de SEO

Ao impor redirecionamentos de caminhos canônicos para aliases localizados mais apresentáveis, o Intlayer evita problemas de conteúdo duplicado e melhora a descoberta do site.

## Utilitários principais

- `getLocalizedUrl(url, locale)`: Gera uma URL localizada respeitando as regras de reescrita.
- `getCanonicalPath(path, locale)`: Resolve uma URL localizada de volta para o seu caminho canônico interno.
- `getRewritePath(pathname, locale)`: Detecta se um pathname precisa ser corrigido para o seu alias localizado mais amigável.
