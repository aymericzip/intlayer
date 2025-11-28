---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: 如何使用 next-intl 国际化你的 Next.js 应用
description: 使用 next-intl 设置 i18n：多语言 Next.js 应用的最佳实践和 SEO 提示，涵盖国际化、内容组织和技术设置。
keywords:
  - next-intl
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - nextjs-internationalization-using-next-intl
applicationTemplate: https://github.com/aymericzip/next-intl-template
history:
  - version: 7.0.0
    date: 2025-11-01
    changes: 初始版本
---

# 2025 年如何使用 next-intl 国际化你的 Next.js 应用

## 目录

<TOC/>

## 什么是 next-intl？

**next-intl** 是一个专为 Next.js App Router 设计的流行国际化（i18n）库。它提供了一种无缝构建多语言 Next.js 应用的方法，具备出色的 TypeScript 支持和内置优化。

> 如果你愿意，也可以参考 [next-i18next 指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/i18n_using_next-i18next.md)，或者直接使用 [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_next-intl.md)。

> 查看 [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/next-i18next_vs_next-intl_vs_intlayer.md) 中的比较。

## 你应该遵循的实践

在我们深入实现之前，以下是你应该遵循的一些实践：

- **设置 HTML 的 `lang` 和 `dir` 属性**  
  在你的布局中，使用 `getLocaleDirection(locale)` 计算 `dir`，并设置 `<html lang={locale} dir={dir}>`，以确保良好的无障碍访问和 SEO。
- **按命名空间拆分消息**  
  按照 locale 和命名空间组织 JSON 文件（例如，`common.json`、`about.json`），只加载你需要的内容。
- **最小化客户端负载**  
  在页面中，只向 `NextIntlClientProvider` 发送所需的命名空间（例如，`pick(messages, ['common', 'about'])`）。
- **优先使用静态页面**  
  尽可能使用静态页面，以获得更好的性能和 SEO。
- **服务器组件中的国际化（I18n）**  
  服务器组件，比如页面或所有未标记为 `client` 的组件，都是静态的，可以在构建时预渲染。因此，我们需要将翻译函数作为 props 传递给它们。
- **设置 TypeScript 类型**  
  为你的 locales 设置类型，以确保整个应用程序的类型安全。
- **代理重定向**  
  使用代理来处理语言环境检测和路由，并将用户重定向到相应的带有语言前缀的 URL。
- **元数据、站点地图、robots.txt 的国际化**  
  使用 Next.js 提供的 `generateMetadata` 函数对元数据、站点地图、robots.txt 进行国际化，以确保搜索引擎在所有语言环境中更好地发现你的内容。
- **本地化链接**  
  使用 `Link` 组件本地化链接，将用户重定向到带有适当语言前缀的 URL。确保您的页面在所有语言环境中都能被发现非常重要。
- **自动化测试和翻译**
  自动化测试和翻译有助于节省维护多语言应用程序的时间。

