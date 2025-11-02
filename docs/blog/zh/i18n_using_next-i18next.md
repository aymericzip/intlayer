---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: 如何使用 next-i18next 国际化您的 Next.js 应用
description: 使用 next-i18next 设置国际化：多语言 Next.js 应用的最佳实践和 SEO 技巧，涵盖国际化、内容组织和技术设置。
slugs:
  - blog
  - nextjs-internationalization-using-next-i18next
applicationTemplate: https://github.com/aymericzip/next-i18next-template
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: 初始版本
---

# 2025 年如何使用 next-i18next 国际化您的 Next.js 应用

## 目录

<TOC/>

## 什么是 next-i18next？

**next-i18next** 是一个流行的 Next.js 应用国际化（i18n）解决方案。虽然最初的 `next-i18next` 包是为 Pages Router 设计的，但本指南将向您展示如何使用 `i18next` 和 `react-i18next` 直接在现代 **App Router** 中实现 i18next。

通过这种方法，您可以：

- **使用命名空间组织翻译**（例如，`common.json`、`about.json`），以更好地管理内容。
- **高效加载翻译**，仅加载每个页面所需的命名空间，减少包大小。
- **支持服务器和客户端组件**，实现正确的 SSR 和 hydration 处理。
- **确保 TypeScript 支持**，提供类型安全的语言配置和翻译键。
- **通过适当的元数据、站点地图和 robots.txt 国际化优化 SEO。**

> 作为替代方案，您也可以参考 [next-intl 指南](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/i18n_using_with_next-intl.md)，或直接使用 [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_16.md)。

> 查看 [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/next-i18next_vs_next-intl_vs_intlayer.md) 中的比较。

## 您应该遵循的实践

在我们深入实现之前，以下是您应该遵循的一些实践：

- **设置 HTML 的 `lang` 和 `dir` 属性**
- **在布局中，使用 `getLocaleDirection(locale)` 计算 `dir`，并设置 `<html lang={locale} dir={dir}>`，以确保正确的无障碍访问和 SEO。**
- **按命名空间拆分消息**
  按照语言和命名空间（例如 `common.json`、`about.json`）组织 JSON 文件，只加载所需内容。
- **最小化客户端负载**
  在页面中，只向 `NextIntlClientProvider` 发送所需的命名空间（例如，`pick(messages, ['common', 'about'])`）。
- **优先使用静态页面**
  尽可能使用静态页面，以获得更好的性能和 SEO。
- **服务器组件中的国际化**
  服务器组件，如页面或所有未标记为 `client` 的组件，都是静态的，可以在构建时预渲染。因此，我们需要将翻译函数作为 props 传递给它们。
- **设置 TypeScript 类型**
  确保您的 locales 在整个应用程序中实现类型安全。
- **重定向代理**
  使用代理来处理语言环境检测和路由，并将用户重定向到适当的带有语言前缀的 URL。
- **元数据、站点地图、robots.txt 的国际化**
  使用 Next.js 提供的 `generateMetadata` 函数对元数据、站点地图和 robots.txt 进行国际化，以确保搜索引擎在所有语言环境中更好地发现您的内容。
- **本地化链接**
  使用 `Link` 组件本地化链接，将用户重定向到适当的带有语言前缀的 URL。这对于确保您的页面在所有语言环境中的发现非常重要。
- **自动化测试和翻译**
  自动化测试和翻译有助于节省维护多语言应用程序的时间。

