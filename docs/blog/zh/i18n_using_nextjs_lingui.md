---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "Next.js 16 i18n 与 Lingui：App Router 配置指南"
description: "在 Next.js 16 App Router 中配置 Lingui：Server Components、SWC 宏、proxy 路由、generateMetadata、hreflang、sitemap 和 robots.txt，附带基准测试数据。"
keywords:
  - Lingui
  - LinguiJS
  - Next.js
  - Next.js 16
  - App Router
  - React Server Components
  - 国际化
  - i18n
  - SEO
  - 博客
slugs:
  - blog
  - nextjs-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "初始版本"
author: aymericzip
---

# 2026 年如何使用 Lingui 国际化你的 Next.js 应用

## 目录

<TOC/>

## 什么是 Lingui？

**Lingui** 是一个围绕**宏（macros）**和**消息提取（message extraction）**构建的 i18n 库。你在组件中编写源文本（`` t`Hello` ``、`<Trans>Hello</Trans>`），`lingui extract` 会将每条消息收集到语言目录（默认为 PO 文件）中，然后由加载器将它们编译为紧凑的 JavaScript。消息采用 ICU MessageFormat 语法，并且 Lingui 在 App Router 中支持 **React Server Components**。

本指南将在 **Next.js 16 App Router** 项目中配置 Lingui，包含以下内容：

- **通过 SWC 编译宏**，确保 Turbopack 保持高速构建。
- **服务端组件与客户端组件**共享相同的 `Trans` 和 `useLingui` API。
- 通过 `proxy.ts` 实现**语言环境路由**：默认语言使用 `/about`，其他语言使用 `/fr/about`，并支持首次访问语言检测。
- 使用 `generateStaticParams` 对每个语言环境进行**静态渲染**。
- **完整的多语言 SEO 支持**：翻译后的 `generateMetadata`、canonical 规范链接、带 `x-default` 的 `hreflang`、Open Graph 本地化标签、JSON-LD、`sitemap.ts`、`robots.ts` 以及本地化的 404 页面。

> 想要了解其他国际化库？

- [next-intl 指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/i18n_using_next-intl.md)
- [next-i18next 指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/i18n_using_next-i18next.md)
- [Next.js + Intlayer 指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_16.md)

> 正在使用 TanStack Start？

- [TanStack Start + Lingui 指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/i18n_using_tanstack-start_lingui.md)

> 对比不同方案？

- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/lingui_vs_intlayer.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/next-i18next_vs_next-intl_vs_intlayer.md)

> 想了解这些库的由来，请阅读 JavaScript i18n 的发展史。

- [JavaScript i18n 的发展史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/history_of_i18n.md)

## Next.js 上 Lingui 的基准测试表现

[i18n 基准测试](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/nextjs.md)在各大主流库上运行相同的包含 10 个页面和 10 种语言的 Next.js 应用，并测量浏览器实际下载的内容体积。

<I18nBenchmark framework="nextjs" packages="lingui,@intlayer/lingui,next-intlayer" vertical/>

在 Next.js 16 上测试 `@lingui/core@6.6.0` 的关键数据，测量日期为 2026-09-26（gzip 压缩）：

| 配置方案                         |  库体积 | 每页 JS 体积 | 其他语言泄露率 | 其他页面泄露率 |
| :------------------------------- | ------: | -----------: | -------------: | -------------: |
| 无 i18n（基础应用）              |       - |     141.0 KB |             0% |             0% |
| Lingui，每个语言独立目录         | 72.1 KB |     145.4 KB |           2.8% |          89.9% |
| `@intlayer/lingui`（兼容模式）   | 10.7 KB |     221.6 KB |            50% |            90% |
| `next-intlayer`（原生 Intlayer） |  4.9 KB |     141.5 KB |             0% |             0% |

核心结论：

