---
createdAt: 2025-09-09
updatedAt: 2026-06-23
title: "TanStack Start i18n - 翻译你的应用的完整指南"
description: "告别 i18next。2026 年构建多语言 (i18n) TanStack Start 应用的完整指南。使用 AI 代理翻译并优化包体积、SEO 和性能。"
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Tanstack Start
  - React
  - i18n
  - TypeScript
  - 区域路由
  - Sitemap
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
applicationShowcase: https://intlayer-tanstack-start-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "更新 Solid useIntlayer API 用法以直接访问属性"
  - version: 7.5.9
    date: 2025-12-30
    changes: "添加 init 命令"
  - version: 7.4.0
    date: 2025-12-11
    changes: "引入 validatePrefix 并添加步骤 14: 处理带有本地化路由的 404 页面。"
  - version: 7.3.9
    date: 2025-12-05
    changes: "添加步骤 13: 在您的 server actions 中获取 locale (可选)"
  - version: 7.2.3
    date: 2025-11-18
    changes: "添加步骤 13: 适配 Nitro"
  - version: 7.1.0
    date: 2025-11-17
    changes: "通过添加 getPrefix 函数修复 useLocalizedNavigate、LocaleSwitcher 和 LocalizedLink 的前缀默认值。"
  - version: 6.5.2
    date: 2025-10-03
    changes: "更新文档"
  - version: 5.8.1
    date: 2025-09-09
    changes: "为 Tanstack Start 添加支持"
author: aymericzip
---

# 使用Intlayer翻译您的Tanstack Start | 国际化(i18n)

## 目录

<TOC/>

本指南演示如何在 Tanstack Start 项目中集成 **Intlayer**，实现无缝国际化，支持基于区域设置的路由、TypeScript 支持以及现代开发实践。

## 为什么选择 Inlayer 而不是替代品？

与“react-i18next”或“use-intl”或“paraglide”等主要解决方案相比，Intlayer是一个具有集成优化的解决方案，例如：

**完整的 TanStack Start 覆盖**

Intlayer 针对 TanStack Start 进行了全面优化，提供**多语言路由**、**cookie 管理**、**站点地图生成**、**动态内容加载**以及扩展国际化 (i18n) 工作所需的所有功能。

**捆绑尺寸**

不要将大量 JSON 文件加载到页面中，而只需加载必要的内容。 Intlayer 有助于**将捆绑包和页面大小减少多达 50%**。

**可维护性**

确定应用程序内容的范围**有利于大型应用程序的维护**。您可以复制或删除单个功能文件夹，而无需承担检查整个内容代码库的精神负担。此外，Intlayer 具有**完全类型化 (fully typed)**，以确保您的内容的准确性。

**人工智能代理**

