---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: 如何使用 next-i18next 翻译你的 Next.js 15 —— 2025 年国际化 (i18n) 指南
description: 一个实用且适用于生产环境的指南，教你如何使用 i18next/next-i18next 国际化 Next.js 15 App Router 应用，并通过 Intlayer 进行增强。
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Next.js 15
  - next-i18next
  - i18next
  - JavaScript
  - React
slugs:
  - doc
  - next-i18next
applicationTemplate: https://github.com/aymericzip/intlayer-next-i18next-template
---

# 使用 Intlayer 翻译你的 Next.js 15 next-i18next 网站 | 国际化 (i18n)

### 本指南适用对象

- **初级**：按照步骤操作并复制代码块，你将获得一个可用的多语言应用。
- **中级**：使用检查清单和最佳实践提示，避免常见陷阱。
- **高级**：浏览高层结构、SEO 和自动化部分；你会发现合理的默认设置和扩展点。

### 你将构建的内容

- 带有本地化路由的 App Router 项目（例如 `/`、`/fr/...`）
- 包含 locales、默认语言、RTL 支持的 i18n 配置
- 服务器端 i18n 初始化和客户端提供者
- 按需加载的命名空间翻译
- 支持 `hreflang`、本地化 `sitemap` 和 `robots` 的 SEO
- 用于语言路由的中间件
- 集成 Intlayer 以自动化翻译工作流（测试、AI 填充、JSON 同步）

> 注意：next-i18next 是构建在 i18next 之上的。本指南使用与 next-i18next 在 App Router 中兼容的 i18next 原语，同时保持架构简单且适合生产环境。
> 如需更全面的比较，请参见 [next-i18next vs next-i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/next-i18next_vs_next-i18next_vs_intlayer.md)。

---

## 1) 项目结构

安装 next-i18next 依赖：

```bash packageManager="npm"
npm install next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add next-i18next i18next react-i18next i18next-resources-to-backend
```

从清晰的结构开始。保持消息按语言环境和命名空间分开。

```bash
.
├── i18n.config.ts
└── src
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── app
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

检查清单（中高级）：

- 每个语言环境每个命名空间保持一个 JSON 文件
- 不要过度集中消息；使用小型的页面/功能范围命名空间
- 避免一次导入所有语言环境；只加载你需要的

---

## 2) 安装依赖

```bash
bash
pnpm add i18next react-i18next i18next-resources-to-backend
```

如果您计划使用 next-i18next 的 API 或配置互操作，还需执行：

```bash
pnpm add next-i18next
```

---

## 3) 核心 i18n 配置

定义 locales、默认 locale、RTL 以及本地化路径/URL 的辅助函数。

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const rtlLocales = ["ar", "he", "fa", "ur"] as const;
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

高级提示：如果你使用 `next-i18next.config.js`，请确保它与 `i18n.config.ts` 保持一致，以避免偏差。

---

## 4) 服务器端 i18n 初始化

在服务器端初始化 i18next，使用动态后端仅导入所需的 locale/namespace JSON。

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

// 从 src/locales/<locale>/<namespace>.json 加载 JSON 资源
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export async function initI18next(
  locale: string,
  namespaces: string[] = ["common"]
) {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backend)
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  return i18n;
}
```

中间提示：保持每页的命名空间列表简短以限制负载。避免使用全局的“捕获所有”包。

---

## 5) React 组件的客户端提供者

使用一个提供者包裹客户端组件，该提供者与服务器配置相对应，并且只加载请求的命名空间。

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import * as React from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: string[];
  resources?: Record<string, any>; // { ns: bundle }
  children: React.ReactNode;
};

export default function I18nProvider({
  locale,
  namespaces = ["common"],
  resources,
  children,
}: Props) {
  const [i18n] = React.useState(() => {
    const i = createInstance();

    i.use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      });

    return i;
  });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

初级提示：您不需要将所有消息传递给客户端。只需从页面的命名空间开始。

---

## 6) 本地化布局和路由

设置语言和方向，并为每个语言预生成路由，以支持静态渲染。

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 7) 服务器端 + 客户端使用示例页面

```tsx fileName="src/app/[locale]/about.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

// 强制页面静态渲染
export const dynamic = "force-static";

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const namespaces = ["common", "about"] as const;

  const i18n = await initI18next(locale, [...namespaces]);
  const tAbout = i18n.getFixedT(locale, "about");

  return (
    <I18nProvider locale={locale} namespaces={[...namespaces]}>
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

翻译（每个命名空间一个 JSON，位于 `src/locales/...` 下）：

```json fileName="src/locales/zh/about.json"
{
  "title": "关于",
  "description": "关于页面描述",
  "counter": {
    "label": "计数器",
    "increment": "增加"
  }
}
```

```json fileName="src/locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

客户端组件（仅加载所需的命名空间）：

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ClientComponent = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
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

