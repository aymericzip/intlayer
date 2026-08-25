---
createdAt: 2025-03-25
updatedAt: 2026-08-25
title: "TanStack Start + Solid i18n - 翻译你的应用的完整指南"
description: "告别 i18next。2026 年构建多语言 (i18n) TanStack Start + Solid 应用的完整指南。使用 AI 代理翻译并优化包体积、SEO 和性能。"
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Tanstack Start
  - Solid
  - i18n
  - TypeScript
  - 语言路由
  - Sitemap
slugs:
  - doc
  - environment
  - tanstack-start
  - solid
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-solid-template
applicationShowcase: https://intlayer-tanstack-start-solid.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 9.4.0
    date: 2026-08-25
    changes: "比较路由 head 函数中元数据字典的静态解析、动态解析与带缓存的动态解析"
  - version: 8.9.0
    date: 2026-05-04
    changes: "更新 Solid useIntlayer API 用法以直接访问属性"
  - version: 8.5.1
    date: 2026-03-25
    changes: "针对 Tanstack Start Solid.js 添加"
author: aymericzip
---

# 使用 Intlayer 翻译您的 Tanstack Start + Solid.js 网站 | 国际化 (i18n)

## 目录

<TOC/>

本指南演示了如何集成 **Intlayer**，以便在包含 Solid.js 的 Tanstack Start 项目中实现无缝国际化、本地化感知路由、TypeScript 支持以及现代开发实践。

## 为什么选择 Inlayer 而不是替代品？

与 `react-i18next` 或 `i18next` 等主要解决方案相比，Intlayer 是一个附带集成优化的解决方案，例如：

<AccordionGroup>

与“react-i18next”或“i18next”等主要解决方案相比，Intlayer是一个具有集成优化的解决方案，例如：

**完整的 TanStack Start 覆盖**

Intlayer 经过优化，可与 TanStack Start 和 Solid 完美配合，提供**多语言路由**、**站点地图**以及扩展国际化 (i18n) 所需的所有功能。

**捆绑尺寸**

不要将大量 JSON 文件加载到页面中，而只需加载必要的内容。 Intlayer 有助于**将捆绑包和页面大小减少多达 50%**。

</Accordion>

**可维护性**

确定应用程序内容的范围**有利于大型应用程序的维护**。您可以复制或删除单个功能文件夹，而无需承担检查整个内容代码库的精神负担。此外，Intlayer 具有**完全类型化 (fully typed)**，以确保您的内容的准确性。

**人工智能代理**

<Accordion header="AI Agent">

共置内容**减少大型语言模型 (LLM) 所需的上下文**。 Intlayer 还附带了一套工具，例如用于测试缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 和 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**，使 AI 代理的开发者体验 (DX) 更加流畅。

**自动化**

<Accordion header="自动化">

使用您选择的法学硕士，通过自动化在 CI/CD 管道中进行翻译，而费用由您的 AI 提供商承担。 Intlayer 还提供了一个**编译器**来自动提取内容，以及一个[网络平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)来帮助**在后台翻译**。

</Accordion>

**表现**

将大量 JSON 文件连接到组件可能会导致性能和反应性问题。 Intlayer 可在构建时 (build time)优化您的内容加载。

**无需开发即可扩展**

<Accordion header="使用 none-dev 扩展">