- **每个语言使用单一目录仍会将其他页面的消息泄露**到客户端 provider。尽量将文本保留在服务端组件中，因为服务端组件发送的是渲染好的 HTML，而不是消息目录。
- **Lingui 运行时体积约为 72 KB gzip。**`@intlayer/lingui` 兼容适配器将运行时体积减少到约 11 KB，但在此基准测试中，Next.js 兼容配置仍会将完整的消息目录发送到页面。原生 `next-intlayer` API 则是能保持基础应用原始体积的配置方案。

> 查看完整数据：[Next.js 基准测试报告](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/nextjs.md) 以及 [基准测试仓库](https://github.com/intlayer-org/benchmark-i18n)。

## Next.js 上的功能特性对比

以下是 Next.js App Router 项目常用功能在 Lingui、`next-intl` 与 Intlayer 之间的对比：

| 功能特性                             | `next-intlayer` (Intlayer)                       | Lingui                                        | `next-intl`                                 |
| ------------------------------------ | ------------------------------------------------ | --------------------------------------------- | ------------------------------------------- |
| **组件就近存放翻译**                 | ✅ 内容与每个组件同目录放置                      | ⚠️ 组件中编写源文本，语言目录集中管理         | ❌ 集中式 JSON                              |
| **TypeScript 集成**                  | ✅ 自动生成严格类型                              | ⚠️ 宏具有类型，但消息目录没有                 | ✅ 优秀，通过 `AppConfig` 扩展              |
| **缺失翻译检测**                     | ✅ TypeScript 错误与构建时警告                   | ⚠️ 运行时回退到源文本                         | ⚠️ 运行时回退                               |
| **富文本内容 (JSX, Markdown)**       | ✅ 直接支持                                      | ✅ `<Trans>` 内支持 JSX，不支持 Markdown      | ⚠️ 通过 `t.rich` 支持标签，不支持 Markdown  |
| **AI 翻译**                          | ✅ 支持自定义服务商与 API Key，具备应用上下文    | ❌ 不支持                                     | ❌ 不支持                                   |
| **可视化编辑器 / CMS**               | ✅ 本地可视化编辑器 + 可选 CMS                   | ❌ 仅通过外部平台                             | ❌ 仅通过外部平台                           |
| **本地化路由**                       | ✅ 开箱即用                                      | ❌ 需自行编写 `proxy.ts`                      | ✅ 内置 `[locale]` 路径段                   |
| **复数处理**                         | ✅ 基于枚举规则                                  | ✅ ICU 语法，`<Plural>` 宏                    | ✅ ICU 语法                                 |
| **内容格式**                         | ✅ `.ts`, `.tsx`, `.js`, `.json`, `.md`, `.yaml` | ✅ PO, JSON, CSV                              | ✅ `.json`, `.js`, `.ts`                    |
| **ICU MessageFormat**                | ✅ 通过 `format: "icu"` 支持                     | ✅ 原生支持                                   | ✅ 原生支持                                 |
| **SEO 辅助工具 (hreflang, sitemap)** | ✅ 提供元数据、sitemap 与 robots.txt 辅助工具    | ❌ 需手动处理                                 | ✅ 良好                                     |
| **服务端组件 (Server Components)**   | ✅ 在任意服务端组件中直接访问                    | ⚠️ 需在每个 layout 和 page 中调用 `setI18n`   | ⚠️ 每个组件需调用 `await getTranslations()` |
| **按组件进行 Tree-shaking**          | ✅ 构建时完成 (Babel / SWC)                      | ⚠️ 每种语言单一目录，按页提取器仍处于实验阶段 | ⚠️ 需手动在每个路由使用 `pick()`            |
| **运行时体积 (gzip, 基准测试)**      | 4.9 KB                                           | 72.1 KB                                       | 14.7 KB                                     |
| **CI 中检测缺失翻译**                | ✅ `npx intlayer test`                           | ✅ `lingui compile --strict`                  | ⚠️ 非内置功能                               |
| **生态系统与社区**                   | ⚠️ 规模较小但增长迅速                            | ✅ 成熟                                       | ✅ 庞大                                     |

> 运行时体积来自 [Next.js 基准测试](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/nextjs.md)。更深入的讨论请阅读 [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/lingui_vs_intlayer.md)。

> 其他 Next.js 指南：

- [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/i18n_using_next-intl.md)
- [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/i18n_using_next-i18next.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_16.md)

## 你应该遵循的最佳实践

- **在 `[locale]` 布局中的 `<html>` 上设置 `lang` 和 `dir`**。
- **优先在服务端组件中渲染文本**：它们在服务端生成 HTML，无需将消息目录发送到客户端。
- **在每个 layout 和 page 中调用 `initLingui(locale)`。**页面跳转时布局不会重新渲染，因此页面不能依赖布局来设置语言环境。
- **为每种语言保留独立 URL**，并使用 `generateStaticParams` 预渲染所有语言版本。
- **在 `generateMetadata` 中翻译元数据**，并配置 `canonical`、`hreflang` 和 `x-default`。
- **通过 `sitemap.ts` 和 `robots.ts` 约定生成多语言站点地图和 robots.txt**。
- **语言切换器使用真实的链接元素**，以便搜索引擎爬虫发现所有语言版本。
- **在 CI 中运行 `lingui extract`**，确保新消息不会在未翻译的情况下发布。

- [国际化与 SEO 指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/internationalization_and_SEO.md)
- [hreflang 多语言 SEO 指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/hreflang_guide_multilingual_seo.md)
- [Next.js 多语言 SEO 方案对比](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/nextjs-multilingual-seo-comparison.md)

## 在 Next.js 应用中配置 Lingui 的分步指南

以下是我们将要构建的项目结构：

```bash
.
├── lingui.config.ts
├── next.config.ts
└── src
    ├── proxy.ts                    # 语言路由与检测
    ├── locales
    │   ├── en
    │   │   └── messages.po         # 由 `lingui extract` 生成
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── i18n
    │   ├── config.ts               # 语言配置与 URL 辅助工具
    │   ├── appRouterI18n.ts        # 仅限服务端的目录与实例
    │   ├── initLingui.ts
    │   ├── negotiateLocale.ts
    │   └── metadata.ts             # generateMetadata 构建器
    ├── components
    │   ├── LinguiClientProvider.tsx
    │   ├── LocaleSwitcher.tsx
    │   └── LocalizedLink.tsx
    └── app
        ├── sitemap.ts
        ├── robots.ts
        └── [locale]
            ├── layout.tsx
            ├── page.tsx
            ├── not-found.tsx
            ├── [...rest]
            │   └── page.tsx        # 未知路径的本地化 404
            └── about
                └── page.tsx
```

<Steps>
<Step number={1} title="安装依赖">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

- **@lingui/core** / **@lingui/react**：运行时、`I18nProvider`、用于服务端组件的 `setI18n` 以及宏（`@lingui/core/macro`、`@lingui/react/macro`）。
- **@lingui/swc-plugin**：在 Next.js SWC 编译流水线中编译宏。
- **@lingui/loader**：在导入时编译 `.po` 目录，无需手动执行 `lingui compile`。
- **@lingui/cli**：通过 `lingui extract` 提取消息到语言目录中。

> `@lingui/swc-plugin` 是一个与 Next.js 的 SWC 版本绑定的 WebAssembly 插件。如果在升级 Next.js 后构建失败，请将插件更新到其 README 中注明的兼容版本。

</Step>
<Step number={2} title="集中管理语言环境配置">

使用单个文件统一定义语言和 URL 辅助函数。路由、元数据、站点地图以及 Lingui 均从中读取配置。

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** 公共源站地址，用于规范 URL、hreflang 和站点地图。 */
export const siteUrl = "https://example.com";

/** 存储访问者显式选择的语言环境 Cookie。 */
export const localeCookieName = "NEXT_LOCALE";

/** Open Graph 期望使用 `language_TERRITORY` 格式代码。 */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

export const resolveLocale = (value: string | undefined): Locale =>
  isLocale(value) ? value : defaultLocale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`，默认语言不带前缀。 */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

/** `/fr/about` → `/about` */
export const stripLocale = (pathname: string): string => {
  const [, firstSegment, ...rest] = pathname.split("/");

  return isLocale(firstSegment) ? `/${rest.join("/")}` : pathname;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="配置 Lingui 和 Next.js">

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

SWC 插件用于编译宏，loader 用于编译 `.po` 文件，同时支持 Turbopack（Next.js 16 默认）与 webpack：

```ts fileName="next.config.ts"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    swcPlugins: [["@lingui/swc-plugin", {}]],
  },
  turbopack: {
    rules: {
      "*.po": { loaders: ["@lingui/loader"], as: "*.js" },
    },
  },
  webpack: (config) => {
    config.module.rules.push({ test: /\.po$/, use: "@lingui/loader" });

    return config;
  },
};