> 查看我们的文档，了解有关国际化和SEO的所有内容：[使用 next-intl 进行国际化 (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/internationalization_and_SEO.md)。

---

## 在 Next.js 应用中设置 i18next 的逐步指南

<iframe
  src="https://stackblitz.com/github/aymericzip/next-i18next-template?embed=1&ctl=1&file=src/app/i18n.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="演示 CodeSandbox - 如何使用 Intlayer 国际化您的应用"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"

> 查看 GitHub 上的[应用模板](https://github.com/aymericzip/next-i18next-template)。

以下是我们将要创建的项目结构：

```bash
.
├── i18n.config.ts
└── src # Src 是可选的
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── types
    │   └── i18next.d.ts
    ├── app
    │   ├── proxy.ts
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / （路由组，避免所有页面都被 home 消息污染）
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### 第一步：安装依赖

使用 npm 安装必要的包：

```bash packageManager="npm"
npm install i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add i18next react-i18next i18next-resources-to-backend
```

- **i18next**：核心国际化框架，负责翻译文件的加载和管理。
- **react-i18next**：i18next 的 React 绑定，提供如 `useTranslation` 的钩子，适用于客户端组件。
- **i18next-resources-to-backend**：一个插件，支持动态加载翻译文件，只加载你需要的命名空间。

### 第2步：配置您的项目

创建一个配置文件来定义您支持的语言环境、默认语言环境以及用于 URL 本地化的辅助函数。该文件作为您的 i18n 设置的唯一可信来源，并确保整个应用程序中的类型安全。

集中管理语言环境配置可以防止不一致情况，并使未来添加或移除语言环境更加容易。辅助函数确保生成的 URL 在 SEO 和路由方面保持一致。

```ts fileName="i18n.config.ts"
// 将支持的语言环境定义为 const 数组以确保类型安全
// 'as const' 断言使 TypeScript 推断为字面量类型，而不是 string[]
export const locales = ["en", "fr"] as const;

// 从 locales 数组中提取 Locale 类型
// 这会创建一个联合类型: "en" | "fr"
export type Locale = (typeof locales)[number];

// 设置默认语言环境，当未指定语言环境时使用
export const defaultLocale: Locale = "en";

// 需要特殊文本方向处理的从右到左语言
export const rtlLocales = ["ar", "he", "fa", "ur"] as const;

// 检查某语言环境是否需要从右到左（RTL）文本方向
// 用于阿拉伯语、希伯来语、波斯语和乌尔都语等语言
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

// 为给定语言环境和路径生成本地化路径
// 默认语言环境路径没有前缀（例如 "/about" 而非 "/en/about"）
// 其他语言环境路径带有前缀（例如 "/fr/about"）
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// 绝对 URL 的基础地址（用于站点地图、元数据等）
const ORIGIN = "https://example.com";

// 生成带有语言前缀的绝对 URL
// 用于 SEO 元数据、站点地图和规范 URL
export function absoluteUrl(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}

// 用于在浏览器中设置语言环境的 cookie
export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // 1 年
    "SameSite=Lax",
  ].join("; ");
}
```

### 第3步：集中管理翻译命名空间

为您的应用程序公开的每个命名空间创建一个单一的可信来源。重用此列表可以保持服务器、客户端和工具代码的同步，并为翻译辅助工具解锁强类型支持。

```ts fileName="src/i18n.namespaces.ts"
export const namespaces = ["common", "about"] as const;

export type Namespace = (typeof namespaces)[number];
```

### 第4步：使用 TypeScript 强类型化翻译键

扩展 `i18next` 指向您的规范语言文件（通常是英文）。TypeScript 会推断每个命名空间的有效键，因此对 `t()` 的调用会进行端到端的检查。

```ts fileName="src/types/i18next.d.ts"
import "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof import("@/locales/en/common.json");
      about: typeof import("@/locales/en/about.json");
    };
  }
}
```

> 提示：将此声明存放在 `src/types` 目录下（如果不存在，请创建该文件夹）。Next.js 已经在 `tsconfig.json` 中包含了 `src`，因此该增强会被自动识别。如果没有，请在你的 `tsconfig.json` 文件中添加以下内容：

```json5 fileName="tsconfig.json"
{
  "include": ["src/types/**/*.ts"],
}
```

有了这些配置，你就可以依赖自动补全和编译时检查：

```tsx
import { useTranslation, type TFunction } from "react-i18next";

const { t } = useTranslation("about");

