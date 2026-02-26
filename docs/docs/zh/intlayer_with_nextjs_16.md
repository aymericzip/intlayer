---
createdAt: 2024-12-06
updatedAt: 2025-12-30
title: Next.js i18n - 如何翻译Next.js 16 应用 2026
description: 了解如何让您的 Next.js 16 网站支持多语言。按照文档进行国际化 (i18n) 并对其进行翻译。
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Next.js 16
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
applicationTemplate: https://github.com/aymericzip/intlayer-next-16-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: 添加 init 命令
  - version: 7.0.6
    date: 2025-11-01
    changes: 在 `alternates` 对象中添加了对 `x-default` 的提及
  - version: 7.0.0
    date: 2025-06-29
    changes: 初始化历史记录
---

# 使用 Intlayer 翻译您的 Next.js 16 网站 | 国际化 (i18n)

<Tabs defaultTab="video">
  <Tab label="视频" value="video">
  
<iframe title="Next.js 最佳 i18n 解决方案？探索 Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="代码" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - 如何使用 Intlayer 国际化您的应用程序"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

请参阅 GitHub 上的[应用模板](https://github.com/aymericzip/intlayer-next-16-template)。

## 目录

<TOC/>

## 什么是 Intlayer？

**Intlayer** 是一个创新的、开源的国际化 (i18n) 库，旨在简化现代 Web 应用程序的多语言支持。Intlayer 无缝集成了最新的 **Next.js 16** 框架，包括其强大的 **App Router**。它针对 **Server Components** 进行了优化，以实现高效渲染，并且完全兼容 [**Turbopack**](https://nextjs.org/docs/architecture/turbopack)。

使用 Intlayer，您可以：

- **轻松管理翻译**，在组件级别使用声明式字典。
- **动态本地化元数据**、路由和内容。
- **在客户端和服务器端组件中访问翻译**。
- **确保 TypeScript 支持**，通过自动生成的类型改进自动补全和错误检测。
- **享受高级功能**，例如动态语言环境检测和切换。

> Intlayer 兼容 Next.js 12、13、14 和 16。如果您使用的是 Next.js Page Router，可以参考此[指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_page_router.md)。
> 语言环境路由（Locale routing）对 SEO、包大小和性能很有用。如果您不需要它，可以参考此[指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_no_locale_path.md)。
> 对于使用 App Router 的 Next.js 12、13、14，请参考此[指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_14.md)。

---

## 在 Next.js 应用程序中设置 Intlayer 的分步指南

### 第 1 步：安装依赖项

使用 npm 安装必要的包：

```bash packageManager="npm"
npm install intlayer next-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bunx intlayer init
```

- **intlayer**

  提供配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、转译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md) 等国际化工具的核心包。

- **next-intlayer**

  将 Intlayer 与 Next.js 集成的包。它为 Next.js 国际化提供上下文提供者和钩子。此外，它还包括用于将 Intlayer 与 [Webpack](https://webpack.js.org/) 或 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 集成的 Next.js 插件，以及用于检测用户首选语言环境、管理 cookie 和处理 URL 重定向的代理。

### 第 2 步：配置您的项目

这是我们将创建的最终结构：

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # 用于 Intlayer 提供者的语言环境布局
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # 用于样式和全局提供者的根布局
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── LocaleSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> 如果您不需要语言环境路由，intlayer 可以用作简单的提供者/钩子。有关更多详细信息，请参见[此指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_no_locale_path.md)。

创建一个配置文件来配置您的应用程序语言：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 您的其他语言环境
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 您的其他语言环境
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 您的其他语言环境
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> 通过此配置文件，您可以设置本地化 URL、代理重定向、cookie 名称、内容声明的位置和扩展名、禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 第 3 步：在 Next.js 配置中集成 Intlayer

配置您的 Next.js 设置以使用 Intlayer：

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* 此处为配置选项 */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* 此处为配置选项 */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* 此处为配置选项 */
};

module.exports = withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js 插件用于将 Intlayer 与 Next.js 集成。它确保内容声明文件的构建并在开发模式下对其进行监控。它在 [Webpack](https://webpack.js.org/) 或 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 环境中定义 Intlayer 环境变量。此外，它还提供别名以优化性能并确保与服务器组件的兼容性。

> `withIntlayer()` 函数是一个 promise 函数。它允许在构建开始之前准备 intlayer 字典。如果您想将其与其他插件一起使用，可以 await 它。示例：
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> 如果您想同步使用它，可以使用 `withIntlayerSync()` 函数。示例：
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

> Intlayer 会根据命令行标志 `--webpack`、`--turbo` 或 `--turbopack` 以及您当前的 **Next.js 版本** 自动检测您的项目是使用 **webpack** 还是 **Turbopack**。
>
> 自 `next>=16` 起，如果您使用 **Rspack**，则必须通过禁用 Turbopack 来显式强制 Intlayer 使用 webpack 配置：
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

### 第 4 步：定义动态语言环境路由

从 `RootLayout` 中删除所有内容，并将其替换为以下代码：

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // 您仍然可以用其他提供者包装子组件，例如 `next-themes`、`react-query`、`framer-motion` 等。
  <>{children}</>
);

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => (
  // 您仍然可以用其他提供者包装子组件，例如 `next-themes`、`react-query`、`framer-motion` 等。
  <>{children}</>
);

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => (
  // 您仍然可以用其他提供者包装子组件，例如 `next-themes`、`react-query`、`framer-motion` 等。
  <>{children}</>
);

module.exports = {
  default: RootLayout,
  generateStaticParams,
};
```

> 保持 `RootLayout` 组件为空，允许在 `<html>` 标签上设置 [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) 和 [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) 属性。

要实现动态路由，请通过在 `[locale]` 目录中添加新布局来提供语言环境路径：

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
import type { NextLayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { Inter } = require("next/font/google");
const { getHTMLTextDir } = require("intlayer");

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

module.exports = LocaleLayout;
```

> `[locale]` 路径段用于定义语言环境。示例：`/en-US/about` 将引用 `en-US`，而 `/fr/about` 将引用 `fr`。

> 在此阶段，您将遇到错误：`Error: Missing <html> and <body> tags in the root layout.`。这是预期的，因为 `/app/page.tsx` 文件不再使用，可以删除。取而代之的是，`[locale]` 路径段将激活 `/app/[locale]/page.tsx` 页面。因此，页面将可以通过浏览器中的 `/en`、`/fr`、`/es` 等路径访问。要将默认语言环境设置为根页面，请参考第 7 步中的 `proxy` 设置。

然后，在您的应用程序布局中实现 `generateStaticParams` 函数。

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // 要插入的代码行

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... 其余代码*/
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // 要插入的代码行

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... 其余代码*/
};

