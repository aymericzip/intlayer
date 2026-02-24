---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - 将现有的 Next.js 应用程序转换为多语言应用程序 (i18n 指南 2026)
description: 了解如何使用 Intlayer 编译器将现有的 Next.js 应用程序转换为多语言。按照文档进行国际化 (i18n) 并使用 AI 进行翻译。
keywords:
  - 国际化
  - 翻译
  - 文档
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - 编译器
  - AI
slugs:
  - doc
  - 设定
  - nextjs
  - 编译器
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: 初始版本
---

# 如何将现有的 Next.js 应用程序多语言化 (i18n) (i18n 指南 2026)

<Tabs defaultTab="video">
  <Tab label="视频" value="video">
  
<iframe title="Next.js 的最佳 i18n 解决方案？了解 Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="代码" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="演示 CodeSandbox - 如何使用 Intlayer 对您的应用程序进行国际化"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

在 GitHub 上查看[应用程序模板](https://github.com/aymericzip/intlayer-next-no-lolale-path-template)。

## 目录

<TOC/>

## 为什么对现有应用程序进行国际化会很困难？

如果您曾经尝试向仅为单语言构建的应用程序中添加多种语言，您就会明白其中的痛苦。这不仅仅是“困难”，而是非常繁琐。您必须检查每个文件，找出每一个文本字符串，并将它们移动到单独的字典文件中。

接下来才是冒险的部分：用代码钩子（hooks）替换所有文本，同时保证不破坏布局或逻辑。这类工作往往会让新功能的开发停滞数周，感觉像是一场无止境的重构。

## 什么是 Intlayer 编译器？

**Intlayer 编译器**旨在省去这种繁重的日常工作。您无需手动提取字符串，编译器会为您完成。它会扫描您的代码，找到文本，并使用 AI 在后台生成字典。
然后，在构建期间，它会修改您的代码以注入必要的 i18n 钩子。基本上，您可以像写单语言应用一样一直编写您的应用，而编译器会自动帮您完成多语言转换。

> 编译器文档：https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md

### 限制

由于编译器要在**编译时**执行代码分析和转换（插入钩子和生成字典），因此它可能会**减慢应用程序的构建过程**。

为了减轻在开发过程中的影响，您可以配置编译器以在 [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md) 模式下运行，或在不需要时将其禁用。

---

## 在 Next.js 应用程序中设置 Intlayer 的分步指南

### 步骤 1：安装依赖项

使用 npm 安装必要的包：

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
bunx intlayer init
```

- **intlayer**

  核心包，提供用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、转译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)的国际化工具。

- **next-intlayer**

  将 Intlayer 与 Next.js 集成的包。它为 Next.js 国际化提供上下文提供程序 (context providers) 和钩子 (hooks)。此外，它还包括用于将 Intlayer 与 [Webpack](https://webpack.js.org/) 或 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 集成的 Next.js 插件，以及用于检测用户首选语言环境、管理 cookies 和处理 URL 重定向的代理 (proxy)。

### 步骤 2：配置您的项目

创建一个配置文件来定义应用程序的语言：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // 可以设置为 'build-only' 来限制开发模式下的影响
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // 无 comp- 前缀
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "这是一个地图应用程序",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // 可以设置为 'build-only' 来限制开发模式下的影响
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // 无 comp- 前缀
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "这是一个地图应用程序",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // 可以设置为 'build-only' 来限制开发模式下的影响
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // 无 comp- 前缀
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "这是一个地图应用程序",
  },
};

module.exports = config;
```

> **注意**：请确保您在环境变量中设置了 `OPEN_AI_API_KEY`。

> 通过此配置文件，您可以设置本地化的 URL、代理重定向、cookie 名称、内容声明的位置和扩展名、在控制台中禁用 Intlayer 日志等等。有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 步骤 3：将 Intlayer 集成到 Next.js 配置中

配置您的 Next.js 设置以使用 Intlayer：

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* 这里填写配置选项 */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* 这里填写配置选项 */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* 这里填写配置选项 */
};

module.exports = withIntlayer(nextConfig);
```

> Next.js 插件 `withIntlayer()` 用于将 Intlayer 与 Next.js 集成。它确保内容声明文件的构建，并在开发模式下监视它们。它在 [Webpack](https://webpack.js.org/) 或 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 环境中定义 Intlayer 环境变量。此外，它还提供别名以优化性能，并保留与服务器组件的兼容性。

### 配置 Babel

Intlayer 编译器需要 Babel 来提取和优化您的内容。更新您的 `babel.config.js`（或 `babel.config.json`）以包含 Intlayer 插件：

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

### 步骤 4：定义动态语言环境路由

清空 `RootLayout` 中的所有内容，并将其替换为以下代码：

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerClientProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";
import { IntlayerClientProvider } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async ({ params }) => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");
const { IntlayerClientProvider } = require("next-intlayer");
const { getHTMLTextDir, getIntlayer } = require("intlayer");
const { getLocale } = require("next-intlayer/server");
const { generateStaticParams } = require("next-intlayer");

const generateMetadata = async ({ params }) => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

module.exports = {
  default: RootLayout,
  generateStaticParams,
  generateMetadata,
};
```