// 正确，已类型化：t("counter.increment")
// 错误，编译时报错：t("doesNotExist")
export type AboutTranslator = TFunction<"about">;
```

### 第五步：设置服务器端 i18n 初始化

创建一个服务器端初始化函数，用于加载服务器组件的翻译。该函数为服务器端渲染创建一个独立的 i18next 实例，确保在渲染之前加载翻译内容。

服务器组件需要自己的 i18next 实例，因为它们运行在与客户端组件不同的上下文中。在服务器端预加载翻译可以防止未翻译内容的闪烁，并通过确保搜索引擎看到翻译内容来提升 SEO。

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces, type Namespace } from "@/i18n.namespaces";

// 配置 i18next 的动态资源加载
// 此函数根据 locale 和 namespace 动态导入翻译的 JSON 文件
// 例如：locale="fr"，namespace="about" -> 导入 "@/locales/fr/about.json"
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

const DEFAULT_NAMESPACES = [
  namespaces[0],
] as const satisfies readonly Namespace[];

/**
 * 初始化用于服务器端渲染的 i18next 实例
 *
 * @returns 已初始化的 i18next 实例，准备好用于服务器端
 */
export async function initI18next(
  locale: string,
  ns: readonly Namespace[] = DEFAULT_NAMESPACES
) {
  // 创建一个新的 i18next 实例（与客户端实例分开）
  const i18n = createInstance();

  // 使用 React 集成和后端加载器进行初始化
  await i18n
    .use(initReactI18next) // 启用 React hooks 支持
    .use(backend) // 启用动态资源加载
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns, // 仅加载指定的命名空间以提高性能
      defaultNS: "common", // 未指定时的默认命名空间
      interpolation: { escapeValue: false }, // 不转义 HTML（React 处理 XSS 保护）
      react: { useSuspense: false }, // 禁用 Suspense 以兼容 SSR
      returnNull: false, // 缺失键时返回空字符串而非 null
      initImmediate: false, // 延迟初始化直到资源加载完成（加快SSR速度）
    });
  return i18n;
}
```

### 第6步：创建客户端i18n提供者

创建一个客户端组件提供者，将你的应用包裹在i18next上下文中。该提供者接收从服务器预加载的翻译，防止未翻译内容闪烁（FOUC）并避免重复请求。

客户端组件需要自己的i18next实例，在浏览器中运行。通过接受服务器预加载的资源，我们确保无缝的hydration并防止内容闪烁。该提供者还动态管理语言切换和命名空间加载。

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance, type ResourceLanguage } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";

// 配置客户端的动态资源加载
// 与服务器端相同的模式，但此实例在浏览器中运行
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: readonly Namespace[];
  // 从服务器预加载的资源（防止 FOUC - 未翻译内容闪烁）
  // 格式: { namespace: translationBundle }
  resources?: Record<Namespace, ResourceLanguage>;
  children: React.ReactNode;
};

/**
 * 客户端 i18n 提供者，使用 i18next 上下文包裹应用
 * 接收服务器预加载的资源，避免重新请求翻译
 */
export default function I18nProvider({
  locale,
  namespaces = [allNamespaces[0]] as const,
  resources,
  children,
}: Props) {
  // 使用 useState 懒初始化创建 i18n 实例
  // 确保实例只创建一次，而不是每次渲染都创建
  const [i18n] = useState(() => {
    const i18nInstance = createInstance();

    i18nInstance
      .use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        // 如果提供了资源（来自服务器），则使用它们以避免客户端重新获取
        // 这可以防止闪烁（FOUC）并提升初始加载性能
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
        returnNull: false, // 防止返回未定义的值
      });

    return i18nInstance;
  });

  // 当 locale 属性变化时更新语言
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  // 确保客户端加载所有必需的命名空间
  // 使用 join("|") 作为依赖以正确比较数组
  useEffect(() => {
    i18n.loadNamespaces(namespaces);
  }, [namespaces.join("|"), i18n]);

  // 通过 React 上下文向所有子组件提供 i18n 实例
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

### 第7步：定义动态语言路由

通过在你的 app 文件夹中创建一个 `[locale]` 目录来设置语言的动态路由。这允许 Next.js 处理基于语言的路由，其中每个语言成为 URL 的一部分（例如 `/en/about`，`/fr/about`）。

