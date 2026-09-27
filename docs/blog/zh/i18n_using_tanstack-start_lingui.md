---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "TanStack Start 使用 Lingui 实现 i18n：2026 完整配置指南"
description: "使用 Lingui 为你的 TanStack Start 应用实现国际化：宏、PO 语言包、SSR、语言路由、hreflang、sitemap 和 robots.txt，以及真实的打包体积基准测试数据。"
keywords:
  - Lingui
  - LinguiJS
  - TanStack Start
  - TanStack Router
  - 国际化
  - i18n
  - SEO
  - PO 文件
  - React
  - 博客
slugs:
  - blog
  - tanstack-start-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "初始版本"
author: aymericzip
---

# 如何在 2026 年使用 Lingui 实现 TanStack Start 应用的国际化

## 目录

<TOC/>

## 什么是 Lingui？

**Lingui** 是一个围绕**宏（macros）**和**消息提取（message extraction）**构建的 i18n 库。你可以直接在组件中编写源文本（`` t`Hello` ``、`<Trans>Hello</Trans>`），`lingui extract` 会将每条消息收集到目录文件中（默认是 PO 文件），翻译人员填写这些文件，然后 Vite 插件会将它们编译为紧凑的 JavaScript。消息采用 ICU MessageFormat 语法，因此原生支持复数和条件选择。

TanStack Start 本身不包含 i18n 层，因此本指南将从零开始将 Lingui 接入其中：

- **通过 Babel 编译宏**：使用 `@rolldown/plugin-babel`（在 `@vitejs/plugin-react` v6 和 Vite 8 环境下必须）。
- **语言路由**：使用可选的 `{-$locale}` 路径段（`/about`、`/fr/about`）。
- **每个语言独立目录按需加载**：每次渲染使用独立的 `I18n` 实例，确保并发 SSR 请求绝不会共享或混淆语言环境。
- **完整的多语言 SEO**：已翻译的 `<title>` 和描述、规范链接（canonical URL）、带 `x-default` 的 `hreflang`、Open Graph 多语言标签、JSON-LD、sitemap、`robots.txt`、预渲染以及本地化的 404 页面。

> 想要寻找其他技术栈？

- [TanStack Start + use-intl 指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/i18n_using_tanstack-start_use-intl.md)
- [TanStack Start + Paraglide 指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/i18n_using_tanstack-start_paraglide.md)
- [TanStack Start + Intlayer 指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_tanstack.md)

> 使用 Next.js？

- [Next.js + Lingui 指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/i18n_using_nextjs_lingui.md)

> 对比不同国际化库？

- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/lingui_vs_intlayer.md)

> 想了解这些库的由来，请阅读 JavaScript i18n 的发展史。

- [JavaScript i18n 的发展史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/history_of_i18n.md)

## 关于 TanStack Start 上的 Lingui 基准测试数据

[i18n 基准测试](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/tanstack.md)使用各大主流国际化库运行了相同的 10 页面、10 种语言的 TanStack Start 应用，并测量了浏览器实际下载的内容。

<I18nBenchmark framework="tanstack" packages="lingui,@intlayer/lingui,intlayer" vertical/>

`@lingui/core@6.6.0` 的关键数据（于 2026-09-26 测得，gzip 压缩）：

| 配置                              |  库体积 | 单页 JS 体积 | 其他语言泄露 | 其他页面泄露 |
| :-------------------------------- | ------: | -----------: | -----------: | -----------: |
| 无 i18n（基础应用）               |       - |     111.0 KB |           0% |           0% |
| Lingui（本指南配置）              | 56.7 KB |     115.2 KB |         9.3% |           0% |
| `@intlayer/lingui`（兼容模式）    |  9.8 KB |     136.7 KB |         9.9% |           0% |
| `react-intlayer`（原生 Intlayer） |  4.5 KB |     126.8 KB |           0% |           0% |

核心结论：

- **按需加载每个语言的目录文件**：这能让页面体积保持接近基础应用的大小。
- **运行时体积相对较大**（约 57 KB gzip）。`@intlayer/lingui` 兼容适配器（第 16 步）可以保留宏语法的同时将体积缩减至约 10 KB。