export default nextConfig;
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

</Step>
<Step number={4} title="加载目录并创建服务端实例">

服务端组件没有 React context，因此 Lingui 提供了 `setI18n` 来为当前渲染注册实例。该模块在**每个服务端进程中仅加载一次**所有目录，并为每个语言环境创建一个 `I18n` 实例。它是 `server-only` 的：其他语言的目录绝不会进入客户端打包产物中。

```ts fileName="src/i18n/appRouterI18n.ts"
import "server-only";
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import { type Locale, locales } from "./config";

const loadCatalog = async (locale: Locale): Promise<[Locale, Messages]> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return [locale, messages];
};

const catalogs = Object.fromEntries(
  await Promise.all(locales.map(loadCatalog))
) as Record<Locale, Messages>;

const i18nInstances = Object.fromEntries(
  locales.map((locale) => [
    locale,
    setupI18n({ locale, messages: { [locale]: catalogs[locale] } }),
  ])
) as Record<Locale, I18n>;

export const getMessages = (locale: Locale): Messages => catalogs[locale];

export const getI18nInstance = (locale: Locale): I18n => i18nInstances[locale];
```

```ts fileName="src/i18n/initLingui.ts"
import { setI18n } from "@lingui/react/server";
import { getI18nInstance } from "./appRouterI18n";
import type { Locale } from "./config";

/**
 * 为当前服务端组件渲染注册实例。
 * 需在每个 layout 和 page 中调用。
 */
export const initLingui = (locale: Locale) => {
  const i18n = getI18nInstance(locale);

  setI18n(i18n);

  return i18n;
};
```