使用动态路由使 Next.js 能够在构建时为所有语言生成静态页面，从而提升性能和 SEO。布局组件根据语言设置 HTML 的 `lang` 和 `dir` 属性，这对于无障碍访问和搜索引擎理解至关重要。

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

// 禁用动态参数 - 所有语言环境必须在构建时已知
// 这确保了所有语言环境路由的静态生成
export const dynamicParams = false;

/**
 * 在构建时为所有语言环境生成静态参数
 * Next.js 将为这里返回的每个语言环境预渲染页面
 * 示例: [{ locale: "en" }, { locale: "fr" }]
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * 根布局组件，处理语言环境特定的 HTML 属性
 * 根据语言环境设置 lang 属性和文本方向 (ltr/rtl)
 */
export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // 验证来自 URL 参数的 locale
  // 如果提供了无效的 locale，则回退到默认 locale
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  // 根据 locale 确定文本方向
  // 像阿拉伯语这样的 RTL 语言需要 dir="rtl" 以正确渲染文本
  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

### 第8步：创建您的翻译文件

为每个 locale 和命名空间创建 JSON 文件。此结构允许您逻辑地组织翻译，并且只加载每个页面所需的内容。

通过按命名空间（例如 `common.json`、`about.json`）组织翻译，可以实现代码拆分并减少包大小。您只需加载每个页面所需的翻译，从而提升性能。

```json fileName="src/locales/en/common.json"
{
  "appTitle": "Next.js i18n App",
  "appDescription": "Example Next.js application with internationalization using i18next"
}
```

```json fileName="src/locales/fr/common.json"
{
  "appTitle": "Application Next.js i18n",
  "appDescription": "Exemple d'application Next.js avec internationalisation utilisant i18next"
}
```

```json fileName="src/locales/en/home.json"
{
  "title": "Home",
  "description": "Home page description",
  "welcome": "Welcome",
  "greeting": "Hello, world!",
  "aboutPage": "About Page",
  "documentation": "Documentation"
}
```

通过按命名空间（例如 `common.json`、`about.json`）组织翻译，可以实现代码拆分并减少包大小。您只需加载每个页面所需的翻译，从而提升性能。

```json fileName="src/locales/en/common.json"
{
  "appTitle": "Next.js i18n 应用",
  "appDescription": "使用 i18next 进行国际化的 Next.js 示例应用"
}
```

```json fileName="src/locales/fr/common.json"
{
  "appTitle": "Application Next.js i18n",
  "appDescription": "Exemple d'application Next.js avec internationalisation utilisant i18next"
}
```

```json fileName="src/locales/en/home.json"
{
  "title": "首页",
  "description": "首页描述",
  "welcome": "欢迎",
  "greeting": "你好，世界！",
  "aboutPage": "关于页面",
  "documentation": "文档"
}
```

```json fileName="src/locales/fr/home.json"
{
  "title": "Accueil",
  "description": "Description de la page d'accueil",
  "welcome": "Bienvenue",
  "greeting": "Bonjour le monde!",
  "aboutPage": "Page À propos",
  "documentation": "Documentation"
}
```

```json fileName="src/locales/en/about.json"
{
  "title": "关于",
  "description": "关于页面描述",
  "counter": {
    "label": "计数器",
    "increment": "增加",
    "description": "点击按钮以增加计数"
  }
}
```

```json fileName="src/locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter",
    "description": "Cliquez sur le bouton pour augmenter le compteur"
  }
}
```

### 第9步：在页面中使用翻译

创建一个页面组件，在服务器端初始化 i18next，并将翻译传递给服务器和客户端组件。这确保了在渲染前加载翻译，防止内容闪烁。

服务器端初始化在页面渲染前加载翻译，提升 SEO 并防止 FOUC（无样式内容闪烁）。通过将预加载的资源传递给客户端提供者，避免重复获取，确保平滑的 hydration。

