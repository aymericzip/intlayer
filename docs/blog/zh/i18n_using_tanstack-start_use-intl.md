---
createdAt: 2026-09-26
updatedAt: 2026-09-26
priority: 9
title: "TanStack Start 使用 use-intl 实现 i18n：2026 完整配置指南"
description: "使用 use-intl 为你的 TanStack Start 应用实现国际化：语言路由、类型安全消息、SSR、hreflang、sitemap 与 robots.txt，以及真实的打包体积基准测试数据。"
keywords:
  - use-intl
  - TanStack Start
  - TanStack Router
  - 国际化
  - i18n
  - SEO
  - Sitemap
  - React
  - 博客
slugs:
  - blog
  - tanstack-start-internationalization-using-use-intl
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "初始版本"
author: aymericzip
---

# 如何在 2026 年使用 use-intl 实现 TanStack Start 应用的国际化

## 目录

<TOC/>

## 什么是 use-intl？

**use-intl** 是 `next-intl` 中与框架无关的核心部分。它提供了与 Next.js 无任何依赖关系的 `useTranslations`、`useFormatter` 和 `IntlProvider` API、ICU MessageFormat 支持以及完善的 TypeScript 集成。这使其成为为 **TanStack Start** 应用实现国际化的最常见选择之一，也是 AI 助手最常为此技术栈推荐的库。

TanStack Start 本身不包含 i18n 层。路由、语言检测、SEO 元数据以及站点地图（sitemap）生成都需要自行配置。本指南将端到端地涵盖所有这些内容：

- **支持语言环境的路由**：使用可选的 `{-$locale}` 路径段（`/about`、`/fr/about`）。
- **按路由加载消息**：确保页面只下载当前渲染所需的命名空间和语言文件。
- **服务端渲染与注水（Hydration）**：避免文本不一致导致的注水错误。
- **完整的多语言 SEO**：已翻译的 `<title>` 和描述、规范链接（canonical URL）、带 `x-default` 的 `hreflang` 备用链接、Open Graph 语言标签、JSON-LD、带有 `xhtml:link` 备用链接的站点地图、`robots.txt` 以及所有语言的预渲染。

> 想要寻找其他技术栈？请参阅 [TanStack Start + Paraglide 指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/i18n_using_tanstack-start_paraglide.md)、[TanStack Start + Lingui 指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/i18n_using_tanstack-start_lingui.md) 或 [TanStack Start + Intlayer 指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_tanstack.md)。

> 使用 Next.js？请参阅 [next-intl 指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/i18n_using_next-intl.md)。

## 关于 TanStack Start 上的 use-intl 基准测试数据

[i18n 基准测试](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/tanstack.md)使用各大主流国际化库运行了相同的 10 页面、10 种语言的 TanStack Start 应用，并测量了浏览器实际下载的内容。

<I18nBenchmark framework="tanstack" packages="use-intl,@intlayer/use-intl,intlayer" vertical/>

`use-intl@4.14.2` 的关键数据（于 2026-09-26 测得，gzip 压缩）：

| 配置                               |  库体积 | 单页 JS 体积 | 其他语言泄露 | 其他页面泄露 |
| :--------------------------------- | ------: | -----------: | -----------: | -----------: |
| 无 i18n（基础应用）                |       - |     111.0 KB |           0% |           0% |
| `use-intl`（本指南配置）           | 75.9 KB |     128.7 KB |           0% |           0% |
| `@intlayer/use-intl`（兼容适配器） |  6.7 KB |     129.4 KB |           0% |           0% |
| `react-intlayer`（原生 Intlayer）  |  4.5 KB |     126.8 KB |           0% |           0% |

核心结论：

- **按页面拆分消息并按语言按需加载。** 这可以彻底消除两种泄露，也正是下文步骤所实现的方式。
- **运行时本身相对较重**（约 76 KB gzip），因为 ICU 解析器需要打包发送到客户端。使用 `@intlayer/use-intl` 兼容适配器（步骤 17）可以在保持完全相同 API 的同时，将运行时体积缩减至约 7 KB。

