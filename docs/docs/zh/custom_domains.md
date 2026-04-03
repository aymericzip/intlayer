---
createdAt: 2026-04-02
updatedAt: 2026-04-02
title: 自定义域名
description: 了解如何在 Intlayer 中配置基于域名的语言路由，以便从专用主机名提供不同的语言版本。
keywords:
  - 自定义域名
  - 域名路由
  - 路由
  - 国际化
  - i18n
slugs:
  - doc
  - concept
  - custom_domains
history:
  - version: 8.5.0
    date: 2026-04-02
    changes: "通过 routing.domains 配置添加基于域名的语言路由。"
---

# 自定义域名

Intlayer 支持基于域名的语言路由，允许您从专用主机名提供特定语言。例如，可以将中国访问者引导至 `intlayer.zh` 而不是 `intlayer.org/zh`。

## 工作原理

`routing` 中的 `domains` 映射将每种语言与一个主机名关联。Intlayer 在两个地方使用此映射：

1. **URL 生成** (`getLocalizedUrl`)：当目标语言位于与当前页面 _不同_ 的域名上时，返回绝对 URL（例如 `https://intlayer.zh/about`）。当两个域名匹配时，返回相对 URL（例如 `/fr/about`）。
2. **服务器代理** (Next.js & Vite)：进入的请求根据到达到达的域名进行重定向或重写。

### 专用域名 vs 共享域名

关键区别在于 **专用性**：

- **专用域名** — 只有一种语言映射到该主机名（例如 `zh → intlayer.zh`）。域名本身标识了语言，因此路径中不添加语言前缀。`https://intlayer.zh/about` 提供中文内容。
- **共享域名** — 多种语言映射到同一个主机名（例如 `en` 和 `fr` 都映射到 `intlayer.org`）。应用正规的基于前缀的路由。`intlayer.org/fr/about` 提供法语内容。

## 配置

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.CHINESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default",
    domains: {
      // 共享域名 — en 和 fr 在 intlayer.org 上使用前缀路由
      en: "intlayer.org",
      // 专用域名 — zh 有其自己的主机名，不需要 /zh/ 前缀
      zh: "intlayer.zh",
    },
  },
};

export default config;
```

末在 `domains` 中列出的语言将继续使用标准前缀路由，没有任何域名覆盖。

## URL 生成

`getLocalizedUrl` 根据调用上下文自动产生正确的 URL 类型。

### 同域名语言（相对 URL）

```ts
// 当前页面: intlayer.org/about
getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.org" });
// → "/fr/about"

getLocalizedUrl("/about", "en", { currentDomain: "intlayer.org" });
// → "/about"  (默认语言，无前缀)
```

### 跨域名语言（绝对 URL）

```ts
// 当前页面: intlayer.org/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.org" });
// → "https://intlayer.zh/about"  (专用域名，无 /zh/ 前缀)
```

### 从语言自己的域名提供服务

```ts
// 当前页面: intlayer.zh/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.zh" });
// → "/about"  (已在正确的域名上 — 相对 URL)

getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.zh" });
// → "https://intlayer.org/fr/about"  (跨域名链接回到 intlayer.org)
```

### 当前域名自动检测

`currentDomain` 是可选的。省略时，`getLocalizedUrl` 按此顺序解析：

1. 绝对输入 URL 的主机名（例如 `https://intlayer.org/about` → `intlayer.org`）。
2. 浏览器环境中的 `window.location.hostname`。
3. 如果两者均不可用（不带显式选项的 SSR），则为同域名语言返回相对 URL，并且不生成绝对 URL — 这是安全的回退方案。

```ts
// 浏览器 — window.location.hostname === 'intlayer.org'
getLocalizedUrl("/about", "zh");
// → "https://intlayer.zh/about"  (从 window 自动检测)

// 从绝对 URL — 自动检测域名
getLocalizedUrl("https://intlayer.org/about", "zh");
// → "https://intlayer.zh/about"
```