```tsx fileName="src/app/[locale]/about/index.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";
import type { ResourceLanguage } from "i18next";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

/**
 * 处理 i18n 初始化的服务器组件页面
 * 在服务器端预加载翻译并传递给客户端组件
 */
export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  // 定义此页面所需的翻译命名空间
  // 重用集中列表以确保类型安全和自动补全
  const pageNamespaces = allNamespaces;

  // 在服务器上使用所需命名空间初始化 i18next
  // 这会在服务器端加载翻译 JSON 文件
  const i18n = await initI18next(locale, pageNamespaces);

  // 获取“about”命名空间的固定翻译函数
  // getFixedT 锁定命名空间，因此使用 t("title") 而不是 t("about:title")
  const tAbout = i18n.getFixedT(locale, "about");

  // 从 i18n 实例中提取翻译包
  // 这些数据传递给 I18nProvider 以在客户端初始化 i18n
  // 防止 FOUC（未翻译内容闪烁）并避免重复请求
  const resources = Object.fromEntries(
    pageNamespaces.map((ns) => [ns, i18n.getResourceBundle(locale, ns)])
  ) satisfies Record<Namespace, ResourceLanguage>;

  return (
    <I18nProvider
      locale={locale}
      namespaces={pageNamespaces}
      resources={resources}
    >
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

### 第10步：在客户端组件中使用翻译

客户端组件可以使用 `useTranslation` 钩子来访问翻译。该钩子提供对翻译函数和 i18n 实例的访问，允许你翻译内容并访问语言环境信息。

客户端组件需要 React 钩子来访问翻译。`useTranslation` 钩子与 i18next 无缝集成，并在语言环境变化时提供响应式更新。

> 确保页面/提供者只包含你需要的命名空间（例如 `about`）。  
> 如果你使用 React 版本低于 19，记得对像 `Intl.NumberFormat` 这样的重型格式化器进行缓存。

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * 使用 React hooks 进行翻译的客户端组件示例
 * 可以使用 useState、useEffect 和 useTranslation 等 hooks
 */
const ClientComponent = () => {
  // useTranslation hook 提供访问翻译函数和 i18n 实例的能力
  // 指定命名空间以仅加载 "about" 命名空间的翻译
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  // 创建支持本地化的数字格式化器
  // i18n.language 提供当前语言环境（例如 "en", "fr"）
  // Intl.NumberFormat 根据语言环境约定格式化数字
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* 使用特定于语言环境的格式格式化数字 */}
      <p className="text-5xl font-bold text-white m-0">
        {numberFormat.format(count)}
      </p>
      <button
        type="button"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};

export default ClientComponent;
```

### 第11步：在服务器组件中使用翻译

服务器组件不能使用 React hooks，因此它们通过 props 从父组件接收翻译内容。这种方式保持了服务器组件的同步性，并允许它们嵌套在客户端组件内部。

可能嵌套在客户端边界下的服务器组件需要保持同步。通过将翻译字符串和语言信息作为 props 传递，我们避免了异步操作，确保了正确的渲染。

```tsx fileName="src/components/ServerComponent.tsx"
import type { TFunction } from "i18next";

type ServerComponentProps = {
  // 从父服务器组件传递的翻译函数
  // 服务器组件不能使用 hooks，因此翻译通过 props 传递
  t: TFunction<"about">;
  locale: string;
  count: number;
};

/**
 * 服务器组件示例 - 通过 props 接收翻译内容
 * 可以嵌套在客户端组件（异步服务器组件）内
 * 不能使用 React hooks，因此所有数据必须来自 props 或异步操作
 */
const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  // 使用 locale 在服务器端格式化数字
  // 这在 SSR 期间服务器上运行，提升初始页面加载速度
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-5xl font-bold text-white m-0">{formatted}</p>
      {/* 使用作为 prop 传入的翻译函数 */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xl font-semibold text-white">
          {t("counter.label")}
        </span>
        <span className="text-sm opacity-80 italic">
          {t("counter.description")}
        </span>
      </div>
    </div>
  );
};

export default ServerComponent;
```

---

### （可选）步骤12：更改内容语言

在 Next.js 中更改内容语言，推荐的方式是使用带有区域设置前缀的 URL 和 Next.js 的链接。下面的示例从路由中读取当前区域设置，从路径名中剥离它，并为每个可用的区域设置渲染一个链接。

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n.config";