> 查看完整数据：[TanStack Start 基准测试报告](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/tanstack.md) 以及 [基准测试仓库](https://github.com/intlayer-org/benchmark-i18n)。

## TanStack Start 上的功能特性对比

`use-intl` 与 TanStack Start 上常用的其他库对比情况：

| 功能特性                              | `react-intlayer` (Intlayer)          | `use-intl`                 | Paraglide JS                | Lingui                       |
| ------------------------------------- | ------------------------------------ | -------------------------- | --------------------------- | ---------------------------- |
| **组件就近管理翻译**                  | ✅ 就近放置（Co-located）            | ❌ 集中式 JSON             | ❌ 每种语言一个 JSON 文件   | ⚠️ 源文本硬编码在组件中      |
| **TypeScript 集成**                   | ✅ 自动生成类型                      | ✅ 通过 `AppConfig`        | ✅ 类型化消息函数           | ⚠️ 仅宏支持                  |
| **缺失翻译检测**                      | ✅ 类型错误与构建警告                | ⚠️ 运行时回退              | ⚠️ 回退到基础语言           | ⚠️ 回退到源文本              |
| **富文本内容（JSX, Markdown）**       | ✅ 直接支持                          | ⚠️ 通过 `t.rich` 标签      | ⚠️ 仅支持字符串             | ✅ `<Trans>` 内直接使用 JSX  |
| **本地化路由**                        | ✅ 开箱即用                          | ❌ 需手动处理 `{-$locale}` | ✅ `urlPatterns` + 路由重写 | ❌ 需手动处理 `{-$locale}`   |
| **无刷新切换语言**                    | ✅ 支持                              | ✅ 支持                    | ❌ 需要整页重新加载         | ✅ 支持                      |
| **复数处理**                          | ✅ 基于枚举声明                      | ✅ 支持 ICU                | ✅ 变体支持                 | ✅ 支持 ICU                  |
| **ICU MessageFormat**                 | ✅ 通过 `format: "icu"` 支持         | ✅ 原生支持                | ⚠️ 通过 inlang 插件支持     | ✅ 原生支持                  |
| **内容格式**                          | ✅ `.ts`, `.json`, `.md`, `.yaml`... | ⚠️ `.json`                 | ⚠️ inlang JSON              | ✅ PO, JSON, CSV             |
| **AI 自动翻译**                       | ✅ 自定义提供商和 API Key            | ❌ 不支持                  | ❌ 不支持                   | ❌ 不支持                    |
| **可视化编辑器 / CMS**                | ✅ 本地编辑器 + 可选 CMS             | ❌ 依赖外部平台            | ⚠️ inlang 生态应用          | ❌ 依赖外部平台              |
| **SEO 辅助工具（hreflang, sitemap）** | ✅ 开箱即用                          | ❌ 需手动配置              | ⚠️ 本地化 URL，其余需手动   | ❌ 需手动配置                |
| **运行时体积（gzip，基准测试）**      | 4.5 KB                               | 75.9 KB                    | 1.8 KB                      | 56.7 KB                      |
| **泄露率（最佳配置，语言 / 页面）**   | 0% / 0%                              | 0% / 0%                    | 49.7% / 0%                  | 8.6% / 0%                    |
| **CI 中检测缺失翻译**                 | ✅ `npx intlayer test`               | ⚠️ 未内置                  | ⚠️ 未内置                   | ✅ `lingui compile --strict` |

> 运行时体积和代码泄露数据来自 [TanStack Start 基准测试](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/tanstack.md)。泄露率基于每个库的最佳配置进行测量。

> 其他 TanStack Start 指南：[Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/i18n_using_tanstack-start_lingui.md)、[Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/i18n_using_tanstack-start_paraglide.md) 以及 [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_tanstack.md)。

## 推荐遵循的最佳实践

- **在 `<html>` 标签上设置 `lang` 和 `dir`**：提升无障碍访问能力、屏幕阅读器支持和搜索引擎表现。
- **每个语言环境保持独立 URL**：使用语言前缀（如 `/fr/about`）而非仅使用 Cookie 切换，确保每个翻译页面都可被爬取和分享。
- **按命名空间拆分消息**（`common`、`home`、`about`）并按路由按需加载。
- **仅加载当前活跃的语言环境**：切勿在发送到客户端的模块中导入所有语言文件。
- **在 `IntlProvider` 中固定时区**：避免 SSR 期间使用服务器时区格式化日期而客户端注水时使用访客时区格式化，从而引发注水不匹配错误。
- **翻译元数据**：并在每个页面上声明 `canonical`、`hreflang` 和 `x-default`。
- **生成多语言站点地图和 robots.txt**：并预渲染每种语言的页面。
- **语言切换器使用真实链接**：避免仅使用 `<select>` 标签，以便搜索引擎爬虫能够发现每种语言版本。
- **为消息添加类型声明**：使缺失的翻译键在编译阶段即可报错提示。

> 请参阅我们的[国际化与 SEO 指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/internationalization_and_SEO.md)以及 [hreflang 完整指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/hreflang_guide_multilingual_seo.md)。

## 在 TanStack Start 应用中配置 use-intl 的分步指南

以下是我们将要构建的项目目录结构：

```bash
.
├── messages
│   ├── en
│   │   ├── common.json
│   │   ├── home.json
│   │   └── about.json
│   ├── fr
│   │   └── ... same files
│   └── es
│       └── ... same files
├── vite.config.ts
└── src
    ├── start.ts                  # Request middleware (locale redirect)
    ├── router.tsx
    ├── i18n
    │   ├── config.ts             # Locales, URL helpers
    │   ├── messages.ts           # Per-namespace, per-locale loader
    │   ├── negotiateLocale.ts    # Accept-Language parsing
    │   ├── seo.ts                # head() builder
    │   └── use-intl.d.ts         # Typed messages
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   ├── ScopedMessages.tsx
    │   └── Counter.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx         # Locale layout + IntlProvider
            ├── index.tsx         # / and /fr
            ├── about.tsx         # /about and /fr/about
            └── $.tsx             # Localized 404
```

<Steps>
<Step number={1} title="安装依赖">

从 TanStack Start 项目开始，然后安装 `use-intl`：

```bash packageManager="npm"
npm create @tanstack/start@latest
npm install use-intl
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm add use-intl
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn add use-intl
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bun add use-intl
```

- **use-intl**：提供 `IntlProvider`、`useTranslations`、`useFormatter` 以及 `createTranslator`（可在 React 外部使用，例如在 `head()` 函数中）。

</Step>
<Step number={2} title="集中管理语言配置">

为语言列表和 URL 辅助函数创建单一数据源（Single Source of Truth）。其他所有文件（路由、SEO、站点地图、预渲染）都从此导入，后续添加新语言仅需修改一行代码。

默认语言保持无前缀（`/about`），其他语言添加前缀（`/fr/about`）。这是推荐的策略：每种语言每个页面都有唯一 URL，并为主要受众保持简短的 URL。

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Cookie storing the locale explicitly chosen by the visitor. */
export const localeCookieName = "locale";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

/** Maps the optional `{-$locale}` route param to a supported locale. */
export const resolveLocale = (localeParam: string | undefined): Locale =>
  isLocale(localeParam) ? localeParam : defaultLocale;

/** The value to pass as `locale` param: `undefined` for the default locale. */
export const toLocaleParam = (locale: Locale): Locale | undefined =>
  locale === defaultLocale ? undefined : locale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, default locale unprefixed. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="创建翻译文件">

按语言和命名空间组织翻译消息。`common` 存放每个页面通用的内容（导航、页脚），每个页面单独建一个文件，包含其元数据。

use-intl 采用 **ICU MessageFormat**，复数、选择和格式化参数都直接定义在消息内部。

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="messages/en/common.json"
{
  "navigation": {
    "home": "Home",
    "about": "About"
  },
  "localeSwitcher": {
    "label": "Change language"
  },
  "notFound": {
    "title": "Page not found",
    "backHome": "Back to home"
  }
}
```

```json fileName="messages/en/about.json"
{
  "metadata": {
    "title": "About us",
    "description": "Learn who we are and why we built this application."
  },
  "title": "About us",
  "counter": {
    "label": "Counter",
    "increment": "Increment",
    "clicks": "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
  }
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="messages/fr/common.json"
{
  "navigation": {
    "home": "Accueil",
    "about": "À propos"
  },
  "localeSwitcher": {
    "label": "Changer de langue"
  },
  "notFound": {
    "title": "Page introuvable",
    "backHome": "Retour à l'accueil"
  }
}
```

```json fileName="messages/fr/about.json"
{
  "metadata": {
    "title": "À propos",
    "description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application."
  },
  "title": "À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter",
    "clicks": "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
  }
}
```

 </Tab>
</Tabs>

以相同方式创建 `home.json`，包含 `metadata` 对象和页面具体内容。

</Step>
<Step number={4} title="按命名空间与语言按需加载消息">

此加载器是性能优化的核心。`import.meta.glob` 指导 Vite **为每个 JSON 文件生成单独的代码块（chunk）**。请求法语 `["about"]` 的路由只会下载 `messages/fr/about.json`，不会加载多余内容，这正是基准测试能达到 0% 语言泄露和 0% 页面泄露的原因。

```ts fileName="src/i18n/messages.ts"
import type about from "../../messages/en/about.json";
import type common from "../../messages/en/common.json";
import type home from "../../messages/en/home.json";
import type { Locale } from "./config";

/** Shape of every namespace, inferred from the English source files. */
export type AppMessages = {
  common: typeof common;
  home: typeof home;
  about: typeof about;
};

export type Namespace = keyof AppMessages;

type JsonModule = { default: AppMessages[Namespace] };

// Lazy: each JSON file becomes its own chunk, loaded on demand
const messageLoaders = import.meta.glob<JsonModule>("../../messages/*/*.json");

/**
 * Loads the requested namespaces for one locale, in parallel.
 */
export const loadMessages = async <
  const TNamespaces extends readonly Namespace[],
>(
  locale: Locale,
  namespaces: TNamespaces
): Promise<Pick<AppMessages, TNamespaces[number]>> => {
  const entries = await Promise.all(
    namespaces.map(async (namespace) => {
      const loadNamespace =
        messageLoaders[`../../messages/${locale}/${namespace}.json`];

      if (!loadNamespace) {
        throw new Error(`Missing messages: ${locale}/${namespace}.json`);
      }

      const namespaceModule = await loadNamespace();

      return [namespace, namespaceModule.default] as const;
    })
  );

  return Object.fromEntries(entries) as Pick<AppMessages, TNamespaces[number]>;
};
```

</Step>
<Step number={5} title="为翻译消息添加类型声明">

模块扩展（Module Augmentation）能为 `useTranslations("about")` 和 `t("counter.label")` 提供自动补全，并在出现拼写错误或键被删除时产生编译期报错。

```ts fileName="src/i18n/use-intl.d.ts"
import type { Locale } from "./config";
import type { AppMessages } from "./messages";

declare module "use-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: AppMessages;
  }
}
```

请确保 `tsconfig.json` 中已启用 `resolveJsonModule`。

</Step>
<Step number={6} title="创建根文档">

根路由负责渲染 `<html>`。它读取可选的语言参数来设置 `lang` 和 `dir`，确保在任何 JavaScript 执行前，服务端渲染出的 HTML 就已经具备正确的属性。

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Scripts,
  useParams,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { getTextDirection, resolveLocale } from "@/i18n/config";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  // strict: false reads params from whichever route is matched
  const { locale: localeParam } = useParams({ strict: false });
  const locale = resolveLocale(localeParam);

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
```

