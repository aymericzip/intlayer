---
createdAt: 2025-03-25
updatedAt: 2026-03-25
title: Tanstack Start i18n - 如何在 2026 年使用 Solid.js 翻译 Tanstack Start 应用
description: 了解如何使用 Intlayer 和 Solid.js 为您的 Tanstack Start 应用程序添加国际化 (i18n)。按照此综合指南创建具有本地化感知路由的多语言应用。
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Tanstack Start
  - Solid
  - i18n
  - TypeScript
  - 语言路由
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-solid-template
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 8.5.1
    date: 2026-03-25
    changes: "针对 Tanstack Start Solid.js 添加"
---

# 使用 Intlayer 翻译您的 Tanstack Start + Solid.js 网站 | 国际化 (i18n)

## 目录

<TOC/>

本指南演示了如何集成 **Intlayer**，以便在包含 Solid.js 的 Tanstack Start 项目中实现无缝国际化、本地化感知路由、TypeScript 支持以及现代开发实践。

## 什么是 Intlayer？

**Intlayer** 是一个创新的、开源的国际化 (i18n) 库，旨在简化现代 Web 应用程序的多语言支持。

借助 Intlayer，您可以：

- 使用组件级的声明式字典**轻松管理翻译**。
- **动态本地化**元数据、路由和内容。
- 通过自动生成的类型声明**确保 TypeScript 支持**，从而增强自动补全和错误检测。
- **受益于高级功能**，如动态语言检测和切换。
- 通过 Tanstack Start 基于文件的路由系统，**启用本地化感知路由**。

---

## 在 Tanstack Start 应用中设置 Intlayer 的分步指南

<Tabs defaultTab="video">
  <Tab label="视频" value="video">
  
<iframe title="Tanstack Start 的最佳 i18n 解决方案？发现 Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="代码" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-solid-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="CodeSandbox 演示 - 如何使用 Intlayer 国际化您的应用程序"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

在 GitHub 上查看[应用模板](https://github.com/aymericzip/intlayer-tanstack-start-solid-template)。

### 第 1 步：创建项目

首先，按照 TanStack Start 网站上的[开始新项目](https://tanstack.com/start/latest/docs/framework/solid/quick-start)指南创建一个新的 TanStack Start 项目。

### 第 2 步：安装 Intlayer 包

使用您喜欢的包管理器安装必要的包：

```bash packageManager="npm"
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
bun x intlayer init
```

- **intlayer**

  核心包，提供用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、转译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)的国际化工具。

- **solid-intlayer**
  将 Intlayer 与 Solid 应用集成的包。它为 Solid 提供国际化的上下文提供者和钩子。

- **vite-intlayer**
  包含用于将 Intlayer 与 [Vite 构建工具](https://vite.dev/guide/why.html#why-bundle-for-production)集成的 Vite 插件，以及用于检测用户首选语言、管理 Cookie 和处理 URL 重定向的中间件。

### 第 3 步：项目配置

创建一个配置文件以配置应用程序的语言：

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

import { Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

> 通过此配置文件，您可以配置本地化 URL、中间件重定向、Cookie 名称、内容声明的位置和扩展名、禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 第 4 步：将 Intlayer 集成到您的 Vite 配置中

在您的配置中添加 intlayer 插件：

```typescript fileName="vite.config.ts"
import { intlayer } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import viteTsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
  ],
});
```

> `intlayer()` Vite 插件用于将 Intlayer 与 Vite 集成。它确保内容声明文件的构建，并在开发模式下监控它们。它在 Vite 应用中定义了 Intlayer 环境变量。此外，它还提供了减少性能开销的别名。

### 第 5 步：创建根布局 (Root Layout)

配置您的根布局以支持国际化，使用 `useMatches` 检测当前语言，并在 `html` 标签上设置 `lang` 和 `dir` 属性。

```tsx fileName="src/routes/__root.tsx"
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useMatches,
} from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
import { HydrationScript } from "solid-js/web";
import { Suspense } from "solid-js";
import { IntlayerProvider } from "solid-intlayer";
import { defaultLocale, getHTMLTextDir, type Locale } from "intlayer";

export const Route = createRootRouteWithContext()({
  shellComponent: RootComponent,
});

type Params = {
  locale: Locale;
};

function RootComponent() {
  const matches = useMatches();

  // 尝试在任何活动匹配的参数中查找语言
  // 这假设您在路由树中使用了动态段 "/{-$locale}"
  const locale =
    (
      matches().find((match) => match.routeId === "/{-$locale}/")
        ?.params as Params
    )?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <IntlayerProvider locale={locale}>
          <Suspense>
            <Outlet />
            <TanStackRouterDevtools />
          </Suspense>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
```

> [!NOTE]
> 在 Solid 中，`useMatches` 返回一个 **signal** (响应式访问器)。请使用 `matches()` (带括号) 来响应式地访问当前值。

### 第 6 步：创建语言布局 (可选)

创建一个处理语言前缀并执行验证的布局。此布局将确保仅处理有效的语言。

> 如果您不需要在路由级别验证语言前缀，此步骤是可选的。

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // 验证语言前缀
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
        replace: true,
      });
    }
  },
  component: Outlet,
});
```

> 此处的 `{-$locale}` 是一个动态路由参数，它会被当前语言替换。这种记法使该插槽变为可选，从而能够支持 `'prefix-no-default'` 等路由模式。

> 请注意，如果您在同一路由中使用了多个动态段 (如：`/{-$locale}/other-path/$anotherDynamicPath/...`)，此插槽可能会引起问题。
> 对于 `'prefix-all'` 模式，您可能更倾向于将插槽切换为 `$locale`。
> 对于 `'no-prefix'` 或 `'search-params'` 模式，您可以完全移除此插槽。

### 第 7 步：声明您的内容

创建并管理您的内容声明以存储翻译：

```tsx fileName="src/contents/page.content.ts"
import type { Dictionary } from "intlayer";