> 查看完整数据：[TanStack Start 基准测试报告](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/tanstack.md) 以及 [基准测试仓库](https://github.com/intlayer-org/benchmark-i18n)。

## TanStack Start 上的功能特性对比

以下是 Lingui 与 TanStack Start 上其他常用库的对比：

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

> 其他 TanStack Start 指南：

- [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/i18n_using_tanstack-start_use-intl.md)
- [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/i18n_using_tanstack-start_paraglide.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_tanstack.md)

## 推荐遵循的最佳实践

- **在 `<html>` 标签上设置 `lang` 和 `dir`**：根据路由语言设置，确保服务端输出的 HTML 正确。
- **每个语言保持独立的 URL 并在路径中添加前缀**：确保每个语言版本都能被搜索引擎独立索引。
- **每个语言创建一个 `I18n` 实例**：切勿在 SSR 期间修改全局实例，否则两个并发请求会互相覆盖对方的语言设置。
- **仅加载当前处于活动状态的语言目录**：切勿在客户端代码中静态引入全部目录。
- **统一宏的使用风格**（组件中使用 `useLingui` + `t`，延迟描述符使用 `msg`）并保持一致。混用 `t`、`i18n._`、`i18n.t` 和 `<Trans>` 会降低代码对开发者及 AI 助手的可读性。
- **在 CI 中运行 `lingui extract`**：确保新添加的消息不会在未翻译的情况下发布。
- **翻译页面的元数据**：并在每个页面上声明 `canonical`、`hreflang` 和 `x-default`。
- **生成多语言 sitemap 和 robots.txt**：并对每种语言进行预渲染。
- **在语言切换器中使用真实的链接**：便于搜索引擎爬虫发现所有语言版本。

- [国际化与 SEO 指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/internationalization_and_SEO.md)
- [hreflang 多语言 SEO 指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/hreflang_guide_multilingual_seo.md)

## 在 TanStack Start 应用中配置 Lingui 的分步指南

以下是我们将要创建的项目结构：

```bash
.
├── lingui.config.ts
├── vite.config.ts
└── src
    ├── locales
    │   ├── en
    │   │   └── messages.po     # 由 `lingui extract` 生成
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── start.ts                # 请求中间件（语言重定向）
    ├── i18n
    │   ├── config.ts           # 语言列表、URL 工具函数
    │   ├── lingui.ts           # 目录加载器、I18n 实例管理
    │   ├── negotiateLocale.ts  # Accept-Language 解析
    │   └── seo.ts              # head() 构建工具
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   └── NotFound.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx       # 语言布局 + I18nProvider
            ├── index.tsx
            ├── about.tsx
            └── $.tsx           # 本地化 404 页面
```

<Steps>
<Step number={1} title="安装依赖">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

- **@lingui/core** / **@lingui/react**：运行时、`I18nProvider` 以及宏（`@lingui/core/macro`、`@lingui/react/macro`）。
- **@lingui/cli**：提供 `lingui extract` 命令将消息收集到目录中。
- **@lingui/vite-plugin**：在 import 导入时编译 `.po` 目录文件，因此无需手动执行 `lingui compile`。
- **@lingui/babel-plugin-lingui-macro** + **@rolldown/plugin-babel**：在构建时转换宏语法。

</Step>
<Step number={2} title="集中管理语言配置">

默认语言保持无前缀（`/about`），其他语言添加前缀（`/fr/about`）。

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** 公开域名，用于规范链接（canonical URL）、hreflang 和 sitemap。 */
export const siteUrl = "https://example.com";

/** 保存访问者显式选择的语言的 Cookie 名称。 */
export const localeCookieName = "locale";

/** Open Graph 要求的 `language_TERRITORY` 格式代码。 */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

/** 将可选的 `{-$locale}` 路由参数解析为支持的语言代码。 */
export const resolveLocale = (localeParam: string | undefined): Locale =>
  isLocale(localeParam) ? localeParam : defaultLocale;

/** 传递给 `locale` 参数的值：默认语言传递 `undefined`。 */
export const toLocaleParam = (locale: Locale): Locale | undefined =>
  locale === defaultLocale ? undefined : locale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`，默认语言无前缀。 */
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
<Step number={3} title="配置 Lingui">

Lingui 配置文件复用同一个语言列表，确保目录文件、路由和 sitemap 始终保持一致。

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";
import { formatter } from "@lingui/format-po";
import { defaultLocale, locales } from "./src/i18n/config";

export default defineConfig({
  sourceLocale: defaultLocale,
  locales: [...locales],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: formatter({ lineNumbers: false }),
});
```

添加提取脚本：

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

当组件中包含尚未提取并提交的消息时，`i18n:check` 命令在 CI 中将会报错退出。

</Step>
<Step number={4} title="配置 Vite">

在 `@vitejs/plugin-react` v6 中，Babel 不再内置。`@rolldown/plugin-babel` 负责运行 Lingui 宏插件，而 `linguiTransformerBabelPreset` 仅处理导入了宏的文件，从而保持快速构建。

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={5} title="按语言加载目录文件">

在 `import()` 中使用模板字符串可以让 Vite 为**每个语言生成一个单独的代码块（chunk）**，Lingui 插件会把 `.po` 文件编译到其中。法国访问者只需下载法语目录。

编译后的消息是纯数据结构，因此可以在路由 loader 中返回、序列化到 HTML 中并在注水（hydration）时复用。

```ts fileName="src/i18n/lingui.ts"
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import type { Locale } from "./config";

/**
 * 加载特定语言的已编译目录（每个语言一个 chunk）。
 */
export const loadCatalog = async (locale: Locale): Promise<Messages> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return messages;
};

/**
 * 创建独立的 I18n 实例：适用于并发 SSR 请求。
 */
export const createI18n = (locale: Locale, messages: Messages): I18n =>
  setupI18n({ locale, messages: { [locale]: messages } });

/**
 * 加载目录并返回可直接使用的实例，供 loader 和服务端函数使用。
 */
export const loadI18n = async (locale: Locale): Promise<I18n> =>
  createI18n(locale, await loadCatalog(locale));
```

为了让 TypeScript 能够识别 `.po` 文件的导入，添加一次模块声明：

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={6} title="创建根文档">

根路由读取可选的语言参数，以便在服务端渲染的 `<html>` 标签上设置 `lang` 和 `dir`。

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

`{-$locale}` 文件夹创建了一个可选的路径段：`/about` 和 `/fr/about` 都会匹配 `/{-$locale}/about`。该布局会拒绝未知的语言前缀，加载当前语言的目录，并提供专用的 `I18n` 实例。

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { I18nProvider } from "@lingui/react";
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { useMemo } from "react";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { createI18n, loadCatalog } from "@/i18n/lingui";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadCatalog(locale) };
  },
  // 对于给定的语言，目录内容不会发生变化
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  // 每个语言一个实例，绝不会在请求之间共享
  const i18n = useMemo(() => createI18n(locale, messages), [locale, messages]);

  return (
    <I18nProvider i18n={i18n}>
      <Header />
      <main>
        <Outlet />
      </main>
    </I18nProvider>
  );
}
```

</Step>
<Step number={8} title="在页面中使用翻译">

直接在组件中编写源文本。宏会在构建时将其转换为消息 ID，随后 `lingui extract` 会提取这些内容。

- `<Trans>` 用于 JSX 内容（包括嵌套元素）；
- `useLingui().t` 用于字符串（属性、props）；
- `<Plural>` 用于 ICU 复数语法。

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { msg } from "@lingui/core/macro";
import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { resolveLocale } from "@/i18n/config";
import { loadI18n } from "@/i18n/lingui";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  // 在 loader 中翻译元数据：head() 保持同步执行
  loader: async ({ params }) => {
    const i18n = await loadI18n(resolveLocale(params.locale));

    return {
      metadata: {
        title: i18n._(msg`About us`),
        description: i18n._(
          msg`Learn who we are and why we built this application.`
        ),
      },
    };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) =>
    loaderData
      ? buildLocalizedHead({
          path: "/about",
          locale: resolveLocale(params.locale),
          ...loaderData.metadata,
        })
      : {},
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </>
  );
}
```