</Step>
<Step number={7} title="创建语言布局路由">

`{-$locale}` 目录创建了一个**可选**的路径段：`/about` 和 `/fr/about` 都会匹配到 `/{-$locale}/about`。该布局负责：

1. 拦截不支持的前缀（`/xx/about` → 404）。
2. 仅为当前语言加载 `common` 命名空间。
3. 通过 `IntlProvider` 提供翻译消息。

loader 的加载结果会被序列化到 HTML 中并在客户端注水时复用，因此客户端不会重复下载 `common.json`。`staleTime: Infinity` 会将其缓存在客户端导航之间。

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { IntlProvider } from "use-intl";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    // /xx/about with an unknown prefix → 404
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadMessages(locale, ["common"]) };
  },
  // Messages never change for a given locale
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      // A fixed time zone prevents SSR / hydration date mismatches
      timeZone="UTC"
    >
      <Header />
      <main>
        <Outlet />
      </main>
    </IntlProvider>
  );
}
```

> `IntlProvider` 不会自动合并父级 Provider 的消息。下一步我们将添加一个小型组件来实现合并，以便每个页面都可以在 `common` 的基础上添加自己的命名空间。

</Step>
<Step number={8} title="合并页面级消息">

每个页面在其 loader 中加载属于自己的命名空间，然后使用 `ScopedMessages` 包裹其内容，从而将页面命名空间与父级消息进行合并。

```tsx fileName="src/components/ScopedMessages.tsx"
import { type ReactNode, useMemo } from "react";
import {
  type AbstractIntlMessages,
  IntlProvider,
  useLocale,
  useMessages,
  useTimeZone,
} from "use-intl";

