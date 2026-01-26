---
createdAt: 2024-08-13
updatedAt: 2026-01-26
title: Пользовательские перезаписи URL
description: Узнайте, как настроить и использовать пользовательские перезаписи URL в Intlayer для задания путей, специфичных для локали.
keywords:
  - Пользовательские перезаписи URL
  - Маршрутизация
  - Интернационализация
  - i18n
slugs:
  - doc
  - concept
  - custom_url_rewrites
history:
  - version: 8.0.0
    date: 2026-01-25
    changes: Реализовано централизованное управление перезаписями URL с использованием форматтеров, специфичных для фреймворка, и хука useRewriteURL.
---

# Реализация пользовательских перезаписей URL

Intlayer поддерживает пользовательские перезаписи URL, позволяя задавать пути, специфичные для локали, которые отличаются от стандартной структуры `/locale/path`. Это позволяет использовать такие URL, как `/about` для английской версии и `/a-propos` для французской, при этом внутренняя логика приложения остаётся канонической.

## Конфигурация

Пользовательские правила переписывания настраиваются в секции `routing` вашего файла `intlayer.config.ts` с помощью форматтеров, специфичных для фреймворка. Эти форматтеры предоставляют корректный синтаксис для выбранного роутера.

<Tabs group='routers'>
  <Tab label="Next.js" value="nextjs">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { nextjsRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // другие настройки...
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
      // ... // остальная конфигурация
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
      // прочее
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

### Доступные форматтеры

Intlayer предоставляет форматтеры для всех популярных фреймворков:

- `nextjsRewrite`: Для Next.js App Router. Поддерживает `[slug]`, `[...slug]` (1+), и `[[...slug]]` (0+).
- `svelteKitRewrite`: Для SvelteKit. Поддерживает `[slug]`, `[...path]` (0+), и `[[optional]]` (0-1).
- `reactRouterRewrite`: Для React Router. Поддерживает `:slug` и `*` (0+).
- `vueRouterRewrite`: Для Vue Router 4. Поддерживает `:slug`, `:slug?` (0-1), `:slug*` (0+), и `:slug+` (1+).
- `solidRouterRewrite`: Для Solid Router. Поддерживает `:slug` и `*slug` (0+).
- `tanstackRouterRewrite`: для TanStack Router. Поддерживает `$slug` и `*` (0+).
- `nuxtRewrite`: для Nuxt 3. Поддерживает `[slug]` и `[...slug]` (0+).
- `viteRewrite`: общий форматтер для любых проектов на базе Vite. Нормализует синтаксис для Vite proxy.

### Расширенные паттерны

Intlayer внутренне нормализует эти паттерны в единый синтаксис, позволяющий реализовывать продвинутые совпадения путей и их генерацию:

- **Необязательные сегменты**: `[[optional]]` (SvelteKit) или `:slug?` (Vue/React) поддерживаются.
- **Catch-all (ноль или более)**: `[[...slug]]` (Next.js), `[...path]` (SvelteKit/Nuxt) или `*` (React/TanStack) позволяют соответствовать нескольким сегментам.
- **Обязательный catch-all (один или более)**: `[...slug]` (Next.js) или `:slug+` (Vue) гарантируют присутствие как минимум одного сегмента.

## Коррекция URL на стороне клиента: `useRewriteURL`

Чтобы адресная строка браузера всегда отображала «красивый» локализованный URL, Intlayer предоставляет хук `useRewriteURL`. Этот хук незаметно обновляет URL с помощью `window.history.replaceState`, когда пользователь попадает на канонический путь.

### Использование в фреймворках

<Tabs group='framework'>
  <Tab label="Next.js" value="nextjs">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "next-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // Автоматически исправляет /fr/about на /fr/a-propos
      return <>{children}</>;
    };
    ```

  </Tab>

  <Tab label="React Router" value="reactrouter">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "react-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // Автоматически исправляет /fr/about на /fr/a-propos

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

## Интеграция с роутером и прокси

Серверные прокси Intlayer (Vite и Next.js) автоматически обрабатывают пользовательские правила перезаписи (custom rewrites) для обеспечения согласованности SEO.

1. **Внутренние перезаписи**: Когда пользователь посещает `/fr/a-propos`, прокси внутренне сопоставляет его с `/fr/about`, чтобы ваш фреймворк сопоставил правильный маршрут.
2. **Авторитетные редиректы**: Если пользователь вручную вводит `/fr/about`, прокси возвращает редирект 301/302 на `/fr/a-propos`, гарантируя, что поисковые системы индексируют только одну версию страницы.

### Интеграция с Next.js

Интеграция с Next.js полностью реализована через middleware `intlayerProxy`.

```typescript fileName="middleware.ts"
import { intlayerProxy } from "next-intlayer/middleware";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return intlayerProxy(request);
}
```

### Интеграция Vite

Для SolidJS, Vue и Svelte плагин Vite `intlayerProxy` управляет правилами переписывания (rewrites) во время разработки.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

## Ключевые возможности

### 1. Переписывания для нескольких контекстов

Каждый форматтер генерирует `RewriteObject`, содержащий специализированные правила для разных потребителей:

- `url`: Оптимизирован для генерации URL на стороне клиента (удаляет сегменты локали).
- `nextjs`: Сохраняет `[locale]` для middleware Next.js.
- `vite`: Сохраняет `:locale` для прокси Vite.

### 2. Автоматическая нормализация синтаксиса шаблонов

Intlayer внутренне нормализует все синтаксисы паттернов (например, преобразуя `[param]` в `:param`), чтобы сопоставление оставалось последовательным независимо от исходного фреймворка.

### 3. Авторитетные URL (SEO)

Принуждая к перенаправлениям с канонических путей на более «красивые» алиасы, Intlayer предотвращает проблемы с дублированным контентом и улучшает обнаруживаемость сайта.

## Основные утилиты

- `getLocalizedUrl(url, locale)`: Генерирует локализованный URL с учётом правил переписывания.
- `getCanonicalPath(path, locale)`: Преобразует локализованный URL обратно в его внутренний канонический путь.
- `getRewritePath(pathname, locale)`: Определяет, нужно ли скорректировать путь до более «красивого» локализованного алиаса.