共置内容**减少大型语言模型 (LLM) 所需的上下文**。 Intlayer 还附带了一套工具，例如用于测试缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 和 **[agent技能](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**，使 AI 代理的开发者体验 (DX) 更加流畅。

**自动化**

使用您选择的法学硕士，通过自动化在 CI/CD 管道中进行翻译，而费用由您的 AI 提供商承担。 Intlayer 还提供了一个**编译器**来自动提取内容，以及一个[网络平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)来帮助**在后台翻译**。

**表现**

将大量 JSON 文件连接到组件可能会导致性能和反应性问题。 Intlayer 可在构建时 (build time)优化您的内容加载。

**无需开发即可扩展**

Intlayer 不仅仅是一个 i18n 解决方案，还提供了一个**自托管的[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)**和一个**[完整的 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** 来帮助您管理多语言内容**实时**，与译员、文案人员和其他团队成员无缝协作。内容可以本地和/或远程存储。

---

## 在 Tanstack Start 应用程序中设置 Intlayer 的分步指南

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="The best i18n solution for Tanstack Start? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-tanstack-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-tanstack-start-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-tanstack-start-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

在 GitHub 上查看 [应用程序模板](https://github.com/aymericzip/intlayer-tanstack-start-template)。

<Steps>

<Step number={1} title="创建项目">

首先，按照 TanStack Start 网站上的 [开始新项目](https://tanstack.com/start/latest/docs/framework/react/quick-start) 指南创建一个新的 TanStack Start 项目。

</Step>

<Step number={2} title="安装 Intlayer 包">

使用您首选的包管理器安装必要的包：

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> `--interactive` 标志是可选的。如果您是 AI 代理，请使用 `intlayer-cli init`。

> 此命令将检测您的环境并安装所需的包。例如：

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  核心包，为配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、转译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md) 提供国际化工具。

- **react-intlayer**
  将 Intlayer 与 React 应用程序集成的包。为 React 国际化提供上下文提供程序和 hooks。

- **vite-intlayer**
  包含用于将 Intlayer 与 [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production) 集成的 Vite 插件，以及用于检测用户首选语言、管理 cookies 和处理 URL 重定向的 middleware。

</Step>

<Step number={3} title="配置您的项目">

创建一个配置文件来配置您应用程序的语言：

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

> 通过此配置文件，您可以设置本地化 URL、middleware 重定向、cookie 名称、内容声明的位置和扩展名、禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参考 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

</Step>

<Step number={4} title="在 Vite 配置中集成 Intlayer">

将 intlayer 插件添加到您的配置中：

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config = defineConfig({
  plugins: [
    nitro(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    viteReact(),
  ],
});

export default config;
```

> `intlayer()` Vite 插件用于将 Intlayer 与 Vite 集成。它确保构建内容声明文件并在开发模式下监视它们。它在 Vite 应用程序中定义 Intlayer 环境变量。此外，它提供别名来优化性能。

</Step>

<Step number={5} title="创建根布局">

配置您的根布局以支持国际化，使用 `useParams` 检测当前语言，并在 `html` 标签上设置 `lang` 和 `dir` 属性。

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { type ReactNode } from "react";
import { IntlayerProvider } from "react-intlayer";
import { Route as LocaleRoute } from "./{-$locale}/route";

export const Route = createRootRouteWithContext<{}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const params = LocaleRoute.useParams();
  const locale = params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
```

</Step>

<Step number={6} title="创建语言布局">

创建一个处理语言前缀并执行验证的布局。

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
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
      });
    }
  },
  component: Outlet,
});
```

> 在这里，`{-$locale}` 是一个动态路由参数，被替换为当前语言。这种符号使该插槽可选，允许它与路由模式（如 `'prefix-no-default'` 等）一起工作。

> 请注意，如果您在同一路由中使用多个动态段（例如 `/{-$locale}/other-path/$anotherDynamicPath/...`），此插槽可能会导致问题。
> 对于 `'prefix-all'` 模式，您可能更喜欢将插槽切换为 `$locale`。
> 对于 `'no-prefix'` 或 `'search-params'` 模式，您可以完全移除该插槽。

</Step>

<Step number={7} title="声明您的内容">

创建和管理您的内容声明以存储翻译：

```tsx fileName="src/contents/page.content.ts"
import type { Dictionary } from "intlayer";

import { t } from "intlayer";