为了让 TypeScript 支持 `.po` 导入，声明一次模块类型：

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={5} title="创建客户端 Provider">

客户端组件从 React context 中读取翻译。Provider 从服务端布局接收当前活跃语言的目录，并初始化创建一次自身的实例。

```tsx fileName="src/components/LinguiClientProvider.tsx"
"use client";

import { type Messages, setupI18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { type ReactNode, useState } from "react";

type LinguiClientProviderProps = {
  children: ReactNode;
  initialLocale: string;
  initialMessages: Messages;
};

export const LinguiClientProvider = ({
  children,
  initialLocale,
  initialMessages,
}: LinguiClientProviderProps) => {
  const [i18n] = useState(() =>
    setupI18n({
      locale: initialLocale,
      messages: { [initialLocale]: initialMessages },
    })
  );

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};
```

</Step>
<Step number={6} title="定义动态语言路由">

`[locale]` 路径段包含根布局。`generateStaticParams` 在构建时预渲染每种语言，而 `dynamicParams = false` 会对任何其他前缀返回 404。

```tsx fileName="src/app/[locale]/layout.tsx"
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LinguiClientProvider } from "@/components/LinguiClientProvider";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { getMessages } from "@/i18n/appRouterI18n";
import { getTextDirection, isLocale, locales, siteUrl } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

// 未知前缀 (/xx/about) → 404
export const dynamicParams = false;

export const metadata: Metadata = {
  // 解析相对 canonical 与 Open Graph URL
  metadataBase: new URL(siteUrl),
};

const LocaleLayout = async ({ children, params }: LayoutProps<"/[locale]">) => {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  initLingui(locale);

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <body>
        <LinguiClientProvider
          initialLocale={locale}
          initialMessages={getMessages(locale)}
        >
          <header>
            <LocaleSwitcher />
          </header>
          <main>{children}</main>
        </LinguiClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> 客户端 provider 会接收当前活跃语言的完整目录。这就是基准测试中所衡量的“其他页面泄露”。将文本保留在服务端组件中可以限制客户端实际所需的内容。对于大型应用，Lingui 的实验性按页面提取器（`lingui.config.ts` 中的 `experimental.extractor`）可以按入口点拆分消息目录。

</Step>
<Step number={7} title="在服务端组件中使用翻译">

服务端组件使用与客户端组件相同的宏。由于在同一布局下的页面间导航时布局不会重新渲染，因此在页面中也必须调用 `initLingui`。

```tsx fileName="src/app/[locale]/about/page.tsx"
import { Trans, useLingui } from "@lingui/react/macro";
import { Counter } from "@/components/Counter";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const AboutPage = async ({ params }: PageProps<"/[locale]/about">) => {
  const { locale } = await params;

  initLingui(resolveLocale(locale));

  return <AboutContent />;
};