export default function LocaleSwitcher() {
  const params = useParams();
  const pathname = usePathname();

  const activeLocale = (params?.locale as Locale | undefined) ?? defaultLocale;

  const getLocaleLabel = (locale: Locale): string => {
    try {
      const displayNames = new Intl.DisplayNames([locale], {
        type: "language",
      });
      return displayNames.of(locale) ?? locale.toUpperCase();
    } catch {
      return locale.toUpperCase();
    }
  };

  const basePath = useMemo(() => {
    if (!pathname) return "/";

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) return "/";

    const maybeLocale = segments[0] as Locale;

    if ((locales as readonly string[]).includes(maybeLocale)) {
      const rest = segments.slice(1).join("/");
      return rest ? `/${rest}` : "/";
    }

    return pathname;
  }, [pathname]);

  return (
    <nav aria-label="语言选择器">
      {(locales as readonly Locale[]).map((locale) => {
        const isActive = locale === activeLocale;

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
            {getLocaleLabel(locale)}
          </Link>
        );
      })}
    </nav>
  );
}
```

### （可选）步骤 13：构建本地化的 Link 组件

在整个应用中重用本地化的 URL 可以保持导航的一致性并有利于 SEO。将 `next/link` 包装在一个小的辅助函数中，该函数会为内部路由添加当前激活的 locale 前缀，同时保持外部 URL 不变。

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import NextLink, { type LinkProps } from "next/link";
import { useParams } from "next/navigation";
import type { ComponentProps, PropsWithChildren } from "react";
import {
  defaultLocale,
  type Locale,
  locales,
  localizedPath,
} from "@/i18n.config";

const isExternal = (href: string) => /^https?:\/\//.test(href);

type LocalizedLinkProps = PropsWithChildren<
  Omit<LinkProps, "href"> &
    Omit<ComponentProps<"a">, "href"> & { href: string; locale?: Locale }
>;

export default function LocalizedLink({
  href,
  locale,
  children,
  ...props
}: LocalizedLinkProps) {
  const params = useParams();
  const fallback = (params?.locale as Locale | undefined) ?? defaultLocale;
  const normalizedLocale = (locales as readonly string[]).includes(fallback)
    ? ((locale ?? fallback) as Locale)
    : defaultLocale;

  const normalizedPath = href.startsWith("/") ? href : `/${href}`;
  const localizedHref = isExternal(href)
    ? href
    : localizedPath(normalizedLocale, normalizedPath);

  return (
    <NextLink href={localizedHref} {...props}>
      {children}
    </NextLink>
  );
}
```

> 提示：由于 `LocalizedLink` 是一个即插即用的替代方案，可以通过交换导入并让组件处理特定语言环境的 URL 来逐步迁移。

### （可选）步骤 14：在服务器操作中访问当前语言环境

服务器操作通常需要当前语言环境来处理邮件、日志记录或第三方集成。将代理设置的语言环境 cookie 与 `Accept-Language` 头部结合使用，作为回退方案。

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { cookies, headers } from "next/headers";
import { defaultLocale, locales, type Locale } from "@/i18n.config";

const KNOWN_LOCALES = new Set(locales as readonly string[]);

const normalize = (value: string | undefined): Locale | undefined => {
  if (!value) return undefined;
  const base = value.toLowerCase().split("-")[0];
  return KNOWN_LOCALES.has(base) ? (base as Locale) : undefined;
};

export async function getCurrentLocale(): Promise<Locale> {
  const cookieLocale = normalize(cookies().get("NEXT_LOCALE")?.value);

  if (cookieLocale) return cookieLocale;

  const headerLocale = normalize(headers().get("accept-language"));
  return headerLocale ?? defaultLocale;
}