### 带有域名的 `getMultilingualUrls`

`getMultilingualUrls` 为每种语言调用 `getLocalizedUrl`，因此它根据调用者的域名产生相对和绝对 URL 的混合：

```ts
// currentDomain: 'intlayer.org'
getMultilingualUrls("/about", { currentDomain: "intlayer.org" });
// {
//   en: "/about",
//   fr: "/fr/about",
//   es: "/es/about",
//   zh: "https://intlayer.zh/about",
// }
```

这些绝对 URL 已准备好用于 SEO 的 `<link rel="alternate" hreflang="...">` 标签。

## 代理行为

### Next.js

`intlayerProxy` 中间件自动处理域名路由。将其添加到您的 `middleware.ts` 中：

```typescript fileName="middleware.ts"
export { intlayerProxy as default } from "next-intlayer/proxy";

export const config = {
  matcher: "/((?!api|static|assets|robots|sitemap|.*\\..*|_next).*)",
};
```

**重定向** — 请求到达了给定语言前缀的错误域名：

```
GET intlayer.org/zh/about
→ 301 https://intlayer.zh/about
```

**重写** — 请求到达了语言的专用域名且没有前缀：

```
GET intlayer.zh/about
→ 重写至 /zh/about  (仅 Next.js 内部路由，URL 保持简洁)
```

### Vite

`intlayerProxy` Vite 插件在开发期间应用相同的逻辑：

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

> **注意**: 在本地开发中，您通常位于 `localhost`，因此跨域名重定向将指向实时域名，而不是另一个本地端口。如果需要在本地测试多域名路由，请使用 hosts 文件覆盖（例如 `127.0.0.1 intlayer.zh`）或反向代理。

## 语言切换器

来自 `next-intlayer` 的 `useLocale` hook 自动处理域名感知的导航。当用户切换到不同域名上的语言时，该 hook 会执行全页面导航 (`window.location.href`) 而不是客户端路由推送，因为 Next.js 路由无法跨越源 (origins)。

```tsx fileName="components/LocaleSwitcher.tsx"
"use client";

import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { availableLocales, locale, setLocale } = useLocale();

  return (
    <ul>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <button
            onClick={() => setLocale(localeEl)}
            aria-current={localeEl === locale ? "true" : undefined}
          >
            {l.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
};
```

无需额外配置 — `useLocale` 内部检测 `window.location.hostname` 并决定是进行 `router.replace`（同域名）还是 `window.location.href`（跨域名）。

## SEO: `hreflang` 备用链接

基于域名的路由通​​常与 `hreflang` 一起使用，以告诉搜索引擎为每种语言索引哪个 URL。使用 `getMultilingualUrls` 生成全套备用 URL：

```tsx fileName="app/[locale]/layout.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  const alternates = getMultilingualUrls("/", {
    currentDomain: process.env.NEXT_PUBLIC_DOMAIN, // 例如 "intlayer.org"
  });

  return {
    alternates: {
      languages: alternates,
    },
  };
};
```

这会产生：

```html
<link rel="alternate" hreflang="en" href="https://intlayer.org/" />
<link rel="alternate" hreflang="fr" href="https://intlayer.org/fr/" />
<link rel="alternate" hreflang="es" href="https://intlayer.org/es/" />
<link rel="alternate" hreflang="zh" href="https://intlayer.zh/" />
```

## 核心实用程序

| 实用程序                                          | 描述                                                        |
| ------------------------------------------------- | ----------------------------------------------------------- |
| `getLocalizedUrl(url, locale, { currentDomain })` | 返回相对或绝对 URL，取决于目标语言是否在当前域名上。        |
| `getMultilingualUrls(url, { currentDomain })`     | 返回语言键控的本地化 URL 映射，根据需要混合相对和绝对 URL。 |
| `getPrefix(locale, { domains })`                  | 为专用域名语言返回空前缀，否则返回普通前缀。                |