> 动态 `import()` 目录会被模块系统缓存，因此在多个 loader 中调用 `loadI18n` 不会重复下载目录。

</Step>
<Step number={9} title="提取并翻译消息">

执行提取命令。Lingui 会将所有消息写入每个语言的目录文件中：

```bash
npm run i18n:extract
```

然后翻译每个条目的 `msgstr`：

<Tabs group="locale">
 <Tab value='fr' label='French'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "Increment"
msgstr "Incrémenter"

msgid "Counter"
msgstr "Compteur"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Spanish'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "Increment"
msgstr "Incrementar"

msgid "Counter"
msgstr "Contador"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> 默认情况下，消息 ID 是源文本的哈希值：修改英文文本会生成一条新消息。对于经常变更的文本，可以使用显式 ID（例如 `<Trans id="about.title">About us</Trans>`）。

</Step>
<Step number={10} title="构建本地化链接组件" isOptional={true}>

每个路由都在 `{-$locale}` 下，因此链接必须附带当前的语言参数。

```tsx fileName="src/components/LocalizedLink.tsx"
import { useLingui } from "@lingui/react";
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { type Locale, toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return (
    <Link
      {...props}
      params={{ locale: toLocaleParam(i18n.locale as Locale) }}
    />
  );
};
```

</Step>
<Step number={11} title="切换内容语言" isOptional={true}>