// ... 其余代码
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // 要插入的代码行

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... 其余代码*/
};

module.exports = { default: LocaleLayout, generateStaticParams };
```

> `generateStaticParams` 确保您的应用程序为所有语言环境预构建必要的页面，从而减少运行时计算并改善用户体验。有关更多详细信息，请参阅 [Next.js 关于 generateStaticParams 的文档](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params)。

> Intlayer 与 `export const dynamic = 'force-static';` 配合使用，以确保为所有语言环境预构建页面。

### 第 5 步：声明您的内容

创建并管理您的内容声明以存储翻译：

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies Dictionary;

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

module.exports = pageContent;
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> 您的内容声明可以定义在应用程序的任何位置，只要它们包含在 `contentDir` 目录（默认情况下为 `./src`）中。并且匹配内容声明文件扩展名（默认情况下为 `.content.{json,ts,tsx,js,jsx,mjs,cjs}`）。

> 有关更多详细信息，请参阅[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

### 第 6 步：在代码中利用内容

在整个应用程序中访问您的内容字典：

```tsx fileName="src/app/[locale]/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.csx" codeFormat="commonjs"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};
```

- **`IntlayerClientProvider`** 用于向客户端组件提供语言环境。它可以放置在任何父组件中，包括布局。然而，建议将其放置在布局中，因为 Next.js 会在页面之间共享布局代码，从而使其效率更高。通过在布局中使用 `IntlayerClientProvider`，您可以避免为每个页面重新初始化它，从而提高性能并在整个应用程序中保持一致的本地化上下文。
- **`IntlayerServerProvider`** 用于向服务器端子组件提供语言环境。它不能在布局中设置。

  > 布局和页面不能共享通用的服务器上下文，因为服务器上下文系统基于每个请求的数据存储（通过 [React 的缓存](https://react.dev/reference/react/cache) 机制），导致每个“上下文”会为应用程序的不同部分重新创建。将提供者放在共享布局中会打破这种隔离，阻止服务器上下文值正确传播到您的服务器组件。

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // 创建相关的内容声明

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // 创建相关的内容声明

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // 创建相关的内容声明

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx"  codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // 创建相关的内容声明

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // 创建相关的内容声明

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // 创建相关的内容声明

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> 如果您想在 `string` 属性中使用您的内容，例如 `alt`、`title`、`href`、`aria-label` 等，您必须调用该函数的值，如下所示：

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> 要了解有关 `useIntlayer` 钩子的更多信息，请参阅[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useIntlayer.md)。

> 如果您的应用程序已经存在，您可以结合使用 [Intlayer 编译器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) 和 [提取命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md) 在一秒钟内转换成干个组件。

### （可选）第 7 步：配置代理进行语言环境检测

设置代理以检测用户首选的语言环境：

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

> `intlayerProxy` 用于检测用户的首选语言环境，并将他们重定向到 [配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md) 中指定的相应 URL。此外，它还允许将用户的首选语言环境保存在 cookie 中。

> 如果您需要将多个代理链接在一起（例如，带有身份验证的 `intlayerProxy` 或自定义代理），Intlayer 现在提供了一个名为 `multipleProxies` 的助手。

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

### （可选）第 8 步：元数据的国际化

在您想要国际化元数据（例如页面标题）的情况下，您可以使用 Next.js 提供的 `generateMetadata` 函数。在其中，您可以从 `getIntlayer` 函数中检索内容来翻译您的元数据。

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

```javascript fileName="src/app/[locale]/metadata.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
};