// 使用当前语言环境的服务器操作示例
export async function stuffFromServer(formData: FormData) {
  const locale = await getCurrentLocale();

  // 使用语言环境进行本地化的副作用（邮件、CRM 等）
  console.log(`服务器端操作，使用的语言环境为 ${locale}`);
}
```

> 由于该辅助工具依赖于 Next.js 的 cookies 和 headers，因此它适用于路由处理程序、服务器操作以及其他仅限服务器的上下文。

### （可选）步骤 15：国际化您的元数据

翻译内容很重要，但国际化的主要目标是让您的网站在全球范围内更具可见性。I18n 是通过适当的 SEO 提升网站可见性的强大杠杆。

正确国际化的元数据有助于搜索引擎理解您的页面支持哪些语言。这包括设置 hreflang 元标签、翻译标题和描述，以及确保为每个语言环境正确设置规范 URL。

以下是关于多语言 SEO 的一些最佳实践列表：

- 在 `<head>` 标签中设置 hreflang 元标签，帮助搜索引擎了解页面支持的语言
- 在 sitemap.xml 中使用 `http://www.w3.org/1999/xhtml` XML 规范列出所有页面翻译
- 不要忘记在 robots.txt 中排除带有前缀的页面（例如 `/dashboard`、`/fr/dashboard`、`/es/dashboard`）
- 使用自定义 Link 组件重定向到最本地化的页面（例如，法语中 `<a href="/fr/about">À propos</a>`）

开发者经常忘记正确地跨语言引用他们的页面。让我们来修正这个问题：

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import {
  locales,
  defaultLocale,
  localizedPath,
  absoluteUrl,
} from "@/i18n.config";

/**
 * 为每个语言版本的页面生成 SEO 元数据
 * 该函数在构建时为每个语言环境运行
 */
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // 动态导入该语言环境的翻译文件
  // 用于获取元数据的翻译标题和描述
  const messages = (await import(`@/locales/${locale}/about.json`)).default;

  // 为所有语言环境创建 hreflang 映射
  // 帮助搜索引擎理解语言替代版本
  // 格式: { "en": "/about", "fr": "/fr/about" }
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      // 此本地版本的规范 URL
      canonical: absoluteUrl(locale, "/about"),
      // 用于 SEO 的语言替代（hreflang 标签）
      // "x-default" 指定默认的本地版本
      languages: {
        ...languages,
        "x-default": absoluteUrl(defaultLocale, "/about"),
      },
    },
  };
}

export default async function AboutPage() {
  return <h1>关于</h1>;
}
```

### （可选）步骤16：国际化您的网站地图

生成包含所有本地版本页面的网站地图。这有助于搜索引擎发现并索引您内容的所有语言版本。

一个正确国际化的网站地图确保搜索引擎能够找到并索引您所有语言版本的页面。这提升了在国际搜索结果中的可见度。

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

/**
 * 获取所有语言环境及其本地化路径的映射
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

// 生成包含所有语言版本的站点地图，以提升SEO效果
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

### （可选）步骤17：国际化您的robots.txt

创建一个 robots.txt 文件，正确处理所有受保护路由的所有语言版本。这确保搜索引擎不会索引任何语言的管理员或仪表盘页面。

为所有语言正确配置 robots.txt 可以防止搜索引擎索引任何语言的敏感页面。这对于安全和隐私至关重要。

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

// 生成所有语言版本的路径（例如 /admin, /fr/admin, /es/admin）
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => `/${locale}${path}`),
];

const disallow = [...withAllLocales("/dashboard"), ...withAllLocales("/admin")];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
```

### （可选）步骤18：设置用于区域路由的中间件

创建一个代理，自动检测用户的首选语言环境，并将其重定向到相应的带有语言前缀的URL。这可以通过显示用户首选语言的内容来提升用户体验。

中间件确保用户访问您的网站时会自动重定向到其首选语言。它还会将用户的偏好保存在cookie中，以便未来访问时使用。

