---
createdAt: 2024-08-13
updatedAt: 2026-01-26
title: Користувацькі правила переписування URL
description: Дізнайтеся, як налаштувати та використовувати користувацькі правила переписування URL в Intlayer для визначення шляхів, специфічних для локалі.
keywords:
  - Користувацькі переписування URL
  - Маршрутизація
  - Інтернаціоналізація
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

# Реалізація користувацьких правил переписування URL

Intlayer підтримує користувацькі правила переписування URL, що дозволяють визначати локалезовані шляхи, які відрізняються від стандартної структури `/locale/path`. Це дає змогу використовувати такі URL, як `/about` для англійської та `/a-propos` для французької, водночас зберігаючи канонічну внутрішню логіку застосунку.

## Конфігурація

Користувацькі перенаписування налаштовуються в розділі `routing` файлу `intlayer.config.ts` з використанням форматерів, специфічних для фреймворку. Ці форматери забезпечують правильний синтаксис для вашого обраного роутера.

<Tabs group='routers'>
  <Tab label="Next.js" value="nextjs">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { nextjsRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ... (інші налаштування)
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
  <Tab label="TanStack Роутер" value="tanstackrouter">

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
  <Tab label="Vue Роутер" value="vuerouter">

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

### Доступні форматери

Intlayer надає форматери для всіх популярних фреймворків:

- `nextjsRewrite`: Для Next.js App Router. Підтримує `[slug]`, `[...slug]` (1+), та `[[...slug]]` (0+).
- `svelteKitRewrite`: Для SvelteKit. Підтримує `[slug]`, `[...path]` (0+), та `[[optional]]` (0-1).
- `reactRouterRewrite`: Для React Router. Підтримує `:slug` та `*` (0+).
- `vueRouterRewrite`: Для Vue Router 4. Підтримує `:slug`, `:slug?` (0-1), `:slug*` (0+), та `:slug+` (1+).
- `solidRouterRewrite`: Для Solid Router. Підтримує `:slug` та `*slug` (0+).
- `tanstackRouterRewrite`: Для TanStack Router. Підтримує `$slug` та `*` (0+).
- `nuxtRewrite`: Для Nuxt 3. Підтримує `[slug]` та `[...slug]` (0+).
- `viteRewrite`: Універсальний форматер для будь-якого проєкту на базі Vite. Нормалізує синтаксис для Vite proxy.

### Розширені шаблони

Intlayer внутрішньо нормалізує ці шаблони до уніфікованого синтаксису, що дозволяє здійснювати складне зіставлення й генерацію шляхів:

- **Необов'язкові сегменти**: `[[optional]]` (SvelteKit) або `:slug?` (Vue/React) підтримуються.
- **Catch-all (нуль або більше)**: `[[...slug]]` (Next.js), `[...path]` (SvelteKit/Nuxt), або `*` (React/TanStack) дозволяють відповідати кільком сегментам.
- **Обов'язковий catch-all (один або більше)**: `[...slug]` (Next.js) або `:slug+` (Vue) забезпечують наявність принаймні одного сегмента.

## Корекція URL на стороні клієнта: `useRewriteURL`

Щоб адресний рядок браузера завжди відображав "pretty" локалізований URL, Intlayer надає хук `useRewriteURL`. Цей хук непомітно оновлює URL за допомогою `window.history.replaceState`, коли користувач потрапляє на канонічний шлях.

### Використання у фреймворках

<Tabs group='framework'>
  <Tab label="Next.js" value="nextjs">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "next-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // Автоматично виправляє /fr/about на /fr/a-propos
      return <>{children}</>;
    };
    ```

  </Tab>

  <Tab label="React Router" value="reactrouter">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "react-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // Автоматично виправляє /fr/about на /fr/a-propos

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

## Інтеграція маршрутизатора та проксі

Серверні проксі Intlayer (Vite і Next.js) автоматично обробляють кастомні переписування, щоб забезпечити узгодженість для SEO.

1. **Внутрішні переписування**: Коли користувач заходить на `/fr/a-propos`, проксі внутрішньо відображає це на `/fr/about`, щоб ваш фреймворк відповідав правильному маршруту.
2. **Авторитетні редиректи**: Якщо користувач вручну вводить `/fr/about`, проксі відправляє 301/302 редирект на `/fr/a-propos`, гарантуючи, що пошукові системи індексують лише одну версію сторінки.

### Інтеграція з Next.js

Інтеграція з Next.js повністю здійснюється через middleware `intlayerProxy`.

```typescript fileName="middleware.ts"
import { intlayerProxy } from "next-intlayer/middleware";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return intlayerProxy(request);
}
```

### Інтеграція з Vite

Для SolidJS, Vue та Svelte Vite-плагін `intlayerProxy` керує перезаписами під час розробки.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

## Ключові можливості

### 1. Багатоконтекстні перезаписи

Кожен форматер генерує `RewriteObject`, що містить спеціалізовані правила для різних споживачів:

- `url`: Оптимізовано для генерації URL на боці клієнта (видаляє сегменти локалі).
- `nextjs`: Зберігає `[locale]` для middleware Next.js.
- `vite`: Зберігає `:locale` для проксі Vite.

### 2. Автоматична нормалізація шаблонів

Intlayer внутрішньо нормалізує всі синтаксиси шаблонів (наприклад, перетворює `[param]` на `:param`), щоб зіставлення залишалося послідовним незалежно від вихідного фреймворку.

### 3. SEO авторитетні URL-адреси

Забезпечуючи перенаправлення з канонічних шляхів на більш привабливі аліаси, Intlayer запобігає проблемам дубльованого контенту та покращує знаходжуваність сайту.

## Основні утиліти

- `getLocalizedUrl(url, locale)`: Генерує локалізований URL з урахуванням правил перезапису.
- `getCanonicalPath(path, locale)`: Відновлює локалізований URL до його внутрішнього канонічного шляху.
- `getRewritePath(pathname, locale)`: Визначає, чи потрібно виправити шлях (pathname) до його більш привабливого локалізованого аліаса.
