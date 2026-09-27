---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "TanStack Start 使用 Paraglide JS 实现 i18n：2026 完整配置指南"
description: "使用 Paraglide JS 为你的 TanStack Start 应用实现国际化：URL 策略、路由重写、SSR 中间件、hreflang、sitemap 和 robots.txt，以及真实的基准测试数据。"
keywords:
  - Paraglide
  - Paraglide JS
  - inlang
  - TanStack Start
  - TanStack Router
  - 国际化
  - i18n
  - SEO
  - React
  - 博客
slugs:
  - blog
  - tanstack-start-internationalization-using-paraglide
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "初始版本"
author: aymericzip
---

# 如何在 2026 年使用 Paraglide JS 实现 TanStack Start 应用的国际化

## 目录

<TOC/>

## 什么是 Paraglide JS？

**Paraglide JS**（由 inlang 开发）是一个**基于编译器**的 i18n 库。它不再在运行时通过 JSON 对象查找键值，而是将每条消息编译为一个具有类型定义的 JavaScript 函数（`m.about_title()`）。打包工具可以自动移除未使用的消息，而键名拼写错误在编译期就会报错。

Paraglide 是 TanStack Router 官方示例中采用的国际化方案，它通过以下三个核心部分与 TanStack Start 集成：

- 一个 **Vite 插件**：将消息与运行时编译生成至 `src/paraglide`；
- 一个**服务端中间件**：解析每个请求的目标语言环境；
- 一个**路由重写机制**：将本地化 URL（`/fr/about`）映射到你的路由树（`/about`），因此你不需要额外的 `$locale` 路径段。

本指南将完成这三部分的配置，并涵盖 Paraglide 未内置的其他全部功能：`lang` 与 `dir` 属性、语言切换器、已翻译的元数据、`canonical`、带 `x-default` 的 `hreflang`、Open Graph、JSON-LD、sitemap、`robots.txt`、预渲染以及本地化的 404 页面。

> 想要寻找其他技术栈？

- [TanStack Start + use-intl 指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/i18n_using_tanstack-start_use-intl.md)
- [TanStack Start + Lingui 指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/i18n_using_tanstack-start_lingui.md)
- [TanStack Start + Intlayer 指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_tanstack.md)

> 对比基于编译器的两种方案？请阅读 [Intlayer 是否比 Paraglide 更轻量？](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/is_intlayer_lighter_than_paraglide.md)。

- [Intlayer 是否比 Paraglide 更轻量？](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/is_intlayer_lighter_than_paraglide.md)

> 想了解这些库的由来，请阅读 JavaScript i18n 的发展史。

- [JavaScript i18n 的发展史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/history_of_i18n.md)

## 关于 TanStack Start 上的 Paraglide 基准测试数据

[i18n 基准测试](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/tanstack.md)使用各大主流库运行了相同的 10 页面、10 种语言的 TanStack Start 应用，并测量了浏览器实际下载的数据量。

- [i18n 基准测试](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/tanstack.md)

<I18nBenchmark framework="tanstack" packages="paraglide,intlayer" vertical/>

`@inlang/paraglide-js@2.15.1` 的关键数据（于 2026-09-26 测得，gzip 压缩）：

| 配置                |  库体积 | 单页 JS 体积 | 其他语言泄露 | 其他页面泄露 | 页面加载耗时 |
| :------------------ | ------: | -----------: | -----------: | -----------: | -----------: |
| 无 i18n（基础应用） |       - |     111.0 KB |           0% |           0% |      15.7 ms |
| Paraglide JS        |  1.8 KB |     125.1 KB |        49.7% |           0% |      22.1 ms |
| `react-intlayer`    |  4.5 KB |     126.8 KB |           0% |           0% |      14.8 ms |
| `use-intl`          | 75.9 KB |     128.7 KB |           0% |           0% |      17.4 ms |
| Lingui              | 56.7 KB |     120.2 KB |         8.6% |           0% |      21.9 ms |

核心结论：

- **运行时非常小巧，且页面之间无资源泄露**。运行时针对你的具体配置生成，消息仅在被引用的位置导入。
- **存在语言包泄露**。每个消息函数都包含了所有语言的翻译，因此打包到页面的翻译字符串中，大约有一半属于访问者当前未使用的语言。添加的语言越多，这部分冗余比例越大。
- **页面加载耗时在该组中较慢**，部分原因是每次调用都会通过策略解析语言环境，而不是直接从 React 上下文中读取。