import { t } from "intlayer";

const appContent = {
  content: {
    links: {
      about: t({
        en: "About",
        es: "Acerca de",
        fr: "À propos",
      }),
      home: t({
        en: "Home",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      title: t({
        en: "Welcome to Intlayer + TanStack Router",
        es: "Bienvenido a Intlayer + TanStack Router",
        fr: "Bienvenue à Intlayer + TanStack Router",
      }),
      description: t({
        en: "This is an example of using Intlayer with TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> 只要您的内容声明位于 `contentDir` 目录 (默认为 `./app`) 中，就可以在应用程序的任何位置定义。并且它们应匹配内容声明文件扩展名 (默认为 `.content.{json,ts,tsx,js,jsx,mjs,cjs}`)。

> 有关更多详细信息，请参阅[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

### 第 8 步：利用语言感知的组件和钩子

为语言敏感的导航创建一个 `LocalizedLink` 组件：

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkProps } from "@tanstack/solid-router";
import { getPrefix } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { JSX } from "solid-js";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type RemoveLocaleParam<TVal> = TVal extends string
  ? RemoveLocaleFromString<TVal>
  : TVal;

export type To = RemoveLocaleParam<LinkProps["to"]>;

type CollapseDoubleSlashes<TString extends string> =
  TString extends `${infer THead}//${infer TTail}`
    ? CollapseDoubleSlashes<`${THead}/${TTail}`>
    : TString;

export type LocalizedLinkProps = Omit<LinkProps, "to"> & {
  to?: To;
} & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

type RemoveAll<
  TString extends string,
  TSub extends string,
> = TString extends `${infer THead}${TSub}${infer TTail}`
  ? RemoveAll<`${THead}${TTail}`, TSub>
  : TString;

type RemoveLocaleFromString<TString extends string> = CollapseDoubleSlashes<
  RemoveAll<TString, typeof LOCALE_ROUTE>
>;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { locale } = useLocale();

  return (
    <Link
      {...props}
      params={{
        locale: getPrefix(locale()).localePrefix,
        ...(typeof props.params === "object" ? props.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to ?? ""}` as LinkProps["to"]}
    />
  );
};
```

此组件有两个目的：

- 从 URL 中删除不必要的 `{-$locale}` 前缀。
- 在 URL 中注入语言参数，以确保用户直接重定向到本地化路由。

接着，我们可以为编程式导航创建一个 `useLocalizedNavigate` 钩子：

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/solid-router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: string) => {
    const localizedTo = getLocalizedUrl(to, locale());
    return navigate({ to: localizedTo });
  };

  return localizedNavigate;
};
```

### 第 9 步：在您的页面中使用 Intlayer

在您的整个应用程序中访问您的内容字典：

#### 本地化主页

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "@/components/LocalizedLink";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
});

function RouteComponent() {
  const content = useIntlayer("index-page");

  return (
    <main>
      <h1>{content().heroTitle}</h1>
      <p>{content().heroDesc}</p>
      <div>
        <LocalizedLink to="/">{content().navHome}</LocalizedLink>
        <LocalizedLink to="/about">{content().navAbout}</LocalizedLink>
      </div>
    </main>
  );
}
```

> [!NOTE]
> 在 Solid 中，`useIntlayer` 返回一个 **accessor** 函数 (例如：`content()`)。您必须调用该函数以访问响应式内容。
>
> 欲了解更多关于 `useIntlayer` 钩子的信息，请参考[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/solid-intlayer/useIntlayer.md)。

### 第 10 步：创建一个语言切换组件

创建一个允许用户更改语言的组件：

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/solid-router";
import { getLocaleName, getPathWithoutLocale, getPrefix } from "intlayer";
import { For } from "solid-js";
import { useIntlayer, useLocale } from "solid-intlayer";
import { LocalizedLink, type To } from "./LocalizedLink";

export const LocaleSwitcher = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = () => getPathWithoutLocale(location().pathname);

  return (
    <div class="flex flex-row gap-2">
      <For each={availableLocales}>
        {(localeEl) => (
          <LocalizedLink
            aria-current={localeEl === locale() ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale() as To}
          >
            {getLocaleName(localeEl)}
          </LocalizedLink>
        )}
      </For>
    </div>
  );
};

export default LocaleSwitcher;
```

> [!NOTE]
> 在 Solid 中，来自 `useLocale` 的 `locale` 是一个 **signal accessor**。请使用 `locale()` (带括号) 来响应式地读取其当前值。
>
> 欲了解更多关于 `useLocale` 钩子的信息，请参考[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/solid-intlayer/useLocale.md)。

### 第 11 步：管理 HTML 属性

正如第 5 步所示，您可以在根组件中使用 `useMatches` 来管理 `html` 标签的 `lang` 和 `dir` 属性。这确保了在服务器端和客户端都设置了正确的属性。

```tsx fileName="src/routes/__root.tsx"
const RootComponent: ParentComponent = (props) => {
  const matches = useMatches();

  // 尝试在任何活动匹配的参数中查找语言
  const locale =
    (
      matches().find((match) => match.routeId === "/{-$locale}/")
        ?.params as Params
    )?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
};
```

---

### 第 12 步：添加中间件 (可选)

您还可以使用 `intlayerProxy` 为您的应用程序添加服务器端路由。此插件将根据 URL 自动检测当前语言并设置适当的语言 Cookie。如果没有指定语言，插件将根据用户的浏览器语言偏好确定最合适的语言。如果未检测到语言，它将重定向到默认语言。

> 请注意，要在生产环境中使用 `intlayerProxy`，您需要将 `vite-intlayer` 包从 `devDependencies` 切换到 `dependencies`。

```typescript {7,14-17} fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solid from "vite-plugin-solid";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    intlayerProxy(), // 如果您使用 Nitro，Proxy 应放置在服务器之前
    nitro(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solid(),
  ],
});
```

---

### 第 13 步：国际化您的元数据 (可选)

您还可以在 `head` 加载器中使用 `getIntlayer` 函数访问您的内容字典，以实现语言感知的元数据：

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import { getIntlayer } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("page-metadata", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.description, name: "description" },
      ],
    };
  },
});
```

---

### 第 14 步：在服务器操作中获取语言 (可选)

您可能希望从服务器操作 (server actions) 或 API 端点中访问当前语言。
您可以使用 `intlayer` 提供的 `getLocale` 助手函数来实现这一点。

以下是一个使用 TanStack Start 服务器函数的示例：

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/solid-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/solid-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // 从请求中获取 Cookie (默认: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // 从请求中获取标头 (默认: 'x-intlayer-locale')
    // 使用 Accept-Language 协商作为备选方案
    getHeader: (name) => getRequestHeader(name),
  });

  // 使用 getIntlayer() 检索内容
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

### 第 15 步：管理“未找到”页面 (可选)

当用户访问不存在的页面时，您可以显示自定义的 404 页面，而语言前缀可能会影响 404 页面的触发方式。

#### 理解带有语言前缀的 TanStack Router 404 处理

在 TanStack Router 中，使用本地化路由处理 404 页面需要一种分层的方法：

1. **专用 404 路由**：用于显示 404 UI 的特定路由。
2. **路由级验证**：验证语言前缀并将无效前缀重定向到 404。
3. **Catch-all 路由**：捕获语言段内任何不匹配的路径。

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/solid-router";

// 这创建了一个专用的 /[locale]/404 路由
// 它既可以作为直接路由使用，也可以作为组件导入到其他文件中
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// 单独导出以便在 notFoundComponent 和 catch-all 路由中重用
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad 在路由渲染之前执行 (包括服务器端和客户端)
  // 这是验证语言前缀的理想场所
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix 根据您的 intlayer 配置检查语言是否有效
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // 语言前缀无效 - 使用有效的语言前缀重定向到 404 页面
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // 当子路由不存在时调用 notFoundComponent
  // 例如：/en/non-existent-page 会在 /en 布局中触发此组件
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/solid-router";

import { NotFoundComponent } from "./404";

// $ (splat/catch-all) 路由匹配任何与其他路由不匹配的路径
// 例如：/en/some/deeply/nested/invalid/path
// 这确保了语言内所有不匹配的路径都能显示 404 页面
// 如果没有这个，深层不匹配路径可能会显示空白页面或错误
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

### (可选) 第 16 步：提取组件中的内容

如果您拥有现有的代码库，转换数千个文件可能会非常耗时。

为了简化这一过程，Intlayer 建议使用[编译器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) / [提取器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md)来转换您的组件并提取内容。

要设置它，您可以在 `intlayer.config.ts` 文件中添加一个 `compiler` 部分：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 其余配置
  compiler: {
    /**
     * 指示是否启用编译器。
     */
    enabled: true,

    /**
     * 定义输出文件路径
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 指示转换后是否应保存组件。
     *
     * - 如果为 `true`，编译器将重写磁盘上的组件文件。因此，转换将是永久性的，且编译器在下次运行时将跳过该转换。这样，编译器转换应用后便可以将其删除。
     *
     * - 如果为 `false`，编译器仅在构建输出代码中注入 `useIntlayer()` 函数调用，而保持基础代码库完好无损。转换仅在内存中进行。
     */
    saveComponents: false,

    /**
     * 字典键前缀
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 其余配置
  compiler: {
    /**
     * 指示是否启用编译器。
     */
    enabled: true,

    /**
     * 定义输出文件路径
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 指示转换后是否应保存组件。
     *
     * - 如果为 `true`，编译器将重写磁盘上的组件文件。因此，转换将是永久性的，且编译器在下次运行时将跳过该转换。这样，编译器转换应用后便可以将其删除。
     *
     * - 如果为 `false`，编译器仅在构建输出代码中注入 `useIntlayer()` 函数调用，而保持基础代码库完好无损。转换仅在内存中进行。
     */
    saveComponents: false,

    /**
     * 字典键前缀
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 其余配置
  compiler: {
    /**
     * 指示是否启用编译器。
     */
    enabled: true,

    /**
     * 定义输出文件路径
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 指示转换后是否应保存组件。
     *
     * - 如果为 `true`，编译器将重写磁盘上的组件文件。因此，转换将是永久性的，且编译器在下次运行时将跳过该转换。这样，编译器转换应用后便可以将其删除。
     *
     * - 如果为 `false`，编译器仅在构建输出代码中注入 `useIntlayer()` 函数调用，而保持基础代码库完好无损。转换仅在内存中进行。
     */
    saveComponents: false,

    /**
     * 字典键前缀
     */
    dictionaryKeyPrefix: "",
  },
};

module.exports = config;
```

<Tabs>
 <Tab value='提取命令'>

运行提取器以转换您的组件并提取内容

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Babel 编译器'>

更新您的 `vite.config.ts` 以包含 `intlayerCompiler` 插件：

```ts fileName="vite.config.ts"
import { intlayer, intlayerCompiler } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import viteTsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
    intlayerCompiler(),
  ],
});
```

```bash packageManager="npm"
npm run build # 或 npm run dev
```

```bash packageManager="pnpm"
pnpm run build # 或 pnpm run dev
```

```bash packageManager="yarn"
yarn build # 或 yarn dev
```

```bash packageManager="bun"
bun run build # 或 bun run dev
```

 </Tab>
</Tabs>

---

### 第 17 步：配置 TypeScript (可选)

Intlayer 使用模块扩充 (module augmentation) 来利用 TypeScript 的优势，并使您的代码库更加健壮。

确保您的 TypeScript 配置包含自动生成的类型声明：

```json5 fileName="tsconfig.json"
{
  // ... 您的现有配置
  include: [
    // ... 您的现有包含项
    ".intlayer/**/*.ts", // 包含自动生成的类型声明
  ],
}
```

---

### Git 配置

建议忽略 Intlayer 生成的文件。这可以避免将它们提交到您的 Git 仓库。

为此，您可以在 `.gitignore` 文件中添加以下指令：

```plaintext fileName=".gitignore"
# 忽略由 Intlayer 生成的文件
.intlayer
```

---

## VS Code 扩展

为了提升 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

此扩展提供：

- 翻译键的**自动补全**。
- 缺失翻译的**实时错误检测**。
- 翻译内容的**内联预览**。
- 用于轻松创建和更新翻译的**快速操作**。

有关如何使用该扩展的更多详细信息，请参阅 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

---

## 深入探索

如需深入了解，您可以实现[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)或使用 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 外置您的内容。

---

## 参考文献

- [Intlayer 文档](https://intlayer.org)
- [Tanstack Start 文档](https://tanstack.com/start/latest)
- [useIntlayer 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/solid-intlayer/useIntlayer.md)
- [useLocale 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/solid-intlayer/useLocale.md)
- [内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)
- [配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)