> 查看我们的文档，了解有关国际化和 SEO 的所有内容：[使用 next-intl 进行国际化 (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/internationalization_and_SEO.md)。

---

## 在 Next.js 应用中逐步设置 next-intl 指南

<iframe
  src="https://stackblitz.com/github/aymericzip/next-intl-template?embed=1&ctl=1&file=src/i18n.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="演示 CodeSandbox - 如何使用 Intlayer 实现应用国际化"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"

> 查看 GitHub 上的[应用模板](https://github.com/aymericzip/next-intl-template)。

以下是我们将创建的项目结构：

```bash
.
├── global.ts
├── locales
│   ├── en
│   │  ├── common.json
│   │  └── about.json
│   ├── fr
│   │  ├── common.json
│   │  └── about.json
│   └── es
│      ├── common.json
│      └── about.json
└── src # Src 是可选的
    ├── proxy.ts
    ├── app
    │   ├── i18n.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / （路由组，避免所有页面都加载首页资源）
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### 第一步：安装依赖

使用 npm 安装必要的包：

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

- **next-intl**：Next.js App Router 的核心国际化库，提供用于管理翻译的 hooks、服务器函数和客户端提供者。

### 第二步：配置项目

创建一个配置文件，定义你支持的语言环境并设置 next-intl 的请求配置。该文件作为你的国际化设置的唯一可信来源，并确保整个应用中的类型安全。

集中管理语言环境配置可以防止不一致问题，并且使未来添加或移除语言环境更加方便。`getRequestConfig` 函数会在每次请求时运行，仅加载每个页面所需的翻译，从而实现代码拆分并减少包大小。

```tsx fileName="src/i18n.ts"
import { notFound } from "next/navigation";
import createMiddleware from "next-intl/middleware";
import { createNavigation } from "next-intl/navigation";

// 使用类型安全定义支持的语言环境
export const locales = ["en", "fr", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isRTL(locale: Locale | (string & {})) {
  // 判断是否为从右到左的语言
  return /^(ar|fa|he|iw|ur|ps|sd|ug|yi|ckb|ku)(-|$)/i.test(locale);
}

// 根据 locale 动态加载消息以支持代码拆分
// Promise.all 并行加载命名空间以提升性能
async function loadMessages(locale: Locale) {
  // 仅加载布局/页面所需的命名空间
  const [common, home, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/home.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
    // ... 未来的 JSON 文件应在此处添加
  ]);

  return { common, home, about } as const;
}

// 生成本地化 URL 的辅助函数（例如 /about 与 /fr/about）
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// getRequestConfig 在每次请求时运行，并为服务器组件提供消息
// 这是 next-intl 钩入 Next.js 服务器端渲染的地方
export default async function getRequestConfig({
  requestLocale,
}: {
  requestLocale: Promise<string | undefined>;
}) {
  const requested: Locale = ((await requestLocale) as Locale) ?? defaultLocale;

  if (!locales.includes(requested)) notFound();

  return {
    locale: requested,
    messages: await loadMessages(requested),
  };
}

export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // 1 年
    "SameSite=Lax",
  ].join("; ");
}

const routingOptions = {
  locales,
  defaultLocale,
  localePrefix: "as-needed", // 将 /en/... 路由更改为 /...
  // 可选：本地化路径名
  // pathnames: {
  //   '/': '/',
  //   '/about': {en: '/about', fr: '/a-propos', es: '/acerca-de'},
  //   '/blog/[slug]': '/blog/[slug]'
  // }
  //  localeDetection: true, // 防止从 cookie 重定向 "/" 到 "/en"
} as const;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routingOptions);