### 步骤 5：声明您的内容（自动化处理）

启用编译器后，您**不再需要**手动声明内容字典（例如 `.content.ts` 文件）。

相反，您可以直接在代码中以字符串形式写入您的内容。Intlayer 会分析您的代码，使用配置的 AI 服务提供商生成翻译，并在编译时将这些字符串替换为本地化内容。

### 步骤 6：在代码中使用内容

只需使用您默认语言环境的硬编码字符串编写组件即可。编译器会处理剩下的工作。

您的页面可能看起来像这样：

<Tabs>
  <Tab value="Code" label="代码">

```tsx fileName="src/app/page.tsx"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  return (
    <>
      <p>开始编辑</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

  </Tab>
  <Tab value="Output" label="输出">

```ts fileName="i18n/page-content.content.tsx"
{
  key: "page-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        getStartedByEditing: "Get started by editing",
      },
      fr: {
        getStartedByEditing: "Commencez par éditer",
      },
      zh: {
        getStartedByEditing: "开始编辑",
      },
    }
  }
}
```

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditing}</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

  </Tab>
</Tabs>

- **`IntlayerClientProvider`** 用于向客户端组件提供当前的语言环境。
- **`IntlayerServerProvider`** 用于向服务器子节点提供当前的语言环境。

### (可选) 第 7 步：填写缺失的翻译

Intlayer 提供了一个 CLI 工具来帮助您填写缺失的翻译。您可以使用 `intlayer` 命令来测试并从您的代码中填写缺失的翻译。

```bash
npx intlayer test         # 测试是否有缺失的翻译
```

```bash
npx intlayer fill         # 填写缺失的翻译
```

### (可选) 步骤 8：配置语言环境检测的代理

设置代理解析以检测用户的首选语言环境：

```typescript fileName="src/proxy.ts" codeFormat="typescript"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.mjs" codeFormat="esm"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.cjs" codeFormat="commonjs"
const { intlayerProxy } = require("next-intlayer/proxy");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { proxy: intlayerProxy, config };
```

> 代理 `intlayerProxy` 用于检测用户的首选语言环境并根据 [配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md) 将其重定向到适当的 URL。它还可以将用户的首选语言环境保存在 cookie 中。

### (可选) 第 9 步：更改内容语言环境

要在 Next.js 中更改您的内容环境语言，最推荐的方法是使用 `Link` 组件将用户重定向到带有适用语言环境的特定路由。这是为了确保页面正确使用 Next.js 进行预加载，并避免强行刷新整个应用页面。

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* 例如：ZH */}
              {localeItem}
            </span>
            <span>
              {/* 例如：中文 */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 例如：中文（当当前语言环境是中文时） */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 例如：Chinese (Simplified) */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* 例如：ZH */}
              {localeItem}
            </span>
            <span>
              {/* 例如：中文 */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 例如：中文（当当前语言环境是中文时） */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 例如：Chinese (Simplified) */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales, getHTMLTextDir, getLocaleName } = require("intlayer");
const { useLocale } = require("next-intlayer");

export const LocaleSwitcher = () => {
  const path
  const { locale availableLocales, setLocale } = useLocale({
       onChange: ()=> window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* 例如：ZH */}
              {localeItem}
            </span>
            <span>
              {/* 例如：中文 */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 例如：中文（当当前语言环境是中文时） */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 例如：Chinese (Simplified) */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> 您还可以使用通过 `useLocale` 提供的 `setLocale` 钩子作为不包含 Next.js `Link` 导航的一种替代选项。若需更全面和详细的指引，请访问 [`useLocale` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useLocale.md)。

### (可选) 第 10 步：在 Server Actions（服务器操作）中检索当前区域设置

如果需要在诸如电子邮件发送、表单验证或数据入库等服务器端操作里获取语言环境，您可以直接导入并调用由 `next-intlayer/server` 提供的 `getLocale`。

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // 然后利用获取到的语言环境执行任意操作，例如发封邮件。
};
```

> `getLocale` 方法将通过最佳策略为您的请求找到正确的语言环境：
>
> 1. 它会检查当前请求包含的 Header 中（若存在代理层配置或前端发送时指定的头信息）语言优先级以决定最佳结果。
> 2. 如果不存在，接下来去检查客户端的 Cookie 信息。
> 3. 如果 Cookie 中也没有相关记录，则检查并验证当前请求终端/浏览器自带的语言参数首选项。
> 4. 最后如果一切都失败了，它将降级使用系统设定的默认语言环境参数。
>
> 根据场景随时确保响应正确的语言。

