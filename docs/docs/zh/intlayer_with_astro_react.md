---
createdAt: 2024-03-07
updatedAt: 2026-04-24
title: Astro + React i18n - 如何在 2026 年翻译 Astro + React 应用程序
description: 了解如何使用 Intlayer 为您的 Astro + React 网站添加国际化 (i18n)。按照本指南让您的网站支持多语言。
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Astro
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - react
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: "添加 init 命令"
  - version: 6.2.0
    date: 2025-10-03
    changes: "更新 Astro 注入、配置和用法"
---

# 使用 Intlayer 翻译您的 Astro + React 网站 | 国际化 (i18n)

## 目录

<TOC/>

## 什么是 Intlayer？

**Intlayer** 是一个创新且开源的国际化 (i18n) 库，旨在简化现代 Web 应用程序的多语言支持。

使用 Intlayer，您可以：

- **轻松管理翻译**：使用组件级的声明式词典。
- **动态本地化元数据、路由和内容**。
- **确保 TypeScript 支持**：通过自动生成的类型增强自动补全和错误检测。
- **受益于高级功能**：如动态语言检测和语言切换。

---

## 在 Astro + React 中配置 Intlayer 的分步指南

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - 如何使用 Intlayer 国际化您的应用程序"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

在 GitHub 上查看[应用程序模板](https://github.com/aymericzip/intlayer-astro-template)。

### 第一步：安装依赖

使用您喜欢的包管理器安装所需的软件包：

```bash packageManager="npm"
npm install intlayer astro-intlayer react react-dom react-intlayer @astrojs/react

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer react react-dom react-intlayer @astrojs/react

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer react react-dom react-intlayer @astrojs/react

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer react react-dom react-intlayer @astrojs/react

bun x intlayer init
```

- **intlayer**
  核心软件包，提供用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、编译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)的国际化工具。

- **astro-intlayer**
  包含将 Intlayer 与 [Vite 构建器](https://vite.dev/guide/why.html#why-bundle-for-production)集成的 Astro 集成插件，以及用于检测用户首选语言、管理 Cookie 和处理 URL 重定向的中间件。

- **react**, **react-dom**
  在浏览器中渲染 React 组件所需的核心 React 软件包。

- **react-intlayer**
  将 Intlayer 与 React 应用程序集成的软件包。它提供了 `IntlayerProvider`，以及用于 React 国际化的 `useIntlayer` 和 `useLocale` 钩子。

- **@astrojs/react**
  官方 Astro 集成，允许使用 React 组件岛 (islands)。

### 第二步：配置您的项目

创建一个配置文件来定义您的应用程序语言：

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 您的其他语言
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> 通过此配置文件，您可以配置本地化 URL、中间件重定向、Cookie 名称、内容声明的位置和扩展名、在控制台中禁用 Intlayer 日志等。有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 第三步：在 Astro 配置中集成 Intlayer

将 intlayer 插件和 React 集成添加到您的 Astro 配置中。

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), react()],
});
```

> `intlayer()` 集成插件用于将 Intlayer 与 Astro 集成。它确保内容声明文件的构建并在开发模式下进行监视。它在 Astro 应用程序中定义 Intlayer 环境变量，并提供别名以优化性能。

> `react()` 集成允许通过 `client:only="react"` 使用 React 组件岛。

### 第四步：声明您的内容

创建并管理您的内容声明以存储翻译：

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      zh: "你好，世界",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> 只要您的内容声明包含在 `contentDir`（默认为 `./src`）中，且匹配内容声明文件扩展名（默认为 `.content.{json,ts,tsx,js,jsx,mjs,cjs}`），就可以在应用程序的任何位置定义。

> 有关更多信息，请参阅[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

### 第五步：在 Astro 中使用内容

您可以使用 `intlayer` 导出的核心辅助函数直接在 `.astro` 文件中消费词典。您还应在每个页面添加 SEO 元数据（如 hreflang 和规范链接），并为客户端交互内容引入 React 岛。

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getPrefix,
  localeMap,
  defaultLocale,
  type LocalesValues,
} from "intlayer";
import { ReactIsland } from "../../components/react/ReactIsland";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { title } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>

    <!-- 规范链接：通知搜索引擎此页面的主版本 -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang：通知 Google 所有本地化版本 -->
    {
      localeMap(({ locale: mapLocale }) => (
        <link
          rel="alternate"
          hreflang={mapLocale}
          href={new URL(
            getLocalizedUrl(Astro.url.pathname, mapLocale),
            Astro.site
          )}
        />
      ))
    }

    <!-- x-default：语言不匹配用户时的回退选项 -->
    <link
      rel="alternate"
      hreflang="x-default"
      href={new URL(
        getLocalizedUrl(Astro.url.pathname, defaultLocale),
        Astro.site
      )}
    />
  </head>
  <body>
    <!-- React 岛渲染所有交互式内容，包括语言切换器 -->
    <ReactIsland locale={locale} client:only="react" />
  </body>
</html>
```