export const proxy = createMiddleware(routingOptions);
```

### 第三步：定义动态语言路由

通过在您的应用程序文件夹中创建一个 `[locale]` 目录来设置基于语言环境的动态路由。这允许 Next.js 处理基于语言环境的路由，其中每个语言环境成为 URL 的一部分（例如 `/en/about`，`/fr/about`）。

使用动态路由使 Next.js 能够在构建时为所有语言环境生成静态页面，从而提升性能和 SEO。布局组件根据语言环境设置 HTML 的 `lang` 和 `dir` 属性，这对于无障碍访问和搜索引擎的理解至关重要。

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import { getLocaleDirection, setRequestLocale } from "next-intl/server";

// 在构建时预生成所有语言环境的静态页面（SSG）
// 这提升了性能和 SEO
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // 在 Next.js App Router 中，params 是一个 Promise（可以使用 await）
  // 这允许动态路由段异步解析
  const { locale } = await params;

  // 关键：setRequestLocale 告诉 next-intl 本次请求使用哪个 locale
  // 如果没有这一步，getTranslations() 无法知道在服务端组件中使用哪个 locale
  setRequestLocale(locale);

  // 获取文本方向（LTR/RTL），以便正确渲染 HTML
  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // 消息在服务器端加载。只推送客户端所需的内容。
  // 这可以最小化发送到浏览器的 JavaScript 包大小
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // 严格的服务器端翻译/格式化
  // 这些在服务器上运行，可以作为 props 传递给组件
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider 使翻译对客户端组件可用
    // 只传递客户端组件实际使用的命名空间
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

### 第4步：创建您的翻译文件

为每个语言环境和命名空间创建 JSON 文件。此结构允许您逻辑性地组织翻译内容，并且只加载每个页面所需的内容。

按命名空间组织翻译（例如，`common.json`、`about.json`）可以实现代码拆分并减少包大小。您只加载每个页面所需的翻译，从而提升性能。

```json fileName="locales/en/common.json"
{
  "welcome": "Welcome",
  "greeting": "Hello, world!"
}
```

```json fileName="locales/fr/common.json"
{
  "welcome": "Bienvenue",
  "greeting": "Bonjour le monde!"
}
```

```json fileName="locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "title": "关于",
  "description": "关于页面描述",
  "counter": {
    "label": "计数器",
    "increment": "递增"
  }
}
```

### 第5步：在页面中使用翻译

创建一个页面组件，在服务器端加载翻译，并将其传递给服务器和客户端组件。这确保了翻译在渲染之前加载，防止内容闪烁。

服务器端加载翻译可以提升SEO效果并防止FOUC（未翻译内容闪烁）。通过使用 `pick` 仅将所需的命名空间发送给客户端提供者，我们可以最小化发送到浏览器的JavaScript包大小。

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // 消息在服务器端加载。只推送客户端所需的内容。
  // 这可以最小化发送到浏览器的 JavaScript 包大小
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // 纯服务器端的翻译/格式化
  // 这些在服务器上运行，可以作为属性传递给组件
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider 使翻译对客户端组件可用
    // 只传递客户端组件实际使用的命名空间
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

### 第6步：在客户端组件中使用翻译

客户端组件可以使用 `useTranslations` 和 `useFormatter` 钩子来访问翻译和格式化函数。这些钩子从 `NextIntlClientProvider` 上下文中读取数据。

客户端组件需要 React 钩子来访问翻译。`useTranslations` 和 `useFormatter` 钩子与 next-intl 无缝集成，并在语言环境更改时提供响应式更新。

> 别忘了将所需的命名空间添加到页面的客户端消息中（只包含客户端组件实际需要的命名空间）。

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponent = () => {
  // 直接作用于嵌套对象
  // useTranslations/useFormatter 是从 NextIntlClientProvider 上下文读取的钩子
  // 只有组件被包裹在 NextIntlClientProvider 中时它们才有效
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

### 第7步：在服务器组件中使用翻译

服务器组件不能使用 React 钩子，因此它们通过父组件的 props 接收翻译和格式化函数。这种方法保持服务器组件的同步性，并允许它们嵌套在客户端组件内。

可能嵌套在客户端边界下的服务器组件需要是同步的。通过将翻译后的字符串和格式化的值作为 props 传递，我们避免了异步操作并确保正确渲染。在父页面组件中预先计算翻译和格式化。

```tsx fileName="src/components/ServerComponent.tsx"
// 嵌套在客户端组件内的服务器组件必须是同步的
// React 无法在服务器/客户端边界序列化异步函数
// 解决方案：在父组件中预先计算翻译/格式化，并作为 props 传递
type ServerComponentProps = {
  formattedCount: string; // 格式化后的计数
  label: string; // 标签文本
  increment: string; // 增加按钮文本
};

const ServerComponent = ({
  formattedCount,
  label,
  increment,
}: ServerComponentProps) => {
  return (
    <div>
      <p>{formattedCount}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

> 在你的页面或布局中，使用 `next-intl/server` 中的 `getTranslations` 和 `getFormatter` 预先计算翻译和格式化，然后将它们作为 props 传递给服务器组件。

---

### （可选）步骤 8：更改内容语言

要使用 next-intl 更改内容语言，渲染指向相同路径名但切换语言环境的本地化链接。Provider 会自动重写 URL，因此你只需针对当前路由即可。

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n";

const getLocaleLabel = (locale: Locale): string => {
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: "language" });
    return displayNames.of(locale) ?? locale.toUpperCase();
  } catch {
    return locale.toUpperCase();
  }
};