const appContent = {
  content: {
    links: {
      about: t({
        zh: "关于",
        en: "About",
        es: "Acerca de",
        fr: "À propos",
      }),
      home: t({
        zh: "首页",
        en: "Home",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      title: t({
        zh: "欢迎使用 Intlayer + TanStack Router",
        en: "Welcome to Intlayer + TanStack Router",
        es: "Bienvenido a Intlayer + TanStack Router",
        fr: "Bienvenue à Intlayer + TanStack Router",
      }),
      description: t({
        zh: "这是使用 Intlayer 与 TanStack Router 的示例",
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

> 您的内容声明可以在应用程序中的任何位置定义，只要它们包含在 `contentDir` 目录中（默认为 `./app`）。并匹配内容声明文件扩展名（默认为 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）。

> 有关更多详情，请参考 [内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

</Step>

<Step number={7} title="创建语言感知组件和 Hooks">

为语言感知导航创建一个 `LocalizedLink` 组件：

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type To = StripLocalePrefix<LinkComponentProps["to"]>;

export type StripLocalePrefix<T extends string | undefined> = T extends
  `/${typeof LOCALE_ROUTE}/` | `/${typeof LOCALE_ROUTE}`
  ? "/"
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : T;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

export const LocalizedLink: FC<LocalizedLinkProps> = (props) => {
  const { locale } = useLocale();
  const { localePrefix } = getPrefix(locale);

  return (
    <Link
      {...props}
      params={{
        locale: localePrefix,
        ...(typeof props?.params === "object" ? props?.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to}` as LinkComponentProps["to"]}
    />
  );
};
```

此组件有两个目标：

- 从 URL 中删除不必要的 `{-$locale}` 前缀。
- 将语言参数注入到 URL 中，以确保用户直接重定向到本地化路由。

然后我们可以创建一个 `useLocalizedNavigate` hook 来进行编程导航：

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/react-router";
import { getPrefix } from "intlayer";
import { useLocale } from "react-intlayer";
import type { StripLocalePrefix } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

type NavigateFn = ReturnType<typeof useNavigate>;
type BaseNavigateOptions = Parameters<NavigateFn>[0];

type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

export type LocalizedNavigateOptions = Omit<
  BaseNavigateOptions,
  "to" | "params"
> & {
  to: LocalizedTo;
  params?: Omit<NonNullable<BaseNavigateOptions["params"]>, "locale">;
};

type LocalizedNavigate = (
  options: LocalizedNavigateOptions
) => ReturnType<NavigateFn>;

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();

  const { locale } = useLocale();

  const localizedNavigate: LocalizedNavigate = (args: any) => {
    const { localePrefix } = getPrefix(locale);

    if (typeof args === "string") {
      return navigate({
        to: `/${LOCALE_ROUTE}${args}`,
        params: { locale: localePrefix },
      });
    }

    const { to, ...rest } = args;

    const localizedTo = `/${LOCALE_ROUTE}${to}` as any;

    return navigate({
      to: localizedTo,
      params: { locale: localePrefix, ...rest } as any,
    });
  };

  return localizedNavigate;
};
```

</Step>

<Step number={8} title="在您的页面中使用 Intlayer">

在整个应用程序中访问您的内容字典：

#### 本地化首页

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer, defaultLocale } from "intlayer";
import { useIntlayer } from "react-intlayer";

import LocaleSwitcher from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { useLocalizedNavigate } from "@/hooks/useLocalizedNavigate";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
});

function RouteComponent() {
  const content = useIntlayer("app");
  const navigate = useLocalizedNavigate();

  return (
    <div>
      <div>
        {content.title}
        <LocaleSwitcher />
        <div>
          <LocalizedLink to="/">{content.links.home}</LocalizedLink>
          <LocalizedLink to="/about">{content.links.about}</LocalizedLink>
        </div>
        <div>
          <button onClick={() => navigate({ to: "/" })}>
            {content.links.home}
          </button>
          <button onClick={() => navigate({ to: "/about" })}>
            {content.links.about}
          </button>
        </div>
      </div>
    </div>
  );
}
```

> 如果你想在 `string` 属性中使用你的内容，例如 `alt`、`title`、`href`、`aria-label` 等，你可以使用函数的值，如：
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> 要了解更多关于 `useIntlayer` hook 的信息，请参考[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useIntlayer.md)。

</Step>

<Step number={9} title="创建语言切换器组件">

创建一个组件来允许用户改变语言：

```tsx fileName="src/components/locale-switcher.tsx"
import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
  getPrefix,
  Locales,
} from "intlayer";
import type { FC } from "react";
import { useLocale } from "react-intlayer";

import { LocalizedLink, type To } from "./localized-link";

export const LocaleSwitcher: FC = () => {
  const { pathname } = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <LocalizedLink
            aria-current={localeEl === locale ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale as To}
          >
            <span>
              {/* 区域设置 - 例如 FR */}
              {localeEl}
            </span>
            <span>
              {/* 该语言用其自身区域设置表示 - 例如 Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* 该语言用当前区域设置表示 - 例如当前区域设置为 Locales.SPANISH 时的 Francés */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 该语言用英文表示 - 例如 French */}
              {getLocaleName(localeEl, Locales.ENGLISH)}
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ol>
  );
};
```

> 要了解更多关于 `useLocale` hook 的信息，请参考[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useLocale.md)。

</Step>

<Step number={10} title="HTML 属性管理">

如第 5 步所示，你可以在根组件中使用 `useParams` 来管理 `html` 标签的 `lang` 和 `dir` 属性。这确保在服务器和客户端上都设置了正确的属性。

```tsx fileName="src/routes/__root.tsx"
function RootDocument({ children }: { children: ReactNode }) {
  const params = LocaleRoute.useParams();
  const locale = params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
}
```

---

</Step>

<Step number={11} title="添加中间件">

你也可以使用 `intlayerProxy` 为你的应用程序添加服务器端路由。这个插件将自动基于 URL 检测当前的语言区域并设置适当的语言区域 cookie。如果没有指定区域设置，该插件将根据用户的浏览器语言首选项确定最合适的区域设置。如果没有检测到区域设置，它将重定向到默认的区域设置。

> 请注意，要在生产环境中使用 `intlayerProxy`，你需要将 `vite-intlayer` package 从 `devDependencies` 切换到 `dependencies`。

> 自 Intlayer v9 起，`intlayerProxy()` 直接捆绑到 `intlayer()` 插件中，并通过 `routing.enableProxy` 选项默认启用（默认为 `true`）。如下所示单独注册现在是可选的 — 它保留用于向后兼容性和需要控制插件顺序的设置。设置 `routing.enableProxy: false` 以退出。请参阅 [v9 发布说明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/releases/v9.md)。

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    nitro(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    viteReact(),
  ],
});
```

---

</Step>

<Step number={12} title="国际化你的元数据">

你也可以使用 `getIntlayer` hook 在整个应用程序中访问你的内容字典：

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const path = "/"; // 此路由的路径

    const metaContent = getIntlayer("app", locale);

    return {
      links: [
        // 规范链接：指向当前本地化页面
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang：告诉 Google 所有本地化版本
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default：用于不匹配语言的用户
        // 定义默认后备区域设置（通常是你的主要语言）
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

---

</Step>

<Step number={13} title="在服务器操作中检索区域设置">

你可能想要从服务器操作或 API 端点内访问当前的区域设置。
你可以使用来自 `intlayer` 的 `getLocale` helper。

以下是使用 TanStack Start 的服务器函数的示例：

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/react-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // 从请求中获取 cookie（默认：'INTLAYER_LOCALE'）
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // 从请求中获取 header（默认：'x-intlayer-locale'）
    // 使用 Accept-Language 协商进行回退
    getHeader: (name) => getRequestHeader(name),
  });

  // 使用 getIntlayer() 检索一些内容
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

</Step>

<Step number={14} title="管理未找到页面">

当用户访问不存在的页面时，你可以显示自定义的未找到页面，语言区域前缀可能会影响未找到页面的触发方式。

#### 理解 TanStack Router 的 404 处理与 Locale 前缀

在 TanStack Router 中，处理带本地化路由的 404 页面需要采用多层方法：

1. **专用 404 路由**：用于显示 404 UI 的特定路由
2. **路由级验证**：验证 locale 前缀并将无效的前缀重定向到 404
3. **捕获所有路由**：捕获 locale 段内任何不匹配的路径

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/react-router";

// 这创建了一个专用的 /[locale]/404 路由
// 它既可以作为直接路由使用，也可以作为组件导入到其他文件中
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// 单独导出以便在 notFoundComponent 和捕获所有路由中重复使用
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad 在路由渲染前运行（在服务器和客户端上）
  // 这是验证 locale 前缀的理想位置
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix 检查 locale 是否根据你的 intlayer 配置有效
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // 无效的 locale 前缀 - 重定向到 404 页面并使用有效的 locale 前缀
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent 在子路由不存在时调用
  // 例如：/en/non-existent-page 在 /en 布局内触发此方法
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/react-router";

import { NotFoundComponent } from "./404";

// $ (splat/catch-all) 路由匹配任何不匹配其他路由的路径
// 例如：/en/some/deeply/nested/invalid/path
// 这确保 locale 内所有不匹配的路径都显示 404 页面
// 没有这个，不匹配的深层路径可能显示空白页面或错误
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

</Step>

<Step number={15} title="提取组件内容" isOptional={true}>

如果你有现有的 codebase，转换数千个文件可能会很耗时。

为了简化此过程，Intlayer 提供了一个 [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md) 来转换你的组件并提取内容。

要设置它，你可以在 `intlayer.config.ts` 文件中添加 `compiler` 部分：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 配置的其余部分
  compiler: {
    /**
     * 表示编译器是否应启用。
     */
    enabled: true,

    /**
     * 定义输出文件路径
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 表示转换后是否应保存组件。
     *
     * - 如果为 `true`，编译器将在磁盘中重写组件文件。因此转换将是永久的，编译器将在下一个过程中跳过转换。这样，编译器可以转换应用程序，然后可以将其删除。
     *
     * - 如果为 `false`，编译器将仅在构建输出中注入 `useIntlayer()` 函数调用，并保持 base codebase 完整。转换将仅在内存中完成。
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

<Tabs>
 <Tab value='Extract command'>

运行提取器以转换组件并提取内容

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
 <Tab value='Babel compiler'>

> 从 v9 起，`intlayerCompiler` 包含在 `intlayer` 插件中。所以你不需要手动添加它。

更新你的 `vite.config.ts` 以包含 `intlayerCompiler` 插件：

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // 添加编译器插件
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

</Step>

<Step number={16} title="预渲染 & 生成 Sitemap">

Intlayer 配备了内置的 sitemap 生成器，可以帮助你轻松为应用程序创建 sitemap。它处理本地化路由并为搜索引擎添加必要的元数据。

> Intlayer 生成的 sitemap 支持 `xhtml:link` 命名空间（Hreflang XML 扩展）。与仅列出原始 URL 的默认 sitemap 生成器不同，Intlayer 自动在页面的所有语言版本之间创建所需的双向链接（例如，`/about`、`/about?lang=fr` 和 `/about?lang=es`）。这确保搜索引擎正确索引并向正确的受众提供正确的语言版本。

要使用它，你首先需要配置你的 `vite.config.ts` 以为本地化路由启用预渲染并禁用默认的 TanStack Start sitemap 生成。

```typescript fileName="vite.config.ts"
import { localeFlatMap } from "intlayer";
// ... 其他导入

export const pathList = ["", "/about", "/404"];

const localizedPages = localeFlatMap(({ urlPrefix }) =>
  pathList.map((path) => ({
    path: `${urlPrefix}${path}`,
    prerender: {
      enabled: true,
    },
  }))
);

export default defineConfig({
  plugins: [
    // ... 其他插件
    tanstackStart({
      // ... 其他配置
      sitemap: {
        enabled: false,
      },
      prerender: {
        enabled: true,
        crawlLinks: false,
        concurrency: 10,
      },
      pages: localizedPages,
    }),
  ],
});
```

然后，创建一个 `src/routes/sitemap[.]xml.ts` 路由，使用 `generateSitemap` 函数：

```typescript fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { generateSitemap } from "intlayer";

const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const sitemap = generateSitemap(
          [
            { path: "/", changefreq: "daily", priority: 1.0 },
            { path: "/about", changefreq: "monthly", priority: 0.8 },
          ],
          { siteUrl: SITE_URL }
        );

        return new Response(sitemap, {
          headers: { "Content-Type": "application/xml" },
        });
      },
    },
  },
});
```

---

</Step>

<Step number={17} title="配置 TypeScript">

Intlayer 使用模块扩展以获得 TypeScript 的好处并使你的 codebase 更强大。

确保你的 TypeScript 配置包含自动生成的类型：

```json5 fileName="tsconfig.json"
{
  // ... 你现有的配置
  include: [
    // ... 你现有的 includes
    ".intlayer/**/*.ts", // 包含自动生成的类型
  ],
}
```

---

</Step>

</Steps>

### Git 配置

建议忽略 Intlayer 生成的文件。这样可以避免将它们提交到您的 Git 仓库中。

要做到这一点，您可以将以下指令添加到您的 `.gitignore` 文件中：

```plaintext fileName=".gitignore"
# 忽略 Intlayer 生成的文件
.intlayer
```

---

## VS Code 扩展

为了提升您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

该扩展提供：

- 翻译键的**自动补全**。
- 缺失翻译的**实时错误检测**。
- 翻译内容的**内联预览**。
- 轻松创建和更新翻译的**快速操作**。

有关如何使用该扩展的更多详细信息，请参阅[Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

---

## 深入探索

要进一步使用，您可以实现[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)或使用[内容管理系统（CMS）](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)将内容外部化。

---

## 文档参考

- [Intlayer 文档](https://intlayer.org)
- [Tanstack Start 文档](https://reactrouter.com/)
- [useIntlayer 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useIntlayer.md)
- [useLocale hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useLocale.md)
- [内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)
- [配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)