const AboutContent = () => {
  const { t } = useLingui();

  return (
    <section aria-label={t`About section`}>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Trans>
          We build <strong>fast</strong>, multilingual applications.
        </Trans>
      </p>
      <Counter />
    </section>
  );
};

export default AboutPage;
```

</Step>
<Step number={8} title="在客户端组件中使用翻译">

客户端组件使用相同的导入方式。宏会直接从 `LinguiClientProvider` 中读取实例。

```tsx fileName="src/components/Counter.tsx"
"use client";

import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { useState } from "react";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <p>{i18n.number(count)}</p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

</Step>
<Step number={9} title="提取并翻译你的消息">

运行提取命令。Lingui 会将 `src` 中找到的每条消息写入各个语言目录：

```bash
npm run i18n:extract
```

然后翻译每个条目的 `msgstr`：

<Tabs group="locale">
 <Tab value='fr' label='French'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Nous créons des applications <0>rapides</0> et multilingues."

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Spanish'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Creamos aplicaciones <0>rápidas</0> y multilingües."

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> `<0>` 占位符保留了 `<Trans>` 中的 JSX 元素位置，使翻译人员可以在不改动代码结构的情况下调整它们的位置。

</Step>
<Step number={10} title="配置用于语言路由的 Proxy" isOptional={true}>

Next.js 16 将 `middleware.ts` 重命名为 `proxy.ts`。Proxy 实现了“按需添加前缀”策略：

- `/fr/about` 按原样响应；
- `/en/about` 重定向至 `/about`，确保默认语言拥有唯一的 URL；
- `/about` 在内部重写为 `/en/about`，URL 保持不变；
- 首次访问 `/` 时重定向至首选语言（先检测 Cookie，再检测 `Accept-Language`）。

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

```ts fileName="src/proxy.ts"
import { type NextRequest, NextResponse } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  localizePath,
  stripLocale,
} from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];
  const url = request.nextUrl.clone();

  if (isLocale(firstSegment)) {
    // /en/about → /about: 默认语言使用唯一 URL
    if (firstSegment === defaultLocale) {
      url.pathname = stripLocale(pathname);

      return NextResponse.redirect(url, 308);
    }

    return NextResponse.next();
  }

  // 首次访问 "/": 将访问者重定向至其对应语言
  if (pathname === "/") {
    const cookieLocale = request.cookies.get(localeCookieName)?.value;
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      url.pathname = localizePath("/", preferredLocale);

      return NextResponse.redirect(url, 307);
    }
  }

  // /about → 由 /en/about 提供服务，URL 保持不变
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.rewrite(url);
};

export const config = {
  // 排除 API 路由、Next.js 内部文件和静态资源（sitemap.xml、robots.txt 等）
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

</Step>
<Step number={11} title="切换内容语言" isOptional={true}>

`usePathname` 返回浏览器当前看到的 URL（如 `/about` 或 `/fr/about`）。去除语言前缀后，构建每种语言对应的链接。切换器渲染真实的链接标签，以便搜索引擎爬虫发现所有语言版本，同时 Cookie 会持久化保存用户的显式选择。

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useLingui } from "@lingui/react/macro";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  localizePath,
  stripLocale,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  const { i18n, t } = useLingui();
  const basePath = stripLocale(usePathname());

  return (
    <nav aria-label={t`Change language`}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              href={localizePath(basePath, locale)}
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
<Step number={12} title="构建本地化链接组件" isOptional={true}>

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import { useLingui } from "@lingui/react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { type Locale, localizePath } from "@/i18n/config";

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  /** 不带语言前缀的路径，例如 "/about" */
  href: string;
};

export const LocalizedLink = ({ href, ...props }: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return <Link href={localizePath(href, i18n.locale as Locale)} {...props} />;
};
```