type ScopedMessagesProps = {
  messages: AbstractIntlMessages;
  children: ReactNode;
};

/**
 * Adds route-level namespaces on top of the messages already provided.
 */
export const ScopedMessages = ({ messages, children }: ScopedMessagesProps) => {
  const parentMessages = useMessages();
  const locale = useLocale();
  const timeZone = useTimeZone();

  const mergedMessages = useMemo(
    () => ({ ...parentMessages, ...messages }),
    [parentMessages, messages]
  );

  return (
    <IntlProvider locale={locale} timeZone={timeZone} messages={mergedMessages}>
      {children}
    </IntlProvider>
  );
};
```

</Step>
<Step number={9} title="在页面中使用翻译">

页面 loader 获取当前语言的 `about` 命名空间，`head()` 依据其构建已翻译且 SEO 完善的元数据（详见步骤 13），组件负责渲染内容。

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { createTranslator, useTranslations } from "use-intl";
import { Counter } from "@/components/Counter";
import { ScopedMessages } from "@/components/ScopedMessages";
import { resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  loader: async ({ params }) => ({
    messages: await loadMessages(resolveLocale(params.locale), ["about"]),
  }),
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const locale = resolveLocale(params.locale);

    if (!loaderData) return {};

    // createTranslator works outside React, perfect for head()
    const t = createTranslator({
      locale,
      messages: loaderData.messages,
      namespace: "about.metadata",
    });

    return buildLocalizedHead({
      path: "/about",
      locale,
      title: t("title"),
      description: t("description"),
    });
  },
  component: AboutPage,
});

function AboutPage() {
  const { messages } = Route.useLoaderData();

  return (
    <ScopedMessages messages={messages}>
      <AboutContent />
    </ScopedMessages>
  );
}

function AboutContent() {
  const t = useTranslations("about");

  return (
    <>
      <h1>{t("title")}</h1>
      <Counter />
    </>
  );
}
```