> 查看完整数据：[TanStack Start 基准测试报告](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/tanstack.md) 以及 [基准测试仓库](https://github.com/intlayer-org/benchmark-i18n)。

- [TanStack Start 基准测试报告](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/tanstack.md)

## TanStack Start 上的功能特性对比

以下是 Paraglide JS 与 TanStack Start 上其他常用库的对比：

| 特性                                  | `react-intlayer` (Intlayer)          | `use-intl`            | Paraglide JS                | Lingui                       |
| ------------------------------------- | ------------------------------------ | --------------------- | --------------------------- | ---------------------------- |
| **组件就近翻译**                      | ✅ 集中就近放置                      | ❌ 集中式 JSON        | ❌ 每个语言一个 JSON 文件   | ⚠️ 组件中的源文本            |
| **TypeScript 集成**                   | ✅ 自动生成类型                      | ✅ 通过 `AppConfig`   | ✅ 类型化消息函数           | ⚠️ 仅宏                      |
| **缺失翻译检测**                      | ✅ 类型错误与构建警告                | ⚠️ 运行时回退         | ⚠️ 回退到基础语言           | ⚠️ 回退到源文本              |
| **富文本内容（JSX、Markdown）**       | ✅ 直接支持                          | ⚠️ 通过 `t.rich` 标签 | ⚠️ 仅字符串                 | ✅ `<Trans>` 中的 JSX        |
| **本地化路由**                        | ✅ 内置                              | ❌ 手动 `{-$locale}`  | ✅ `urlPatterns` + 路由重写 | ❌ 手动 `{-$locale}`         |
| **无需刷新切换语言**                  | ✅ 是                                | ✅ 是                 | ❌ 整页重新加载             | ✅ 是                        |
| **复数处理**                          | ✅ 基于枚举                          | ✅ ICU                | ✅ 变体                     | ✅ ICU                       |
| **ICU 消息格式**                      | ✅ 通过 `format: "icu"`              | ✅ 原生               | ⚠️ 通过 inlang 插件         | ✅ 原生                      |
| **内容格式**                          | ✅ `.ts`、`.json`、`.md`、`.yaml` 等 | ⚠️ `.json`            | ⚠️ inlang JSON              | ✅ PO、JSON、CSV             |
| **AI 翻译**                           | ✅ 自定义提供商与 API Key            | ❌ 否                 | ❌ 否                       | ❌ 否                        |
| **可视化编辑器 / CMS**                | ✅ 本地编辑器 + 可选 CMS             | ❌ 外部平台           | ⚠️ inlang 生态应用          | ❌ 外部平台                  |
| **SEO 辅助工具（hreflang、sitemap）** | ✅ 内置                              | ❌ 手动               | ⚠️ 本地化 URL，其余手动     | ❌ 手动                      |
| **运行时体积（gzip，基准测试）**      | 4.5 KB                               | 75.9 KB               | 1.8 KB                      | 56.7 KB                      |
| **资源泄露，最佳配置（语言 / 页面）** | 0% / 0%                              | 0% / 0%               | 49.7% / 0%                  | 8.6% / 0%                    |
| **CI 中的缺失翻译检测**               | ✅ `npx intlayer test`               | ⚠️ 非内置             | ⚠️ 非内置                   | ✅ `lingui compile --strict` |

> 运行时体积和资源泄露数据来自 [TanStack Start 基准测试](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/tanstack.md)。资源泄露是在每个库的最佳配置下测得的。

- [TanStack Start 基准测试](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/tanstack.md)

> 其他 TanStack Start 指南：

- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/i18n_using_tanstack-start_lingui.md)
- [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/i18n_using_tanstack-start_use-intl.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_tanstack.md)

## 推荐遵循的最佳实践

- **在服务端根据解析出的语言环境在 `<html>` 标签上设置 `lang` 和 `dir`**。
- **使用前缀策略为每种语言保持独立的 URL**（`/fr/about`），以确保所有语言版本均可被索引。
- **将 `url` 置于语言解析策略的首位**，使 URL 成为唯一可信来源，确保爬虫始终能获取到目标页面。
- **使用扁平且具描述性的消息键名**（`about_title`），以便干净地映射为函数名称。
- **提交 `messages/*.json` 文件，而不是生成的 `src/paraglide` 目录**，以避免生成文件出现合并冲突。
- **翻译元数据**，并在每个页面声明 `canonical`、`hreflang` 和 `x-default`。
- **生成多语言 sitemap 和 robots.txt**，并对每种语言进行预渲染。
- **语言切换器使用真实的链接**，以便搜索引擎爬虫能发现所有语言版本。