> 确保页面/提供者只包含你需要的命名空间（例如，`about`）。
> 如果你使用的是 React 版本低于 19，建议对像 `Intl.NumberFormat` 这样开销较大的格式化器进行缓存。

嵌套在客户端边界下的同步服务器组件：

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  t: (key: string) => string; // 翻译函数
  locale: string; // 当前语言环境
  count: number; // 计数值
};

const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};

export default ServerComponent;
```

---

## 8) SEO：元数据，Hreflang，站点地图，Robots

翻译内容是提升覆盖范围的一种手段。请彻底配置多语言SEO。

最佳实践：

- 在根节点设置 `lang` 和 `dir`
- 为每个语言添加 `alternates.languages`（加上 `x-default`）
- 在 `sitemap.xml` 中列出翻译后的URL并使用 `hreflang`
- 在 `robots.txt` 中排除本地化的私有区域（例如 `/fr/admin`）

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // 从 src/locales 导入正确的 JSON 包
  const messages = (await import("@/locales/" + locale + "/about.json"))
    .default;

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
}

export default async function AboutPage() {
  return <h1>关于</h1>;
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, abs(locale, "/about")])
  );

  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    },
  ];
}
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => localizedPath(locale, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: ORIGIN + "/sitemap.xml",
  };
}
```

---

## 9) 用于本地化路由的中间件

检测语言环境，如果缺失则重定向到本地化路由。

```ts fileName="src/middleware.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

const PUBLIC_FILE = /\.[^/]+$/; // 排除带扩展名的文件

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const hasLocale = locales.some(
    (locale) =>
      pathname === "/" + locale || pathname.startsWith("/" + locale + "/")
  );
  if (!hasLocale) {
    const locale = defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = "/" + locale + (pathname === "/" ? "" : pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    // 匹配所有路径，除了以这些开头的路径和带有扩展名的文件
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

---

## 10) 性能和开发体验最佳实践

- **设置 html 的 `lang` 和 `dir` 属性**：已在 `src/app/[locale]/layout.tsx` 中完成。
- **按命名空间拆分消息**：保持包体积小（如 `common.json`、`about.json` 等）。
- **最小化客户端负载**：在页面中只向 provider 传递所需的命名空间。
- **优先使用静态页面**：针对每个 locale 使用 `export const dynamic = 'force-static'` 和 `generateStaticParams`。
- **同步服务器组件**：传递预计算的字符串/格式，而不是在渲染时进行异步调用。
- **对重操作进行记忆化**：尤其是在旧版本 React 的客户端代码中。
- **缓存和头部设置**：尽可能优先使用静态或 `revalidate`，而非动态渲染。

---

## 11) 测试和持续集成（CI）

- 为使用 `t` 的组件添加单元测试，确保键存在。
- 验证每个命名空间在所有语言环境中具有相同的键。
- 在 CI 过程中部署前显示缺失的键。

Intlayer 将自动化完成大部分这些工作（见下一节）。

---

## 12) 在顶部添加 Intlayer（自动化）

Intlayer 帮助你保持 JSON 翻译同步，测试缺失的键，并在需要时使用 AI 填充。

安装 intlayer 依赖：

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin  -D
```

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { locales, defaultLocale } from "@/i18n";
import { syncJSON } from "@intlayer/sync-json";

export const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH];

const config: IntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale,
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    syncJSON({
      source: ({ locale }) => `./locales/${locale}.json`,
    }),
  ],
};

export default config;
```

添加 package 脚本：

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

常见流程：

- 在 CI 中运行 `pnpm i18n:test`，以在缺少键时使构建失败
- 在本地运行 `pnpm i18n:fill`，为新添加的键提供 AI 翻译建议

> 你可以提供 CLI 参数；请参阅[Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)。

---

## 13) 故障排除

- **找不到键**：确保页面/提供者列出了正确的命名空间，并且 JSON 文件存在于 `src/locales/<locale>/<namespace>.json` 目录下。
- **语言错误/闪现英文**：仔细检查 `middleware.ts` 中的语言环境检测以及提供者的 `lng` 设置。
- **RTL 布局问题**：确认 `dir` 是由 `isRtl(locale)` 得出，并且你的 CSS 支持 `[dir="rtl"]`。
- **SEO 替代语言缺失**：确认 `alternates.languages` 包含所有语言环境和 `x-default`。
- **包体积过大**：进一步拆分命名空间，避免在客户端导入整个 `locales` 目录树。

---

## 14) 接下来做什么

- 随着功能的增长，添加更多的语言环境和命名空间
- 本地化错误页面、电子邮件和基于 API 的内容
- 扩展 Intlayer 工作流，实现自动打开翻译更新的 PR

如果您需要一个入门模板，可以尝试：`https://github.com/aymericzip/intlayer-next-i18next-template`。