> **关于路由设置的说明：**
> 您使用的目录结构取决于 `intlayer.config.ts` 中的 `middleware.routing` 设置：
>
> - **`prefix-no-default`（默认）**：在根目录下保留默认语言（无前缀），并为其他语言添加前缀。使用 `[...locale]` 来捕获所有情况。
> - **`prefix-all`**：所有 URL 都有语言前缀。如果您不需要单独处理根目录，可以使用标准的 `[locale]`。
> - **`search-param` 或 `no-prefix`**：不需要语言文件夹名。语言通过查询参数或 Cookie 处理。

### 第六步：创建 React 岛组件

创建一个包装 React 应用程序并接收服务端检测到的语言的岛组件：

```tsx fileName="src/components/react/ReactIsland.tsx"
/** @jsxImportSource react */
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { type LocalesValues } from "intlayer";
import { LocaleSwitcher } from "./LocaleSwitcher";

function App() {
  const { title } = useIntlayer("app");

  return (
    <div>
      <h1>{title}</h1>
      <LocaleSwitcher />
    </div>
  );
}

export function ReactIsland({ locale }: { locale: LocalesValues }) {
  return (
    <IntlayerProvider locale={locale}>
      <App />
    </IntlayerProvider>
  );
}
```

> `locale` 属性从 Astro 页面（服务端检测）传递到 `IntlayerProvider`，使其成为树中所有 React 钩子的初始语言。

### 第七步：添加语言切换器

创建一个 React 组件 `LocaleSwitcher`，该组件读取可用语言，并在用户选择新语言时导航到本地化 URL：

```tsx fileName="src/components/react/LocaleSwitcher.tsx"
/** @jsxImportSource react */
import { useLocale } from "react-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

export function LocaleSwitcher() {
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      // 更改语言时导航到本地化 URL
      window.location.href = getLocalizedUrl(
        window.location.pathname,
        newLocale
      );
    },
  });

  return (
    <div className="locale-switcher">
      <span className="switcher-label">切换语言：</span>
      <div className="locale-buttons">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            onClick={() => setLocale(localeItem)}
            className={`locale-btn ${localeItem === locale ? "active" : ""}`}
            disabled={localeItem === locale}
          >
            <span className="ls-own-name">{getLocaleName(localeItem)}</span>
            <span className="ls-current-name">
              {getLocaleName(localeItem, locale)}
            </span>
            <span class="ls-code">{localeItem.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
```

> **关于持久性的说明：**
> 使用 `onLocaleChange` 通过 `window.location.href` 重定向，确保访问了新的语言 URL，允许 Intlayer 中间件设置语言 Cookie 并记住用户在未来访问时的首选语言。

> `LocaleSwitcher` 必须在 `IntlayerProvider` 内部渲染——在您的岛组件中使用它（如第六步所示）。

### 第八步：站点地图和 Robots.txt

Intlayer 提供了实用工具来动态创建您的本地化站点地图和 robots.txt 文件。

#### 站点地图

创建 `src/pages/sitemap.xml.ts` 以生成包含所有本地化路由的站点地图。

```typescript fileName="src/pages/sitemap.xml.ts"
import type { APIRoute } from "astro";
import { generateSitemap, type SitemapUrlEntry } from "intlayer";

const pathList: SitemapUrlEntry[] = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const SITE_URL = import.meta.env.SITE ?? "http://localhost:4321";

export const GET: APIRoute = async ({ site }) => {
  const xmlOutput = generateSitemap(pathList, { siteUrl: SITE_URL });

  return new Response(xmlOutput, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

#### Robots.txt

创建 `src/pages/robots.txt.ts` 以控制搜索引擎抓取。

```typescript fileName="src/pages/robots.txt.ts"
import type { APIRoute } from "astro";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

export const GET: APIRoute = ({ site }) => {
  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    `Sitemap: ${new URL("/sitemap.xml", site).href}`,
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

### TypeScript 配置

Intlayer 使用模块扩展来利用 TypeScript，使您的代码库更加健壮。

![自动补全](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![翻译错误](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

确保您的 TypeScript 配置包含自动生成的类型。

```json5 fileName="tsconfig.json"
{
  // ... 您现有的 TypeScript 配置
  "include": [
    // ... 您现有的 TypeScript 配置
    ".intlayer/**/*.ts", // 包含自动生成的类型
  ],
}
```

### Git 配置

建议忽略 Intlayer 生成的文件。这可以避免将它们提交到您的 Git 仓库。

为此，您可以将以下说明添加到 `.gitignore` 文件中：

```bash
# 忽略 Intlayer 生成的文件
.intlayer
```

### VS Code 扩展

为了改善使用 Intlayer 的开发体验，您可以安装**官方 Intlayer VS Code 扩展**。

[从 VS Code Marketplace 安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

此扩展提供：

- 翻译键的**自动补全**。
- 缺失翻译的**实时错误检测**。
- 翻译内容的**内联预览**。
- 轻松创建和更新翻译的**快速操作**。

有关使用该扩展的更多信息，请参阅 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

---

### 深入了解

如果您想了解更多，还可以实现[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)或使用 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 将您的内容外部化。
