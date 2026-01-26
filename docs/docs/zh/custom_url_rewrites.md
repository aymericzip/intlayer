---
createdAt: 2024-08-13
updatedAt: 2026-01-26
title: 自定义 URL 重写
description: 了解如何在 Intlayer 中配置并使用自定义 URL 重写，以定义特定于 locale 的路径。
keywords:
  - 自定义 URL 重写
  - 路由
  - 国际化
  - i18n
slugs:
  - doc
  - concept
  - custom_url_rewrites
history:
  - version: 8.0.0
    date: 2026-01-25
    changes: 使用框架特定的格式化器实现集中式 URL 重写，并使用 useRewriteURL 钩子。
---

# 自定义 URL 重写的实现

Intlayer 支持自定义 URL 重写，允许你定义与标准 `/locale/path` 结构不同的特定 locale 路径。这样可以使英文使用 `/about`，法文使用 `/a-propos`，同时保持内部应用逻辑的 canonical。

## 配置

自定义重写在你的 `intlayer.config.ts` 文件的 `routing` 部分使用针对具体框架的格式化器（formatters）进行配置。 这些格式化器会为你所选的路由器提供正确的语法。

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
  <Tab label="TanStack 路由" value="tanstackrouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { tanstackRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // 等等
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
  <Tab label="Vue 路由" value="vuerouter">

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
  <Tab label="Solid 路由" value="solidrouter">

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

### 可用的格式化器

Intlayer 为所有流行框架提供格式化器：

- `nextjsRewrite`：用于 Next.js App Router。支持 `[slug]`、`[...slug]`（1+）和 `[[...slug]]`（0+）。
- `svelteKitRewrite`：用于 SvelteKit。支持 `[slug]`、`[...path]`（0+）和 `[[optional]]`（0-1）。
- `reactRouterRewrite`：用于 React Router。支持 `:slug` 和 `*`（0+）。
- `vueRouterRewrite`：用于 Vue Router 4。支持 `:slug`、`:slug?`（0-1）、`:slug*`（0+）和 `:slug+`（1+）。
- `solidRouterRewrite`：用于 Solid Router。支持 `:slug` 和 `*slug`（0+）。
  /// - `tanstackRouterRewrite`: For TanStack Router。支持 `$slug` 和 `*`（0+）。
  /// - `nuxtRewrite`: For Nuxt 3。支持 `[slug]` 和 `[...slug]`（0+）。
  /// - `viteRewrite`: Generic formatter for any Vite-based project。规范化用于 Vite 代理的语法。
  ///
  /// ### 高级模式
  ///
  /// Intlayer 在内部将这些模式规范化为统一语法，允许复杂的路径匹配与生成：
  ///
  /// - **可选段**：`[[optional]]`（SvelteKit）或 `:slug?`（Vue/React）受到支持。
  /// - **捕获全部（零个或多个）**：`[[...slug]]`（Next.js）、`[...path]`（SvelteKit/Nuxt）或 `*`（React/TanStack）允许匹配多个段。
  /// - **必须捕获（一个或多个）**：`[...slug]`（Next.js）或 `:slug+`（Vue）确保至少存在一个段。
  ///
  /// ## 客户端 URL 校正：`useRewriteURL`
  ///
  ///

为确保浏览器的地址栏始终反映“友好”的本地化 URL，Intlayer 提供了 `useRewriteURL` 钩子。该钩子在用户进入一个规范路径时，会静默地使用 `window.history.replaceState` 更新 URL。

### 在各框架中的用法

<Tabs group='framework'>
  <Tab label="Next.js" value="nextjs">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "next-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // 自动将 /fr/about 更正为 /fr/a-propos
      return <>{children}</>;
    };
    ```

  </Tab>

  <Tab label="React Router" value="reactrouter">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "react-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // 自动将 /fr/about 更正为 /fr/a-propos

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

## 路由集成与代理

Intlayer 的服务端代理（Vite 与 Next.js）会自动处理自定义重写规则，以确保 SEO 的一致性。

1. **内部重写**：当用户访问 `/fr/a-propos` 时，代理会在内部将其映射到 `/fr/about`，这样你的框架就能匹配正确的路由。
2. **权威重定向**：如果用户手动输入 `/fr/about`，代理会发出 301/302 重定向到 `/fr/a-propos`，确保搜索引擎只索引页面的单一版本。

### Next.js 集成

Next.js 集成通过 `intlayerProxy` 中间件完全处理。

```typescript fileName="middleware.ts"
import { intlayerProxy } from "next-intlayer/middleware";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return intlayerProxy(request);
}
```

### Vite 集成

对于 SolidJS、Vue 和 Svelte，`intlayerProxy` Vite 插件在开发期间管理重写。

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

## 主要功能

### 1. 多上下文重写

每个 formatter 会生成一个包含针对不同使用者的专用规则的 `RewriteObject`：

- `url`：针对客户端 URL 生成进行了优化（移除 locale 段）。
- `nextjs`：为 Next.js 中间件保留 `[locale]`。
- `vite`：为 Vite 代理保留 `:locale`。

### 2. 自动模式规范化

Intlayer 在内部规范化所有模式语法（例如，将 [param] 转换为 :param），以便匹配在不同源框架之间保持一致。

### 3. SEO 权威 URL

通过将规范路径重定向到更友好的别名，Intlayer 防止重复内容问题并提高站点的可发现性。

## 核心工具

- `getLocalizedUrl(url, locale)`: 根据重写规则生成本地化 URL。
- `getCanonicalPath(path, locale)`: 将本地化的 URL 解析回其内部规范路径。
- `getRewritePath(pathname, locale)`: 检测给定路径名是否需要被纠正为更友好的本地化别名。