```ts fileName="src/proxy.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

// 匹配带有扩展名的文件的正则表达式（例如 .js、.css、.png）
// 用于排除静态资源不进行语言路由处理
const PUBLIC_FILE = /\.[^/]+$/;

/**
 * 从 Accept-Language 头部提取语言环境
 * 处理类似 "fr-CA"、"en-US" 等格式
 * 如果浏览器语言不支持，则回退到默认语言环境
 */
const pickLocale = (accept: string | null) => {
  // 获取首选语言（例如从 "fr-CA,en-US;q=0.9" 中获取 "fr-CA"）
  const raw = accept?.split(",")[0] ?? defaultLocale;
  // 提取基础语言代码（例如从 "fr-CA" 中提取 "fr"）
  const base = raw.toLowerCase().split("-")[0];
  // 检查是否支持该语言环境，否则使用默认语言
  return (locales as readonly string[]).includes(base) ? base : defaultLocale;
};

/**
 * Next.js 用于语言环境检测和路由的代理
 * 在每次请求页面渲染前运行
 * 需要时自动重定向到带语言环境前缀的 URL
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 跳过 Next.js 内部路径、API 路由和静态文件的代理
  // 这些路径不应带语言环境前缀
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // 检查 URL 是否已经带有语言环境前缀
  // 例如 "/fr/about" 或 "/en" 会返回 true
  const hasLocale = (locales as readonly string[]).some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // 如果没有语言前缀，则检测语言并重定向
  if (!hasLocale) {
    // 先尝试从 cookie 获取语言（用户偏好）
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

    // 如果 cookie 中的语言有效，则使用它，否则从浏览器头部检测语言
    const locale =
      cookieLocale && (locales as readonly string[]).includes(cookieLocale)
        ? cookieLocale
        : pickLocale(request.headers.get("accept-language"));

    // 克隆 URL 以修改路径名
    const url = request.nextUrl.clone();
    // 添加语言前缀到路径名
    // 特别处理根路径以避免出现双斜杠
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

    // 创建重定向响应并设置语言环境 cookie
    const res = NextResponse.redirect(url);
    res.cookies.set("NEXT_LOCALE", locale, { path: "/" });
    return res;
  }
}

export const config = {
  matcher: [
    // 匹配所有路径，除了：
    // - API 路由 (/api/*)
    // - Next.js 内部路径 (/_next/*)
    // - 静态文件 (/static/*)
    // - 带有扩展名的文件 (.*\\..*)
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

### （可选）步骤 19：使用 Intlayer 自动化您的翻译

Intlayer 是一个**免费**且**开源**的库，旨在协助您应用中的本地化流程。虽然 i18next 负责翻译的加载和管理，Intlayer 则帮助自动化翻译工作流。

手动管理翻译既耗时又容易出错。Intlayer 自动化了翻译的测试、生成和管理，节省您的时间并确保整个应用程序的一致性。

Intlayer 允许您：

- **在代码库中任意位置声明您的内容**  
  Intlayer 允许您使用 `.content.{ts|js|json}` 文件在代码库中任意位置声明内容。这将帮助更好地组织内容，确保代码库的可读性和可维护性。

- **测试缺失的翻译**  
  Intlayer 提供测试功能，可以集成到您的 CI/CD 流水线或单元测试中。了解更多关于[测试您的翻译](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/testing.md)。

- **自动化您的翻译**  
  Intlayer 提供了一个 CLI 和一个 VSCode 扩展来自动化您的翻译流程。它可以集成到您的 CI/CD 管道中。了解更多关于[自动化您的翻译](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)。  
  您可以使用您**自己的 API 密钥和您选择的 AI 提供商**。它还提供上下文感知的翻译，详见[填充内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/autoFill.md)。

- **连接外部内容**
- **自动化您的翻译**，  
  Intlayer 提供了一个 CLI 和一个 VSCode 扩展来自动化您的翻译。它可以集成到您的 CI/CD 流水线中。了解更多关于[自动化您的翻译](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)。  
  您可以使用您**自己的 API 密钥和您选择的 AI 提供商**。它还提供上下文感知的翻译，详见[填充内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/autoFill.md)。

- **连接外部内容**  
  Intlayer 允许您将内容连接到外部内容管理系统（CMS）。以优化的方式获取内容并将其插入到您的 JSON 资源中。了解更多关于[获取外部内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/function_fetching.md)。

- **可视化编辑器**  
  Intlayer 提供免费的可视化编辑器，使用可视化编辑器编辑您的内容。了解更多关于[可视化编辑您的翻译](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)。

以及更多功能。要发现 Intlayer 提供的所有功能，请参阅[Intlayer 的优势文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/interest_of_intlayer.md)。