const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
  es: "🇪🇸",
};

export default function LocaleSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();

  // 从路径名中移除语言前缀以获取基础路径
  const getBasePath = (path: string) => {
    for (const locale of locales) {
      if (path.startsWith(`/${locale}`)) {
        return path.slice(locale.length + 1) || "/";
      }
    }
    return path;
  };

  const basePath = getBasePath(pathname);

  return (
    <nav aria-label="语言选择器">
      <div>
        {(locales as readonly Locale[]).map((locale) => {
          const isActive = locale === activeLocale;
          // 根据是否为默认语言构建 href
          const href =
            locale === defaultLocale ? basePath : `/${locale}${basePath}`;
          return (
            <Link
              key={locale}
              href={href}
              aria-current={isActive ? "page" : undefined}
              onClick={() => {
                document.cookie = getCookie(locale);
              }}
            >
              <span>{localeFlags[locale]}</span>
              <span>{getLocaleLabel(locale)}</span>
              <span>{locale.toUpperCase()}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

### （可选）步骤 9：使用本地化的 Link 组件

`next-intl` 提供了一个子包 `next-intl/navigation`，其中包含一个自动应用当前活动语言环境的本地化链接组件。我们已经在 `@/i18n` 文件中为你提取好了它，所以你可以这样使用：

```tsx fileName="src/components/MyComponent.tsx"
import { Link } from "@/i18n";

return <Link href="/about">t("about.title")</Link>;
```

### （可选）步骤 10：在服务器操作中访问活动语言环境

服务器操作可以使用 `next-intl/server` 读取当前语言环境。这对于发送本地化邮件或在提交的数据中存储语言偏好非常有用。

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { getLocale } from "next-intl/server";

export async function getCurrentLocale() {
  return getLocale();
}

export async function handleContactForm(formData: FormData) {
  const locale = await getCurrentLocale();

  // 使用 locale 来选择模板、分析标签等。
  console.log(`收到来自 locale ${locale} 的联系表单`);
}
```

> `getLocale` 会读取由 `next-intl` 代理设置的 locale，因此它可以在服务器的任何地方使用：路由处理程序、服务器操作和边缘函数。

### （可选）步骤 11：国际化您的元数据

翻译内容很重要，但国际化的主要目标是让您的网站对全世界更具可见性。I18n 是通过适当的 SEO 显著提升您网站可见性的强大杠杆。

正确国际化的元数据帮助搜索引擎理解您的页面支持哪些语言。这包括设置 hreflang 元标签、翻译标题和描述，以及确保为每个语言环境正确设置规范 URL。

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n";
import { getTranslations } from "next-intl/server";

// generateMetadata 为每个语言环境运行，生成对 SEO 友好的元数据
// 这有助于搜索引擎理解备用语言版本
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
}

// ... 页面其余代码
```

### （可选）步骤12：国际化您的网站地图

生成包含所有页面本地化版本的站点地图。这有助于搜索引擎发现并索引您内容的所有语言版本。

一个正确国际化的站点地图确保搜索引擎能够找到并索引您页面的所有语言版本，从而提升在国际搜索结果中的可见性。

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

/**
 * 获取所有语言及其本地化路径的映射
 *
 * 示例输出:
 * {
 *   "en": "https://example.com",
 *   "fr": "https://example.com/fr",
 *   "es": "https://example.com/es",
 *   "x-default": "https://example.com"
 * }
 */
const getLocalizedMap = (path: string) =>
  Object.fromEntries([
    ...locales.map((locale) => [locale, formatterLocalizedPath(locale, path)]),
    ["x-default", formatterLocalizedPath(defaultLocale, path)],
  ]);

// 生成包含所有语言版本的站点地图以提升SEO效果
// alternates字段告知搜索引擎关于语言版本的信息
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: { languages: getLocalizedMap("/") },
    },
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: getLocalizedMap("/about") },
    },
  ];
}
```

### （可选）步骤 13：国际化您的 robots.txt

创建一个 robots.txt 文件，正确处理所有受保护路由的所有语言版本。这确保搜索引擎不会索引任何语言的管理员或仪表盘页面。

为所有语言正确配置 robots.txt 可以防止搜索引擎在您的路由因语言不同而变化时索引敏感页面。

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
// 为所有语言生成路径（例如 /admin、/fr/admin、/es/admin）
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
}
```