- [国际化与 SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/internationalization_and_SEO.md)
- [hreflang 指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/hreflang_guide_multilingual_seo.md)

## 在 TanStack Start 应用中配置 Paraglide JS 的分步指南

以下是我们将要创建的项目结构：

```bash
.
├── project.inlang
│   └── settings.json          # 语言与消息格式配置
├── messages
│   ├── en.json
│   ├── fr.json
│   └── es.json
├── vite.config.ts
└── src
    ├── paraglide              # 自动生成，加入 git 忽略
    ├── server.ts              # Paraglide 中间件
    ├── router.tsx             # URL 重写
    ├── i18n
    │   ├── config.ts          # 站点 URL 与辅助工具
    │   └── seo.ts             # head() 构建工具
    ├── components
    │   └── LocaleSwitcher.tsx
    └── routes
        ├── __root.tsx
        ├── index.tsx          # / 以及 /fr
        ├── about.tsx          # /about 以及 /fr/about
        ├── $.tsx              # 本地化 404 页面
        ├── sitemap[.]xml.ts
        └── robots[.]txt.ts
```

请注意，项目中并没有 `$locale` 目录：路由重写会在进行路由匹配前自动剥离语言前缀。

<Steps>
<Step number={1} title="安装依赖">

从 TanStack Start 项目开始，然后初始化 Paraglide。初始化命令会创建 `project.inlang/settings.json`、初始的 `messages/en.json` 并安装相关依赖包。

```bash packageManager="npm"
npm create @tanstack/start@latest
npx @inlang/paraglide-js@latest init
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm dlx @inlang/paraglide-js@latest init
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn dlx @inlang/paraglide-js@latest init
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bunx @inlang/paraglide-js@latest init
```

- **@inlang/paraglide-js**：编译器及其 Vite 插件。无需安装单独的运行时依赖包：运行时会直接生成到你的项目中。

</Step>
<Step number={2} title="配置语言环境">

`project.inlang/settings.json` 是语言环境的唯一可信源。消息格式插件会为每种语言读取一个对应的 JSON 文件。

```json fileName="project.inlang/settings.json"
{
  "$schema": "https://inlang.com/schema/project-settings",
  "baseLocale": "en",
  "locales": ["en", "fr", "es"],
  "modules": [
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-message-format@4/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-m-function-matcher@2/dist/index.js"
  ],
  "plugin.inlang.messageFormat": {
    "pathPattern": "./messages/{locale}.json"
  }
}
```

</Step>
<Step number={3} title="配置 Vite 插件与 URL 策略">

插件会在每次代码修改时编译消息。对于 TanStack Start，有三个配置项至关重要：

- **`strategy`**：读取语言环境的优先级顺序。将 `url` 置于首位使 URL 成为唯一可信源。当 URL 无法确定语言时，中间件会使用 `cookie` 和 `preferredLanguage`。
- **`urlPatterns`**：语言映射到 URL 的方式。非默认语言放在前面，因为优先匹配最先符合的规则。在此配置中，默认语言不带前缀（`/about`），其他语言添加前缀（`/fr/about`）。
- **`outputStructure: "message-modules"`**：每个消息生成一个独立模块，允许打包工具剔除当前页面未导入的消息。

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
      outputStructure: "message-modules",
      cookieName: "PARAGLIDE_LOCALE",
      strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
      urlPatterns: [
        {
          pattern: "/:path(.*)?",
          localized: [
            ["fr", "/fr/:path(.*)?"],
            ["es", "/es/:path(.*)?"],
            // 默认语言放在最后：匹配所有剩余的 URL
            ["en", "/:path(.*)?"],
          ],
        },
      ],
    }),
    tanstackStart(),
    viteReact(),
  ],
});
```

将生成的目录添加到 `.gitignore` 中。它会在 `dev` 和 `build` 时自动重新构建：

```plaintext fileName=".gitignore"
src/paraglide
```

</Step>
<Step number={4} title="创建翻译文件">

每个键名都会成为从 `src/paraglide/messages` 导出的函数。扁平的蛇形命名（snake_case）可以生成最干净的函数名。变量使用 `{name}` 占位符。

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="messages/en.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Home",
  "nav_about": "About",
  "locale_switcher_label": "Change language",
  "home_meta_title": "Welcome",
  "home_meta_description": "A multilingual TanStack Start application.",
  "home_title": "Hello {name}!",
  "about_meta_title": "About us",
  "about_meta_description": "Learn who we are and why we built this application.",
  "about_title": "About us",
  "not_found_title": "Page not found",
  "not_found_back_home": "Back to home"
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="messages/fr.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Accueil",
  "nav_about": "À propos",
  "locale_switcher_label": "Changer de langue",
  "home_meta_title": "Bienvenue",
  "home_meta_description": "Une application TanStack Start multilingue.",
  "home_title": "Bonjour {name} !",
  "about_meta_title": "À propos",
  "about_meta_description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application.",
  "about_title": "À propos",
  "not_found_title": "Page introuvable",
  "not_found_back_home": "Retour à l'accueil"
}
```

 </Tab>
