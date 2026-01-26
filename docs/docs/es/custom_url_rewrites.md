---
createdAt: 2024-08-13
updatedAt: 2026-01-26
title: Reescrituras de URL personalizadas
description: Aprende cómo configurar y usar reescrituras de URL personalizadas en Intlayer para definir rutas específicas por locale.
keywords:
  - Reescrituras de URL personalizadas
  - Enrutamiento
  - Internacionalización
  - i18n
slugs:
  - doc
  - concept
  - custom_url_rewrites
history:
  - version: 8.0.0
    date: 2026-01-25
    changes: Implementar reescrituras de URL centralizadas con formateadores específicos por framework y el hook useRewriteURL.
---

# Implementación de reescrituras de URL personalizadas

Intlayer admite reescrituras de URL personalizadas, lo que te permite definir rutas específicas por locale que difieren de la estructura estándar `/locale/path`. Esto habilita URLs como `/about` para inglés y `/a-propos` para francés mientras mantiene la lógica interna de la aplicación canónica.

## Configuración

Las reescrituras personalizadas se configuran en la sección `routing` de tu archivo `intlayer.config.ts` usando formateadores específicos del framework. Estos formateadores proporcionan la sintaxis correcta para el router que prefieras.

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
      // ... // configuración adicional
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

Intlayer proporciona formatters para todos los frameworks populares:

- `nextjsRewrite`: Para Next.js App Router. Soporta `[slug]`, `[...slug]` (1+), y `[[...slug]]` (0+).
- `svelteKitRewrite`: Para SvelteKit. Soporta `[slug]`, `[...path]` (0+), y `[[optional]]` (0-1).
- `reactRouterRewrite`: Para React Router. Soporta `:slug` y `*` (0+).
- `vueRouterRewrite`: Para Vue Router 4. Soporta `:slug`, `:slug?` (0-1), `:slug*` (0+), y `:slug+` (1+).
- `solidRouterRewrite`: Para Solid Router. Soporta `:slug` y `*slug` (0+).
- `tanstackRouterRewrite`: Para TanStack Router. Soporta `$slug` y `*` (0+).
- `nuxtRewrite`: Para Nuxt 3. Soporta `[slug]` y `[...slug]` (0+).
- `viteRewrite`: Formateador genérico para cualquier proyecto basado en Vite. Normaliza la sintaxis para el proxy de Vite.

### Patrones avanzados

Intlayer normaliza internamente estos patrones a una sintaxis unificada, permitiendo coincidencias y generación de rutas sofisticadas:

- **Segmentos opcionales**: `[[optional]]` (SvelteKit) o `:slug?` (Vue/React) se admiten.
- **Catch-all (cero o más)**: `[[...slug]]` (Next.js), `[...path]` (SvelteKit/Nuxt) o `*` (React/TanStack) permiten coincidir con múltiples segmentos.
- **Catch-all obligatorio (uno o más)**: `[...slug]` (Next.js) o `:slug+` (Vue) aseguran que al menos un segmento esté presente.

## Corrección de URL en el cliente: `useRewriteURL`

Para asegurarse de que la barra de direcciones del navegador siempre refleje la URL localizada "bonita", Intlayer proporciona el hook `useRewriteURL`. Este hook actualiza silenciosamente la URL usando `window.history.replaceState` cuando un usuario llega a una ruta canónica.

### Uso en Frameworks

<Tabs group='framework'>
  <Tab label="Next.js" value="nextjs">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "next-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // Corrige automáticamente /fr/about a /fr/a-propos
      return <>{children}</>;
    };
    ```

  </Tab>

  <Tab label="React Router" value="reactrouter">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "react-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // Corrige automáticamente /fr/about a /fr/a-propos

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

## Integración con routers y proxies

Los proxies del lado del servidor de Intlayer (Vite y Next.js) gestionan automáticamente las reescrituras personalizadas para garantizar la coherencia SEO.

1. **Reescrituras internas**: Cuando un usuario visita `/fr/a-propos`, el proxy lo mapea internamente a `/fr/about` para que tu framework haga coincidir la ruta correcta.
2. **Redirecciones autoritativas**: Si un usuario escribe manualmente `/fr/about`, el proxy emite una redirección 301/302 a `/fr/a-propos`, asegurando que los motores de búsqueda indexen solo una versión de la página.

### Integración con Next.js

La integración con Next.js se gestiona completamente mediante el middleware `intlayerProxy`.

```typescript fileName="middleware.ts"
import { intlayerProxy } from "next-intlayer/middleware";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return intlayerProxy(request);
}
```

### Integración con Vite

Para SolidJS, Vue y Svelte, el plugin de Vite `intlayerProxy` gestiona las reescrituras durante el desarrollo.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

## Características clave

### 1. Reescrituras multi-contexto

Cada formateador genera un `RewriteObject` que contiene reglas especializadas para distintos consumidores:

- `url`: Optimizado para la generación de URL en el cliente (elimina segmentos de locale).
- `nextjs`: Conserva `[locale]` para el middleware de Next.js.
- `vite`: Conserva `:locale` para los proxies de Vite.

### 2. Normalización automática de patrones

Intlayer normaliza internamente todas las sintaxis de patrones (p. ej., convirtiendo `[param]` en `:param`) para que el emparejamiento sea consistente independientemente del framework de origen.

### 3. URLs canónicas para SEO

Al aplicar redirecciones desde rutas canónicas hacia alias más claros, Intlayer evita problemas de contenido duplicado y mejora la capacidad de descubrimiento del sitio.

## Utilidades principales

- `getLocalizedUrl(url, locale)`: Genera una URL localizada respetando las reglas de reescritura.
- `getCanonicalPath(path, locale)`: Resuelve una URL localizada de vuelta a su ruta canónica interna.
- `getRewritePath(pathname, locale)`: Detecta si un pathname necesita ser corregido a su alias localizado más legible.