</Step>
<Step number={10} title="在组件中使用翻译与格式化工具">

Provider 下的任何组件都可以调用 `useTranslations` 和 `useFormatter`。复数由 ICU 解析，数字会根据当前语言环境进行格式化。

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useFormatter, useTranslations } from "use-intl";

export const Counter = () => {
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{t("clicks", { count })}</p>
      <p>{format.number(count)}</p>
      <button
        type="button"
        aria-label={t("label")}
        onClick={() => setCount((value) => value + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

</Step>
<Step number={11} title="构建本地化链接组件" isOptional={true}>

所有路由都在 `{-$locale}` 之下，因此链接必须携带当前语言参数。此封装保留了 TanStack Router 具备类型检查的 `to` 属性，并自动为你注入语言参数。

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "use-intl";
import { toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const locale = useLocale();

  return <Link {...props} params={{ locale: toLocaleParam(locale) }} />;
};
```

```tsx fileName="src/components/Header.tsx"
import { useTranslations } from "use-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Header = () => {
  const t = useTranslations("common.navigation");

  return (
    <header>
      <nav>
        <LocalizedLink to="/{-$locale}">{t("home")}</LocalizedLink>
        <LocalizedLink to="/{-$locale}/about">{t("about")}</LocalizedLink>
      </nav>
      <LocaleSwitcher />
    </header>
  );
};
```

</Step>
<Step number={12} title="切换内容语言" isOptional={true}>

将语言切换器渲染为**链接**而不是 `<select>`。链接具有可爬取性，使搜索引擎可以发现每种语言版本，并且在禁用 JavaScript 时仍可正常工作。`to="."` 保留当前页面并仅替换语言参数。Cookie 会记录用户的显式选择，用于步骤 16 的重定向中间件。

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { Link } from "@tanstack/react-router";
import { useLocale, useTranslations } from "use-intl";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  toLocaleParam,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  const t = useTranslations("common.localeSwitcher");
  const activeLocale = useLocale();

  return (
    <nav aria-label={t("label")}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              to="."
              params={(previous) => ({
                ...previous,
                locale: toLocaleParam(locale),
              })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === activeLocale ? "page" : undefined}
              onClick={() => persistLocale(locale)}
            >
              {getLocaleName(locale)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={13} title="多语言元数据配置（SEO）" isOptional={true}>

这是国际化带来收益的关键部分：每个语言版本都可以独立参与排名。每个页面必须包含：

- **已翻译**的 `<title>` 和 `description`；
- 指向自身的 **canonical** 规范链接（而非指向默认语言）；
- 每个语言对应一个 **`hreflang` 备用链接**，外加未匹配语言的 **`x-default`**；
- 用于社交分享预览的 **Open Graph** `og:locale`、`og:locale:alternate` 和 `og:url`；
- 包含 `inLanguage` 的 **JSON-LD**，帮助搜索引擎和 AI 助手识别页面的语言归属。

单个辅助函数即可构建所有这些配置，使页面代码保持简洁：

```ts fileName="src/i18n/seo.ts"
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedHeadOptions = {
  /** Path without locale prefix, e.g. "/about" */
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
      // Canonical: each locale is its own canonical page
      { rel: "canonical", href: url },
      // hreflang: every language version, including the current one
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      // x-default: fallback for visitors whose language is not supported
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: getAbsoluteUrl(path, defaultLocale),
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

如步骤 9 所示，在每个页面的 `head()` 中调用它。对于首页，传入 `path: "/"`。

</Step>
<Step number={14} title="多语言站点地图配置（Sitemap）" isOptional={true}>

多语言站点地图列出**每种语言的每个 URL**，每个条目都通过 `xhtml:link` 声明所有备用语言。Google 会像处理页面中的 `hreflang` 标签一样处理这些注解，使其在页面较少被抓取时成为可靠的补充保障。

TanStack Start 的服务端路由允许直接通过文件路由提供该文件：

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

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
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, defaultLocale)}"/>`,
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
<Step number={15} title="多语言 robots.txt 配置" isOptional={true}>

私有路由存在于每种语言中，因此 `Disallow` 规则必须覆盖每个语言前缀。如果项目模板创建了 `public/robots.txt`，请将其移除，然后通过路由提供服务：

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
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
<Step number={16} title="根据用户偏好重定向初次访问者" isOptional={true}>

请求中间件（Request Middleware）会优先依据语言 Cookie、其次根据 `Accept-Language` 请求头，将访问 `/` 的访客重定向到其偏好语言。仅对 `/` 路径进行重定向：深层链接绝不篡改，以确保分享的 URL 和搜索引擎爬虫始终能获取请求的目标页面。

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/**
 * Picks the best supported locale from an Accept-Language header.
 * "fr-CA,fr;q=0.9,en;q=0.8" → "fr"
 */
export const negotiateLocale = (
  acceptLanguage: string | null | undefined
): Locale | undefined => {
  if (!acceptLanguage) return undefined;

  return acceptLanguage
    .split(",")
    .map((part) => {
      const [tag = "", quality] = part.trim().split(";q=");

      return {
        language: tag.toLowerCase().split("-")[0],
        quality: quality ? Number(quality) : 1,
      };
    })
    .sort((first, second) => second.quality - first.quality)
    .map(({ language }) => language)
    .find(isLocale);
};
```

```ts fileName="src/start.ts"
import { redirect } from "@tanstack/react-router";
import { createMiddleware, createStart } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

const localeRedirectMiddleware = createMiddleware().server(
  ({ request, next }) => {
    const { pathname } = new URL(request.url);

    if (pathname !== "/") return next();

    const cookieLocale = getCookie(localeCookieName);
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      throw redirect({ href: `/${preferredLocale}`, statusCode: 307 });
    }

    return next();
  }
);