该组件在服务端组件中也能正常工作，因为它是在 `LinguiClientProvider` 内部渲染的：

```tsx
<LocalizedLink href="/about">
  <Trans>About us</Trans>
</LocalizedLink>
```

</Step>
<Step number={13} title="国际化你的元数据" isOptional={true}>

只要每个页面提供以下信息，各语言版本都能独立获得搜索引擎排名：

- **已翻译**的 `title` 和 `description`；
- 指向自身的 **canonical** 规范链接；
- **每个语言环境一个 `hreflang` 备用链接**，外加 **`x-default`**；
- **Open Graph** 的 `locale`、`alternateLocale` 和 `url`；
- 带有 `inLanguage` 的 **JSON-LD** 数据。

`generateMetadata` 在 React 组件树之外执行，因此它使用 `msg` 宏直接操作服务端实例：

```ts fileName="src/i18n/metadata.ts"
import type { Metadata } from "next";
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedMetadataOptions = {
  /** 不带语言前缀的路径，例如 "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedMetadata = ({
  path,
  locale,
  title,
  description,
}: LocalizedMetadataOptions): Metadata => {
  const url = getAbsoluteUrl(path, locale);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          locales.map((alternateLocale) => [
            alternateLocale,
            getAbsoluteUrl(path, alternateLocale),
          ])
        ),
        "x-default": getAbsoluteUrl(path, defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      locale: openGraphLocales[locale],
      alternateLocale: locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => openGraphLocales[alternateLocale]),
    },
  };
};
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { msg } from "@lingui/core/macro";
import type { Metadata } from "next";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";
import { buildLocalizedMetadata } from "@/i18n/metadata";

export const generateMetadata = async ({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> => {
  const locale = resolveLocale((await params).locale);
  const i18n = getI18nInstance(locale);

  return buildLocalizedMetadata({
    path: "/about",
    locale,
    title: i18n._(msg`About us`),
    description: i18n._(
      msg`Learn who we are and why we built this application.`
    ),
  });
};

// ... 第 7 步中的页面组件
```

JSON-LD 由页面本身渲染。页面文件只能导出 Next.js 约定的字段，因此请将该组件保存在独立文件中：

```tsx fileName="src/components/WebPageJsonLd.tsx"
import { getAbsoluteUrl, type Locale } from "@/i18n/config";

type WebPageJsonLdProps = {
  path: string;
  locale: Locale;
  title: string;
};

export const WebPageJsonLd = ({ path, locale, title }: WebPageJsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        url: getAbsoluteUrl(path, locale),
        inLanguage: locale,
      }),
    }}
  />
);
```

```tsx fileName="src/app/[locale]/about/page.tsx"
// 在 AboutContent 中使用
<WebPageJsonLd
  path="/about"
  locale={i18n.locale as Locale}
  title={t`About us`}
/>
```

</Step>
<Step number={14} title="国际化你的站点地图" isOptional={true}>