Intlayer 不仅仅是一个 i18n 解决方案，还提供了一个**自托管的[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)**和一个**[完整的 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** 来帮助您管理多语言内容**实时**，与译员、文案人员和其他团队成员无缝协作。内容可以本地和/或远程存储。

</Accordion>
</AccordionGroup>

---

## 在 Tanstack Start 应用中设置 Intlayer 的分步指南

<Tabs defaultTab="video">
  <Tab label="视频" value="video">

<iframe title="The best i18n solution for Tanstack Start? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="代码" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-tanstack-start-solid-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="演示" value="demo">

<iframe
  src="https://intlayer-tanstack-start-solid.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-tanstack-start-solid-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

参见 GitHub 上的[应用模板](https://github.com/aymericzip/intlayer-tanstack-start-solid-template)。

<Steps>

<Step number={1} title="创建项目">

首先按照 TanStack Start 网站上的[新建项目](https://tanstack.com/start/latest/docs/framework/solid/quick-start)指南创建一个新的 TanStack Start 项目。

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

> `--interactive` 标志是可选的。如果您是 AI agent，请使用 `intlayer-cli init`。

> 此命令将检测您的环境并安装所需的包。例如：

```bash packageManager="npm"
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  核心包，提供国际化工具，用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、转译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)。

- **solid-intlayer**
  将 Intlayer 与 Solid 应用程序集成的包。它为 Solid 国际化提供上下文提供者和 hooks。

- **vite-intlayer**
  包含用于将 Intlayer 与 [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production) 集成的 Vite 插件，以及用于检测用户首选语言环境、管理 cookies 和处理 URL 重定向的中间件。

</Step>

<Step number={3} title="配置您的项目">

创建一个配置文件来配置应用程序的语言：

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

> 通过此配置文件，您可以设置本地化的 URL、中间件重定向、cookie 名称、内容声明的位置和扩展名、禁用控制台中的 Intlayer 日志等。关于可用参数的完整列表，请参考[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

</Step>

<Step number={4} title="在您的 Vite 配置中集成 Intlayer">

将 intlayer 插件添加到您的配置中：

```typescript fileName="vite.config.ts"
import { intlayer } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> `intlayer()` Vite 插件用于将 Intlayer 与 Vite 集成。它确保内容声明文件的构建并在开发模式下监控它们。它在 Vite 应用程序中定义 Intlayer 环境变量。此外，它提供别名以优化性能。

</Step>

<Step number={5} title="创建根布局">

通过使用 `useParams` 检测当前语言环境并在 `html` 标签上设置 `lang` 和 `dir` 属性来配置您的根布局以支持国际化。

```tsx fileName="src/routes/__root.tsx"
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  getRouteApi,
} from "@tanstack/solid-router";
import { HydrationScript } from "solid-js/web";
import { Suspense, type ParentComponent } from "solid-js";
import { IntlayerProvider } from "solid-intlayer";
import { defaultLocale, getHTMLTextDir } from "intlayer";

const localeRoute = getRouteApi("/{-$locale}");

export const Route = createRootRouteWithContext()({
  shellComponent: RootComponent,
});

const RootComponent: ParentComponent = (props) => {
  const params = localeRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HydrationScript />
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>
          <Suspense>{props.children}</Suspense>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
};
```

</Step>

<Step number={6} title="创建语言环境布局">

创建一个处理语言环境前缀并执行验证的布局。此布局将确保仅处理有效的语言环境。

> 如果您不需要在路由级别验证语言环境前缀，此步骤是可选的。

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // 验证语言环境前缀
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

> 此处，`{-$locale}` 是一个动态路由参数，将被替换为当前的语言环境。这种符号使 slot 成为可选的，允许它与诸如 `'prefix-no-default'` 等路由模式一起使用。

> 请注意，如果您在同一路由中使用多个动态段（例如 `/{-$locale}/other-path/$anotherDynamicPath/...`），此 slot 可能会导致问题。
> 对于 `'prefix-all'` 模式，您可能更倾向于将 slot 切换为 `$locale`。
> 对于 `'no-prefix'` 或 `'search-params'` 模式，您可以完全删除 slot。

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
        zh: "主页",
        en: "Home",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      title: t({
        zh: "欢迎来到 Intlayer + TanStack Router",
        en: "Welcome to Intlayer + TanStack Router",
        es: "Bienvenido a Intlayer + TanStack Router",
        fr: "Bienvenue à Intlayer + TanStack Router",
      }),
      description: t({
        zh: "这是一个使用 Intlayer 与 TanStack Router 的示例",
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

> 有关更多详情，请参考[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

</Step>

<Step number={7} title="创建语言环境感知组件和 Hooks">

为本地化导航创建一个 `LocalizedLink` 组件：

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

此组件有两个目标：

- 从 URL 中删除不必要的 `{-$locale}` 前缀。
- 将语言环境参数注入到 URL 中，以确保用户直接重定向到本地化的路由。

然后我们可以创建一个 `useLocalizedNavigate` hook 用于编程导航：

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

</Step>

<Step number={8} title="在您的页面中使用 Intlayer">

> 在组件中请默认使用 **`useIntlayer`**：这是读取内容的推荐方式，编译器会把它解析为当前渲染的语言环境。仅在 Solid 树之外 —— 路由 `head`、loader 和服务端函数 —— 才使用 `getIntlayer` / `getIntlayerAsync`。

在整个应用程序中访问您的内容字典：

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
      <h1>{content.heroTitle}</h1>
      <p>{content.heroDesc}</p>
      <div>
        <LocalizedLink to="/">{content.navHome}</LocalizedLink>
        <LocalizedLink to="/about">{content.navAbout}</LocalizedLink>
      </div>
    </main>
  );
}
```

> 在 Solid 中，`useIntlayer` 返回反应式内容（例如 `content`）。您可以直接访问其属性。
>
> 如果您想在 `string` 属性中使用您的内容，例如 `alt`、`title`、`href`、`aria-label` 等，可以使用函数的值，如下所示：
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> 要了解更多关于 `useIntlayer` hook 的信息，请参考[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/solid-intlayer/useIntlayer.md)。

</Step>

<Step number={9} title="创建语言切换器组件">

创建一个组件以允许用户更改语言：

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

> 在 Solid 中，来自 `useLocale` 的 `locale` 是一个**信号访问器**。使用 `locale()`（带括号）以反应式方式读取其当前值。
>
> 要了解更多关于 `useLocale` hook 的信息，请参考[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/solid-intlayer/useLocale.md)。

</Step>

<Step number={10} title="HTML 属性管理">

如步骤 5 所示，您可以在根组件中使用 `useParams` 管理 `html` 标签的 `lang` 和 `dir` 属性。这确保在服务器和客户端上正确设置属性。

```tsx fileName="src/routes/__root.tsx"
const RootComponent: ParentComponent = (props) => {
  const params = localeRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
};
```

---

</Step>

<Step number={11} title="添加中间件">

您也可以使用 `intlayerProxy` 为您的应用程序添加服务器端路由。该插件将自动根据 URL 检测当前语言环境并设置适当的语言环境 cookie。如果未指定语言环境，该插件将根据用户的浏览器语言首选项确定最合适的语言环境。如果未检测到语言环境，它将重定向到默认语言环境。

> 注意，要在生产环境中使用 `intlayerProxy`，您需要将 `vite-intlayer` 包从 `devDependencies` 切换到 `dependencies`。

> 从 Intlayer v9 开始，`intlayerProxy()` 直接捆绑到 `intlayer()` 插件中，并通过 `routing.enableProxy` 选项（默认为 `true`）默认启用。如下所示单独注册现在是可选的 — 为了向后兼容性以及需要控制插件顺序的设置而保留。设置 `routing.enableProxy: false` 以选择退出。参考 [v9 发布说明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/releases/v9.md)。

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solid from "vite-plugin-solid";
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
    solid(),
  ],
});
```

---

</Step>

<Step number={12} title="国际化您的元数据">

在组件内部，请继续使用 **`useIntlayer`** —— 它仍然是默认方式。编译器会将其改写为当前实际渲染语言环境的字典分块，因此不会有多余内容发送到浏览器。

路由的 `head` 函数运行在 Solid 树**之外**，因此那里无法使用 `useIntlayer`。从 `head` 读取字典有三种方式，它们在包体积与文档 `head` 就绪速度之间各有取舍。

<Tabs defaultTab="cached">

<Tab label="静态解析" value="static">

`getIntlayer` 会同步地在**合并后的**字典上解析，也就是包含所有已声明语言环境的那一份。`head` 保持同步、无需等待，但整个多语言字典都会被打进发送到浏览器的路由分块中。

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // The path for this route

    const metaContent = getIntlayer("app", locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
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

适合较小的元数据字典、语言环境数量不多的项目，或原型开发阶段。

</Tab>

<Tab label="动态解析" value="dynamic">

`getIntlayerAsync`（自 **v9.4** 起可用）的行为与 `getIntlayer` 相同，但构建插件会让它指向 `.intlayer/dynamic_dictionaries/` 中按语言环境拆分的分块，而不是合并字典。因此页面只会发送它所渲染的那一种语言环境。由于该分块是按需加载的，`head` 变为 `async`：

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: async ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // The path for this route

    const metaContent = await getIntlayerAsync("app", locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
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

> 如果一个 `head` 要读取多个字典，请用 `Promise.all` 一并解析 —— 逐行 await 每个 `getIntlayerAsync` 会把请求串成链式调用，而不是并行执行。

代价是：动态 import 会在 `head` 执行期间解析，处于文档渲染的关键路径上。在冷路由上这会让 `head` 延迟几毫秒，并可能略微拉低 **LCP**。

</Tab>

<Tab label="带缓存的动态解析" value="cached">

改为在路由的 `loader` 中解析字典，再于 `head` 中通过 `loaderData` 读回。已匹配路由的 loader 会并行运行，而 `staleTime: Infinity` 告诉 TanStack Router 该结果永不过期 —— 于是按语言环境的分块只解析一次，之后由路由缓存提供，`head` 得以保持同步。

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  // Resolved in parallel with the other matched routes, off the head critical path
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    return { metaContent: await getIntlayerAsync("app", locale) };
  },
  // The dictionary never changes for a given locale: resolve the chunk once
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // The path for this route

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: loaderData?.metaContent.title },
        {
          name: "description",
          content: loaderData?.metaContent.meta.description,
        },
      ],
    };
  },
});
```

> `head` 可能在 loader 完成之前被调用，因此 `loaderData` 的类型可能为 `undefined`。请保留可选链，或返回一个兜底标题。

你保留了按语言环境拆分的分块，却无需在 `head` 的关键路径上付出代价。代价在于开发体验：内容必须通过 `loaderData` 从 loader 显式传递到 `head`。

</Tab>

</Tabs>

### 该选择哪种解析方式？

|                | 静态解析             | 动态解析                     | 带缓存的动态解析                          |
| -------------- | -------------------- | ---------------------------- | ----------------------------------------- |
| API            | `getIntlayer`        | `getIntlayerAsync`（v9.4+）  | `loader` 中的 `getIntlayerAsync`（v9.4+） |
| `head` 签名    | 同步                 | `async`                      | 同步，读取 `loaderData`                   |
| 发送的语言环境 | 所有已声明的语言环境 | 仅请求的语言环境             | 仅请求的语言环境                          |
| 包体积         | 随语言环境数量增长   | 恒定                         | 恒定                                      |
| `head` 解析    | 立即                 | 在 `head` 内等待语言环境分块 | 在 loader 中等待，之后缓存                |
| LCP 影响       | 无                   | 冷路由上略有延迟             | 无 —— 不在 `head` 关键路径上              |
| 客户端导航     | 无需解析             | 每次匹配都重新执行           | 由路由缓存提供                            |
| 开发体验       | 最简单               | 一个 `await`                 | 内容经由 `loaderData` 传递                |
| 适用场景       | 语言环境少、字典小   | 语言环境多、访问较少的路由   | 语言环境多、访问频繁的路由                |

---

</Step>

<Step number={13} title="在服务器操作中检索语言环境">

您可能希望从服务器操作或 API 端点内部访问当前语言环境。
您可以使用 `intlayer` 中的 `getLocale` helper。

以下是使用 TanStack Start 的服务器函数的示例：

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/solid-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/solid-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // 从请求中获取 cookie（默认值：'INTLAYER_LOCALE'）
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // 从请求中获取标头（默认值：'x-intlayer-locale'）
    // 使用 Accept-Language 协商的回退
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

当用户访问不存在的页面时，您可以显示自定义的未找到页面，语言环境前缀可能会影响未找到页面的触发方式。

#### 理解 TanStack Router 的 404 处理与区域设置前缀

在 TanStack Router 中，处理带有本地化路由的 404 页面需要多层次的方法：

1. **专用 404 路由**：用于显示 404 UI 的特定路由
2. **路由级验证**：验证区域设置前缀并将无效的前缀重定向到 404
3. **全能路由**：捕获区域设置段内所有不匹配的路径

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/solid-router";

// 这创建了一个专用的 /[locale]/404 路由
// 它既可用作直接路由，也可在其他文件中作为组件导入
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// 单独导出，以便在 notFoundComponent 和全能路由中重用
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
  // beforeLoad 在路由渲染前运行（在服务器和客户端上）
  // 这是验证区域设置前缀的理想位置
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix 检查区域设置是否根据你的 intlayer 配置有效
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // 无效的区域设置前缀 - 使用有效的区域设置前缀重定向到 404 页面
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent 在子路由不存在时被调用
  // 例如，/en/non-existent-page 在 /en 布局内触发这个
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/solid-router";

import { NotFoundComponent } from "./404";

// $ (splat/全能) 路由匹配任何不匹配其他路由的路径
// 例如，/en/some/deeply/nested/invalid/path
// 这确保区域设置内的所有不匹配路径都显示 404 页面
// 没有这个，不匹配的深层路径可能会显示空白页或错误
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

</Step>

<Step number={15} title="提取你的组件内容" isOptional={true}>

如果你有现有的代码库，转换数千个文件可能很耗时。

为了简化这个过程，Intlayer 提供了一个 [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md) 来转换你的组件和提取内容。

要设置它，你可以在你的 `intlayer.config.ts` 文件中添加一个 `compiler` 部分：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 你的配置的其余部分
  compiler: {
    /**
     * 指示编译器是否应该被启用。
     */
    enabled: true,

    /**
     * 定义输出文件路径
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 指示转换后的组件是否应该被保存。
     *
     * - 如果为 `true`，编译器将在磁盘中重写组件文件。所以转换将是永久的，编译器将在下一个过程中跳过转换。这样，编译器可以转换应用，然后可以被移除。
     *
     * - 如果为 `false`，编译器将仅在构建输出中注入 `useIntlayer()` 函数调用，并保持基础代码库完整。转换将仅在内存中完成。
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
 <Tab value='提取命令'>

运行提取器来转换你的组件和提取内容

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

> 从 v9 开始，`intlayerCompiler` 已包含在 `intlayer` 插件中。所以你不需要手动添加它。

更新你的 `vite.config.ts` 以包含 `intlayerCompiler` 插件：

```ts fileName="vite.config.ts"
import { intlayer, intlayerCompiler } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    solidPlugin({ ssr: true }),
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