export const startInstance = createStart(() => ({
  requestMiddleware: [localeRedirectMiddleware],
}));
```

> 在切换器中显式选择英语的访客会在 Cookie 中保存 `locale=en`，因此后续绝不会再次被强制重定向。在全静态部署（步骤 18）中，`/` 作为文件直接提供，该中间件不会执行，这完全没有问题：页面依然正常可访问，语言切换器会处理后续需求。

</Step>
<Step number={17} title="保留 use-intl API，通过 Intlayer 削减运行时体积" isOptional={true}>

基准测试表明，use-intl 配置中最重的是其运行时本身（约 76 KB gzip）。[`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/index.md) 兼容适配器提供了**完全相同的 API**（`useTranslations`、`useFormatter`、`IntlProvider`、`createTranslator`、ICU 复数、`t.rich`），但由预编译的 Intlayer 字典驱动：**体积从约 75.9 KB 降至约 6.7 KB**，0% 语言泄露，0% 页面泄露，且无需修改组件代码。

```bash packageManager="npm"
npm install @intlayer/use-intl intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

Vite 插件会将 `use-intl` 别名重定向到该适配器，因此现有的导入无需更改即可正常工作：

```ts fileName="vite.config.ts"
import useIntlVitePlugin from "@intlayer/use-intl/plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tanstackStart(), viteReact(), useIntlVitePlugin()],
});
```

借助 [sync JSON 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md)，你的 JSON 文件仍可作为单一数据源：

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // One chunk per locale, loaded on demand
    importMode: "dynamic",
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> 该适配器也是平滑迁移的理想路径：一旦运行成功，你可以逐步将组件迁移到原生的 `useIntlayer` API。详情请参阅 [Intlayer TanStack Start 指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_tanstack.md)。

</Step>
<Step number={18} title="预渲染所有语言页面" isOptional={true}>

静态 HTML 是响应最快且最易于被搜索引擎索引的形式。列出所有本地化路径，以便 TanStack Start 在构建时预渲染所有语言版本，以及站点地图和 robots 文件：

```ts fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { locales, localizePath } from "./src/i18n/config";