</Tabs>

复数处理使用 inlang 消息格式的变体语法：

```json fileName="messages/en.json"
{
  "cart_items": [
    {
      "declarations": ["input count", "local countPlural = count: plural"],
      "selectors": ["countPlural"],
      "match": {
        "countPlural=one": "{count} item",
        "countPlural=other": "{count} items"
      }
    }
  ]
}
```

</Step>
<Step number={5} title="添加服务端中间件">

中间件会根据你的策略解析每个请求的语言环境，并通过 `AsyncLocalStorage` 作用域在整个服务端渲染期间供 `getLocale()` 使用。这也确保了不同语言的并发请求之间互不干扰、安全隔离。

在 TanStack Start 中，包装默认的服务端入口：

```ts fileName="src/server.ts"
import handler from "@tanstack/react-start/server-entry";
import { paraglideMiddleware } from "./paraglide/server";

export default {
  fetch(request: Request): Promise<Response> {
    return paraglideMiddleware(request, () => handler.fetch(request));
  },
};
```

</Step>
<Step number={6} title="在路由器中重写本地化 URL">

TanStack Router 的 `rewrite` 选项在路由器边界处转换 URL：

- **输入**：`/fr/about` 在匹配前被去本地化为 `/about`，因此单个 `about.tsx` 路由即可处理所有语言；
- **输出**：每个生成的 `href`（链接、重定向、导航）都会根据当前激活的语言进行本地化，所以在法语页面中 `<Link to="/about">` 会自动渲染为 `/fr/about`。

```tsx fileName="src/router.tsx"
import { createRouter } from "@tanstack/react-router";
import { deLocalizeUrl, localizeUrl } from "./paraglide/runtime";
import { routeTree } from "./routeTree.gen";

export const getRouter = () =>
  createRouter({
    routeTree,
    scrollRestoration: true,
    rewrite: {
      input: ({ url }) => deLocalizeUrl(url),
      output: ({ url }) => localizeUrl(url),
    },
  });

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
```

> 由于链接已由重写机制自动本地化，你无需编写自定义的 `LocalizedLink` 组件：直接像平常一样使用 TanStack Router 的 `Link` 即可。

</Step>
<Step number={7} title="创建根文档">

`getLocale()` 在服务端返回中间件解析出的语言，在浏览器中返回来自 URL 的语言，因此在服务端 HTML 和注水（hydration）之后，`lang` 与 `dir` 保持完全一致。

```ts fileName="src/i18n/config.ts"
import { baseLocale, type Locale, localizeUrl } from "@/paraglide/runtime";

/** 公共源地址，用于规范 URL、hreflang 和 sitemap。 */
export const siteUrl = "https://example.com";

/** Open Graph 需要 `语言_地区` 格式代码。 */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `getAbsoluteUrl("/about", "fr")` → `https://example.com/fr/about` */
export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  localizeUrl(new URL(path, siteUrl), { locale }).href;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;

export { baseLocale };
```

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { NotFound } from "@/components/NotFound";
import { getTextDirection } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: ReactNode }) {
  const locale = getLocale();

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootLayout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">{m.nav_home()}</Link>
          <Link to="/about">{m.nav_about()}</Link>
        </nav>
        <LocaleSwitcher />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
```