Next.js 的 `sitemap.ts` 约定支持 `alternates.languages`，Next.js 会将其渲染为 `xhtml:link` 备用链接。列出每种语言的每个 URL：

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const getAlternateLanguages = (path: string) => ({
  ...Object.fromEntries(
    locales.map((locale) => [locale, getAbsoluteUrl(path, locale)])
  ),
  "x-default": getAbsoluteUrl(path, defaultLocale),
});

const sitemap = (): MetadataRoute.Sitemap =>
  sitemapPages.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((locale) => ({
      url: getAbsoluteUrl(path, locale),
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: { languages: getAlternateLanguages(path) },
    }))
  );

export default sitemap;
```

</Step>
<Step number={15} title="国际化你的 robots.txt" isOptional={true}>

私有路由在每种语言中均存在，因此 `disallow` 规则必须覆盖所有本地化路径：

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    // /dashboard, /fr/dashboard, /es/dashboard...
    disallow: privatePaths.flatMap((path) =>
      locales.map((locale) => localizePath(path, locale))
    ),
  },
  sitemap: `${siteUrl}/sitemap.xml`,
});

export default robots;
```

</Step>
<Step number={16} title="处理本地化 404 页面" isOptional={true}>

`not-found.tsx` 在 `[locale]` 布局内部渲染，因此它可以正常访问客户端 provider。通配路由将语言内部的未知路径分发给它。Next.js 会自动向 404 响应添加 `noindex`。

```tsx fileName="src/app/[locale]/not-found.tsx"
"use client";

import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "@/components/LocalizedLink";

const NotFound = () => (
  <div>
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink href="/">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);

export default NotFound;
```

```tsx fileName="src/app/[locale]/[...rest]/page.tsx"
import { notFound } from "next/navigation";

// /fr/does/not/exist → 本地化的 not-found.tsx
const CatchAllPage = () => notFound();

export default CatchAllPage;
```

</Step>
<Step number={17} title="在 Server Actions 中获取语言环境" isOptional={true}>

Server Actions 不会直接接收路由参数。最可靠的做法是在已知语言环境的页面中随表单一同提交该语言信息：

```tsx fileName="src/app/[locale]/contact/page.tsx"
import { Trans } from "@lingui/react/macro";
import { sendContactMessage } from "@/app/actions/sendContactMessage";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const ContactPage = async ({ params }: PageProps<"/[locale]/contact">) => {
  const locale = resolveLocale((await params).locale);

  initLingui(locale);

  return (
    <form action={sendContactMessage}>
      <input type="hidden" name="locale" value={locale} />
      <textarea name="message" />
      <button type="submit">
        <Trans>Send</Trans>
      </button>
    </form>
  );
};

export default ContactPage;
```

```ts fileName="src/app/actions/sendContactMessage.ts"
"use server";

import { msg } from "@lingui/core/macro";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";

export const sendContactMessage = async (formData: FormData) => {
  const locale = resolveLocale(formData.get("locale")?.toString());
  const i18n = getI18nInstance(locale);

  const subject = i18n._(msg`Thanks for your message`);

  // await mailer.send({ subject, locale, ... });
  console.log(`[${locale}] ${subject}`);
};
```

</Step>
<Step number={18} title="保留宏定义，使用 Intlayer 缩减运行时体积" isOptional={true}>