const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) =>
  locales.map((locale) => ({
    path: localizePath(path, locale),
    prerender: { enabled: true },
  }))
);

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages,
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
  ],
});
```

因为语言切换器渲染的是真实的链接，`crawlLinks: true` 还会自动发现并抓取你遗漏列出的页面。

</Step>
<Step number={19} title="处理多语言 404 页面" isOptional={true}>

步骤 7 的布局已经对未知的语言前缀抛出 `notFound()`。添加通配路由（catch-all route），使特定语言下的未知路径也能渲染本地化的 404 页面，并标记为 `noindex`：React 19 会将 `<meta>` 标签自动提升到 `<head>` 中。

```tsx fileName="src/components/NotFound.tsx"
import { useTranslations } from "use-intl";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => {
  const t = useTranslations("common.notFound");

  return (
    <div>
      <meta name="robots" content="noindex" />
      <h1>{t("title")}</h1>
      <LocalizedLink to="/{-$locale}">{t("backHome")}</LocalizedLink>
    </div>
  );
};
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

// /fr/does/not/exist → rendered by the layout notFoundComponent
export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={20} title="在服务端函数中获取语言环境" isOptional={true}>

服务端函数（Server Functions）不接收路由参数。读取语言 Cookie，并在没有 Cookie 时回退到 `Accept-Language` 请求头，以便发送本地化邮件或保存语言偏好：

```ts fileName="src/server/getServerLocale.ts"
import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequestHeader } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const getServerLocale = createServerFn().handler(() => {
  const cookieLocale = getCookie(localeCookieName);

  if (isLocale(cookieLocale)) return cookieLocale;

  return negotiateLocale(getRequestHeader("accept-language")) ?? defaultLocale;
});
```