</Step>
<Step number={8} title="在页面中使用翻译">

消息就是普通的函数：导入 `m`，调用该函数，并将变量作为对象传入。所有内容（包括变量）都具有完整的类型提示。

```tsx fileName="src/routes/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/")({
  head: () =>
    buildLocalizedHead({
      path: "/",
      locale: getLocale(),
      title: m.home_meta_title(),
      description: m.home_meta_description(),
    }),
  component: HomePage,
});

function HomePage() {
  return <h1>{m.home_title({ name: "TanStack" })}</h1>;
}
```

```tsx fileName="src/routes/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/about")({
  head: () =>
    buildLocalizedHead({
      path: "/about",
      locale: getLocale(),
      title: m.about_meta_title(),
      description: m.about_meta_description(),
    }),
  component: AboutPage,
});

function AboutPage() {
  return <h1>{m.about_title()}</h1>;
}
```

> 消息函数也支持显式传入语言环境：`m.about_title({}, { locale: "fr" })`。这在服务端渲染非当前请求语言的代码（如发送邮件）时非常实用。

</Step>
<Step number={9} title="切换内容语言" isOptional={true}>

使用 `localizeHref` 将切换器渲染为**链接**，以便搜索引擎爬虫能够发现所有语言版本。`setLocale` 将选择保存到 Cookie 中，并以新语言重新加载页面：整页重新加载是 Paraglide 的预期行为，因为消息函数在每次调用时读取语言环境，而不是订阅 React 状态。

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/react-router";
import { getLocaleName } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import {
  getLocale,
  type Locale,
  locales,
  localizeHref,
  setLocale,
} from "@/paraglide/runtime";