### （可选）步骤14：为本地化路由设置代理

创建一个代理，自动检测用户的首选语言环境，并将其重定向到相应的带有语言前缀的 URL。next-intl 提供了一个方便的代理函数，可以自动处理此操作。

代理确保用户访问您的网站时会自动重定向到他们偏好的语言。它还会保存用户的偏好，以便未来访问时使用，从而提升用户体验。

```ts fileName="src/proxy.ts"
import { proxy } from "@/i18n";

// 中间件在路由之前运行，处理语言环境检测和路由
// localeDetection: true 使用 Accept-Language 头自动检测语言环境
export default proxy;

export const config = {
  // 跳过 API、Next 内部路径和静态资源
  // 正则表达式：匹配所有路由，排除以 api、_next 开头或包含点（文件）的路径
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### （可选）步骤 15：为语言环境设置 TypeScript 类型

设置 TypeScript 将帮助您获得键的自动补全和类型安全。

为此，您可以在项目根目录下创建一个 global.ts 文件，并添加以下代码：

```ts fileName="global.ts"
import type { locales } from "@/i18n";

type Messages = {
  common: typeof import("./locales/en/common.json");
  home: typeof import("./locales/en/home.json");
  about: typeof import("./locales/en/about.json");
  // ... 未来的 JSON 文件也应在此添加
};

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof locales)[number];
    Messages: Messages;
  }
}
```

此代码将使用模块增强（Module Augmentation）将 locales 和 messages 添加到 next-intl 的 AppConfig 类型中。

### （可选）步骤 15：使用 Intlayer 自动化您的翻译工作

Intlayer 是一个 **免费** 和 **开源** 的库，旨在协助您的应用程序的本地化过程。虽然 next-intl 负责翻译的加载和管理，Intlayer 则帮助自动化翻译工作流程。

手动管理翻译既耗时又容易出错。Intlayer 自动化翻译的测试、生成和管理，节省您的时间，并确保整个应用程序的一致性。

Intlayer 允许您：

- **在代码库中任意位置声明您的内容**  
  Intlayer 允许您使用 `.content.{ts|js|json}` 文件在代码库中任意位置声明内容。这将有助于更好地组织内容，确保代码库的可读性和可维护性。

- **测试缺失的翻译**
  Intlayer 提供可集成到您的 CI/CD 流水线或单元测试中的测试功能。了解更多关于[测试您的翻译](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/testing.md)。

- **自动化您的翻译**  
  Intlayer 提供了一个 CLI 和一个 VSCode 扩展来自动化您的翻译。它可以集成到您的 CI/CD 流水线中。了解更多关于[自动化您的翻译](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)。  
  您可以使用**您自己的 API 密钥和您选择的 AI 提供商**。它还提供上下文感知的翻译，详见[填充内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/autoFill.md)。

- **连接外部内容**  
  Intlayer 允许您将内容连接到外部内容管理系统（CMS）。以优化的方式获取内容并将其插入到您的 JSON 资源中。了解更多关于[获取外部内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/function_fetching.md)的信息。

- **可视化编辑器**  
  Intlayer 提供免费的可视化编辑器，使用可视化编辑器编辑您的内容。了解更多关于[可视化编辑您的翻译](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)的信息。

以及更多功能。要发现 Intlayer 提供的所有功能，请参阅[Intlayer 的优势文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/interest_of_intlayer.md)。