要在服务端函数内部进行翻译，可将其与 `use-intl` 的 `loadMessages` 和 `createTranslator` 结合使用。

</Step>
<Step number={21} title="使用 Intlayer 自动化翻译工作流" isOptional={true}>

use-intl 负责渲染翻译，但无法帮助你**生成**翻译内容。Intlayer 是**免费**且**开源**的工具，即便你继续使用 use-intl，它也能填补这一空白：

- **测试缺失翻译**：在 CI 或单元测试中进行检测。请参阅[测试翻译内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/testing.md)。
- **AI 自动翻译**：使用你自己的 API Key 和提供商，`npx intlayer fill` 可结合应用上下文自动补全缺失的翻译键。请参阅[自动填充](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/autoFill.md)与 [CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)。
- **保持 JSON 文件作为单一数据源**：借助 [sync JSON 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md)。
- **可视化编辑内容**：通过[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)和 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)，让非开发人员也能直接更新翻译。
- **为 AI Agent 提供上下文支持**：通过 [MCP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)与 [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)。
- **扫描已部署的站点**：使用 [scan 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/scan.md)检测缺失的 `hreflang`、错误的 canonical 以及多语言泄露。

要了解所有功能，请参阅[为什么选择 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/interest_of_intlayer.md)。

</Step>
</Steps>

## 常见问题解答

<FAQ>

<Question title="use-intl 是 TanStack Start 的好选择吗？">

是的，如果你希望在 Next.js 之外使用 `next-intl` 的 API。它为你提供了 ICU 消息、格式化工具以及良好的 TypeScript 支持，并且避免了像 `setRequestLocale` 这样的 Next.js 专属限制。其主要权衡是体积：[基准测试](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/tanstack.md)测得其运行时约为 76 KB gzip，且朴素的配置会将所有语言和页面的消息一次性发送到浏览器。按路由和按语言拆分加载命名空间（如本指南所示）可以避免代码泄露。

</Question>
<Question title="use-intl 与 next-intl 有什么区别？">

`use-intl` 是 `next-intl` 的核心。`next-intl` 在其之上添加了 Next.js 专属集成：中间件、导航辅助函数、用于 Server Components 的 `getTranslations` 以及请求配置。在 TanStack Start 上，你直接使用 `use-intl`，并通过 TanStack Router 实现路由，如上文所示。

</Question>
<Question title="我应该使用语言前缀还是 Cookie 来保存语言偏好？">

建议在 URL 中使用语言前缀。这样每个语言版本都有自己独立的 URL，便于搜索引擎索引和用户分享。Cookie 仍然适合用于记录用户的显式选择，步骤 16 的重定向中间件正是这样实现的。

</Question>
<Question title="为什么在格式化日期时会出现注水（Hydration）不匹配错误？">

服务器和浏览器格式化日期时可能使用了不同的时区。在 `IntlProvider` 中传入固定的 `timeZone`（或保存在 Cookie 中的访客时区），这样两侧生成的文本就会完全一致。

</Question>
<Question title="如何减小 use-intl 的打包体积？">

首先，按命名空间拆分消息，并在每个路由中通过 `import.meta.glob` 按需加载对应语言，这可以消除语言和页面的代码泄露。其次，如果运行时体积很关键，可以切换到 [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/index.md) 适配器：API 完全相同，在基准测试中体积由约 75.9 KB 降至约 6.7 KB。

</Question>
<Question title="如何使用 use-intl 翻译标题和 meta description？">

在路由的 `head()` 函数内部使用 route loader 返回的消息调用 `createTranslator`，然后返回 `title`、`description`、canonical 和 `hreflang` 链接。步骤 13 提供了一个可复用的辅助函数。

</Question>
<Question title="我可以从 use-intl 渐进式迁移到 Intlayer 吗？">

可以。首先安装兼容适配器（步骤 17）：你的组件继续调用 `useTranslations`，底层由 Intlayer 提供支持。然后逐步将组件迁移到 `useIntlayer`，并在组件旁声明内容。请参阅[兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/index.md)和 [Intlayer TanStack Start 指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_tanstack.md)。

</Question>

</FAQ>