export const LocaleSwitcher = () => {
  // 路由器路径名，已经通过重写去本地化："/about"
  const { pathname } = useLocation();
  const activeLocale = getLocale();

  const handleClick = (event: React.MouseEvent, locale: Locale) => {
    event.preventDefault();
    setLocale(locale); // 设置 Cookie 并跳转到本地化 URL 重新加载
  };

  return (
    <nav aria-label={m.locale_switcher_label()}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <a
              href={localizeHref(pathname, { locale })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === activeLocale ? "page" : undefined}
              onClick={(event) => handleClick(event, locale)}
            >
              {getLocaleName(locale)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={10} title="国际化你的元数据" isOptional={true}>

每个语言版本都可以独立排名，前提是每个页面都提供：

- 已**翻译**的 `<title>` 和 `description`；
- 指向自身的**规范（canonical）** URL；
- 每个语言环境对应的 **`hreflang` 备用链接**，加上 **`x-default`**；
- **Open Graph** 的 `og:locale`、`og:locale:alternate` 和 `og:url`；
- 带有 `inLanguage` 的 **JSON-LD** 数据。

Paraglide 的 `localizeUrl` 会根据你的 `urlPatterns` 构建备用 URL，因此它们绝不会与实际路由产生偏差：

```ts fileName="src/i18n/seo.ts"
import { baseLocale, type Locale, locales } from "@/paraglide/runtime";
import { getAbsoluteUrl, openGraphLocales } from "./config";

type LocalizedHeadOptions = {
  /** 去本地化后的路径，例如 "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedHead = ({
  path,
  locale,
  title,
  description,
}: LocalizedHeadOptions) => {
  const url = getAbsoluteUrl(path, locale);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:locale", content: openGraphLocales[locale] },
      ...locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => ({
          property: "og:locale:alternate",
          content: openGraphLocales[alternateLocale],
        })),
    ],
    links: [
      { rel: "canonical", href: url },
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: getAbsoluteUrl(path, baseLocale),
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url,
          inLanguage: locale,
        }),
      },
    ],
  };
};
```

</Step>
<Step number={11} title="国际化你的站点地图（Sitemap）" isOptional={true}>

多语言站点地图列出每种语言的每个 URL，并且每个条目都通过 `xhtml:link` 声明其所有备用版本：

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { getAbsoluteUrl } from "@/i18n/config";
import { baseLocale, locales } from "@/paraglide/runtime";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

export const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const buildAlternateLinks = (path: string): string =>
  [
    ...locales.map(
      (locale) =>
        `<xhtml:link rel="alternate" hreflang="${locale}" href="${getAbsoluteUrl(path, locale)}"/>`
    ),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, baseLocale)}"/>`,
  ].join("");

const buildSitemap = (): string => {
  const urls = sitemapPages.flatMap((page) =>
    locales.map(
      (locale) =>
        `<url><loc>${getAbsoluteUrl(page.path, locale)}</loc>${buildAlternateLinks(page.path)}<changefreq>${page.changeFrequency}</changefreq><priority>${page.priority}</priority></url>`
    )
  );

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={12} title="国际化你的 robots.txt" isOptional={true}>

私有路由存在于每种语言中，因此 `Disallow` 规则必须覆盖所有本地化路径。如果脚手架生成了 `public/robots.txt`，请将其删除，然后通过路由动态提供：

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { siteUrl } from "@/i18n/config";
import { locales, localizeHref } from "@/paraglide/runtime";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizeHref(path, { locale })}`)
  );

  return [
    "User-agent: *",
    "Allow: /",
    ...disallowRules,
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");
};

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildRobots(), {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={13} title="预渲染所有语言版本" isOptional={true}>

列出每个页面的本地化路径，以便 TanStack Start 预渲染所有语言版本。`localizeHref` 是无浏览器依赖的生成代码，因此可以在 `vite.config.ts` 中运行，但该文件仅在初次编译后才会存在。如下所示手动列出路径可以避免此执行顺序问题：

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const prefixedLocales = ["fr", "es"]; // 默认语言 "en" 无前缀
const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) => [
  path,
  ...prefixedLocales.map((locale) =>
    path === "/" ? `/${locale}` : `/${locale}${path}`
  ),
]);

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      // ... 与第 3 步相同的选项
      project: "./project.inlang",
      outdir: "./src/paraglide",
    }),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages.map((path) => ({
          path,
          prerender: { enabled: true },
        })),
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
  ],
});
```

由于语言切换器渲染的是真实链接，`crawlLinks: true` 也会自动发现你遗漏列出的页面。

</Step>
<Step number={14} title="处理本地化的 404 页面" isOptional={true}>

通过重写机制，`/fr/does-not-exist` 会被作为 `/does-not-exist` 进行匹配，且 `getLocale()` 依然返回 `fr`，因此第 7 步中的根 `notFoundComponent` 会以法语渲染。通配路由（catch-all route）确保深层路径也能正确进入 404 页面。将页面标记为 `noindex`：React 19 会将 `<meta>` 自动提升到 `<head>` 中。

```tsx fileName="src/components/NotFound.tsx"
import { Link } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>{m.not_found_title()}</h1>
    <Link to="/">{m.not_found_back_home()}</Link>
  </div>
);
```

```tsx fileName="src/routes/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={15} title="在服务端函数中获取语言环境" isOptional={true}>

服务端函数运行在 Paraglide 中间件的作用域内，因此 `getLocale()` 在此处同样可用：

```ts fileName="src/server/sendWelcomeEmail.ts"
import { createServerFn } from "@tanstack/react-start";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const sendWelcomeEmail = createServerFn({ method: "POST" })
  .inputValidator((email: string) => email)
  .handler(async ({ data: email }) => {
    const locale = getLocale();
    const subject = m.home_meta_title({}, { locale });

    // await mailer.send({ to: email, subject, locale });
    return { email, subject, locale };
  });
```

</Step>
<Step number={16} title="与 Intlayer 对比" isOptional={true}>

目前没有从 Paraglide 到 Intlayer 的直接开箱即用适配器，因为两者遵循相同的理念：在构建时编译内容并尽可能减少运行时体积。两者的差异主要体现在交付到浏览器的内容和内容组织方式上：

- **语言环境处理**：Intlayer 按语言加载[动态字典](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/index.md)（在基准测试中为 0% 语言包泄露），而 Paraglide 的每个消息函数都携带所有语言（泄露达 49.7%）。
- **内容组织**：内容可以存放在每个组件旁的 `.content.ts` 文件中，也可以存放在集中式文件中。请参阅[单组件管理 vs 集中式 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/per-component_vs_centralized_i18n.md)。
- **语言切换**：内容从 React 上下文中读取，因此切换语言时无需刷新页面即可重新渲染。
- **生成代码**：`src` 目录内不生成任何额外代码，因此在 git 提交前无需重新生成文件。

如果你是从其他库而非 Paraglide 迁移，[兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/index.md)可以保留 `use-intl`、`next-intl`、`react-i18next`、`react-intl` 或 Lingui 的 API 并替换底层运行时。

- [兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/index.md)

请参阅 [Intlayer 是否比 Paraglide 更轻量？](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/is_intlayer_lighter_than_paraglide.md) 以及 [Intlayer TanStack Start 配置指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_tanstack.md)。

- [Intlayer 是否比 Paraglide 更轻量？](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/is_intlayer_lighter_than_paraglide.md)
- [Intlayer TanStack Start 配置指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_tanstack.md)

</Step>
<Step number={17} title="使用 Intlayer 自动化你的翻译流程" isOptional={true}>

Paraglide 负责渲染翻译，但它无法帮助你**生成**翻译内容。Intlayer 是**免费**且**开源**的，其配套工具即使在 Paraglide 项目中也能提供极大帮助：

- **使用 AI 进行翻译**：使用你自己的 API Key 和提供商。请参阅[自动填充（auto fill）](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/autoFill.md)与 [CLI 工具](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)。
- **保留你的 JSON 文件作为唯一可信源**：通过 [JSON 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md) 实现。
- **在 CI 中检测缺失的翻译**：请参阅[测试你的翻译](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/testing.md)。
- **扫描已部署的站点**：使用 [scan 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/scan.md) 检查缺失的 `hreflang`、错误的 canonical 规范链接以及语言包泄露。

</Step>
</Steps>

## 常见问题解答

<FAQ>

<Question title="Paraglide JS 适合 TanStack Start 吗？">

是一个可靠的选择：它被用于 TanStack Router 的官方示例中，拥有[基准测试](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/tanstack.md)中最小的运行时体积（gzip 压缩后约 1.8 KB），且消息具备完整的类型定义。其权衡点在于每个消息函数都包含所有语言，这会导致大约一半的翻译字符串泄露给使用其他语言的访客，并且切换语言时需要重新加载页面。

- [基准测试](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/tanstack.md)

</Question>
<Question title="使用 Paraglide 时需要 $locale 路由路径段吗？">

不需要。路由器的 `rewrite` 功能会在路由匹配之前移除语言前缀，并在生成链接时自动添加回去，因此单个 `about.tsx` 文件即可同时为 `/about`、`/fr/about` 和 `/es/about` 提供服务。

</Question>
<Question title="为什么切换语言会重新加载页面？">

消息函数在被调用时直接读取语言环境，并没有订阅 React 状态。因此 `setLocale` 默认会重新加载页面，使所有消息以新语言重新渲染。你可以传入 `{ reload: false }`，但随后必须自行手动重新渲染组件树。

</Question>
<Question title="我应该将生成的 src/paraglide 目录提交到 Git 吗？">

建议不要提交。该目录在每次 `dev` 和 `build` 时都会重新生成，将其纳入版本控制容易导致生成文件的合并冲突。建议仅提交 `messages/*.json` 和 `project.inlang/settings.json`。

</Question>
<Question title="如何使用 Paraglide 添加 hreflang 标签？">

在路由的 `head()` 中使用 `localizeUrl` 为每种语言构建一个绝对 URL，并添加一个指向基础语言的 `x-default`。第 10 步提供了可复用的辅助函数，第 11 步将相同的备用链接添加到了站点地图中。

</Question>
<Question title="Paraglide 会对未使用的翻译进行 Tree-shaking 吗？">

当使用 `outputStructure: "message-modules"` 时，未使用的**消息**会被移除，因此其他页面的内容不会泄露。但未使用的**语言**不会被移除：每个消息函数都包含所有语言的翻译，这也是基准测试测得 49.7% 语言包泄露的原因。

</Question>
<Question title="我可以从 Paraglide 迁移到 Intlayer 吗？">

可以。两者都是基于编译器的方案，因此心智模型非常接近。使用 [JSON 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md) 保留现有的 JSON 文件，然后逐个页面将 `m.key()` 调用替换为 `useIntlayer` 即可。详情请参阅 [Intlayer TanStack Start 配置指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_tanstack.md)。

- [JSON 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md)
- [Intlayer TanStack Start 配置指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_tanstack.md)

</Question>

</FAQ>
