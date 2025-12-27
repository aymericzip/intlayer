---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: 如何使用 next-intl 翻译你的 Next.js 15 – 2025 年国际化 (i18n) 指南
description: 了解如何使你的 Next.js 15 App Router 网站实现多语言。按照文档进行国际化 (i18n) 和翻译。
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Next.js 15
  - next-intl
  - JavaScript
  - React
slugs:
  - doc
  - next-intl
applicationTemplate: https://github.com/aymericzip/intlayer-next-intl-template
---

# 使用 Intlayer 翻译你的 Next.js 15 next-intl 网站 | 国际化 (i18n)

本指南将引导你了解 next-intl 在 Next.js 15（App Router）应用中的最佳实践，并展示如何在其基础上叠加 Intlayer，实现强大的翻译管理和自动化。

请参阅[next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/next-i18next_vs_next-intl_vs_intlayer.md)中的比较。

- 针对初级开发者：按照分步章节操作，构建一个可用的多语言应用。
- 针对中级开发者：关注负载优化和服务器/客户端的分离。
- 针对高级开发者：关注静态生成、中间件、SEO 集成和自动化钩子。

我们将涵盖的内容：

- 设置和文件结构
- 优化消息加载方式
- 客户端和服务器组件的使用
- 元数据、站点地图、robots 以支持 SEO
- 用于本地化路由的中间件
- 在此基础上添加 Intlayer（CLI 和自动化）

## 使用 next-intl 设置你的应用

安装 next-intl 依赖：

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

```bash
.
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
└── src
    ├── i18n.ts
    ├── middleware.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about
    │           └── page.tsx
    └── components
        ├── ClientComponentExample.tsx
        └── ServerComponent.tsx
```

#### 设置和加载内容

仅加载路由所需的命名空间，并尽早验证 locales。尽可能保持服务器组件同步，只将所需的消息推送到客户端。

```tsx fileName="src/i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "fr", "es"] as const;
export const defaultLocale = "en" as const;

async function loadMessages(locale: string) {
  // 仅加载布局/页面所需的命名空间
  const [common, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
  ]);

  return { common, about } as const;
}

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: await loadMessages(locale),
  };
});
```

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import {
  getLocaleDirection,
  unstable_setRequestLocale,
} from "next-intl/server";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  // 为此服务器渲染（RSC）设置活动请求语言环境
  unstable_setRequestLocale(locale);

  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponentExample from "@/components/ClientComponentExample";

export const dynamic = "force-static";

export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  // 消息在服务器端加载。仅推送客户端所需的内容。
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // 严格的服务器端翻译/格式化
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponentExample />
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

### 在客户端组件中的使用示例

让我们来看一个渲染计数器的客户端组件示例。

**翻译内容（复用结构；根据需要加载到 next-intl 消息中）**

```json fileName="locales/en/about.json"
{
  "counter": {
    "label": "计数器",
    "increment": "递增"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "counter": {
    "label": "计数器",
    "increment": "增加"
  }
}
```

**客户端组件**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponentExample = () => {
  // 直接作用于嵌套对象
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

> 不要忘记在页面客户端消息中添加 "about" 消息
> （只包含您的客户端实际需要的命名空间）。

### 在服务器组件中的使用

此 UI 组件是一个服务器组件，可以在客户端组件下渲染（页面 → 客户端 → 服务器）。通过传递预先计算好的字符串保持同步。

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  formattedCount: string; // 格式化后的计数
  label: string; // 按钮的无障碍标签
  increment: string; // 按钮显示的文本
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

注意：

- 在服务器端计算 `formattedCount`（例如，`const initialFormattedCount = format.number(0)`）。
- 避免将函数或不可序列化的对象传递给服务器组件。

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations } from "next-intl/server";

function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

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

// ... 页面代码的其余部分
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? origin + path : origin + "/" + locale + path;

export default function sitemap(): MetadataRoute.Sitemap {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
    },
  ];
}
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
// 返回包含所有语言版本路径的数组
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export default function robots(): MetadataRoute.Robots {
  // 禁止访问的路径列表，包含所有语言版本的 /dashboard 和 /admin
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

### 用于语言路由的中间件

添加一个中间件来处理语言环境检测和路由：

```ts fileName="src/middleware.ts"
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n";

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localeDetection: true,
});

export const config = {
  // 跳过 API、Next 内部文件和静态资源
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### 最佳实践

- **设置 html 的 `lang` 和 `dir`**：在 `src/app/[locale]/layout.tsx` 中，通过 `getLocaleDirection(locale)` 计算 `dir`，并设置 `<html lang={locale} dir={dir}>`。
- **按命名空间拆分消息**：按语言环境和命名空间组织 JSON（例如，`common.json`、`about.json`）。
- **最小化客户端负载**：在页面中，只向 `NextIntlClientProvider` 发送所需的命名空间（例如，`pick(messages, ['common', 'about'])`）。
- **优先使用静态页面**：导出 `export const dynamic = 'force-static'` 并为所有 `locales` 生成静态参数。
- **同步服务器组件**：传递预先计算好的字符串（翻译标签、格式化数字），而不是异步调用或不可序列化的函数。

## 在 next-intl 之上实现 Intlayer

安装 intlayer 依赖：

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
```

创建 intlayer 配置文件：

```tsx fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    // 保持每个命名空间的文件夹结构与 Intlayer 同步
    syncJSON({
      format: "icu",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

添加 `package.json` 脚本：

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

备注：

- `intlayer fill`：使用您的 AI 提供者根据配置的语言环境填充缺失的翻译。
- `intlayer test`：检查缺失或无效的翻译（在持续集成中使用）。

您可以配置参数和提供者；详情请参见 [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)。