<Step number={16} title="预渲染和生成 Sitemap">

Intlayer 配备了内置的 sitemap 生成器，可以帮助你轻松为应用创建 sitemap。它处理本地化路由并为搜索引擎添加必要的元数据。

> Intlayer 生成的 sitemap 支持 `xhtml:link` 命名空间（Hreflang XML 扩展）。与仅列出原始 URL 的默认 sitemap 生成器不同，Intlayer 会自动创建页面所有语言版本之间所需的双向链接（例如 `/about`、`/about?lang=fr` 和 `/about?lang=es`）。这确保搜索引擎正确索引并为正确的受众提供正确的语言版本。

要使用它，你首先需要配置你的 `vite.config.ts` 以启用本地化路由的预渲染并禁用默认的 TanStack Start sitemap 生成。

```typescript fileName="vite.config.ts"
import { localeMap, localeFlatMap } from "intlayer";
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

然后，创建一个使用 `generateSitemap` 函数的 `src/routes/sitemap[.]xml.ts` 路由：

```typescript fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/solid-router";
import { generateSitemap } from "intlayer";

const SITE_URL = "http://localhost:3000";

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

Intlayer 使用模块扩展来获得 TypeScript 的好处并使你的代码库更强大。

确保你的 TypeScript 配置包含自动生成的类型：

```json5 fileName="tsconfig.json"
{
  // ... 你现有的配置
  include: [
    // ... 你现有的 include
    ".intlayer/**/*.ts", // 包含自动生成的类型
  ],
}
```

---

</Step>

</Steps>

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