export default metadataContent;
```

```javascript fileName="src/app/[locale]/metadata.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
};

module.exports = metadataContent;
```

```json fileName="src/app/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app"
      }
    }
  }
}
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * 生成一个包含每个语言环境的所有 url 的对象。
   *
   * 示例：
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // 返回
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... 其余代码
````

````javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getIntlayer, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * 生成一个包含每个语言环境的所有 url 的对象。
   *
   * 示例：
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // 返回
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl = multilingualUrls[locale];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... 其余代码
````

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getIntlayer, getMultilingualUrls } = require("intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * 生成一个包含每个语言环境的所有 url 的对象。
   *
   * 示例：
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // 返回
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl = multilingualUrls[locale];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

module.exports = { generateMetadata };

// ... 其余代码
````

> 请注意，从 `next-intlayer` 导入的 `getIntlayer` 函数会返回包装在 `IntlayerNode` 中的内容，从而允许与可视化编辑器集成。相比之下，从 `intlayer` 导入的 `getIntlayer` 函数则直接返回内容，不带附加属性。

或者，您可以使用 `getTranslation` 函数来声明元数据。然而，建议使用内容声明文件以自动化翻译您的元数据，并在某个时候将内容外化。

```typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const t = <T>(content: IConfigLocales<T>) => getTranslation(content, locale);

  return {
    title: t<string>({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

// ... 其余代码
```

```javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getTranslation, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const t = (content) => getTranslation(content, locale);

  return {
    title: t({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

// ... 其余代码
```

```javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getTranslation, getMultilingualUrls } = require("intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const t = (content) => getTranslation(content, locale);

  return {
    title: t({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

module.exports = { generateMetadata };

// ... 其余代码
```

> 在 [Next.js 官方文档](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) 上了解更多关于元数据优化的信息。

### （可选）第 9 步：sitemap.xml 和 robots.txt 的国际化

要对您的 `sitemap.xml` 和 `robots.txt` 进行国际化，您可以使用 Intlayer 提供的 `getMultilingualUrls` 函数。此函数允许您为站点地图生成多语言 URL。

```tsx fileName="src/app/sitemap.ts" codeFormat="typescript"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
      },
    },
  },
];

export default sitemap;
```

```jsx fileName="src/app/sitemap.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const sitemap = () => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
      },
    },
  },
];

export default sitemap;
```

```jsx fileName="src/app/sitemap.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const sitemap = () => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
      },
    },
  },
];

module.exports = sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat="typescript"
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

```jsx fileName="src/app/robots.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

```jsx fileName="src/app/robots.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

module.exports = robots;
```

> 在 [Next.js 官方文档](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) 上了解更多关于站点地图优化的信息。在 [Next.js 官方文档](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) 上了解更多关于 robots.txt 优化的信息。

### （可选）第 10 步：更改内容的语言

要在 Next.js 中更改内容的语言，推荐的方法是使用 `Link` 组件将用户重定向到相应的本地化页面。`Link` 组件支持页面预取，这有助于避免全页面重新加载。

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // 将确保浏览器的“返回”按钮将重定向到上一个页面
          >
            <span>
              {/* 语言环境 - 例如 FR */}
              {localeItem}
            </span>
            <span>
              {/* 语言在其自身语言环境中的名称 - 例如 Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 语言在当前语言环境中的名称 - 例如当当前语言环境设置为 Locales.SPANISH 时显示为 Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英语中的语言名称 - 例如 French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // 将确保浏览器的“返回”按钮将重定向到上一个页面
          >
            <span>
              {/* 语言环境 - 例如 FR */}
              {localeItem}
            </span>
            <span>
              {/* 语言在其自身语言环境中的名称 - 例如 Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 语言在当前语言环境中的名称 - 例如当当前语言环境设置为 Locales.SPANISH 时显示为 Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英语中的语言名称 - 例如 French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("next-intlayer");
const Link = require("next/link");

export const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // 将确保浏览器的“返回”按钮将重定向到上一个页面
          >
            <span>
              {/* 语言环境 - 例如 FR */}
              {localeItem}
            </span>
            <span>
              {/* 语言在其自身语言环境中的名称 - 例如 Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 语言在当前语言环境中的名称 - 例如当当前语言环境设置为 Locales.SPANISH 时显示为 Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英语中的语言名称 - 例如 French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> 另一种方法是使用 `useLocale` 钩子提供的 `setLocale` 函数。此函数不允许页面预取。有关更多详细信息，请参见 [`useLocale` 钩子文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useLocale.md)。

> 您还可以在 `onLocaleChange` 选项中设置一个函数，以在语言环境更改时触发自定义函数。

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... 其余代码

const router = useRouter();
const { setLocale } = useLocale({
  onLocaleChange: (locale) => {
    router.push(getLocalizedUrl(pathWithoutLocale, locale));
  },
});

return <button onClick={() => setLocale(Locales.FRENCH)}>更改为法语</button>;
```

> 文档参考：
>
> - [`useLocale` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` 属性](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/lang)
> - [`dir` 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` 属性](https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### （可选）第 11 步：创建本地化链接组件

为了确保您的应用程序导航尊重当前语言环境，您可以创建一个自定义的 `Link` 组件。此组件会自动为内部 URL 添加当前语言的前缀。例如，当讲法语的用户点击“关于”页面的链接时，他们会被重定向到 `/fr/about` 而不是 `/about`。

这种行为很有用，原因如下：

- **SEO 和用户体验**：本地化 URL 帮助搜索引擎正确索引特定语言的页面，并为用户提供其首选语言的内容。
- **一致性**：通过在整个应用程序中使用本地化链接，您可以确保导航保持在当前语言环境内，防止意外的语言切换。
- **可维护性**：将本地化逻辑集中在单个组件中简化了 URL 的管理，随着应用程序的增长，使您的代码库更易于维护和扩展。

以下是用 TypeScript 实现的本地化 `Link` 组件：

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * 检查给定 URL 是否为外部链接的实用函数。
 * 如果 URL 以 http:// 或 https:// 开头，则被视为外部链接。
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 一个自定义的 Link 组件，根据当前语言环境调整 href 属性。
 * 对于内部链接，它使用 `getLocalizedUrl` 在 URL 前添加语言环境前缀（例如 /fr/about）。
 * 这确保了导航保持在相同的语言环境上下文中。
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // 如果链接是内部链接且提供了有效的 href，则获取本地化 URL。
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink from "next/link";
import { useLocale } from "next-intlayer";

/**
 * 检查给定 URL 是否为外部链接的实用函数。
 * 如果 URL 以 http:// 或 https:// 开头，则被视为外部链接。
 */
export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * 一个自定义的 Link 组件，根据当前语言环境调整 href 属性。
 * 对于内部链接，它使用 `getLocalizedUrl` 在 URL 前添加语言环境前缀（例如 /fr/about）。
 * 这确保了导航保持在相同的语言环境上下文中。
 */
export const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // 如果链接是内部链接且提供了有效的 href，则获取本地化 URL。
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
"use client";

const { getLocalizedUrl } = require("intlayer");
const NextLink = require("next/link");
const { useLocale } = require("next-intlayer");

/**
 * 检查给定 URL 是否为外部链接的实用函数。
 * 如果 URL 以 http:// 或 https:// 开头，则被视为外部链接。
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * 一个自定义的 Link 组件，根据当前语言环境调整 href 属性。
 * 对于内部链接，它使用 `getLocalizedUrl` 在 URL 前添加语言环境前缀（例如 /fr/about）。
 * 这确保了导航保持在相同的语言环境上下文中。
 */
const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // 如果链接是内部链接且提供了有效的 href，则获取本地化 URL。
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

#### 工作原理

- **检测外部链接**：  
  助手函数 `checkIsExternalLink` 确定 URL 是否为外部链接。外部链接保持不变，因为它们不需要本地化。

- **检索当前语言环境**：  
  `useLocale` 钩子提供当前语言环境（例如，法语为 `fr`）。

- **本地化 URL**：  
  对于内部链接（即非外部链接），使用 `getLocalizedUrl` 自动为 URL 添加当前语言环境前缀。这意味着如果您的用户使用的是法语，传递 `/about` 作为 `href` 将其转换为 `/fr/about`。

- **返回链接**：  
  该组件返回带有本地化 URL 的 `<a>` 元素，确保导航与语言环境一致。

通过在整个应用程序中集成此 `Link` 组件，您可以维持连贯且具有语言意识的用户体验，同时还能从改进的 SEO 和可用性中获益。

### （可选）第 12 步：在 Server Actions 中获取当前语言环境

如果您在 Server Action 中需要活动语言环境（例如，为了本地化电子邮件或运行语言环境感知逻辑），请从 `next-intlayer/server` 调用 `getLocale`：

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // 对语言环境执行某些操作
};
```

> `getLocale` 函数遵循级联策略来确定用户的语言环境：
>
> 1. 首先，它检查请求头中是否包含代理可能设置的语言环境值。
> 2. 如果请求头中未找到语言环境，它会查找存储在 cookie 中的语言环境。
> 3. 如果未找到 cookie，它会尝试从浏览器设置中检测用户的首选语言。
> 4. 作为最后手段，它会回退到应用程序配置的默认语言环境。
>
> 这确保了根据可用上下文选择最合适的语言环境。

### （可选）第 13 步：优化您的包大小

使用 `next-intlayer` 时，默认情况下每个页面的包中都会包含字典。为了优化包大小，Intlayer 提供了一个可选的 SWC 插件，该插件可以使用宏智能地替换 `useIntlayer` 调用。这确保了字典仅包含在实际使用它们的页面的包中。

要启用此优化，请安装 `@intlayer/swc` 包。安装后，`next-intlayer` 将自动检测并使用该插件：

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

> 注意：此优化仅适用于 Next.js 13 及以上版本。

> 注意：此包默认不安装，因为 SWC 插件在 Next.js 上仍处于实验阶段。未来可能会有所改变。

> 注意：如果您将选项设置为 `importMode: 'dynamic'` 或 `importMode: 'fetch'`（在 `dictionary` 配置中），它将依赖于 Suspense，因此您必须将 `useIntlayer` 调用包装在 `Suspense` 边界中。这意味着，您将无法直接在页面/布局组件的顶层使用 `useIntlayer`。

### 在 Turbopack 上监视字典更改

当使用 Turbopack 作为您的开发服务器并运行 `next dev` 命令时，默认情况下不会自动检测字典更改。

出现这种限制是因为 Turbopack 无法并行运行 webpack 插件以监视内容文件中的更改。要解决此问题，您需要使用 `intlayer watch` 命令同时运行开发服务器和 Intlayer 构建监视器。

```json5 fileName="package.json"
{
  // ... 您的现有 package.json 配置
  "scripts": {
    // ... 您的现有 scripts 配置
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> 如果您使用的是 next-intlayer@<=6.x.x，则需要保留 `--turbopack` 标志以使 Next.js 16 应用程序在 Turbopack 下正常工作。我们建议使用 next-intlayer@>=7.x.x 以避免此限制。

### 配置 TypeScript

Intlayer 使用模块扩充来利用 TypeScript 的优势，并使您的代码库更强大。

![自动补全](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![翻译错误](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

确保您的 TypeScript 配置包含自动生成的类型。

```json5 fileName="tsconfig.json"
{
  // ... 您的现有 TypeScript 配置
  "include": [
    // ... 您的现有 TypeScript 配置
    ".intlayer/**/*.ts", // 包含自动生成的类型
  ],
}
```

### Git 配置

建议忽略 Intlayer 生成的文件。这可以避免将它们提交到您的 Git 仓库。

为此，您可以将以下指令添加到您的 `.gitignore` 文件中：

```plaintext fileName=".gitignore"
# 忽略 Intlayer 生成的文件
.intlayer
```

### VS Code 扩展

为了改善您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

此扩展提供：

- 翻译键的**自动补全**。
- 缺失翻译的**实时错误检测**。
- 已翻译内容的**内联预览**。
- 轻松创建和更新翻译的**快速操作**。

有关如何使用该扩展的更多详细信息，请参阅 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

### 深入了解

要深入了解，您可以实现[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)或使用 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 外化您的内容。