### (可选) 第 11 步：优化并减小包体积 (Build Optimization)

根据默认情况，Next.js 会把所需要的包内容打包在客户端构建包中。因此当调用 `next-intlayer` 时所有的内容字典可能会在客户端被引入，如果词典非常多这可能造成无意义的打包占用膨胀。在这种情况下，我们可以采取 `SWC` 的方式，通过引入预构建分析扩展——`@intlayer/swc` 给系统实现极致优化，这能帮助我们的打包体仅保留必要的内容词条给相应的页面组件，进而优化编译性能：

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
```

> 注: 该依赖作为开发依赖注入（使用 `--save-dev` 标识）。并且只适用于使用了并开启 SWC (`Next.js +13`) 处理流的项目。

> 注 2: 这是个试验性的特性插件系统（Nextjs 机制使然）。

> 注 3: 若要动态注入如 `useIntlayer` 并且设置项里定义了 `importMode: dynamic` 或者 `importMode: fetch` 等参数。Next.js 的机制要求这部分的 React 组件必须通过包裹一层外壳——也就是 React 的 `<Suspense>` 组件，或者顶层路由级别不要使用 `useIntlayer` 以避免客户端生命周期渲染发生阻塞及报错宕机。

### 让 Turbopack 能够正确支持 Intlayer （并同步监测字典数据的变动）

在开发环境运行时 `next dev` ，当开发者使用了新架构的极速构建打包器 `Turbopack` 时，因为此时它的架构无法自动读取并执行 `Webpack Plugin` 所内置的一些扩展热更等特性。所以你需要在启动时主动运行监听器以开启监视翻译数据与应用热重载的结合 `watch`:

```json5 fileName="package.json"
{
  // ... 其他 package 项目设定 ...
  "scripts": {
    // ... 原本有的命令 ...
    "dev": "intlayer watch --with 'next dev'", // 结合在一起
  },
}
```

> 旧版本如 `next-intlayer@<=6` 会由于兼容问题，在此仍然需求添加 `--turbopack` 标识到结尾以解决冲突报错。但在最新版本 `next-intlayer@>=7` 后我们建议放弃这种繁琐设置从而采取以上的极简做法。

### 配置 TypeScript 提示及报错

作为开发的核心驱动体验，借助增强的类型安全机制 ("Type module augmentation")。我们将大大提高错误避免、文本提示（IDE自动完成提示）的工作效率。
以下展现它是如何发挥作用的：

![自动补全示意](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![异常检查提示](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

想要完美使用它我们需要做一步简单设置，在项目的根目录通过加入配置代码并编辑您的 `tsconfig.json`文件：

```json5 fileName="tsconfig.json"
{
  // ... 之前存在的配置选项 ...
  "include": [
    // ... 原本那些 include 文件夹项目 ...
    ".intlayer/**/*.ts", // 这是您要加的一句
  ],
}
```

### Git (及版本控制系统) 设置配置项

`.intlayer` 是系统运行时按需（或者按照内容字典的配置自动实时解析）实时输出构建结果的目录缓存点。您在进行远程代码推送同步协作时不应该将其一并纳入！所以您非常有必要将其作为无视的忽略文件处理：

```plaintext fileName=".gitignore"
# 请在这个 .gitignore 配置列表加入下面的这一行以使其不被纳入系统
.intlayer
```

### 给开发提效的小神器：使用 VS Code 的专门化扩展！

对于重度开发者我们推荐使用 **Intlayer VS Code Extension** 扩展。有了它开发者不仅不需要写太多累赘重复的代码，连查看以及修复翻译内容的 UI 交互都能省下一系列不必要的找寻及确认工作：

[快来试试吧：通过官方 Marketplace 获取它](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

扩展它能为您解决：

- **实战补完**：让键位和选项拥有极速提示体验。
- **排雷与侦测检查**：针对少写的翻译项目和拼错提供准确报红警告提示。
- **免切应用直接浮动预览：**在写好的参数如 `useIntlayer` 这类 hook 上长按与悬停，立刻就能看到预设对应各种语言的最终直译输出效果。
- **悬念微操**: 使用更短或者完全直录模式操作字典编辑与同步生成的操作热键！

更系统和详细的教程可以到专门页一览无余 [查看专门的 VS Code 帮助中心与介绍文档指南](https://intlayer.org/doc/vs-code-extension)。

### 下一步与生态周边结合

一旦完成上述的设置与融合工作，就完全可以将多语种化的项目与业务管理层对接以最大化开发与内容的运维解耦了：比如，试着对接并激活一个更懂开发的翻译配置页面板工具面板：配合教程安装：[可视化编辑与调试器工具教程](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)。
或者利用后端解构能力与系统同步发布字典变更不再依赖重新推送提交部署项目，甚至达到将项目数据化同步更新——阅读并设置进阶篇教程：[Intlayer CMS内容分发平台系统设置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)。