[`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/lingui.md) 兼容适配器允许你保持源代码不变：宏照常编译，编译生成的 `i18n._()`、`useLingui()` 和 `<Trans>` 调用由 Intlayer 字典提供支持。在 Next.js 基准测试中，运行时体积从约 **72.1 KB 下降至约 10.7 KB** gzip。

在 Next.js 中，通过在 `next.config.ts`（webpack 与 Turbopack）中将 `@lingui/core` 和 `@lingui/react` 别名指向 `@intlayer/lingui`，并使用 `next-intlayer/server` 中的 `withIntlayer` 包装配置即可启用适配器。保留 `@lingui/swc-plugin` 以便宏能够先行编译。完整配置请参阅 [Lingui 兼容指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/lingui.md)。

正如基准测试表格所示，该适配器缩减了运行时体积，但在 Next.js 上尚未减少发送到每个页面的目录体积。它最适合作为迁移桥梁：一旦运行稳定，即可逐个组件迁移至原生 `useIntlayer` API，从而仅打包每个组件实际渲染的内容。请参阅 [Next.js + Intlayer 指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_16.md)、[Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/lingui_vs_intlayer-lingui.md) 以及所有[兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/index.md)。

</Step>
<Step number={19} title="使用 Intlayer 自动化翻译" isOptional={true}>

Lingui 可以提取消息，但手动填充数十个语言目录往往耗费大量时间。Intlayer 是**免费**且**开源**的，其工具链可以与 Lingui 协同工作：

- **通过 AI 翻译**：使用你自己的 API Key 和服务商。请参阅[自动填充](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/autoFill.md)和 [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)。
- **保留 PO 文件**作为单一数据源：使用 [PO 文件同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-po.md)。
- **在 CI 中检测缺失翻译**：请参阅[测试翻译](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/testing.md)。
- **审计线上站点**：使用 [scan 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/scan.md)检查缺失的 `hreflang`、错误的 canonical 链接以及语言泄露问题。

</Step>
</Steps>

## 常见问题解答

<FAQ>

<Question title="Lingui 是否支持 Next.js App Router 和 Server Components？">

支持。`@lingui/react` 支持 React Server Components。服务端组件通过 `@lingui/react/server` 中的 `setI18n` 注册实例，客户端组件从 `I18nProvider` 中读取实例，两者共用相同的 `Trans` 和 `useLingui` 宏。

</Question>
<Question title="为什么必须在每个页面和布局中调用 initLingui？">

服务端组件没有 React context，因此实例是按次渲染注册的。布局在跨页面导航时会被保留且不会重新渲染，因此页面不能依赖布局来设置语言环境。在每个布局和页面的顶部调用 `initLingui(locale)` 可以保持它们的独立性。

</Question>
<Question title="在 Next.js 中应该使用 SWC 插件还是 Babel？">

请使用 `@lingui/swc-plugin`。它能保留 SWC 流水线与 Turbopack 的极速构建能力。引入 Babel 配置会禁用 Next.js 的 SWC 从而拖慢构建速度。唯一的约束是需要保持插件版本与当前 Next.js 版本的 SWC 保持兼容。

</Question>
<Question title="如何使用 Lingui 翻译 generateMetadata？">

使用 `getI18nInstance(locale)` 获取服务端实例，并翻译通过 `msg` 宏声明的描述符：``i18n._(msg`About us`)``。返回 `alternates.canonical`、带 `x-default` 的 `alternates.languages` 以及 `openGraph.locale`。步骤 13 提供了一个可复用的辅助函数。

</Question>
<Question title="Lingui 在 Next.js 打包产物中的体积有多大？">

[基准测试](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/nextjs.md)测得运行时体积约为 72 KB gzip。每个语言使用独立目录时，页面体积约为 145 KB（无 i18n 基础应用为 141 KB），但每个页面仍会通过客户端 provider 接收到其他页面的消息。

</Question>
<Question title="Lingui、next-intl 与 next-i18next：Next.js 项目该如何选择？">

Lingui 适合喜欢在组件中编写源文本、并与 PO 文件及翻译人员协作的团队。next-intl 适合偏好 JSON 目录结构以及与 Next.js 深度集成的 `t("key")` API 的团队。next-i18next 则带来了丰富的 i18next 插件生态。详情请参阅 [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/next-i18next_vs_next-intl_vs_intlayer.md) 以及 [Next.js 基准测试](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/nextjs.md)。

</Question>
<Question title="能否在不重写组件的情况下从 Lingui 迁移到 Intlayer？">

可以。[`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/lingui.md) 适配器保留了宏语法并替换了底层运行时，之后你可以逐步将组件迁移到 `useIntlayer`。详情请参阅[兼容适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/index.md)。

</Question>

</FAQ>