将语言切换器渲染为**链接（Links）**，以便搜索引擎爬虫发现所有语言版本。`to="."` 保留当前页面并替换语言参数。随后语言布局的 loader 会自动获取新语言的目录。

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLingui } from "@lingui/react/macro";
import { Link } from "@tanstack/react-router";
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
  // 宏版本同时也会返回 i18n 实例
  const { i18n, t } = useLingui();

  return (
    <nav aria-label={t`Change language`}>
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
              aria-current={locale === i18n.locale ? "page" : undefined}
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
<Step number={12} title="国际化页面元数据" isOptional={true}>

只要每个页面提供已翻译的 `<title>` 和描述、自引用的规范链接（canonical）、每个语言的 `hreflang` 加上 `x-default`、Open Graph 多语言标签以及带 `inLanguage` 的 JSON-LD，每个语言版本都能在搜索引擎中独立获得排名。元数据在 loader 中完成翻译（第 8 步），此辅助函数负责构建其余部分：

```ts fileName="src/i18n/seo.ts"
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedHeadOptions = {
  /** 不带语言前缀的路径，例如 "/about" */
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

</Step>
<Step number={13} title="国际化 Sitemap 和 robots.txt" isOptional={true}>

Sitemap 列出每个语言的所有 URL，每个条目通过 `xhtml:link` 声明其所有的备用语言版本。`robots.txt` 会禁止所有语言下的私有路由并指向 sitemap。如果初始化模板创建了 `public/robots.txt`，请将其移除。

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

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string =>
  [
    "User-agent: *",
    "Allow: /",
    ...privatePaths.flatMap((path) =>
      locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
    ),
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");

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
<Step number={14} title="预渲染所有语言版本" isOptional={true}>

列出所有本地化路径，以便 TanStack Start 在构建时预渲染所有语言版本：

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
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
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={15} title="重定向首次访问者并处理 404 页面" isOptional={true}>

请求中间件会将访问 `/` 根路径的用户重定向到其首选语言（优先读取 Cookie，其次读取 `Accept-Language` 请求头）。深层链接不会被重定向，因此爬虫和直接分享的链接总能访问到所请求的页面。

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/** "fr-CA,fr;q=0.9,en;q=0.8" → "fr" */
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
    if (new URL(request.url).pathname !== "/") return next();

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

对于 404 页面，通配路由会渲染布局中本地化的 `notFoundComponent`。将其标记为 `noindex`：React 19 会将 `<meta>` 自动提升到 `<head>` 中。

```tsx fileName="src/components/NotFound.tsx"
import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink to="/{-$locale}">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={16} title="保留宏语法，使用 Intlayer 精简运行时" isOptional={true}>

[`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/lingui.md) 兼容适配器无需修改任何源代码：宏的编译方式完全保持原样，编译生成的 `i18n._()`、`useLingui()` 和 `<Trans>` 调用由编译后的 Intlayer 字典提供支持。在基准测试中，运行时体积从 **~56.7 KB 骤降至 ~9.8 KB** gzip。

```bash packageManager="npm"
npm install @intlayer/lingui intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/lingui intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/lingui intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/lingui intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

在宏转换之后添加该插件，使其将 `@lingui/core` 和 `@lingui/react` 别名重定向到适配器：

```ts fileName="vite.config.ts"
import { lingui as linguiIntlayer } from "@intlayer/lingui/plugin";
import { linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
    linguiIntlayer(),
  ],
});
```

目录可以通过 [sync JSON 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md)（JSON 目录）或 [sync PO 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-po.md)（PO 目录）进行同步。在 [Lingui 兼容指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/lingui.md) 中查看完整配置，并在 [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/lingui_vs_intlayer-lingui.md) 中查看详细对比。

</Step>
<Step number={17} title="使用 Intlayer 自动化翻译" isOptional={true}>

Lingui 负责提取消息，但手动填写数十个目录文件往往耗费绝大部分时间。Intlayer 是**免费**且**开源**的，其工具链可以与 Lingui 无缝协作：

- **使用 AI 翻译**：使用你自己的 API Key 和模型提供商。请参阅 [自动填充](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/autoFill.md) 以及 [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)。
- **保留 PO 文件**作为单一可信源：通过 [sync PO 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-po.md) 实现。
- **在 CI 中测试缺失翻译**：请参阅 [测试翻译](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/testing.md)。
- **审计线上部署站点**：使用 [scan 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/scan.md) 检查缺失的 `hreflang`、错误的 canonical 链接以及语言资源泄露。

</Step>
</Steps>

## 常见问题解答

<FAQ>

<Question title="Lingui 可以与 TanStack Start 配合使用吗？">

可以。Lingui 虽然没有专门针对 TanStack Start 的专属集成，但其 Vite 插件和 Babel 宏插件可以直接使用。需要注意的两个关键点是：通过 `@rolldown/plugin-babel` 运行宏（Vite 8 和 `@vitejs/plugin-react` v6 不再内置 Babel），以及在 SSR 期间为每个语言创建独立的 `I18n` 实例而不是激活全局实例。

</Question>
<Question title="为什么不能使用 @lingui/core 的全局 i18n 对象？">

在服务端，一个进程会同时渲染多个并发请求。在共享对象上调用 `i18n.activate("fr")` 会意外更改同时在以英文渲染的另一个请求的语言设置。`setupI18n` 为每个语言创建隔离的实例，这是安全可靠的做法。

</Question>
<Question title="我需要运行 lingui compile 吗？">

不需要。`@lingui/vite-plugin` 会在导入 `.po` 目录文件时自动进行编译。你只需运行 `lingui extract` 来收集新添加的消息。

</Question>
<Question title="如何使用 Lingui 翻译页面标题和 meta 描述？">

使用 `msg` 宏声明它们，并在路由 loader 中使用 ``i18n._(msg`...`)`` 进行翻译。loader 返回纯字符串，因此 `head()` 保持同步执行，且这些值会被序列化以供注水使用。第 8 步和第 12 步展示了完整实现。

</Question>
<Question title="Lingui 在 TanStack Start 打包体积中占用多大？">

[基准测试](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/tanstack.md) 测得其运行时体积约为 56.7 KB gzip。采用每个语言独立目录按需加载时，页面体积约为 115 KB（相比之下无 i18n 基础应用为 111 KB）。如果静态导入所有语言目录，体积会上升至约 152 KB。

</Question>
<Question title="我可以保留 Lingui 宏并迁移到 Intlayer 吗？">

可以。[`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/lingui.md) 适配器保留了宏语法并替换了底层运行时。随后你可以逐步将组件逐一迁移到 `useIntlayer`。详情请参阅 [兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/index.md)。

</Question>

</FAQ>
